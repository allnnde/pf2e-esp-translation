const PF2E_TAG = /^pf2e-(\d+)\.(\d+)\.(\d+)$/;

/** Resolve the stable PF2e release, excluding other products published in the same repository. */
export async function resolvePF2eRelease({ repository = "foundryvtt/pf2e", version, fetchImpl = fetch } = {}) {
    const apiURL = `https://api.github.com/repos/${repository}/releases`;
    const headers = { Accept: "application/vnd.github+json", "User-Agent": "pf2e-es-pack-extractor" };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const getJSON = async (url) => {
        const response = await fetchImpl(url, { headers });
        if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status} for ${url}`);
        return { data: await response.json(), next: response.headers.get("link")?.match(/<([^>]+)>; rel="next"/)?.[1] };
    };

    let releases = [];
    if (version) {
        if (!/^\d+\.\d+\.\d+$/.test(version)) throw new Error("PF2e version must have the form X.Y.Z");
        releases = [(await getJSON(`${apiURL}/tags/pf2e-${version}`)).data];
    } else {
        let next = `${apiURL}?per_page=100&page=1`;
        while (next) {
            const page = await getJSON(next);
            if (!Array.isArray(page.data)) throw new Error("GitHub did not return a release list");
            releases.push(...page.data);
            next = page.next;
        }
    }

    const candidates = releases.filter(r => !r.draft && !r.prerelease && PF2E_TAG.test(r.tag_name));
    candidates.sort((a, b) => {
        const av = a.tag_name.match(PF2E_TAG).slice(1).map(Number);
        const bv = b.tag_name.match(PF2E_TAG).slice(1).map(Number);
        for (let i = 0; i < 3; i++) if (av[i] !== bv[i]) return bv[i] - av[i];
        return 0;
    });
    const selected = candidates[0];
    if (!selected) throw new Error("No stable PF2e release found");

    const asset = name => {
        const found = selected.assets?.find(a => a.name === name);
        if (!found?.browser_download_url) throw new Error(`${selected.tag_name} has no ${name} release asset`);
        return found;
    };
    const zip = asset("json-assets.zip");
    return {
        version: selected.tag_name.slice(5),
        tag: selected.tag_name,
        publishedAt: selected.published_at,
        releaseURL: selected.html_url,
        zipURL: zip.browser_download_url,
        zipDigest: zip.digest,
        manifestURL: asset("system.json").browser_download_url,
    };
}

/** Match the ZIP to its manifest, preserve existing translation filenames, and include new compendiums. */
export function preparePF2ePacks(entries, manifest, config) {
    if (manifest.id !== "pf2e" || !Array.isArray(manifest.packs) || !manifest.packs.length) {
        throw new Error("Expected a pf2e manifest containing compendium packs");
    }
    const groups = structuredClone(config.packs);
    const configured = new Map(Object.entries(groups).flatMap(([group, data]) => data.packNames.map(name => [name, group])));
    const files = new Map(entries.map(e => [`${e.path}${e.fileName}.${e.fileType}`, e]));
    const packs = entries.filter(e => !e.path.startsWith("packs/"));
    const seen = new Set();
    const mappings = { Actor: "actor", Item: "item", Macro: "item", JournalEntry: "journal", RollTable: "rollableTable" };

    for (const pack of manifest.packs) {
        const sourcePath = `${pack.path}.json`;
        const source = files.get(sourcePath);
        if (!source) throw new Error(`PF2e ZIP is missing manifest pack ${sourcePath}`);
        if (!Array.isArray(JSON.parse(source.content))) throw new Error(`${sourcePath} is not a document array`);

        // The manifest's IDs retain ancestryfeatures/classfeatures even when their file paths change.
        const fileName = configured.has(pack.name) ? pack.name : configured.has(source.fileName) ? source.fileName : pack.name;
        if (seen.has(fileName)) throw new Error(`Duplicate PF2e source filename ${fileName}`);
        seen.add(fileName);
        packs.push({ ...source, fileName });
        const folders = files.get(`${pack.path}_folders.json`);
        if (folders) packs.push({ ...folders, fileName: `${fileName}_folders` });

        if (!configured.has(fileName)) {
            const mapping = mappings[pack.type];
            if (!mapping) throw new Error(`Unsupported PF2e pack type ${pack.type} in ${pack.name}`);
            const groupName = `Additional${pack.type}Packs`;
            groups[groupName] ??= { packNames: [], mapping, savePath: "crowdin" };
            groups[groupName].packNames.push(fileName);
        }
    }

    const missing = [...configured.keys()].filter(name => !seen.has(name));
    if (missing.length) throw new Error(`Configured PF2e packs absent from the manifest: ${missing.join(", ")}`);
    return { packs, groups };
}
