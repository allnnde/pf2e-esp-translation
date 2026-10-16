import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import { buildTranslationMemory, isTechnicalPath, stringLeaves, valueAt } from "../src/translation-maintenance.js";
import { partitionText, protectedTokens, isLiteralText, looksEnglish, numericTokens, validateNaturalTranslation } from "../src/translation-text.js";

const task = process.env.PF2E_TRANSLATION_WORKDIR;
if (!task) throw new Error("Set PF2E_TRANSLATION_WORKDIR to the local translation workspace");
const read = file => JSON.parse(fs.readFileSync(file, "utf8"));
const write = (file, value) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n"); };
const hash = value => createHash("sha256").update(value).digest("hex");
const equalNumbers = (a, b) => JSON.stringify(numericTokens(a)) === JSON.stringify(numericTokens(b));
const acceptable = (source, target) => typeof target === "string" && !!target.trim() && equalNumbers(source, target) && !looksEnglish(target) && !/ZXQ|QXZ/.test(target) && (source.length < 100 || target.length > source.length * .45);
const plain = source => { try { return partitionText(source).every(p => !p.literal); } catch { return false; } };
const map = read("docs/translation-map.json");

if (process.argv[2] === "prepare") {
    const memoryRows = [], cache = new Map(), terms = new Map(), documents = map.files.map(p => ({ ...p, source: read(p.en), target: read(p.es) }));
    for (const doc of documents) for (const leaf of stringLeaves(doc.source)) {
        if (isTechnicalPath(leaf.keys)) continue;
        const target = valueAt(doc.target, leaf.keys), source = leaf.value;
        if (target === source || !acceptable(source, target)) continue;
        if (plain(source) && source.length < 650) memoryRows.push({ source: source.trim(), target: target.trim(), role: leaf.keys.at(-1) });
        if (["name", "label"].includes(leaf.keys.at(-1)) && source.length >= 4 && source.length < 100 && !/[<>@{}\[\]]/.test(source) && !/[<>@{}\[\]]/.test(target)) {
            const set = terms.get(source) ?? new Set(); set.add(target); terms.set(source, set);
        }
    }
    const memory = buildTranslationMemory(memoryRows);
    const cacheDir = process.env.PF2E_TRANSLATION_CACHE;
    let cached = 0;
    if (cacheDir) for (const name of ["local-results-v7.jsonl", "local-results-v6.jsonl", "local-results-v5.jsonl", "local-results-v4.jsonl", "local-results-v3.jsonl", "local-results-v2.jsonl", "local-results.jsonl"]) {
        const file = `${cacheDir}/${name}`; if (!fs.existsSync(file)) continue;
        for (const line of fs.readFileSync(file, "utf8").split("\n")) {
            if (!line.trim()) continue;
            const item = JSON.parse(line);
            if (typeof item.source !== "string" || !acceptable(item.source, item.target) || item.target === item.source || !plain(item.source)) continue;
            const source = item.source.trim();
            if (!cache.has(source)) { cache.set(source, { target: item.target.trim(), method: "cached-local-machine" }); cached++; }
        }
    }
    const fields = [], jobs = new Map(), technical = [], reused = {};
    for (const doc of documents) for (const leaf of stringLeaves(doc.source)) {
        const current = valueAt(doc.target, leaf.keys), source = leaf.value;
        if (isTechnicalPath(leaf.keys) || source.startsWith("<Compendium> tag will get replaced") || isLiteralText(source)) { technical.push({ file: doc.es, pointer: leaf.pointer, sourceHash: hash(source), reason: "technical-or-nonlinguistic" }); continue; }
        const equal = source.trim() === current.trim();
        const parts = partitionText(current);
        if (!equal && !parts.some(p => !p.literal && looksEnglish(p.source))) continue;
        let translatedPieces = 0;
        const plan = parts.map(piece => {
            if (piece.literal || isLiteralText(piece.source) || (!equal && !looksEnglish(piece.source))) return { ...piece, literal: true };
            const core = piece.source.trim(); if (!core) return { ...piece, literal: true };
            const prefix = piece.source.match(/^\s*/)[0], suffix = piece.source.match(/\s*$/)[0];
            const ambiguous = memory.isAmbiguous(core);
            const id = hash(core + (ambiguous ? `\0${leaf.keys.at(-1)}\0${doc.es}:${leaf.pointer}` : ""));
            if (!jobs.has(id)) {
                const existing = memory.get(core, leaf.keys.at(-1));
                const known = existing ? { target: existing, method: "existing-translation" } : !ambiguous ? cache.get(core) : undefined;
                jobs.set(id, { id, source: core, context: `${doc.es}:${leaf.pointer}`, ambiguous, ...(known ? { target: known.target, method: known.method } : {}) });
                if (known) reused[known.method] = (reused[known.method] ?? 0) + 1;
            }
            translatedPieces++;
            return { source: piece.source, id, prefix, suffix };
        });
        if (translatedPieces) fields.push({ file: doc.es, pointer: leaf.pointer, keys: leaf.keys, sourceHash: hash(source), originalHash: hash(current), source, original: current, mode: equal ? "untranslated" : "mixed-english", parts: plan });
    }
    const glossary = Object.fromEntries([...terms].filter(([source, values]) => values.size === 1 && !memory.isAmbiguous(source)).map(([source, values]) => [source, [...values][0]]));
    Object.assign(glossary, { "Strike": "Golpe", "Strikes": "Golpes", "Stride": "Zancada", "Strides": "Zancadas", "Step": "Paso", "Hit Points": "Puntos de Golpe", "Temporary Hit Points": "Puntos de Golpe temporales", "Armor Class": "Clase de Armadura", "Saving Throw": "Tirada de salvación", "Saving Throws": "Tiradas de salvación", "Spell": "Conjuro", "Spells": "Conjuros", "Free Action": "Acción gratuita", "Reaction": "Reacción" });
    Object.assign(glossary, read("src/translation-glossary.json"));
    write(`${task}/translation-plan.json`, { fields, technical }); write(`${task}/translation-jobs.json`, [...jobs.values()]); write(`${task}/translation-terms.json`, glossary);
    console.log(JSON.stringify({ fields: fields.length, mixedEnglish: fields.filter(f => f.mode === "mixed-english").length, uniqueSegments: jobs.size, engineSegments: [...jobs.values()].filter(j => !j.target).length, characters: [...jobs.values()].filter(j => !j.target).reduce((n, j) => n + j.source.length, 0), reused, cachedCandidates: cached, glossary: Object.keys(glossary).length, technical: technical.length }, null, 2));
} else if (process.argv[2] === "apply") {
    const plan = read(`${task}/translation-plan.json`), jobs = new Map(read(`${task}/translation-jobs.json`).map(j => [j.id, j]));
    for (const name of ["translation-results.jsonl", "translation-opus-long.jsonl", "translation-retries.jsonl", "translation-fixes.jsonl"]) {
        const file = `${task}/${name}`; if (!fs.existsSync(file)) continue;
        for (const line of fs.readFileSync(file, "utf8").split("\n").filter(l => l.trim())) {
            const result = JSON.parse(line), current = jobs.get(result.id);
            if (!current || result.source !== current.source) continue;
            const valid = !result.error && validateNaturalTranslation(current.source, result.target);
            if (!valid && validateNaturalTranslation(current.source, current.target)) continue;
            if (name !== "translation-fixes.jsonl" && current.method === "existing-translation" && validateNaturalTranslation(current.source, current.target)) continue;
            jobs.set(result.id, { ...current, ...result, ...(valid ? { error: undefined } : {}) });
        }
    }
    const documents = new Map(), missing = [], unchanged = [], changed = [];
    const priorAppliedPath = `${task}/translation-applied.json`;
    const priorApplied = new Map((fs.existsSync(priorAppliedPath) ? read(priorAppliedPath) : []).map(f => [`${f.file}:${f.pointer}`, f]));
    const originals = new Map(map.files.map(pair => [pair.es, read(pair.en)]));
    for (const field of plan.fields) {
        if (hash(valueAt(originals.get(field.file), field.keys)) !== field.sourceHash) throw new Error(`English source changed during processing: ${field.file}:${field.pointer}`);
        if (field.parts.some(p => p.id && (!jobs.get(p.id)?.target || jobs.get(p.id)?.error || !validateNaturalTranslation(jobs.get(p.id).source, jobs.get(p.id).target)))) { missing.push({ file: field.file, pointer: field.pointer, error: "missing or invalid segment" }); continue; }
        const target = field.parts.map(p => p.literal ? p.source : p.prefix + jobs.get(p.id).target.trim() + p.suffix).join("");
        if (!equalNumbers(field.original, target)) { missing.push({ file: field.file, pointer: field.pointer, error: "numeric mismatch" }); continue; }
        if (JSON.stringify(protectedTokens(field.original)) !== JSON.stringify(protectedTokens(target))) { missing.push({ file: field.file, pointer: field.pointer, error: "protected content mismatch" }); continue; }
        if (target === field.original) { unchanged.push({ file: field.file, pointer: field.pointer, source: field.source }); continue; }
        const doc = documents.get(field.file) ?? read(field.file); documents.set(field.file, doc);
        const previous = priorApplied.get(`${field.file}:${field.pointer}`);
        const allowed = [field.originalHash, hash(target), ...(previous?.sourceHash === field.sourceHash ? [previous.translationHash] : [])];
        if (!allowed.includes(hash(valueAt(doc, field.keys)))) throw new Error(`Translation changed during processing: ${field.file}:${field.pointer}`);
        const parent = valueAt(doc, field.keys.slice(0, -1)); parent[field.keys.at(-1)] = target;
        const methods = [...new Set(field.parts.filter(p => p.id).map(p => jobs.get(p.id).method ?? "local-machine"))];
        changed.push({ file: field.file, pointer: field.pointer, sourceHash: field.sourceHash, translationHash: hash(target), protectedContentHash: hash(JSON.stringify(protectedTokens(field.original))), numericContentHash: hash(JSON.stringify(numericTokens(field.original))), methods, reviewStatus: methods.every(m => m === "existing-translation") ? "reused-existing-translation" : "pending-editorial-review" });
    }
    for (const [file, doc] of documents) write(file, doc);
    write(`${task}/translation-pending.json`, missing); write(`${task}/translation-unchanged.json`, unchanged); write(`${task}/translation-applied.json`, changed);
    console.log(JSON.stringify({ changed: changed.length, files: documents.size, pending: missing.length, unchanged: unchanged.length }, null, 2));
} else throw new Error("Use prepare or apply");
