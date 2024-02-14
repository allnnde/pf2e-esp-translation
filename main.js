class Translator {
  static get() {
    if (!Translator.instance) {
      Translator.instance = new Translator();
    }
    return Translator.instance;
  }

  // Initialize translator
  async initialize() {
    // Signalize translator is ready
    Hooks.callAll("pf2ES.ready");
  }

  constructor() {
    this.initialize();
  }
}
Hooks.once("init", () => {
  game.langEsPf2e = Translator.get();

  game.settings.register("pf2e-es", "dual-language-names", {
    name: "Nombres en Español e inglés",
    hint: "Además del nombre aleman, también se utiliza el inglés.",
    scope: "world",
    type: Boolean,
    default: false,
    config: true,
    onChange: foundry.utils.debounce(() => {
      window.location.reload();
    }, 100),
  });

  Babele.get().register({
    module: "pf2e-es",
    lang: "es",
    dir: "translation/es/compendium",
  });
  /*
        Babele.get().registerConverters({
            normalizeName: (_data, translation) => {
                return game.langEsPf2e.normalizeName(translation);
            },
            translateAdventureActorItems: (data, translation) => {
                return game.langEsPf2e.translateActorItems(data, translation, false);
            },
            translateActorDescription: (data, translation) => {
                return game.langEsPf2e.translateActorDescription(data, translation);
            },
            translateActorItems: (data, translation) => {
                return game.langEsPf2e.translateActorItems(data, translation);
            },
            translateAdventureJournals: (data, translation) => {
                return game.langEsPf2e.translateAdventureJournals(data, translation);
            },
            translateAdventureJournalPages: (data, translation) => {
                return game.langEsPf2e.translateAdventureJournalPages(data, translation);
            },
            translateDualLanguage: (data, translation) => {
                return game.langEsPf2e.translateDualLanguage(data, translation);
            },
            translateDuration: (data) => {
                return game.langEsPf2e.translateValue("duration", data);
            },
            translateHeightening: (data, translation) => {
                return game.langEsPf2e.dynamicObjectListMerge(
                    data,
                    translation,
                    game.langEsPf2e.getMapping("heightening", true)
                );
            },
            translateRange: (data) => {
                return game.langEsPf2e.translateValue("range", data);
            },
            translateRules: (data, translation) => {
                return game.langEsPf2e.translateRules(data, translation);
            },
            translateSource: (data) => {
                return game.langEsPf2e.translateValue("source", data);
            },
            translateSpellVariant: (data, translation) => {
                return game.langEsPf2e.dynamicObjectListMerge(
                    data,
                    translation,
                    game.langEsPf2e.getMapping("item", true)
                );
            },
            translateTiles: (data, translation) => {
                return game.langEsPf2e.dynamicArrayMerge(data, translation, game.langEsPf2e.getMapping("tile", true));
            },
            translateTime: (data) => {
                return game.langEsPf2e.translateValue("time", data);
            },
            translateTokenName: (data, translation, _dataObject, _translatedCompendium, translationObject) => {
                return game.langEsPf2e.translateTokenName(data, translation, translationObject);
            },
            updateActorImage: (data, _translations, dataObject, translatedCompendium) => {
                return game.langEsPf2e.updateImage("portrait", data, dataObject, translatedCompendium);
            },
            updateTokenImage: (data, _translations, dataObject, translatedCompendium) => {
                return game.langEsPf2e.updateImage("token", data, dataObject, translatedCompendium);
            },
        });
        */
});

Hooks.once("babele.ready", () => {
  game.pf2e.ConditionManager.initialize();
});
