import test from "node:test";
import assert from "node:assert/strict";
import { applyQualityReview, isSourceCitation } from "../src/translation-quality-review.js";

test("English publication titles require a matching source citation", () => {
    const source = "<em>Source: Pathfinder #157: Devil at the Dreaming Palace</em>";
    assert.equal(isSourceCitation("Fuente: Pathfinder #157: Devil at the Dreaming Palace", source), true);
    assert.equal(isSourceCitation("The target is frightened", source), false);
    assert.equal(isSourceCitation("Fuente: The target is frightened", source), false);
});

test("editorial approval expires when either text changes", () => {
    const record = { reviewStatus: "pending-editorial-review" };
    const review = { sourceHash: "source", translationHash: "spanish", scope: "source-compared-field" };
    assert.equal(applyQualityReview(record, review, "new-source", "spanish"), record);
    assert.equal(applyQualityReview(record, review, "source", "new-spanish"), record);
    assert.equal(applyQualityReview(record, review, "source", "spanish").reviewStatus, "editorially-reviewed");
});

test("correcting a term or agreement never certifies the whole description", () => {
    const record = { reviewStatus: "inherited-translation" };
    const review = { sourceHash: "source", translationHash: "spanish", scope: "localized-language-correction" };
    const result = applyQualityReview(record, review, "source", "spanish");
    assert.equal(result.reviewStatus, "pending-editorial-review");
    assert.deepEqual(result.reasons, ["local-correction-does-not-certify-whole-field"]);
});
