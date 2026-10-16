import path from "node:path";

const pointer = keys => "/" + keys.map(k => String(k).replaceAll("~", "~0").replaceAll("/", "~1")).join("/");
const kind = value => value === null ? "null" : Array.isArray(value) ? "array" : typeof value;

function glob(pattern) {
    let regex = "";
    for (let i = 0; i < pattern.length; i++) {
        const c = pattern[i];
        if (c === "*" && pattern[i + 1] === "*") { regex += ".*"; i++; }
        else if (c === "*") regex += "[^/]*";
        else if (c === "?") regex += "[^/]";
        else regex += c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    return new RegExp(`^${regex}$`);
}

/** Resolve the actual Crowdin rules; never guess a translated filename from a physical PF2e pack path. */
export function expandCrowdinFiles(config, files, language = "es") {
    const pairs = [], targets = new Set(), sources = new Set();
    for (const rule of config.files) {
        const matches = files.filter(file => glob(rule.source.replace(/^\//, "")).test(file));
        for (const en of matches) {
            if ((rule.ignore ?? []).some(pattern => glob(pattern).test(en) || glob(pattern).test(path.posix.basename(en)))) continue;
            const es = rule.translation.replace(/^\//, "")
                .replaceAll("%two_letters_code%", language)
                .replaceAll("%file_name%", path.posix.basename(en, path.posix.extname(en)))
                .replaceAll("%original_file_name%", path.posix.basename(en));
            if (es.includes("%")) throw new Error(`Unsupported Crowdin placeholder: ${es}`);
            if (targets.has(es) || sources.has(en)) throw new Error(`Duplicate source or same target in Crowdin: ${en} -> ${es}`);
            targets.add(es); sources.add(en); pairs.push({ en, es });
        }
    }
    return pairs.sort((a, b) => a.en.localeCompare(b.en));
}

export function isTechnicalPath(keys) {
    return keys[0] === "mapping" || ["id", "_id", "img", "portrait", "token"].includes(keys.at(-1));
}

/** Build exactly the source structure. Missing prose stays English until the separate translation phase. */
export function alignJson(source, target, keys = [], recover = () => undefined) {
    if (isTechnicalPath(keys) && (keys[0] === "mapping" || typeof source !== "object" || source === null)) return structuredClone(source);
    if (Array.isArray(source)) return source.map((value, index) => alignJson(value, target?.[index], [...keys, String(index)], recover));
    if (source && typeof source === "object") {
        return Object.fromEntries(Object.entries(source).map(([key, value]) => [key, alignJson(value, target?.[key], [...keys, key], recover)]));
    }
    if (typeof source === "string") {
        if (typeof target === "string" && (target.trim() || !source.trim()) && target !== source) return target;
        return recover(source, keys) ?? (typeof target === "string" && target.trim() ? target : source);
    }
    return source;
}

export function compareStructure(source, target, keys = [], differences = []) {
    if (kind(source) !== kind(target)) { differences.push(`${pointer(keys)}: ${kind(source)} != ${kind(target)}`); return differences; }
    if (source && typeof source === "object") {
        for (const key of Object.keys(source)) {
            if (!Object.hasOwn(target, key)) differences.push(`${pointer([...keys, key])}: missing`);
            else compareStructure(source[key], target[key], [...keys, key], differences);
        }
        for (const key of Object.keys(target)) if (!Object.hasOwn(source, key)) differences.push(`${pointer([...keys, key])}: extra`);
    }
    return differences;
}

export function stringLeaves(object, keys = [], out = []) {
    if (typeof object === "string") out.push({ keys, pointer: pointer(keys), value: object });
    else if (object && typeof object === "object") for (const [key, value] of Object.entries(object)) stringLeaves(value, [...keys, key], out);
    return out;
}

export function valueAt(object, keys) { return keys.reduce((value, key) => value?.[key], object); }

export function buildTranslationMemory(rows) {
    const global = new Map(), contextual = new Map();
    for (const row of rows) {
        const key = `${row.role}\0${row.source}`;
        for (const [map, id] of [[global, row.source], [contextual, key]]) {
            const set = map.get(id) ?? new Set(); set.add(row.target); map.set(id, set);
        }
    }
    const unique = set => set?.size === 1 ? [...set][0] : undefined;
    return { get: (source, role) => unique(contextual.get(`${role}\0${source}`)) ?? unique(global.get(source)), isAmbiguous: source => (global.get(source)?.size ?? 0) > 1 };
}
