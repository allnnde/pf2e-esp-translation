import assert from "node:assert/strict";
import test from "node:test";
import { alignJson, compareStructure, expandCrowdinFiles, buildTranslationMemory } from "../src/translation-maintenance.js";

test("Crowdin expansion respects legacy filenames, ignored copies and module paths", () => {
    const config = { files: [
        { source: "translation/en/compendium/*.json", ignore: ["spells.json"], translation: "/translation/%two_letters_code%/compendium/pf2e.%file_name%.json" },
        { source: "translation/en/compendium/spells.json", translation: "/translation/%two_letters_code%/compendium/pf2e.%file_name%-srd.json" },
        { source: "translation/en/actors/*.json", ignore: ["book-of-the-dead-bestiary.json"], translation: "/translation/%two_letters_code%/compendium/pf2e.%file_name%.json" },
        { source: "translation/en/modules/*.json", translation: "/translation/%two_letters_code%/modules/%file_name%-%two_letters_code%.json" },
    ] };
    const pairs = expandCrowdinFiles(config, ["translation/en/compendium/spells.json", "translation/en/compendium/dawn-of-the-frogs.json", "translation/en/actors/pathfinder-bestiary-2.json", "translation/en/actors/book-of-the-dead-bestiary.json", "translation/en/modules/pf2e-hud.json"]);
    assert.deepEqual(pairs.map(p => p.es).sort(), ["translation/es/compendium/pf2e.dawn-of-the-frogs.json", "translation/es/compendium/pf2e.pathfinder-bestiary-2.json", "translation/es/compendium/pf2e.spells-srd.json", "translation/es/modules/pf2e-hud-es.json"].sort());
});

test("two sources cannot silently overwrite the same translated file", () => {
    assert.throws(() => expandCrowdinFiles({ files: [{ source: "en/*.json", translation: "/es/shared.json" }] }, ["en/a.json", "en/b.json"]), /same target|duplicate/i);
});

test("alignment preserves Spanish, removes stale keys and seeds missing values without translating", () => {
    const source = { label: "Actors", entries: { Akata: { name: "Akata", notes: "English notes", id: "original-id" }, New: { name: "New" } }, mapping: { notes: { path: "system.details.publicNotes" } } };
    const spanish = { label: "Actores", entries: { Akata: { name: "Akata", notes: "Notas españolas", id: "wrong-id", stale: "Antiguo" }, Old: { name: "Viejo" } }, mapping: { notes: { path: "ruta.incorrecta" } } };
    const aligned = alignJson(source, spanish);
    assert.equal(aligned.entries.Akata.notes, "Notas españolas");
    assert.equal(aligned.entries.Akata.id, "original-id");
    assert.equal(aligned.entries.New.name, "New");
    assert.equal(aligned.entries.Old, undefined);
    assert.equal(aligned.entries.Akata.stale, undefined);
    assert.deepEqual(aligned.mapping, source.mapping);
    assert.deepEqual(compareStructure(source, aligned), []);
    assert.deepEqual(alignJson(source, aligned), aligned);
    assert.equal(spanish.entries.Old.name, "Viejo");
});

test("alignment preserves arrays and corrects incompatible container types", () => {
    const source = { entries: { A: { rules: [{ label: "First" }, { label: "Second" }], name: "A" } } };
    const target = { entries: { A: { rules: { 0: { label: "Primero" }, 1: { label: "Segundo" }, 2: { label: "Obsoleto" } }, name: { wrong: true } } } };
    const aligned = alignJson(source, target);
    assert.deepEqual(aligned.entries.A.rules, [{ label: "Primero" }, { label: "Segundo" }]);
    assert.equal(aligned.entries.A.name, "A");
    assert.deepEqual(compareStructure(source, aligned), []);
    assert.ok(compareStructure(source, target).some(p => p.includes("/entries/A/rules")));
});

test("translation memory distinguishes context roles and refuses ambiguous meanings", () => {
    const memory = buildTranslationMemory([
        { source: 'Roll', target: 'Tirar', role: 'Submit' },
        { source: 'Roll', target: 'Rodar', role: 'name' },
        { source: 'Roll', target: 'Tirada', role: 'Roll' },
        { source: 'Charge', target: 'Carga', role: 'name' },
        { source: 'Charge', target: 'Cargar', role: 'name' },
    ]);
    assert.equal(memory.get('Roll', 'name'), 'Rodar');
    assert.equal(memory.get('Roll', 'Submit'), 'Tirar');
    assert.equal(memory.get('Roll', 'unknown'), undefined);
    assert.equal(memory.get('Charge', 'name'), undefined);
    assert.equal(memory.isAmbiguous('Roll'), true);
});

test("a UI section called token is translated while actor token image metadata stays technical", () => {
    const source = { settings: { token: { title: 'Token HUD' } }, entries: { Actor: { token: 'systems/pf2e/tokens/actor.webp' } } };
    const target = { settings: { token: { title: 'Panel de la ficha' } }, entries: { Actor: { token: 'imagen-incorrecta.webp' } } };
    assert.deepEqual(alignJson(source, target), { settings: { token: { title: 'Panel de la ficha' } }, entries: { Actor: { token: 'systems/pf2e/tokens/actor.webp' } } });
});
