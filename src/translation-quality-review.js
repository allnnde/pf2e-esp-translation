/** Publication titles remain attributable to the exact English source citation. */
export function isSourceCitation(segment, source) {
    const match = segment.match(/^\s*Fuente:(.+)$/s);
    return Boolean(match && source.includes(`Source:${match[1]}`));
}

/** Editorial approval is valid only for the exact source and translation read. */
export function applyQualityReview(record, review, sourceHash, translationHash) {
    if (!review || review.sourceHash !== sourceHash || review.translationHash !== translationHash) return record;
    const complete = review.scope === "source-compared-field";
    return {
        ...record,
        reviewStatus: complete ? "editorially-reviewed" : "pending-editorial-review",
        method: complete ? "manual-source-comparison" : "localized-language-correction",
        qualityReviewScope: review.scope,
        protectedContentHash: review.protectedContentHash,
        numericContentHash: review.numericContentHash,
        reasons: complete ? undefined : ["local-correction-does-not-certify-whole-field"]
    };
}
