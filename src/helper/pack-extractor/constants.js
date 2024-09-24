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
        privateNotes: { path: "system.details.privateNotes" },
        reset: { path: "system.details.reset" },
        routine: { path: "system.details.routine" },
        saveDetails: { path: "system.attributes.allSaves.value" },
        senses: { path: "system.perception.details" },
        skillSpecialAcrobatics: {
            path: "system.skills.acrobatics.special",
            converter: "translateSkillSpecial",
            extractOptions: { subMapping: "label" },
        },
        skillSpecialArcana: {
            path: "system.skills.arcana.special",
            converter: "translateSkillSpecial",
            extractOptions: { subMapping: "label" },
        },
        skillSpecialAthletics: {
            path: "system.skills.athletics.special",
            converter: "translateSkillSpecial",
            extractOptions: { subMapping: "label" },
        },
        skillSpecialCrafting: {
            path: "system.skills.crafting.special",
            converter: "translateSkillSpecial",
            extractOptions: { subMapping: "label" },
        },
        skillSpecialDeception: {
            path: "system.skills.deception.special",
            converter: "translateSkillSpecial",
            extractOptions: { subMapping: "label" },
        },
        skillSpecialDiplomacy: {
            path: "system.skills.diplomacy.special",
            converter: "translateSkillSpecial",
            extractOptions: { subMapping: "label" },
        },
        skillSpecialIntimidation: {
            path: "system.skills.intimidation.special",
            converter: "translateSkillSpecial",
            extractOptions: { subMapping: "label" },
        },
        skillSpecialMedicine: {
            path: "system.skills.medicine.special",
            converter: "translateSkillSpecial",
            extractOptions: { subMapping: "label" },
        },
        skillSpecialNature: {
            path: "system.skills.nature.special",
            converter: "translateSkillSpecial",
            extractOptions: { subMapping: "label" },
        },
        skillSpecialOccultism: {
            path: "system.skills.occultism.special",
            converter: "translateSkillSpecial",
            extractOptions: { subMapping: "label" },
        },
        skillSpecialPerformance: {
            path: "system.skills.performance.special",
            converter: "translateSkillSpecial",
            extractOptions: { subMapping: "label" },
        },
        skillSpecialReligion: {
            path: "system.skills.religion.special",
            converter: "translateSkillSpecial",
            extractOptions: { subMapping: "label" },
        },
        skillSpecialSociety: {
            path: "system.skills.society.special",
            converter: "translateSkillSpecial",
            extractOptions: { subMapping: "label" },
        },
        skillSpecialStealth: {
            path: "system.skills.stealth.special",
            converter: "translateSkillSpecial",
            extractOptions: { subMapping: "label" },
        },
        skillSpecialSurvival: {
            path: "system.skills.survival.special",
            converter: "translateSkillSpecial",
            extractOptions: { subMapping: "label" },
        },
        skillSpecialThievery: {
            path: "system.skills.thievery.special",
            converter: "translateSkillSpecial",
            extractOptions: { subMapping: "label" },
        },
        source: {
            path: "system.details.publication.title",
            converter: "translateSource",
            extractOptions: { addToDictionary: true, extractValue: false },
        },
        sourceId: {
            path: "flags.core.sourceId",
            extractOptions: { specialExtraction: "sourceId", extractOnAdventureActor: true },
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
            converter: "translateAdventureScenes",
            extractOptions: {
                subMapping: "adventureScene",
                specialExtraction: "adventureScenes",
            },
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
    adventureScene: {
        name: { path: "name" },
        background: { path: "background.src" },
        drawings: {
            path: "drawings",
            extractOptions: { subMapping: "text", specialExtraction: "textCollection" },
        },
        notes: {
            path: "notes",
            extractOptions: { subMapping: "text", specialExtraction: "textCollection" },
        },
        regions: {
            path: "regions",
            extractOptions: { subMapping: { name: { path: "name" } }, specialExtraction: "nameCollection" },
        },
        tiles: {
            path: "tiles",
            extractOptions: { subMapping: "tile" },
        },
        tokens: {
            path: "tokens",
            extractOptions: { subMapping: "token", specialExtraction: "tokens" },
        },
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
        consumableSpellName: { path: "system.spell.name" },
        consumableSpellDescription: { path: "system.spell.system.description.value" },
        consumableSpellDuration: {
            path: "system.spell.system.duration.value",
            converter: "translateDuration",
            extractOptions: { extractValue: false },
        },
        consumableSpellRange: {
            path: "system.spell.system.range.value",
            converter: "translateRange",
            extractOptions: { extractValue: false },
        },
        consumableSpellRequirements: {
            path: "system.spell.system.requirements",
            extractOptions: { onlyValues: true },
        },
        consumableSpellTarget: { path: "system.spell.system.target.value" },
        consumableSpellTime: {
            path: "system.spell.system.time.value",
            converter: "translateTime",
            extractOptions: { extractValue: false },
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
        requirements: { path: "system.requirements", extractOptions: { onlyValues: true } },
        rules: {
            path: "system.rules",
            converter: "translateRules",
            extractOptions: { subMapping: "rule" },
        },
        secondarycaster: { path: "system.ritual.secondary.casters" },
        secondarycheck: { path: "system.ritual.secondary.checks" },
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
        trainedLore: {
            path: "system.trainedSkills.lore",
            extractOptions: { extractOnActorItem: false, convertArray: false },
        },
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
        value: { path: "value", extractOptions: { addToMapping: false, subMapping: "text" } },
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
        requirements: { path: "system.requirements", extractOptions: { onlyValues: true } },
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
    token: {
        name: { path: "name" },
        items: {
            path: "delta.items",
            converter: "translateActorItems",
            extractOptions: { subMapping: "item", specialExtraction: "actorItems" },
        },
    },
};

export const ACTOR_REDIRECTS = [
    {
        name: "Aapoph Serpentfolk",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.fv91xoQJlogVbruW",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.X3QcYLr2rBcIsJrC",
    },
    {
        name: "Alchemical Golem",
        linkOld: "Compendium.pf2e.the-slithering-bestiary.Actor.idj4GBmsLUNUbk9r",
        linkNew: "Compendium.pf2e.pathfinder-bestiary.Actor.Tpuqwt6Af29EMtqX",
    },
    {
        name: "Animated Armor",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.cZDiyluplFqRxmGy",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.CFlx1tkRxKC9qAC7",
    },
    {
        name: "Animated Armor",
        linkOld: "Compendium.pf2e.menace-under-otari-bestiary.Actor.cZDiyluplFqRxmGy",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.CFlx1tkRxKC9qAC7",
    },
    {
        name: "Animated Statue",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.PiAGhPEzJMC2egQk",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.yQ2mosomuAPiLMkU",
    },
    {
        name: "Aolaz",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.WMiPblOVq5w2Fa1x",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.KdW5UeZSqeTZZlo5",
    },
    {
        name: "Arboreal Regent",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.c6AE2Mh8BRtBgbtz",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.z2l8K7woKYPkm0qz",
    },
    {
        name: "Arboreal Warden",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.aNWiP985fISjClGo",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.0rm0UDbXvwg4sSxQ",
    },
    {
        name: "Army Ant Swarm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.8a9N2iPA5HLpkWaF",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.drcSWbCIWc7P4lKO",
    },
    {
        name: "Awakened Tree",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.oBMIc2S8ekmDgPpi",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.0Dsy2I3mu86Czjm0",
    },
    {
        name: "Axiomite",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.9qjXP1Lho1UmAihJ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.7v1gykqjBO1YHDfu",
    },
    {
        name: "Azarketi Crab Catcher",
        linkOld: "Compendium.pf2e.npc-gallery.Actor.KvcFqH6H4TFCuBZA",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.ZXiFjrQbhvboEZTL",
    },
    {
        name: "Azarketi Tide Tamer",
        linkOld: "Compendium.pf2e.npc-gallery.Actor.sZ9RwN8zIzpztW3N",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.jTszZSs0K6vOqidM",
    },
    {
        name: "Boar",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.4MwjCsa5O9aAjxSm",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.IyhbcdTVmkV4pSju",
    },
    {
        name: "Boar",
        linkOld: "Compendium.pf2e.menace-under-otari-bestiary.Actor.4MwjCsa5O9aAjxSm",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.IyhbcdTVmkV4pSju",
    },
    {
        name: "Dybbuk",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-3.Actor.QUzBzxRy6HLeK7ja",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.IrssIkWkW6fsbHJL",
    },
];