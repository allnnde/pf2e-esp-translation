import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import YAML from "yaml";
import { alignJson, compareStructure, expandCrowdinFiles, isTechnicalPath, stringLeaves, valueAt } from "../src/translation-maintenance.js";

const read = file => JSON.parse(fs.readFileSync(file, "utf8"));
const filesIn = dir => fs.readdirSync(dir, { withFileTypes: true }).flatMap(e => e.isDirectory() ? filesIn(`${dir}/${e.name}`) : e.name.endsWith(".json") ? [`${dir}/${e.name}`] : []);
const write = (file, object) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, JSON.stringify(object, null, 2) + "\n"); };
const config = YAML.parse(fs.readFileSync("crowdin.yml", "utf8"));
const english = filesIn("translation/en"), spanish = filesIn("translation/es");
const pairs = expandCrowdinFiles(config, english);
const sources = new Set(pairs.map(p => p.en)), targets = new Set(pairs.map(p => p.es));
const ignoredSources = english.filter(f => !sources.has(f)), orphanTargets = spanish.filter(f => !targets.has(f));
const sourceMetadata = read("src/pack-extractor/pf2e-source.json");
const manifestArg = process.argv.indexOf("--manifest");
const manifest = manifestArg >= 0 ? read(process.argv[manifestArg + 1]) : await (await fetch(sourceMetadata.manifestURL)).json();
if (manifest.version !== sourceMetadata.version || manifest.id !== "pf2e") throw new Error("The PF2e manifest must match the source snapshot");
const missingPacks = manifest.packs.filter(pack => !targets.has(`translation/es/compendium/pf2e.${pack.name}.json`));
if (missingPacks.length) throw new Error(`Unmapped PF2e compendiums: ${missingPacks.map(p => p.name).join(", ")}`);
const moduleManifest = read("module.json");
for (const entry of moduleManifest.languages) if (!targets.has(entry.path)) throw new Error(`Unmapped runtime language file: ${entry.path}`);

const documents = pairs.map(pair => ({ ...pair, source: read(pair.en), target: fs.existsSync(pair.es) ? read(pair.es) : undefined }));
const memory = new Map();
// Old actors/ copies were never loaded by Babele, but can still contain useful exact-source translations.
const donorDocuments = english.map(en => ({ en, es: en.replace("translation/en/", "translation/es/") }))
    .filter(pair => orphanTargets.includes(pair.es)).map(pair => ({ source: read(pair.en), target: read(pair.es) }));
for (const doc of [...documents, ...donorDocuments]) for (const leaf of stringLeaves(doc.source)) {
    const translated = valueAt(doc.target, leaf.keys);
    if (isTechnicalPath(leaf.keys) || typeof translated !== "string" || !translated.trim() || translated === leaf.value) continue;
    // An exact original plus the same field role is required; conflicting translations are not chosen silently.
    const key = `${leaf.keys.at(-1)}\0${leaf.value}`;
    const candidates = memory.get(key) ?? new Set(); candidates.add(translated); memory.set(key, candidates);
}

const report = { baseCommit: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(), sourceVersion: sourceMetadata.version, phase: "alignment-only", pairs: pairs.length, runtimePacks: manifest.packs.length, recoveredStrings: 0, ignoredSources, orphanTargets, files: [] };
for (const doc of documents) {
    const differences = compareStructure(doc.source, doc.target);
    let recovered = 0;
    const aligned = alignJson(doc.source, doc.target, [], (source, keys) => {
        const candidates = memory.get(`${keys.at(-1)}\0${source}`);
        if (candidates?.size === 1) { recovered++; return [...candidates][0]; }
    });
    if (compareStructure(doc.source, aligned).length) throw new Error(`Alignment failed: ${doc.es}`);
    report.recoveredStrings += recovered;
    report.files.push({ ...Object.fromEntries(["en", "es"].map(k => [k, doc[k]])), differences: differences.length, recovered, wouldChange: JSON.stringify(doc.target) !== JSON.stringify(aligned) });
    if (process.argv.includes("--write")) write(doc.es, aligned);
}
if (process.argv.includes("--write")) {
    if (process.argv.includes("--prune")) for (const file of [...ignoredSources, ...orphanTargets]) fs.unlinkSync(file);
    const priorPath = "docs/translation-alignment.json";
    const prior = fs.existsSync(priorPath) ? read(priorPath) : undefined;
    if (prior?.baseCommit === report.baseCommit) {
        report.ignoredSources = [...new Set([...prior.ignoredSources, ...ignoredSources])];
        report.orphanTargets = [...new Set([...prior.orphanTargets, ...orphanTargets])];
        report.recoveredStrings += prior.recoveredStrings;
        report.files = report.files.map(file => ({ ...file, differences: file.differences + (prior.files.find(p => p.en === file.en)?.differences ?? 0), recovered: file.recovered + (prior.files.find(p => p.en === file.en)?.recovered ?? 0) }));
    }
    write(priorPath, report);
    write("docs/translation-map.json", { sourceVersion: sourceMetadata.version, manifestURL: sourceMetadata.manifestURL, packs: manifest.packs.map(pack => ({ id: pack.name, archivePath: pack.path, ...pairs.find(pair => pair.es === `translation/es/compendium/pf2e.${pack.name}.json`) })), files: pairs });
}
const summary = { phase: report.phase, pairs: report.pairs, runtimePacks: report.runtimePacks, structureDifferences: report.files.reduce((n, f) => n + f.differences, 0), wouldChangeFiles: report.files.filter(f => f.wouldChange).length, recoveredStrings: report.recoveredStrings, ignoredSources: ignoredSources.length, orphanTargets: orphanTargets.length, written: process.argv.includes("--write") };
console.log(JSON.stringify(summary, null, 2));
if (!process.argv.includes("--write") && (summary.structureDifferences || summary.wouldChangeFiles || ignoredSources.length || orphanTargets.length)) process.exitCode = 1;
