import assert from "node:assert/strict";
import test from "node:test";
import { partitionText, numericTokens, protectedTokens, validateNaturalTranslation, isLiteralText } from "../src/translation-text.js";

test("inheritance sentinels are technical while compendium extensions remain translatable", () => {
    assert.equal(isLiteralText("<Compendium> tag will get replaced with text from compendium entry @UUID[Compendium.pf2e.test.Item.example]"), true);
    assert.equal(isLiteralText("<Compendium> Additional natural language"), false);
});

test("translation partitions preserve HTML, nested Foundry commands, rolls and variables exactly", () => {
    const source = '<p>You take @Damage[2d6[fire]] damage. Use @UUID[Compendium.pf2e.actions.Item.abc123]{Treat Wounds} with {actor|name}. <span class="action-glyph">R</span> [[/r 1d20+5]] &amp;</p>';
    const parts = partitionText(source);
    assert.equal(parts.map(p => p.source).join(""), source);
    for (const token of ['<p>', '@Damage[2d6[fire]]', '@UUID[Compendium.pf2e.actions.Item.abc123]', '{actor|name}', '<span class="action-glyph">R</span>', '[[/r 1d20+5]]', '&amp;']) {
        assert.ok(parts.some(p => p.literal && p.source === token), token);
    }
    assert.ok(parts.some(p => !p.literal && p.source === "Treat Wounds"));
});

test("long descriptions are partitioned without dropping any text", () => {
    const source = '<p>' + 'The creature makes a Strike. '.repeat(100) + '</p>';
    const parts = partitionText(source);
    assert.equal(parts.map(p => p.source).join(""), source);
    assert.ok(parts.filter(p => !p.literal).every(p => p.source.length <= 650));
});

test("display labels inside checks are translated while mechanical arguments remain protected", () => {
    const source = '@Check[reflex|dc:25|name:Flaming Breath|traits:fire]';
    const parts = partitionText(source);
    assert.equal(parts.map(p => p.source).join(""), source);
    assert.ok(parts.some(p => !p.literal && p.source === 'Flaming Breath'));
    assert.ok(parts.some(p => p.literal && p.source.includes('reflex|dc:25|name:')));
});

test("numeric validation includes dice, signed modifiers, decimal values and DCs", () => {
    assert.deepEqual(numericTokens('DC 25; 2d6+4 damage, -2 penalty, 1.5 miles'), numericTokens('CD 25; 2d6+4 daño, -2 de penalizador, 1.5 millas'));
    assert.notDeepEqual(numericTokens('DC 25'), numericTokens('CD 20'));
    assert.notDeepEqual(numericTokens('Roll a d20.'), numericTokens('Tira un d12.'));
    assert.deepEqual(numericTokens('Roll d10s instead of d8s.'), numericTokens('Tira d10 en lugar de d8.'));
});

test("unbalanced commands cannot be silently translated as prose", () => {
    assert.throws(() => partitionText('@Check[thievery|dc:28 (expert) to disable it'), /unbalanced/i);
});

test("engine output cannot introduce markup, variables or unresolved markers", () => {
    assert.ok(validateNaturalTranslation('The creature takes 5 fire damage.', 'La criatura sufre 5 de daño de fuego.'));
    assert.equal(validateNaturalTranslation('The creature takes 5 fire damage.', 'La criatura sufre 5 de daño ZXQ.'), false);
    assert.equal(validateNaturalTranslation('The creature takes 5 fire damage.', '<b>La criatura sufre 5 de daño.</b>'), false);
    assert.equal(validateNaturalTranslation('The creature takes 5 fire damage.', 'La criatura sufre {secret} y 5 de daño.'), false);
    assert.equal(validateNaturalTranslation('The creature takes 5 fire damage.', 'La criatura sufre @Damage[5'), false);
    assert.equal(validateNaturalTranslation('on a critical failure', 'on a fallo crítico'), false);
    assert.equal(validateNaturalTranslation('Breath', 'Aliento|traits:death'), false);
    assert.equal(validateNaturalTranslation('Breath', 'Aliento }'), false);
});

test("reassembled fields retain mechanical arguments while allowing translated display labels", () => {
    const source = '@Check[reflex|dc:25|name:Breath] and @UUID[Compendium.pf2e.actions.Item.abc]{Strike}';
    assert.deepEqual(protectedTokens(source), protectedTokens('@Check[reflex|dc:25|name:Aliento] y @UUID[Compendium.pf2e.actions.Item.abc]{Golpe}'));
    assert.notDeepEqual(protectedTokens(source), protectedTokens('@Check[reflex|dc:20|name:Aliento] y @UUID[Compendium.pf2e.actions.Item.abc]{Golpe}'));
    assert.notDeepEqual(protectedTokens(source), protectedTokens('@Check[reflex|dc:25|name:Aliento|traits:death] y @UUID[Compendium.pf2e.actions.Item.abc]{Golpe}'));
});

test("code, comments and scripts remain literal while nearby prose can be translated", () => {
    const source = '<!-- Keep this comment --><script>const value = "hello";</script><style>.red {color:red}</style><code>actor.system.details.level</code> Use `game.actors` here.';
    const parts = partitionText(source);
    assert.equal(parts.map(p => p.source).join(''), source);
    for (const token of ['<!-- Keep this comment -->', '<script>const value = "hello";</script>', '<style>.red {color:red}</style>', '<code>actor.system.details.level</code>', '`game.actors`']) {
        assert.ok(parts.some(p => p.literal && p.source === token), token);
    }
    assert.ok(parts.some(p => !p.literal && p.source.includes('Use')));
});
