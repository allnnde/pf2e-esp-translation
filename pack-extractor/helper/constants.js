export const PF2_DEFAULT_MAPPING = {
    actor: {
        name: {
            path: "name",
            converter: "translateDualLanguage",
            extractOptions: { extractOnAdventureActor: true },
        },
        acDetails: { path: "system.attributes.ac.details", extractOptions: { extractOnAdventureActor: true } },
        appearance: {
            path: "system.details.biography.appearance",
            converter: "translateActorDescription",
        },
        blurb: { path: "system.details.blurb", extractOptions: { extractOnAdventureActor: true } },
        crew: { path: "system.details.crew" },
        description: {
            path: "system.details.description",
            converter: "translateActorDescription",
        },
        disable: { path: "system.details.disable" },
        ethnicity: { path: "system.details.ethnicity.value" },
        familiarType: { path: "system.details.creature.value" },
        gender: { path: "system.details.gender.value" },
        hpDetails: { path: "system.attributes.hp.details" },
        languages: { path: "system.details.languages.details" },
        pilotingCheck: { path: "system.details.pilotingCheck" },
        portrait: {
            path: "img",
            converter: "updateActorImage",
            extractOptions: { extractValue: false },
        },
        publicNotes: {
            path: "system.details.publicNotes",
            converter: "translateActorDescription",
        },
        reset: { path: "system.details.reset" },
        routine: { path: "system.details.routine" },
        saveDetails: { path: "system.attributes.allSaves.value" },
        senses: { path: "system.perception.details" },
        source: {
            path: "system.details.publication.title",
            converter: "translateSource",
            extractOptions: { addToDictionary: true, extractValue: false },
        },
        speed: { path: "system.details.speed" },
        speed2: {
            path: "system.attributes.speed.details",
            extractOptions: { alternateMappingKey: "speed" },
        },
        stealth: { path: "system.attributes.stealth.details" },
        tokenImage: {
            path: "prototypeToken.texture.src",
            converter: "updateTokenImage",
            extractOptions: { alwaysAddMapping: true, extractValue: false },
        },
        tokenName: {
            path: "prototypeToken.name",
            converter: "translateTokenName",
            extractOptions: { alwaysAddMapping: true, extractOnAdventureActor: true },
        },
        items: {
            path: "items",
            converter: "translateActorItems",
            adventureConverter: "translateAdventureActorItems",
            extractOptions: { subMapping: "item", specialExtraction: "actorItems" },
        },
    },
    adventure: {
        name: { path: "name" },
        caption: { path: "caption" },
        description: { path: "description" },
        actors: {
            path: "actors",
            converter: "translateAdventureActors",
            extractOptions: { subMapping: "actor", specialExtraction: "adventureActors", subMappingAsMapping: true },
        },
        items: {
            path: "items",
            converter: "translateAdventureItems",
            extractOptions: { subMapping: "item", specialExtraction: "nameAsKey" },
        },
        journal: {
            path: "journal",
            converter: "translateAdventureJournals",
            extractOptions: { subMapping: "adventureJournal", specialExtraction: "nameAsKey" },
        },
        tables: {
            path: "tables",
            converter: "tableResultsCollection",
            extractOptions: { subMapping: "rollableTable", specialExtraction: "nameAsKey" },
        },
        macros: {
            path: "macros",
            converter: "adventureMacros",
            extractOptions: {
                subMapping: { name: { path: "name" }, command: { path: "command" } },
                specialExtraction: "nameAsKey",
            },
        },
        playlists: {
            path: "playlists",
            converter: "adventurePlaylists",
            extractOptions: { subMapping: "playlist", specialExtraction: "nameAsKey" },
        },
        scenes: {
            path: "scenes",
            converter: "adventureScenes",
            extractOptions: { subMapping: "scene", specialExtraction: "nameAsKey", subMappingAsMapping: true },
        },
        folders: {
            path: "folders",
            converter: "nameCollection",
            extractOptions: { subMapping: { name: { path: "name" } }, specialExtraction: "nameCollection" },
        },
    },
    adventureJournal: {
        name: { path: "name" },
        pages: {
            path: "pages",
            converter: "pages",
            extractOptions: {
                subMapping: "adventureJournalPages",
                specialExtraction: "adventureJournalPages",
            },
        },
    },
    adventureJournalPages: {
        name: { path: "name", extractOptions: { addToMapping: false } },
        id: { path: "_id", extractOptions: { addToMapping: false } },
        caption: { path: "image.caption", extractOptions: { addToMapping: false } },
    },
    heightening: {
        duration: {
            path: "duration.value",
            converter: "translateDuration",
            extractOptions: { addToDictionary: true, addToMapping: false, extractValue: false },
        },
        range: {
            path: "range.value",
            converter: "translateRange",
            extractOptions: { addToDictionary: true, addToMapping: false, extractValue: false },
        },
        target: { path: "target.value", extractOptions: { addToMapping: false } },
        time: {
            path: "time.value",
            converter: "translateTime",
            extractOptions: { addToDictionary: true, addToMapping: false, extractValue: false },
        },
    },
    item: {
        name: {
            path: "name",
            converter: "translateDualLanguage",
        },
        badges: {
            path: "system.badge.labels",
            extractOptions: { extractOnActorItem: false, convertArray: false },
        },
        cost: { path: "system.cost.value" },
        description: { path: "system.description.value" },
        duration: {
            path: "system.duration.value",
            converter: "translateDuration",
            extractOptions: { addToDictionary: true, extractValue: false },
        },
        gmNote: { path: "system.description.gm" },
        heightening: {
            path: "system.heightening.levels",
            converter: "translateHeightening",
            extractOptions: { extractOnActorItem: false, subMapping: "heightening" },
        },
        materials: { path: "system.materials.value" },
        prerequisites: {
            path: "system.prerequisites.value",
            extractOptions: { extractOnActorItem: false, convertArray: false },
        },
        primarycheck: { path: "system.ritual.primary.check" },
        range: {
            path: "system.range.value",
            converter: "translateRange",
            extractOptions: { addToDictionary: true, extractValue: false },
        },
        rules: {
            path: "system.rules",
            converter: "translateRules",
            extractOptions: { subMapping: "rule" },
        },
        secondarycaster: { path: "system.ritual.secondary.casters" },
        secondarycheck: { path: "system.ritual.secondary.checks" },
        skillVariants: {
            path: "system.variants",
            extractOptions: { subMapping: "label" },
        },
        source: {
            path: "system.publication.title",
            converter: "translateSource",
            extractOptions: { addToDictionary: true, extractValue: false },
        },
        spellVariants: {
            path: "system.overlays",
            converter: "translateSpellVariant",
            extractOptions: { extractOnActorItem: false, subMapping: "spellVariant" },
        },
        target: { path: "system.target.value" },
        time: {
            path: "system.time.value",
            converter: "translateTime",
            extractOptions: { addToDictionary: true, extractValue: false },
        },
        trainedLore: { path: "system.trainedLore", extractOptions: { extractOnActorItem: false } },
    },
    journal: {
        name: { path: "name" },
        pages: {
            path: "pages",
            converter: "pages",
            extractOptions: {
                subMapping: "journalPages",
                specialExtraction: "nameAsKey",
            },
        },
    },
    journalPages: {
        name: { path: "name", extractOptions: { addToMapping: false } },
        text: { path: "text.content", extractOptions: { addToMapping: false } },
    },
    label: {
        label: { path: "label", extractOptions: { addToMapping: false } },
    },
    playlist: {
        name: { path: "name" },
        description: { path: "description" },
        sounds: {
            path: "sounds",
            converter: "playlistSounds",
            extractOptions: {
                subMapping: "sounds",
                specialExtraction: "nameAsKey",
            },
        },
    },
    rollableTable: {
        name: { path: "name" },
        description: { path: "description" },
        results: {
            path: "results",
            converter: "tableResults",
            extractOptions: {
                subMapping: "tableResults",
                specialExtraction: "tableResults",
            },
        },
    },
    rule: {
        choices: {
            path: "choices",
            extractOptions: { addToMapping: false, subMapping: "label" },
        },
        label: { path: "label", extractOptions: { addToMapping: false } },
        prompt: { path: "prompt", extractOptions: { addToMapping: false } },
        text: { path: "text", extractOptions: { addToMapping: false } },
    },
    scene: {
        name: { path: "name" },
        background: { path: "background.src", extractOptions: { addToMapping: false } },
        drawings: {
            path: "drawings",
            converter: "textCollection",
            extractOptions: { subMapping: "text", specialExtraction: "textCollection" },
        },
        notes: {
            path: "notes",
            converter: "textCollection",
            extractOptions: { subMapping: "text", specialExtraction: "textCollection" },
        },
        tiles: {
            path: "tiles",
            converter: "translateTiles",
            extractOptions: { subMapping: "tile" },
        },
    },
    spellVariant: {
        name: {
            path: "name",
            converter: "translateDualLanguage",
        },
        cost: { path: "system.cost.value" },
        description: { path: "system.description.value" },
        duration: {
            path: "system.duration.value",
            converter: "translateDuration",
            extractOptions: { addToDictionary: true, extractValue: false },
        },
        heightening: {
            path: "system.heightening.levels",
            converter: "translateHeightening",
            extractOptions: { extractOnActorItem: false, subMapping: "heightening" },
        },
        materials: { path: "system.materials.value" },
        primarycheck: { path: "system.primarycheck.value" },
        range: {
            path: "system.range.value",
            converter: "translateRange",
            extractOptions: { addToDictionary: true, extractValue: false },
        },
        secondarycaster: { path: "system.secondarycasters.value" },
        secondarycheck: { path: "system.secondarycheck.value" },
        target: { path: "system.target.value" },
        time: {
            path: "system.time.value",
            converter: "translateTime",
            extractOptions: { addToDictionary: true, extractValue: false },
        },
    },
    sounds: {
        name: { path: "name" },
        description: { path: "description", extractOptions: { addToMapping: false } },
    },
    tableResults: {
        text: { path: "text", extractOptions: { addToMapping: false } },
    },
    text: {
        text: { path: "text", extractOptions: { addToMapping: false } },
    },
    tile: {
        texture: { path: "texture.src", extractOptions: { addToMapping: false } },
    },
};
