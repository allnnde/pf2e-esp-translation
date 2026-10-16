import fs from "node:fs";
import { createHash } from "node:crypto";
import { compareStructure, isTechnicalPath, stringLeaves, valueAt } from "../src/translation-maintenance.js";
import { isLiteralText, partitionText, protectedTokens, numericTokens, looksEnglish } from "../src/translation-text.js";

const read = file => JSON.parse(fs.readFileSync(file, "utf8"));
const hash = value => createHash("sha256").update(value).digest("hex");
const task = process.env.PF2E_TRANSLATION_WORKDIR, recording = process.argv.includes("--write");
const map = read("docs/translation-map.json"), snapshot = read("src/pack-extractor/pf2e-source.json");
const prior = read(recording && task ? `${task}/prior-translation-review.json` : "docs/translation-review.json");
const priorFields = new Map(prior.files.flatMap(f => f.fields.map(field => [`${f.file}:${field.pointer}`, field])));
const applied = recording && task ? new Map(read(`${task}/translation-applied.json`).map(f => [`${f.file}:${f.pointer}`, f])) : new Map();
const plan = recording && task ? read(`${task}/translation-plan.json`) : undefined;
const exceptions = recording && task ? new Map(read(`${task}/translation-exceptions.json`).map(f => [f.id, f])) : new Map();
const plans = new Map((plan?.fields ?? []).map(f => [`${f.file}:${f.pointer}`, f]));
const nameCorrections = new Map((fs.existsSync("docs/translation-name-corrections.json") ? read("docs/translation-name-corrections.json") : []).map(f => [`${f.file}:${f.pointer}`, f]));
const files = [], packs = [], problems = [];
let staleRecords = 0, structureDifferences = 0, technicalDifferences = 0, malformedCommands = 0;
const zero = () => ({ sourceFields: 0, translatedOrInherited: 0, editoriallyReviewed: 0, pendingEditorialReview: 0, missing: 0, requiresTranslation: 0, requiresLanguageReview: 0, intentionalUnchanged: 0, requiresSourceReview: 0, requiresFormatReview: 0, technicalFields: 0 });
const statusKey = { "editorially-reviewed": "editoriallyReviewed", "pending-editorial-review": "pendingEditorialReview", "intentional-unchanged": "intentionalUnchanged", "requires-translation": "requiresTranslation", "requires-language-review": "requiresLanguageReview", "requires-source-review": "requiresSourceReview", "requires-format-review": "requiresFormatReview", "inherited-translation": "translatedOrInherited", "reused-existing-translation": "pendingEditorialReview" };
for (const pair of map.files) {
    const source = read(pair.en), target = read(pair.es), fields = [], counts = zero();
    structureDifferences += compareStructure(source, target).length;
    for (const leaf of stringLeaves(source)) {
        const spanish = valueAt(target, leaf.keys), key = `${pair.es}:${leaf.pointer}`;
        if (typeof spanish !== "string") { counts.missing++; problems.push({ file: pair.es, pointer: leaf.pointer, reason: "missing" }); continue; }
        try { partitionText(leaf.value); partitionText(spanish); }
        catch (error) { malformedCommands++; problems.push({ file: pair.es, pointer: leaf.pointer, reason: error.message }); }
        const technical = isTechnicalPath(leaf.keys) || leaf.value.startsWith("<Compendium> tag will get replaced") || isLiteralText(leaf.value);
        if (technical) {
            counts.technicalFields++;
            if (isTechnicalPath(leaf.keys) && spanish !== leaf.value) technicalDifferences++;
            continue;
        }
        counts.sourceFields++;
        const sourceHash = hash(leaf.value), translationHash = hash(spanish), previous = priorFields.get(key), change = applied.get(key);
        const sameRecord = previous?.sourceHash === sourceHash && previous?.translationHash === translationHash;
        let record = { pointer: leaf.pointer, sourceHash, translationHash, reviewStatus: "inherited-translation", method: "inherited-spanish" };
        if (sameRecord) record = { ...previous };
        else if (!recording) staleRecords++;
        else if (previous && previous.sourceHash !== sourceHash && previous.translationHash === translationHash) record.reviewStatus = "requires-source-review";
        if (change?.sourceHash === sourceHash && change.translationHash === translationHash) record = { ...record, reviewStatus: change.reviewStatus, methods: change.methods, method: "translated-current-batch", protectedContentHash: change.protectedContentHash, numericContentHash: change.numericContentHash };
        const nameCorrection = nameCorrections.get(key);
        if (nameCorrection?.sourceHash === sourceHash && nameCorrection.translationHash === translationHash) record = { ...record, reviewStatus: "pending-editorial-review", method: "manual-name-correction" };
        if (record.protectedContentHash && record.protectedContentHash !== hash(JSON.stringify(protectedTokens(spanish)))) { technicalDifferences++; problems.push({ file: pair.es, pointer: leaf.pointer, reason: "protected-content-changed" }); }
        if (record.numericContentHash && record.numericContentHash !== hash(JSON.stringify(numericTokens(spanish)))) { technicalDifferences++; problems.push({ file: pair.es, pointer: leaf.pointer, reason: "numeric-content-changed" }); }
        if (!spanish.trim() && leaf.value.trim()) record.reviewStatus = "requires-translation";
        else if (spanish.trim() === leaf.value.trim()) {
            const field = plans.get(key), retained = field?.parts.filter(p => p.id).map(p => exceptions.get(p.id));
            if (retained?.length && retained.every(Boolean)) {
                record.reviewStatus = "intentional-unchanged";
                record.reasons = [...new Set(retained.map(p => p.reason))];
                record.retainedSegments = retained.map(p => ({ source: p.source, reason: p.reason, explanation: p.explanation }));
            } else if (!(sameRecord && previous.reviewStatus === "intentional-unchanged")) record.reviewStatus = "requires-language-review";
        } else if (partitionText(spanish).some(p => !p.literal && looksEnglish(p.source))) record.reviewStatus = "requires-translation";
        // Outdated deficit flags cannot survive a now-translated value.
        else if (["requires-translation", "requires-language-review", "intentional-unchanged"].includes(record.reviewStatus)) record.reviewStatus = "inherited-translation";
        if (["requires-translation", "requires-language-review"].includes(record.reviewStatus)) problems.push({ file: pair.es, pointer: leaf.pointer, reason: record.reviewStatus, source: leaf.value, target: spanish });
        counts[statusKey[record.reviewStatus] ?? "translatedOrInherited"]++;
        fields.push(record);
    }
    files.push({ file: pair.es, sourceFile: pair.en, fields });
    packs.push({ pack: pair.es.split("/").at(-1).replace(/\.json$/, ""), file: pair.es, sourceFile: pair.en, kind: map.packs.some(p => p.es === pair.es) ? "compendium" : pair.es.includes("/modules/") ? "module" : "interface", entries: Object.keys(source.entries ?? {}).length, ...counts });
}
const totals = zero();
for (const pack of packs) for (const key of Object.keys(totals)) totals[key] += pack[key];
const metadata = { sourceVersion: snapshot.version, sourceTag: snapshot.tag, date: "2026-10-16", sourceSnapshot: "src/pack-extractor/pf2e-source.json", hashAlgorithm: "sha256", automaticBase: { engines: ["inherited automatic translations", "local OPUS EN-ES", "local MADLAD400", "Google Translate retries"], reviewStatus: "pending-editorial-review", checks: ["source-exact JSON structure", "protected Foundry commands, rolls, HTML and variables", "numeric values and dice", "obvious residual English", "explicit retained-name classification"], semanticReview: false }, runtimeFoundryTest: "pending" };
const summary = { ...metadata, scope: { files: packs.length, compendiums: map.packs.length, interfaceFiles: read("module.json").languages.length, otherMappedFiles: packs.length - map.packs.length - read("module.json").languages.length }, totals, checks: { structureDifferences, technicalDifferences, malformedCommands, staleRecords }, packs };
if (recording) {
    fs.writeFileSync("docs/translation-status.json", JSON.stringify(summary, null, 2) + "\n");
    const definitions = { ...prior.reviewStatusDefinitions, "inherited-translation": "Existing Spanish retained; no full current semantic review claimed.", "reused-existing-translation": "Exact source translation reused from the repository, awaiting full editorial review." };
    const header = JSON.stringify({ ...metadata, reviewStatusDefinitions: definitions }, null, 2).slice(0, -2);
    fs.writeFileSync("docs/translation-review.json", header + ',\n  "files": [\n' + files.map(f => '    {"file":' + JSON.stringify(f.file) + ',"sourceFile":' + JSON.stringify(f.sourceFile) + ',"fields":[\n' + f.fields.map(field => '      ' + JSON.stringify(field)).join(',\n') + '\n    ]}').join(',\n') + '\n  ]\n}\n');
    const rows = packs.map(p => `| \`${p.pack}\` | ${p.sourceFields} | ${p.pendingEditorialReview} | ${p.intentionalUnchanged} | ${p.requiresTranslation + p.requiresLanguageReview + p.missing} |`);
    fs.writeFileSync("docs/translation-status.md", `# Estado de traducción de PF2e ${snapshot.version}\n\nLote del 16 de octubre de 2026, desde main 4121cad176265568e091fee56f729a5b51fd39a4.\n\nSe comprueban los **${packs.length} pares de archivos** de Crowdin: **${map.packs.length} compendios de PF2e**, los **${summary.scope.interfaceFiles} archivos de interfaz** registrados y **${summary.scope.otherMappedFiles} archivos adicionales de módulos o soporte**. El mapeo utiliza el identificador \`name\` del manifiesto oficial, no el nombre físico del directorio del pack.\n\nHay ${totals.sourceFields} campos de texto y ${totals.technicalFields} campos técnicos o no lingüísticos excluidos del recuento de traducción. Faltan ${totals.missing + totals.requiresTranslation} traducciones detectadas y quedan ${totals.requiresLanguageReview} textos iguales al inglés sin clasificar. Se conservan deliberadamente ${totals.intentionalUnchanged} nombres propios o términos compartidos, identificados por campo y huellas en [translation-review.json](translation-review.json).\n\nSe completó primero el alineado y después la traducción. La base automática incorporada queda **pendiente de revisión editorial**: tener texto español y pasar los controles de formato no acredita fidelidad completa de reglas o redacción. Se mantienen ${totals.editoriallyReviewed} revisiones completas anteriores únicamente cuando coinciden ambas huellas; ${totals.requiresSourceReview} revisiones de fuente y ${totals.requiresFormatReview} revisiones de formato heredadas siguen registradas. La carga real en Foundry no se ha probado en este lote.\n\nEl registro conserva por archivo y JSON Pointer los hashes SHA-256 de la fuente y del español. \`pending-editorial-review\` y \`reused-existing-translation\` contienen traducción; no representan huecos. \`intentional-unchanged\` exige una clasificación explícita. \`requires-translation\` y \`requires-language-review\` impiden dar por cerrada la cobertura. Los IDs, mappings, comandos, fórmulas y variables conservan su función técnica.\n\n| Archivo | Campos de texto | Pendiente editorial | Nombres conservados | Huecos o sin clasificar |\n| --- | ---: | ---: | ---: | ---: |\n${rows.join("\n")}\n`);
}
if (task) fs.writeFileSync(`${task}/audit-problems.json`, JSON.stringify(problems, null, 2));
console.log(JSON.stringify({ files: packs.length, ...totals, ...summary.checks }, null, 2));
if (totals.missing || totals.requiresTranslation || totals.requiresLanguageReview || structureDifferences || technicalDifferences || malformedCommands || (!recording && staleRecords)) process.exitCode = 1;
