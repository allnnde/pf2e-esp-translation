import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

test("translation application rejects injected arguments, permits recorded corrections and protects outside edits", () => {
    const root = fs.mkdtempSync(path.join(os.tmpdir(), "pf2e-apply-test-")), work = path.join(root, "work");
    const write = (file, value) => fs.writeFileSync(path.join(root, file), JSON.stringify(value));
    const hash = value => createHash("sha256").update(value).digest("hex");
    const script = fileURLToPath(new URL("../scripts/translate-missing.mjs", import.meta.url));
    const source = "Hello @Check[reflex|dc:25|name:Breath]";
    try {
        fs.mkdirSync(path.join(root, "docs")); fs.mkdirSync(work);
        write("docs/translation-map.json", { files: [{ en: "en.json", es: "es.json" }] });
        write("en.json", { text: source }); write("es.json", { text: source });
        write("work/translation-plan.json", { fields: [{ file: "es.json", pointer: "/text", keys: ["text"], source, original: source, sourceHash: hash(source), originalHash: hash(source), parts: [{ id: "hello", prefix: "", suffix: " " }, { source: "@Check[reflex|dc:25|name:", literal: true }, { id: "breath", prefix: "", suffix: "" }, { source: "]", literal: true }] }] });
        write("work/translation-jobs.json", [{ id: "hello", source: "Hello", target: "Hola", method: "manual-review" }, { id: "breath", source: "Breath" }]);
        const result = target => fs.writeFileSync(path.join(work, "translation-fixes.jsonl"), JSON.stringify({ id: "breath", source: "Breath", target, method: "manual-review" }) + "\n");
        const apply = () => spawnSync(process.execPath, [script, "apply"], { cwd: root, env: { ...process.env, PF2E_TRANSLATION_WORKDIR: work }, encoding: "utf8" });
        result("Aliento|traits:death");
        assert.equal(apply().status, 0);
        assert.equal(JSON.parse(fs.readFileSync(path.join(root, "es.json"))).text, source);
        assert.equal(JSON.parse(fs.readFileSync(path.join(work, "translation-pending.json"))).length, 1);
        result("Aliento"); assert.equal(apply().status, 0);
        assert.equal(JSON.parse(fs.readFileSync(path.join(root, "es.json"))).text, "Hola @Check[reflex|dc:25|name:Aliento]");
        result("Aliento ígneo"); assert.equal(apply().status, 0);
        assert.equal(JSON.parse(fs.readFileSync(path.join(root, "es.json"))).text, "Hola @Check[reflex|dc:25|name:Aliento ígneo]");
        write("es.json", { text: "Edición externa" });
        assert.notEqual(apply().status, 0);
        assert.equal(JSON.parse(fs.readFileSync(path.join(root, "es.json"))).text, "Edición externa");
        write("en.json", { text: "Different source" });
        assert.match(apply().stderr, /English source changed/);
    } finally { fs.rmSync(root, { recursive: true, force: true }); }
});
