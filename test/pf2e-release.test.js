import assert from "node:assert/strict";
import test from "node:test";
import { resolvePF2eRelease, preparePF2ePacks } from "../src/pack-extractor/pf2e-release.js";

const release = (tag, extra = {}) => ({
    tag_name: tag,
    draft: false,
    prerelease: false,
    assets: [
        { name: "json-assets.zip", browser_download_url: `https://example.com/${tag}/json-assets.zip` },
        { name: "system.json", browser_download_url: `https://example.com/${tag}/system.json` },
    ],
    ...extra,
});

test("selects stable PF2e despite newer Starfinder, Anachronism, and preview releases", async () => {
    const result = await resolvePF2eRelease({ fetchImpl: async () => Response.json([
        release("sf2e-anachronism-2.4.0"),
        release("sf2e-1.6.0"),
        release("pf2e-anachronism-2.4.0"),
        release("pf2e-9.0.0", { prerelease: true }),
        release("pf2e-10.0.0", { draft: true }),
        release("pf2e-8.6.0"),
        release("pf2e-8.5.1"),
    ]) });
    assert.equal(result.tag, "pf2e-8.6.0");
    assert.equal(result.zipURL, "https://example.com/pf2e-8.6.0/json-assets.zip");
});

test("follows release pagination and compares numeric versions rather than publication order", async () => {
    const result = await resolvePF2eRelease({ fetchImpl: async (url) => {
        if (url.endsWith("page=1")) return Response.json([
            release("pf2e-8.6.0"), release("pf2e-8.5.9"),
        ], { headers: { Link: '<https://api.github.com/repos/foundryvtt/pf2e/releases?per_page=100&page=2>; rel="next"' } });
        assert.equal(url, "https://api.github.com/repos/foundryvtt/pf2e/releases?per_page=100&page=2");
        return Response.json([release("pf2e-8.10.0")]);
    } });
    assert.equal(result.tag, "pf2e-8.10.0");
});

test("allows extraction of an explicit PF2e version", async () => {
    const result = await resolvePF2eRelease({ version: "8.5.1", fetchImpl: async (url) => {
        assert.equal(url, "https://api.github.com/repos/foundryvtt/pf2e/releases/tags/pf2e-8.5.1");
        return Response.json(release("pf2e-8.5.1"));
    } });
    assert.equal(result.tag, "pf2e-8.5.1");
});

test("fails on an incomplete latest release instead of silently extracting older data", async () => {
    await assert.rejects(resolvePF2eRelease({ fetchImpl: async () => Response.json([
        release("pf2e-8.6.0", { assets: [] }), release("pf2e-8.5.1"),
    ]) }), /pf2e-8\.6\.0.*json-assets\.zip/);
});

test("reports GitHub HTTP failures before attempting extraction", async () => {
    await assert.rejects(resolvePF2eRelease({ fetchImpl: async () => new Response("Rate limited", { status: 403 }) }), /403/);
});

const config = () => ({
    filePaths: { packs: { crowdin: "translation/en/compendium", actor: "translation/en/actors" } },
    packs: {
        ItemPacks: { packNames: ["ancestryfeatures", "actions"], mapping: "item", savePath: "crowdin" },
        OtherActors: { packNames: ["pathfinder-monster-core"], mapping: "actor", savePath: "actor" },
    },
});
const entry = (fileName, content = "[]") => ({ path: "packs/", fileName, fileType: "json", content });

test("uses manifest paths while retaining existing Crowdin names and discovering new packs", () => {
    const result = preparePF2ePacks([
        entry("ancestry-features"), entry("ancestry-features_folders"),
        entry("actions"), entry("pathfinder-monster-core"), entry("pathfinder-monster-core-2"),
    ], { id: "pf2e", packs: [
        { name: "ancestryfeatures", path: "packs/ancestry-features", type: "Item" },
        { name: "actionspf2e", path: "packs/actions", type: "Item" },
        { name: "pathfinder-monster-core", path: "packs/pathfinder-monster-core", type: "Actor" },
        { name: "pathfinder-monster-core-2", path: "packs/pathfinder-monster-core-2", type: "Actor" },
    ] }, config());
    assert.equal(result.packs.find(p => p.fileName === "ancestryfeatures").content, "[]");
    assert.ok(result.packs.some(p => p.fileName === "ancestryfeatures_folders"));
    assert.deepEqual(result.groups.ItemPacks.packNames, ["ancestryfeatures", "actions"]);
    assert.ok(Object.values(result.groups).some(g => g.mapping === "actor" && g.savePath === "crowdin" && g.packNames.includes("pathfinder-monster-core-2")));
    assert.deepEqual(result.groups.OtherActors.packNames, ["pathfinder-monster-core"]);
});

test("fails if a manifest pack is absent from the ZIP", () => {
    assert.throws(() => preparePF2ePacks([], { id: "pf2e", packs: [
        { name: "actions", path: "packs/actions", type: "Item" },
    ] }, config()), /packs\/actions\.json/);
});

test("names new translation files after the compendium ID when its archive path differs", () => {
    const result = preparePF2ePacks([entry("standalone-adventures")], { id: "pf2e", packs: [
        { name: "dawn-of-the-frogs", path: "packs/standalone-adventures", type: "Actor" },
    ] }, { packs: {} });
    assert.equal(result.packs[0].fileName, "dawn-of-the-frogs");
    assert.deepEqual(result.groups.AdditionalActorPacks.packNames, ["dawn-of-the-frogs"]);
});

test("rejects a Starfinder manifest", () => {
    assert.throws(() => preparePF2ePacks([], { id: "sf2e", packs: [] }, config()), /pf2e/);
});
