export function numericTokens(text) {
    text = text.replace(/[\u2013\u2014\u2212](?=\d)/g, "-")
        .replace(/\b(\d+)(?:st|nd|rd|th)\b/gi, "$1").replace(/(\d+)\.?(?:º|ª)/g, "$1");
    return (text.match(/(?<![\w])(?:[-+]?\d+(?:[.,]\d+)?(?:d\d+(?:[-+]\d+)?)?|d\d+)(?=s\b|\W|$)/g) ?? []).sort();
}

function chunks(text) {
    const result = [];
    while (text.length > 600) {
        const prefix = text.slice(0, 600);
        const boundaries = [...prefix.matchAll(/[.!?;]\s|,\s|\s/g)];
        const sentence = boundaries.filter(m => /[.!?;]/.test(m[0]) && m.index > 80).at(-1);
        const cut = sentence ? sentence.index + sentence[0].length : (boundaries.at(-1)?.index ?? 599) + 1;
        result.push({ source: text.slice(0, cut), literal: false }); text = text.slice(cut);
    }
    if (text) result.push({ source: text, literal: false });
    return result;
}

/** Lossless tokenization: only natural-language pieces are ever passed to a translation engine. */
export function partitionText(source) {
    const result = []; let start = 0, i = 0;
    while (i < source.length) {
        let length = 0, commandPieces;
        const rest = source.slice(i);
        const code = rest.match(/^(?:<!--[\s\S]*?-->|<(script|style|code|pre)\b[^>]*>[\s\S]*?<\/\1\s*>|(`+)[\s\S]*?\2)/i);
        const glyph = rest.match(/^<span\b[^>]*class=["'][^"']*action-glyph[^"']*["'][^>]*>[^<]*<\/span>/i);
        const markup = rest.match(/^<\/?[A-Za-z][^>]*>/);
        const entity = rest.match(/^&(?:#\d+|#x[\da-f]+|\w+);/i);
        const variable = source[i - 1] !== "]" && rest.match(/^\{\{?[\w@|.:-]+\}?\}/);
        const format = rest.match(/^(?:%\d*\$?[sdif]|\$\{[^}]+\}|https?:\/\/[^\s<>"']+)/);
        if (code) length = code[0].length;
        else if (glyph) length = glyph[0].length;
        else if (markup) length = markup[0].length;
        else if (entity) length = entity[0].length;
        else if (variable) length = variable[0].length;
        else if (format) length = format[0].length;
        else if (rest.startsWith("[[")) { const end = source.indexOf("]]", i + 2); if (end >= 0) length = end + 2 - i; }
        else if (/^@[A-Za-z]\w*\[/.test(rest)) {
            let end = i + rest.match(/^@[A-Za-z]\w*\[/)[0].length, depth = 1;
            while (end < source.length && depth) { if (source[end] === "[") depth++; if (source[end] === "]") depth--; end++; }
            if (depth) throw new Error(`Unbalanced Foundry command: ${rest.slice(0, 120)}`);
            if (!depth) {
                length = end - i;
                const command = source.slice(i, end), labels = [...command.matchAll(/\|(?:name|label):([^\]|]*)/g)];
                if (labels.length) {
                    commandPieces = []; let offset = 0;
                    for (const label of labels) {
                        const start = label.index + label[0].length - label[1].length;
                        commandPieces.push({ source: command.slice(offset, start), literal: true }, ...partitionText(label[1]));
                        offset = start + label[1].length;
                    }
                    commandPieces.push({ source: command.slice(offset), literal: true });
                }
            }
        } else if (rest[0] === "}" || rest[0] === "{") length = 1;
        if (length) {
            if (i > start) result.push(...chunks(source.slice(start, i)));
            result.push(...(commandPieces ?? [{ source: source.slice(i, i + length), literal: true }]));
            i += length; start = i;
        } else i++;
    }
    if (start < source.length) result.push(...chunks(source.slice(start)));
    return result;
}

const english = /\b(?:the|your|you|with|are|this|and|for|that|while|must|can|when|whenever|until|creature|target|damage|checks|saving|throw|spell|spells|bonus|penalty|rounds|minutes|hours|feet|takes|gains|becomes|within|against|each|their|they|does|using|choose|chosen|level|levels|attack|attacks|resistance|enemies|enemy)\b/gi;
const spanish = /\b(?:el|la|los|las|de|del|tu|tus|con|una|un|que|puedes|daño|criatura|objetivo|para|y|por|es|al|su|hasta|minutos|horas|pies|asalto|prueba|conjuro|bonificador|penalizador|ataque|nivel|contra|cada|obtiene|puede|debe|sus|cuando|cualquier)\b/gi;
export function looksEnglish(text) {
    const en = (text.match(english) ?? []).length, es = (text.match(spanish) ?? []).length;
    return (en >= 3 && en > es * 1.5) || /\b(?:on a|at the|until the|must succeed|the creature|you gain|you can|saving throws?|spell slots?|a creature|your next|the target|hit points)\b/i.test(text);
}

export function isLiteralText(text) {
    const stripped = partitionText(text).filter(p => !p.literal).map(p => p.source).join("").trim();
    return !/[A-Za-zÀ-ž]/.test(stripped) || /^[\d\s+\-*/().,dD]+$/.test(stripped) || /^(?:PF2E\.[\w.]+|Compendium\.[\w.-]+|(?=[A-Za-z0-9]*\d)[A-Za-z0-9]{16})$/.test(stripped);
}

export function protectedTokens(text) {
    return partitionText(text).filter(part => part.literal).map(part => part.source);
}

export function validateNaturalTranslation(source, target) {
    if (typeof target !== 'string' || !target.trim() || /ZXQ|QXZ|\[\s*\d+\s*\]/.test(target)) return false;
    for (const token of ['|', '{', '}', '[', ']']) if (target.split(token).length > source.split(token).length) return false;
    if (JSON.stringify(numericTokens(source)) !== JSON.stringify(numericTokens(target))) return false;
    try { if (partitionText(target).some(p => p.literal && /[A-Za-z]/.test(p.source))) return false; }
    catch { return false; }
    if (looksEnglish(target)) return false;
    if (source.length > 100 && (target.length < source.length * .45 || target.length > source.length * 3)) return false;
    return true;
}
