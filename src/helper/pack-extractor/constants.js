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
            extractOptions: { subMapping: "actor", specialExtraction: "adventureActors" },
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
        unidentifiedName: { path: "system.identification.unidentified.name" },
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
        name: "Excorion",
        linkOld: "Compendium.pf2e.book-of-the-dead-bestiary.Actor.KhHVStbsPSuPElFI",
        linkNew: "Compendium.pf2e.agents-of-edgewatch-bestiary.Actor.SgkV5RtcK72d0HwI",
    },
    {
        name: "Ghost Commoner",
        linkOld: "Compendium.pf2e.menace-under-otari-bestiary.Actor.2H2AEwQnfKJC0nrd",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.N98ug9jQHqeFoK1N",
    },
    {
        name: "Giant Ant",
        linkOld: "Compendium.pf2e.menace-under-otari-bestiary.Actor.2vyM10zN0JYdzyxt",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.mEZUTqNIgu0ASApu",
    },
    {
        name: "Boar",
        linkOld: "Compendium.pf2e.menace-under-otari-bestiary.Actor.4MwjCsa5O9aAjxSm",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.IyhbcdTVmkV4pSju",
    },
    {
        name: "Brine Shark",
        linkOld: "Compendium.pf2e.menace-under-otari-bestiary.Actor.9sa2KE4Fbh3OPH7M",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.H7z7VHzlHlEFev1r",
    },
    {
        name: "Gargoyle",
        linkOld: "Compendium.pf2e.menace-under-otari-bestiary.Actor.aeCoh4u6c5kt1iCs",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.cvfIkEF6xmWn2soN",
    },
    {
        name: "Harpy",
        linkOld: "Compendium.pf2e.menace-under-otari-bestiary.Actor.AuCC04X2AO8oFN75",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.uBNm3R9wbLTPrM9i",
    },
    {
        name: "Giant Rat",
        linkOld: "Compendium.pf2e.menace-under-otari-bestiary.Actor.AYwdybUfm4meGUTJ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.iIJPJcDT8wlJ8z5M",
    },
    {
        name: "Animated Armor",
        linkOld: "Compendium.pf2e.menace-under-otari-bestiary.Actor.cZDiyluplFqRxmGy",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.CFlx1tkRxKC9qAC7",
    },
    {
        name: "Cinder Rat",
        linkOld: "Compendium.pf2e.menace-under-otari-bestiary.Actor.hiGwRWdxAsoCII4f",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.xN5J9S485LxFZMkL",
    },
    {
        name: "Hell Hound",
        linkOld: "Compendium.pf2e.menace-under-otari-bestiary.Actor.jeAGl6OAVrrIPgu3",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.RTviEfjYnsXa0wkT",
    },
    {
        name: "Goblin Commando",
        linkOld: "Compendium.pf2e.menace-under-otari-bestiary.Actor.jGzVwekcRX5aQpbT",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.sA2dFdRUwiapo69Z",
    },
    {
        name: "Goblin Warrior",
        linkOld: "Compendium.pf2e.menace-under-otari-bestiary.Actor.jVZRROs0GzDjVrgi",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.fLLKuOXwPq1Iq0U4",
    },
    {
        name: "Viper",
        linkOld: "Compendium.pf2e.menace-under-otari-bestiary.Actor.lFlXmieuHTBIonhj",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.1uVwkGlqYzyWaDMy",
    },
    {
        name: "Basilisk",
        linkOld: "Compendium.pf2e.menace-under-otari-bestiary.Actor.rPHxXClTnoPYHYuZ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.mX47c0W9rizbmMBM",
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
        name: "Sarglagon",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.340AwQpRXGblw1kF",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.UMlGhyoHMvhVW6kv",
    },
    {
        name: "Revenant",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.3YcsuATyahEMygNy",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.bsrQp0pLgvjJr6mC",
    },
    {
        name: "Bone Prophet",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.7SVhYtnBn967Hy8O",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.SMLMW81mKN5VlcVV",
    },
    {
        name: "Army Ant Swarm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.8a9N2iPA5HLpkWaF",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.drcSWbCIWc7P4lKO",
    },
    {
        name: "Bottlenose Dolphin",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.8usfZlFqdD9cchPJ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.YZ4G7eRQ49dTVtjb",
    },
    {
        name: "Caldera Oni",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.a8Ih1RIr4UUV4QCL",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Wlupxz7dmKb6BYcr",
    },
    {
        name: "Yamaraj",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.ABrzFoOqQohQqU6C",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.00uNOPsU5VognIcB",
    },
    {
        name: "Woolly Rhinoceros",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.dBUiB3Hyh0hN8Exc",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.loYbh3SealeYmxai",
    },
    {
        name: "Giant Hippocampus",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.dwyt7e1EZPjw9KBB",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.wvP8zBmI0PDO1Uq2",
    },
    {
        name: "Scarecrow",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.EOiOqs1vHCxZAj3T",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.2p7MEk4SdXfLbzxO",
    },
    {
        name: "Nuckelavee",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.fRLrlY25qXkOMBNG",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.dY1wqHKN6PV4oJ07",
    },
    {
        name: "Aapoph Serpentfolk",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.fv91xoQJlogVbruW",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.X3QcYLr2rBcIsJrC",
    },
    {
        name: "Hadrosaurid",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.GnKay44MFMZkqXRi",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.3zqVFz4FfRYv5Sgy",
    },
    {
        name: "Twigjack",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.H8KNSMb9uo2mJF3P",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.9sGgANyNFCKnu06t",
    },
    {
        name: "Azuretzi",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.HBkk9MYLomjKDKr4",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.cRBVKMNukkRgELMs",
    },
    {
        name: "Irnakurse",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.HhSoTr6mpwV09Y4k",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.DEZNEMDhWXvv7BrT",
    },
    {
        name: "Chupacabra",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.JCoILqEvwovT7tkj",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Hl1Nnnda8KSf0Obp",
    },
    {
        name: "Giant Crawling Hand",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.M4mDroIJlrBYfHkM",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.TlDmc2ZKeIAJuD5v",
    },
    {
        name: "Gosreg",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.MUVc2ZjwGtlpcuX1",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.TwFcW5O5J1SdsYv3",
    },
    {
        name: "Grindylow",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.N7Ej1AyPPolzboex",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.sC4B1pjGrKFXhjOQ",
    },
    {
        name: "Thulgant",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.NtezcliwnH4R1tJw",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.mEjCLVRt7iDiNZL6",
    },
    {
        name: "Rhinoceros",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.o2IbtStBj11QCRvS",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.LiURMjxzav8SBKSq",
    },
    {
        name: "Crawling Hand",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.oSQ3Q9tzTohksAtf",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.KH1GkazaI59zftst",
    },
    {
        name: "Coil Spy",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.PAGytLw1QnAiNYC2",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.y2w2jjs2O3gP0H5v",
    },
    {
        name: "Cythnigot",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.QR3AC4mkpfz6KPSh",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.YhVYGhzNrOFQROui",
    },
    {
        name: "Island Oni",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.R0dyG06kbNYiCqRW",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.VGPtiSeeT7CYgWrv",
    },
    {
        name: "Orca",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.RqcIiiNNEkF28ui2",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.uco1YijAEotYjdnF",
    },
    {
        name: "Pachycephalosaurus",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.rZdaxjM7CFVAEq2e",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.dUI8N2AXDGcf3qRD",
    },
    {
        name: "Zyss Serpentfolk",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.s0wn50S5mGxagSAa",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.0jSkyGbnMiN6kzwH",
    },
    {
        name: "Shadow Giant",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.SpnJQIHLeiJOjEWR",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.JSKZryHwf0Ggq8KR",
    },
    {
        name: "Weretiger",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.SYaC46yrqcyp16Dq",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.yS0bUM8R6hb4fIx2",
    },
    {
        name: "Vanth",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.uiTUtcXixZ6TdKYE",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.74TxKGaW7RPzTdbm",
    },
    {
        name: "Giant Ant",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.URYQ5goPCmrQvJf5",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.mEZUTqNIgu0ASApu",
    },
    {
        name: "Vrolikai",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.Va2LUALLnnfWX3wq",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.iy5XBb2u4BOVxjtz",
    },
    {
        name: "Marsh Giant",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.W2gd0emEVbD8EGmf",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.tuuSayyL0A5R6hZh",
    },
    {
        name: "Snow Oni",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.wBGUIPJMm9Van9GQ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.CIQgNHkiUtBQR2NJ",
    },
    {
        name: "Aolaz",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.WMiPblOVq5w2Fa1x",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.KdW5UeZSqeTZZlo5",
    },
    {
        name: "Norn",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.XCNRztCxn6EbJ0gr",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.8w0LwQHkip8nzFo0",
    },
    {
        name: "Hippogriff",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.Xv74O1mFzzP06IXl",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.eFGPKbhix65FSG9u",
    },
    {
        name: "Compsognathus",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.XZZdG5RosoYsF237",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.uzH85ifDz5GU525p",
    },
    {
        name: "Augnagar",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.Y1lwEf06O1ijOnwt",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.YKMvlKA1AZJlXtz9",
    },
    {
        name: "Gylou",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.yIpB2uLyeBWQjfsn",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.s492qJ4psEb4FXuy",
    },
    {
        name: "Hippocampus",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-2.Actor.z39LYFGYmOsoGVSh",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.CHVMOXznjUDcb3XP",
    },
    {
        name: "Vilderavn",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-3.Actor.7bTj2DC91yEdJiLq",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.NxLQHUMs57TktiZa",
    },
    {
        name: "Raktavarna",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-3.Actor.8M91u7Q3javRQVEY",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.nFhAJSpbJz1w71EU",
    },
    {
        name: "Pukwudgie",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-3.Actor.cMBXcfS0DuZ7O2vm",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.1ZRHjuGOluR4IUrs",
    },
    {
        name: "Tooth Fairy",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-3.Actor.HPVVewX9vqKH94xf",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.q95mjOkL678a1Wnt",
    },
    {
        name: "Globster",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-3.Actor.i3Ui3hHIBZnHl0Le",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.H9CHNiW18cRFocNO",
    },
    {
        name: "Herexen",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-3.Actor.iLoVkzve6Nu3gErr",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.oNR29GreK0AxLucN",
    },
    {
        name: "Phantom Beast",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-3.Actor.KSKettq5j3A7UsIh",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.YAGc6gQ5VrvWyR37",
    },
    {
        name: "Athamaru Hunter",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-3.Actor.mgQSYE94vb2ICVjL",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.pzQhR0mc8HEhXLOZ",
    },
    {
        name: "Tooth Fairy Swarm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-3.Actor.NUWL7LHDqmP0c7OB",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.rmJItn5jMW7Af0Iy",
    },
    {
        name: "Pusk",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-3.Actor.ooyJuLQ3AivRwLpa",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.OoUrk7aHE5wq9nLs",
    },
    {
        name: "Omox",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-3.Actor.phOYPM1OVAKPg68l",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.hvVFocY8r72XEaqQ",
    },
    {
        name: "Draxie",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-3.Actor.PJCeh8sj9Sm5Eqz8",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.UuQHd4v6gG8ONdCt",
    },
    {
        name: "Dybbuk",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-3.Actor.QUzBzxRy6HLeK7ja",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.IrssIkWkW6fsbHJL",
    },
    {
        name: "Brimorak",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-3.Actor.rVtBZrHnWM3lvSs7",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.6UrgCT8MwC8CeGbu",
    },
    {
        name: "Rhu-Chalik",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-3.Actor.XmOYhscNHFw7M2G0",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.yj2nhIS8ZsAJh2l5",
    },
    {
        name: "Phantom Knight",
        linkOld: "Compendium.pf2e.pathfinder-bestiary-3.Actor.ZDGYrJ68aTzZ2EtT",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.9VMoTqyVaKc4ZR4H",
    },
    {
        name: "Brontosaurus",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.05E3kkjoLZVjFOeO",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.wy8Ve0m3wbHMo1U1",
    },
    {
        name: "Giant Anaconda",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.05wwpHHsBlxBbdkN",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.XDNJSVxOOryeuN44",
    },
    {
        name: "Umbral Gnome Rockwarden",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.0hnnwyqLfYVIenzd",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.6yTmbDaZmrkXUJ4t",
    },
    {
        name: "Zombie Shambler",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.0plBflWwrCWQO2RO",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Xo4IGzw28hivgMmM",
    },
    {
        name: "Goblin Dog",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.0rfropeocJWXC6pg",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.yclRuradTmZbdKFQ",
    },
    {
        name: "Gancanagh",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.0SAlss24nUMdX9r8",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.hGYIynV60GGfg8Du",
    },
    {
        name: "Dullahan",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.0SJqmk4ItwL31Rg9",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.GNwLVbfFx8EPz7xO",
    },
    {
        name: "Lizardfolk Scout",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.1CzZINpYRcNBKDnO",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.V8w4iOwUMPqYnqVE",
    },
    {
        name: "Homunculus",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.2GRPw4VK6zfCS2Qw",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.9wNjq9BirBoxyJVH",
    },
    {
        name: "Ghost Commoner",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.2H2AEwQnfKJC0nrd",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.N98ug9jQHqeFoK1N",
    },
    {
        name: "Roc",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.2HvXtedQziTTfI0S",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.S67oZ1mvVNz9FTUE",
    },
    {
        name: "Tarn Linnorm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.2IrbfdtWyXiGOLBA",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.k0HUy6WdbZUNfG8X",
    },
    {
        name: "Deinonychus",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.2IrWQjtFvsen8ioo",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.wNkS1ArFjS6ZsrPS",
    },
    {
        name: "Satyr",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.3kLXBdtKpUsU8ey5",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.aj4ZJUULa7VoPYWy",
    },
    {
        name: "Giant Moray Eel",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.3VsQFEdIN5e1uWle",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.WamGnH8v0QHz8NFr",
    },
    {
        name: "Kraken",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.45Eo7MFWG3ShikvD",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.bgKwwvO0uDGD7XsG",
    },
    {
        name: "Tabellia",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.45neevf5aLl0YPyk",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.H8Xq9hZP5bEEI3Hf",
    },
    {
        name: "Goblin War Chanter",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.4BBzo72pHOpecoIp",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.wepiUEi2Lxl8j1BH",
    },
    {
        name: "Cave Worm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.4h9jhODg2NwiYsPg",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.vijBriZmbUJjbJNH",
    },
    {
        name: "Bugbear Prowler",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.4htFfofrXLkbWMRg",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.9cBuzDV8seJqhNKJ",
    },
    {
        name: "Boar",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.4MwjCsa5O9aAjxSm",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.IyhbcdTVmkV4pSju",
    },
    {
        name: "Graveknight",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.4p07SH4zdmVZ405I",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.MCgSMT680ic6kr5k",
    },
    {
        name: "Xulgath Skulker",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.4zXn6xaaxo1DtIRk",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.S1XgBHtXIOV3JjLy",
    },
    {
        name: "Riding Dog",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.5Azg87M6OnQ7Q4ZS",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.ECe2DkOgSSqXHBqv",
    },
    {
        name: "Skeleton Guard",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.5H8ZX7y5IkUBhvhF",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.trchDxbDR2TiPMxT",
    },
    {
        name: "Hobgoblin General",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.5hQk5NJk4L10txyW",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.xgKDQB6ZYmAutwAm",
    },
    {
        name: "Skeletal Giant",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.5MVBU86ZRw2ANMQn",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.sEgjgitJmwYYa4mV",
    },
    {
        name: "Giant Flytrap",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.5pk6bfodgnllSIOy",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.ka7bXO7HIfBxk8Gy",
    },
    {
        name: "Werebear",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.5U13zQ77DIcqpH9U",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.h3JksV9Idr9eZLkE",
    },
    {
        name: "Ankylosaurus",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.6CQEelygt968CB7m",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.CYt04IKRQeiC9Ly9",
    },
    {
        name: "Ice Linnorm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.6eabIbxzYepfZAHX",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Np5Z7RMQzvSNnH0h",
    },
    {
        name: "Tengu Sneak",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.70JDH25JLTC4t5Ko",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.ClAXGpqu4ZsYuNle",
    },
    {
        name: "Bugbear Tormentor",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.7JvA7kTqCUwcJoNe",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.httXfBPGseF9csXa",
    },
    {
        name: "Yeti",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.7ZgQuis8r8YQyUnI",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.alPZcKVrHTcMdtIU",
    },
    {
        name: "Fire Giant",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.80TiZrVvIBW7E6L2",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.rEDhI2oI4TqTICN2",
    },
    {
        name: "Treerazer",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.8BloAdRqlLpt5bNg",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.P8pNcpNeXQcj6lBB",
    },
    {
        name: "Voidworm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.8meqlz36gPHTTvNz",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.ciLdEf6sld8h2a2j",
    },
    {
        name: "Eagle",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.8r8Ar08ojdJuPeiH",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.WBPEvEqIGvxeQKlp",
    },
    {
        name: "Magma Worm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.8U8K0YEghIErml35",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.jh3XmHoFtcGYkdJm",
    },
    {
        name: "Elananx",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.8uXLbKKzxN5O0ZhM",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.RJFpwZIGbuOuCtXr",
    },
    {
        name: "Vidileth",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.9AlfVoEMLwDODjxl",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.VDm2XhfNwhgiJOxD",
    },
    {
        name: "Umbral Gnome Scout",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.9FZMzpAu4XhCI0IB",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.63gNd2JNUDcAjYzo",
    },
    {
        name: "Giant Gecko",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.9hOuoOONmp6500GZ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.mathcxCcrQmn9Jj8",
    },
    {
        name: "Mukradi",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.9llfviiJg5bJlBth",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.IGzoFGlVbkit8hnH",
    },
    {
        name: "Axiomite",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.9qjXP1Lho1UmAihJ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.7v1gykqjBO1YHDfu",
    },
    {
        name: "Brine Shark",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.9sa2KE4Fbh3OPH7M",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.H7z7VHzlHlEFev1r",
    },
    {
        name: "Giant Tarantula",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.9X7hOvCKy1bqw0g6",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.4ISm82EYQeOndynw",
    },
    {
        name: "Gargoyle",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.aeCoh4u6c5kt1iCs",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.cvfIkEF6xmWn2soN",
    },
    {
        name: "Succubus",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.AiPXegCJ1leUslTm",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.md1fhwGMwDv4NNwO",
    },
    {
        name: "Arboreal Warden",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.aNWiP985fISjClGo",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.0rm0UDbXvwg4sSxQ",
    },
    {
        name: "Fey Dragonet",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.atrhmCtNKx1MR06I",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.QIXc18xHrEWDmtKW",
    },
    {
        name: "Harpy",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.AuCC04X2AO8oFN75",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.uBNm3R9wbLTPrM9i",
    },
    {
        name: "Giant Rat",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.AYwdybUfm4meGUTJ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.iIJPJcDT8wlJ8z5M",
    },
    {
        name: "Umbral Gnome Warrior",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.b6qiHvyx6ymROTBL",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.GJShyw6HgV25ywqU",
    },
    {
        name: "Greater Hell Hound",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.B7b0alybm5U34nFV",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.15TyWlbDQWNjMKeL",
    },
    {
        name: "Cave Bear",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.b8NQkby4QV4uOqFT",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.AZIG0COCaDBronJa",
    },
    {
        name: "Phistophilus",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.B8QjalVNcWjuqgG7",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.3QyqHIuAXE3YVLUh",
    },
    {
        name: "Redcap",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.BAD7npndaooB3Pz1",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.fWAjkhQ0y50Eh2BT",
    },
    {
        name: "Changeling Exile",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.bAjHCeyNcPRqOmLv",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.RqX0vfUjlycKjGyp",
    },
    {
        name: "Leaf Leshy",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.BeptBpCJ4Ny4biOH",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.v1UK3IwCB8wCbL3L",
    },
    {
        name: "Giant Stag Beetle",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.bIw7czN0E3rENrVd",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.MkupNnMKqDBElhhp",
    },
    {
        name: "Ogre Boss",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.bIXfNKFWduf8MH0f",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.oopxVowT2jnUQJiS",
    },
    {
        name: "Pleroma",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.bjJUZKcA47Qp0ZwL",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.HLM55InRGOAUkqoH",
    },
    {
        name: "Giant Centipede",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.BKPRkJgq7ehsW7uX",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.NRBgcu0LkXXp8mtp",
    },
    {
        name: "Living Waterfall",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.BLFEu9jCKPAMko01",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.1AZoRkLec47xrTqY",
    },
    {
        name: "Werewolf",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.bLMoqt9xqTZKnjxr",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Hg7nCvltRBQOiijQ",
    },
    {
        name: "Dero Stalker",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.bxAJWWKrEMjgNkUp",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.BxOlYmZiwLRpxGWp",
    },
    {
        name: "Unicorn",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.c3iA9lkU1QY4YCY6",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.lYoAwofYGbhWL75Q",
    },
    {
        name: "Arboreal Regent",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.c6AE2Mh8BRtBgbtz",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.z2l8K7woKYPkm0qz",
    },
    {
        name: "Giant Bat",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.C9s5tBxVValC2HTE",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.xnpuGO8jEMba9wy5",
    },
    {
        name: "Zephyr Hawk",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.cBHpMcVaLRPZu9po",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.sAfjpjAS56jtrUbi",
    },
    {
        name: "Sprite",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.cDgOfBCrWcpYwRVS",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.lUBkzsSqMfQBczU1",
    },
    {
        name: "Orc Scrapper",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.cDm6PzhO5nXlkGoi",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.YReM6QbqwUz3UTP7",
    },
    {
        name: "Sea Serpent",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.CFHLgMj8zHLqcagc",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.PUPnGG406PanzIvL",
    },
    {
        name: "Grizzly Bear",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.CJP3GGBXuGgkaj6C",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.6K4RWus85o8iqy0t",
    },
    {
        name: "Vampire Count",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.Cq8sRhVVF0hagBu6",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.pPQyoQHTxrE2U7px",
    },
    {
        name: "Pteranodon",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.CSefkWGVmA5yGxNR",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.bGp2t0UteEYu3BGe",
    },
    {
        name: "Pridespawn",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.cXSTuUJct5iepH75",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.h4cMwW2K34KheWtD",
    },
    {
        name: "Animated Armor",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.cZDiyluplFqRxmGy",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.CFlx1tkRxKC9qAC7",
    },
    {
        name: "Kanya",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.d9W89Yv6zyvfxZuG",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.hmcXFrf8xwrYQIg6",
    },
    {
        name: "Hryngar Taskmaster",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.dEecX0AEfl32KUVN",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.eI6rRuxIPSZcm9OC",
    },
    {
        name: "Morrigna",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.DPEmRRXYevk3ADqW",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.z9jEyLrsoBMmh9qg",
    },
    {
        name: "Cyclops",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.Dwgl1DzJAYE3ienu",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.oZVeE7D70bHOrs1d",
    },
    {
        name: "River Drake",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.DX1xNtucLTenn3P3",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.nMC9d7ORMz3cdaHa",
    },
    {
        name: "Mitflit",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.E0LCMHVp4sxAbQYa",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.kkAllKGsVCZVGFpf",
    },
    {
        name: "Cacodaemon",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.E0PIGtVfc5PFVT2C",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.9Bl1ua3uLqodv47s",
    },
    {
        name: "Hunting Spider",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.E4ctF7Fvi3cdkgQq",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.A4VgQIHsqJKssQOM",
    },
    {
        name: "Mummy Guardian",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.E5RDV3n7GnjAspQ5",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.XZWUQklzWF6YFPmG",
    },
    {
        name: "Shemhazian",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.e8rmI5xt6IANatfX",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.3vkQLclK0z4LhAh7",
    },
    {
        name: "Minotaur Hunter",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.E9rT02pPDLq7rARq",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.vN2alMciNlKpBpKN",
    },
    {
        name: "Lizardfolk Defender",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.EhB5Q98OO25DDOOl",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.WZRHV2WU0SkpbtJI",
    },
    {
        name: "Slurk",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.eHLDsL1LG3jQ1H6Y",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.tashopA1s2fAbSXA",
    },
    {
        name: "Lich",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.EibxkD9y30YmPaLH",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.smItqlbr0iuDJ8nL",
    },
    {
        name: "Stegosaurus",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.eP96NzLFSjua4NS5",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.qtJ36jlcRQw5sBnr",
    },
    {
        name: "Dero Magister",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.ePa0KmNPpR4zUPfX",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.qyCcr32PVcnNm4Wr",
    },
    {
        name: "Caligni Dancer",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.eQdLBzkluS1fvVC8",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.SZCf0IZkf36plwVd",
    },
    {
        name: "Animated Broom",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.ETwmjdnmSkqGdD5r",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.ybkelAOtSIA06fnj",
    },
    {
        name: "Snapping Flytrap",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.Ey19J4nTn1dQvLtE",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.vRAdYovWcy2euwuL",
    },
    {
        name: "Sea Hag",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.f3c1CS2W8Tft3hW7",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.EYiIQh526d0HLiDu",
    },
    {
        name: "Jah-Tohl",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.Fa1S0A8fAx3SkO9h",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.YUI465JYqM65iimj",
    },
    {
        name: "Cockatrice",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.fgsDAeZHVbHRhSE8",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.MrzlaE7k1PEsd3iQ",
    },
    {
        name: "Cauthooj",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.FHfrIJCdKTzy2rrR",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.1a5faH5CCtFfbQHO",
    },
    {
        name: "Zombie Hulk",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.FJo8VkrM7kLkHa5D",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.EDYKUdYmilw3rgJg",
    },
    {
        name: "Astradaemon",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.fkBcMpr3Yxxfvz9v",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.hSSe2FxlXKvjKsEw",
    },
    {
        name: "Elemental Hurricane",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.FPKoiMXENk5FouXp",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.mx2Xpra7bRJP0GuX",
    },
    {
        name: "Shuln",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.fxYMucI5b2IUoBpw",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.xz2NZqSG5YVl17dc",
    },
    {
        name: "Ogre Warrior",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.gdXok08bITkhowDJ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Twvzy1yRo6m6dM8D",
    },
    {
        name: "Jinkin",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.gfRXFd24U633OC9r",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.lFDYJOIp2knQ0IRY",
    },
    {
        name: "Phoenix",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.gioxLqV8N4p9iIAh",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.mQJL411e9Iz8dJoh",
    },
    {
        name: "Megaprimatus",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.GssFAdolUA3ghg2e",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.pyTr1VOPrPYH8UNg",
    },
    {
        name: "Caligni Hunter",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.gWxpeqOQ54Jd4HTG",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.AcUb8s5fiktYw8Fx",
    },
    {
        name: "Dragon Turtle",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.gX66KyBxUOvMv5Sf",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.kLhBdqKOMHDGjdFz",
    },
    {
        name: "Vampire Servitor",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.H2ZxTHZOEigpH4LK",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.dFzTXkrpoOOdbzuW",
    },
    {
        name: "Wraith",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.HbROgIcU9Z9m6XuD",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Gu0cJHGwPd547OtC",
    },
    {
        name: "Deadly Mantis",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.HeoH8hi5iieKPuJ2",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.zQraVA7SUjd6qGNh",
    },
    {
        name: "Cinder Rat",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.hiGwRWdxAsoCII4f",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.xN5J9S485LxFZMkL",
    },
    {
        name: "Sewer Ooze",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.Hkq9ZS2J2iKnT7vT",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.9InGpxq5xbbHaL9f",
    },
    {
        name: "Elephant",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.HpY0addhUqtHMgUN",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.1x0BdpVQLX7o3rrA",
    },
    {
        name: "Kholo Bonekeeper",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.hXpqjD3eBRxlemNs",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.yogotW0edcHEPeuR",
    },
    {
        name: "Gimmerling",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.HyOf4CfAIhC3qWtz",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.pH2yNe16EnoJ8R0i",
    },
    {
        name: "Hryngar Sharpshooter",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.i1HEQ6f15fMEcHQf",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Ytp0kRaG8iexmPfN",
    },
    {
        name: "Imp",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.I4CpyMUsWfFYdpL5",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.yPYQC2bfOYmqcfIB",
    },
    {
        name: "Xulgath Leader",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.I4o2Gqpr2ioiUXA9",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.7w1w7VTnIWMBdFux",
    },
    {
        name: "Flash Beetle",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.i6Rd1BE30hhyKxwo",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.E2XL2egIA3QaSDBM",
    },
    {
        name: "Orc Veteran",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.iA9lbwH0qROTjCva",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.V90OYOMyyPLPJuod",
    },
    {
        name: "Benthic Worm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.iD3YlM0QzI2SrjD6",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.v7LH85fl189pXMsR",
    },
    {
        name: "Riding Horse",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.In2nNwo3JL1RXQhj",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.CLf9k9A9ApTAkZeL",
    },
    {
        name: "Dryad Queen",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.io7johJlZinrSCiH",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.gRy6Ci6zb1s4Nvy5",
    },
    {
        name: "Scorpion Swarm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.IpzDMSmJ42alvf9F",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.5SFDHViyTCZ47TR5",
    },
    {
        name: "Lamia",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.IQsTNM8aXcCUmFu0",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.vqYrJ33XgoeQUUle",
    },
    {
        name: "Dryad",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.iSwUKe7cEytclS7r",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.4MoqBCDQA6FR1sPw",
    },
    {
        name: "Greater Shadow",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.IUzKFRX0uHl1yxkn",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.5meW7DytYnF7Iq2V",
    },
    {
        name: "Zombie Brute",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.Ix1PziAEk9IIMYBz",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.WioQ6rOeMRuTOliY",
    },
    {
        name: "Gogiteth",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.IXen98RbUlbxDWBD",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Iwk2qT4lVyrvoz3B",
    },
    {
        name: "Giant Wasp",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.J0dSbywBRgD2kf19",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.6aaBmiOgqZ5h2IhW",
    },
    {
        name: "Hell Hound",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.jeAGl6OAVrrIPgu3",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.RTviEfjYnsXa0wkT",
    },
    {
        name: "Goblin Commando",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.jGzVwekcRX5aQpbT",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.sA2dFdRUwiapo69Z",
    },
    {
        name: "Boggard Warrior",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.JkBJ8B07ElXrfDaG",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.EH84J9FedbK3ax50",
    },
    {
        name: "Dhampir Wizard",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.jMiiQDIDxW9ZMvCV",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.bveW59P2mTiiFVIt",
    },
    {
        name: "Pugwampi",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.jnmUcTs4hn1c5bz9",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.aeOzCBpwnUVcpqxI",
    },
    {
        name: "Ofalth",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.jP8CO6z7bNIhOuqQ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.2jtRdYo9ey7osDUH",
    },
    {
        name: "Goblin Warrior",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.jVZRROs0GzDjVrgi",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.fLLKuOXwPq1Iq0U4",
    },
    {
        name: "War Horse",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.Jy2va0NTTbaUH1zP",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.ExVmw8bSvUd2wYkI",
    },
    {
        name: "Poltergeist",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.k3Lt3bWBadXvlIbG",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.zpd6b6UPP72ZELCj",
    },
    {
        name: "Grothlut",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.K9Hw43co8fhwmKkM",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.VCYF0NAfPKwTHkK1",
    },
    {
        name: "Hobgoblin Archer",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.KclNszYZ7sjwE9nX",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.JwOlSrHk1pkAKMRn",
    },
    {
        name: "Mummy Pharaoh",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.kfeL172Ix3x1YRc9",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Ro49rEZwBLkkoEKE",
    },
    {
        name: "Balisse",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.kFQorgvvyozQVSKi",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Q1wybC7rSc4MIF9g",
    },
    {
        name: "Medusa",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.kkFVngQUGTACeggf",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.QCPpQya5TEUuIxQn",
    },
    {
        name: "Spider Swarm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.KpxhSWRIhG7ns5NA",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.NcYbJS5PWBGdNDqh",
    },
    {
        name: "Giant Viper",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.KsWAIXTTh3mfNWOY",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.AJ5LuNMVPLCydryP",
    },
    {
        name: "Plague Zombie",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.KxN9aGFGPxl6oLGF",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.aWiTcxAySoYjUP6T",
    },
    {
        name: "Cloud Giant",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.l17XDoK0UIjXUvOv",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Z5QezXy38ZHyt3O3",
    },
    {
        name: "Lion",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.l3Pe8FsFbLvft1Fq",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.6KF6TQvLHHpE0uAM",
    },
    {
        name: "Tyrannosaurus",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.LDQpLwN40OGefZD0",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.tpNP1UooPPHMyZye",
    },
    {
        name: "Viper",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.lFlXmieuHTBIonhj",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.1uVwkGlqYzyWaDMy",
    },
    {
        name: "Skeletal Hulk",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.lo4fR4jDVzLdwwkH",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.V4rVnbjJbcOIdC4Z",
    },
    {
        name: "Arbiter",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.LVhVb7abhv4onzZZ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.oaxKg1yQDmK2PWXG",
    },
    {
        name: "Guthallath",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.m3x8q5rZ6zh9x82s",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.BPznJcLvfkpfeQ2q",
    },
    {
        name: "Banshee",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.M6RknN77XTo23v45",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.XKOQ3ll9TGNso0uB",
    },
    {
        name: "Skeletal Horse",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.mblGfyIXWhiaNpFw",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.X2vz6CrMaHIso0ha",
    },
    {
        name: "Grim Reaper",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.mGr4e6fH3w8ewcSX",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.kKFfigxrJ2vbJazp",
    },
    {
        name: "Phade",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.mqz4MfBwFxlBQeHs",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.HKXa9E91WLy6dAZA",
    },
    {
        name: "Skulltaker",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.myEeYWWAgnkLwtIb",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.zkl6planCbeCuAdS",
    },
    {
        name: "Leukodaemon",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.N62zM3aTelygWIt2",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.bb5Z4z4EHb5LbCLK",
    },
    {
        name: "Elemental Inferno",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.NbGLrlt7RYdFFBQ5",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.yYicb7uJH4EaBO4v",
    },
    {
        name: "Stone Mauler",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.NeYU7wwCv0RUesZ1",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.ToteDLIM7jCyHwDH",
    },
    {
        name: "Caligni Skulker",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.nFMZjWQL6pd9XdqR",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.9YPFqikAmURwcTEO",
    },
    {
        name: "Chimera",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.nkWnoEHWUsBLgNje",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.bVn0EUj4xrOWjtna",
    },
    {
        name: "Warsworn",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.NpcS7iocNNsno6lE",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.llSpQyOTaylpqgnW",
    },
    {
        name: "Sod Hound",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.NVWaLagWOu5tCCZu",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.VQPzDz3xnCQGFOGL",
    },
    {
        name: "Lamia Matriarch",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.NymSyXbXqfkGLFWF",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.0qaGLx8ads9blcfS",
    },
    {
        name: "Kholo Hunter",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.o3DRwRKeJrl83Wv9",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.qOAuCiPgsjpjDgA1",
    },
    {
        name: "Merfolk Warrior",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.O3J59mUJ6DHQZZ6F",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.YiGZxwT2xTVYQyTu",
    },
    {
        name: "Flame Drake",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.O5YbsTSlX5VhciP4",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.qlxVPpwVFw5qIVQM",
    },
    {
        name: "Awakened Tree",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.oBMIc2S8ekmDgPpi",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.0Dsy2I3mu86Czjm0",
    },
    {
        name: "Griffon",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.Oc5NXZmMkSDCRNlQ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.gWgMg7cARqOe82O6",
    },
    {
        name: "Nosoi",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.oGIWTW0WqQxYNJOD",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.5KstOkXabrOlZaKR",
    },
    {
        name: "Wolf",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.Oilfs8Atv2LjAsUS",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.BN5Lb6IsQ9Wyu3rL",
    },
    {
        name: "Fungus Leshy",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.oiXbo1VSfDrHpIQm",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.BoXCGLACP9vuIZkZ",
    },
    {
        name: "Ogre Glutton",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.oJaC1WbXQuQX2d2J",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.X7PaA6XgvrY5ByfM",
    },
    {
        name: "Rune Giant",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.oMcHaTX5unOHC2Pm",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.YRyTBciVtCnO7J0Z",
    },
    {
        name: "Kholo Sergeant",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.oMsOm06HhX1gG0Jz",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.SipdgBCL7XuuEjn6",
    },
    {
        name: "War Pony",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.OPavstjKhgcp30fc",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.BMpBXSq8T20WdUDl",
    },
    {
        name: "Frost Giant",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.oSvWsqFnQLS5wlvg",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.893mp411SdYren3H",
    },
    {
        name: "Pegasus",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.PCh2kxeSYWRit9TE",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.HMfH0CI1CQCXB9Xr",
    },
    {
        name: "Nilith",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.PfcS6WzhMGzds5Wf",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.D2Pe38jYbeBxUaxU",
    },
    {
        name: "Boggard Swampseer",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.pG3UPgbAxNCXAyQE",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.F2Xhn4rqPAj55w3O",
    },
    {
        name: "Animated Statue",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.PiAGhPEzJMC2egQk",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.yQ2mosomuAPiLMkU",
    },
    {
        name: "Hobgoblin Soldier",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.PiZkpRK23u89h82S",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.NW68bxCLC6oDHxL9",
    },
    {
        name: "Lesser Death",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.pkNWilK2pHZ5TDsd",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.WoICHri7raCYv1wU",
    },
    {
        name: "Wrathspawn",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.pMoAlNjMJ7DArLPh",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.yv7hdQ3MO3pLgCF5",
    },
    {
        name: "Ankhrav Hive Mother",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.pTkz08ak9YlKRsOY",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.qYw2ToefDK5Vrwgu",
    },
    {
        name: "Frost Drake",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.pyFvLyQsyYjOz0xI",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.2SixuEUfKpEyfOEY",
    },
    {
        name: "Slothspawn",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.q3LrTrfnCvoUXuRz",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.ccAeM0tNgf5aVokj",
    },
    {
        name: "Firewyrm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.Q8FAcsuta4p6d8KS",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.MX2cLbODuo4gECPJ",
    },
    {
        name: "Sphinx",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.Qa7HaKfKiosEPr94",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.rdgs2gxTWxkyanD6",
    },
    {
        name: "Wasp Swarm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.qcZvFCAnslI9XNTR",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.h7je8nkscJQ2Ac8j",
    },
    {
        name: "Hryngar Bombardier",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.qfuoFK2GXBJusQ33",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.KDbJ402jFuvn5frX",
    },
    {
        name: "Envyspawn",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.QGTSPki2eoLuavif",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.3nUt7cW8fqE5IpyE",
    },
    {
        name: "Dire Wolf",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.qHqhUWeNUZRET9xV",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.AFWmiIBJ7ypgydQD",
    },
    {
        name: "Greater Nightmare",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.QQQhNnCit9XLMMoN",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.WG4Tk2k9Lm21CEQv",
    },
    {
        name: "Ugothol",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.qr46S4VDnaUK0GcM",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.fRjJkktWp7s8NBN7",
    },
    {
        name: "Giant Frilled Lizard",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.QRjjE4TJNfaDhhQC",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.FFnsYr2aIfDGnUVS",
    },
    {
        name: "Guard Dog",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.QRRX82FIjBKd8pzs",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.KHTYbQgR5hnFZdGL",
    },
    {
        name: "Nessari",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.QT2gA8WMaT2cuXr7",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.BlTEvlCUKPOfBYMR",
    },
    {
        name: "Daeodon",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.quXuocHuT2US7cWz",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.v4KP0HYaygoFOIlo",
    },
    {
        name: "Kobold Warrior",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.r9w1n85mp9Ip4QiS",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.BIZfjoz8DZt75EDn",
    },
    {
        name: "Poracha",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.r9WAwtCLxoJMjd8J",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.WNUvjcKRAqdguWfN",
    },
    {
        name: "Hydra",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.RiKjpztTt7tZbOeo",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Bkr0soTDhQq1qjWx",
    },
    {
        name: "Skeletal Champion",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.RMSx2C27yty0MTva",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.FH58AcRBZIfrHKvv",
    },
    {
        name: "Kobold Scout",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.rPaHIh0ICnTLnRO6",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.PcHQDmPTztw32PhL",
    },
    {
        name: "Basilisk",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.rPHxXClTnoPYHYuZ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.mX47c0W9rizbmMBM",
    },
    {
        name: "Chimera",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.RTUp97xNDutzYpuY",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.bVn0EUj4xrOWjtna",
    },
    {
        name: "Xulgath Warrior",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.RTzFvmdSCf5yhguy",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.5vBG8a8dnJfmVd3Y",
    },
    {
        name: "Naiad",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.RXEnAk6cbSnk3w7O",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Cqi8jadYpUTajIC6",
    },
    {
        name: "Velociraptor",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.S5z0mtoEhbz7BvE9",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.ZW8ARUrNdc3zewLM",
    },
    {
        name: "Catfolk Pouncer",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.saKs2Qaor8QktboH",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.PvYl5kItb7xoE8Is",
    },
    {
        name: "Chimera",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.ScNPruIwcIJNuSHb",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.bVn0EUj4xrOWjtna",
    },
    {
        name: "Deinosuchus",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.ScOT6QOlXIsevhNq",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.xC6v5Ef8mDt05QFK",
    },
    {
        name: "Python",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.sf42HB8VsWGlYixP",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Yadztw8CmYuWfA7k",
    },
    {
        name: "Warg",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.Sft7n3LMmnTxhhYn",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.x7Aa4Tvr9eBaHryF",
    },
    {
        name: "Smilodon",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.SP72xojHR0UGAWcs",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.6EgJNAJss45TQqpa",
    },
    {
        name: "Rat Swarm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.sPClc6y3dT3XZupv",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.6wPW2dvpt86Ou6bL",
    },
    {
        name: "Giant Monitor Lizard",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.SuWpn5yZdsHDHpL2",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.oyfheSs1ta4xvtEg",
    },
    {
        name: "Shining Child",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.t4JYGYJqT1CaqKvh",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.ePJcp2ADOjJYYQ5Q",
    },
    {
        name: "Goliath Spider",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.T5CUuPsMPb17d6Qy",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.eP4a0FAbus3tNTbc",
    },
    {
        name: "Giant Eagle",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.tKaOsbg8cmIUSjSE",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.XEjkJ8fQqLc02hrU",
    },
    {
        name: "Pitborn Adept",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.tm3Tixb7IDoLdJ5k",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.BCPpwj9uCiS7bF9C",
    },
    {
        name: "Ghost Mage",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.ToSwRvspZ0IB7SHQ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.LN7MXD38Zs2bDoW6",
    },
    {
        name: "Electric Eel",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.tr75FAbdOkrfQviy",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.gCmfPEfqS60BiuVP",
    },
    {
        name: "Gluttonyspawn",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.triuze3NMe4kWpdS",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.eke1AhiUjNPpyRhG",
    },
    {
        name: "Crag Linnorm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.tTmml7T2Knz2NrLd",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.JRBUBgJymEeEE4hm",
    },
    {
        name: "Wererat",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.tXHUr947sanB5tdN",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.2k0JX3RFTVRf0KS2",
    },
    {
        name: "Dezullon",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.U1L3MFKHe0sNvLoU",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.jR4E2I2tmQ6sd5DR",
    },
    {
        name: "Merfolk Wavecaller",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.uCw15c4AnIrOy5AV",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.IxezJU9rIKKyd3LY",
    },
    {
        name: "Grikkitog",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.UPm2rwIevsX9Odbm",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.702acAJ1OPRBjcni",
    },
    {
        name: "Reefclaw",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.URREWYZtc8QJ9ld6",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Rr1u6WvZEdPw1s6v",
    },
    {
        name: "Gourd Leshy",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.UYHtIbN0JVaIYcgs",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.f9fjSDdcBKkEPoIi",
    },
    {
        name: "Witchwarg",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.v92cB3RBUMhysOpD",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.diU0V2M3LiMDMsS0",
    },
    {
        name: "Vampire Bat Swarm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.VAWmwDA08ZLQd8lW",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.2mg30nJR6P3HJDSd",
    },
    {
        name: "Hyaenodon",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.VcUdFYNaxauNr5Hn",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.1Qqu3b4J4aJYEQOX",
    },
    {
        name: "Jungle Drake",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.vEFENJJixCdmBNl5",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.aYDbWuOj66nve8r4",
    },
    {
        name: "Crocodile",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.vJwnApm0HkadGR7w",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.2rMLYkUR47ZCQMUg",
    },
    {
        name: "Elemental Tsunami",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.vmN9SCUJxN1MIXwp",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.R427CMT90S7fv7MY",
    },
    {
        name: "Duskwalker Ghost Hunter",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.VoLW6eUxMSsXvgVP",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.3t1z62LREP4nnIDr",
    },
    {
        name: "Megalodon",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.vUKCuAgLQdz5akgp",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.9rXYGu7D3umIW1sv",
    },
    {
        name: "Giant Octopus",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.vxKqnzwcxNAgLp7C",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.k5p4mRDT26DrDXPA",
    },
    {
        name: "Greedspawn",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.w20FfmKH7ukghczT",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.pkhNqTDUttoAzcKn",
    },
    {
        name: "Triceratops",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.WAgQt9pkzgPOlcJI",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.zAxKR8XWtQm2rqh4",
    },
    {
        name: "Nightmare",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.waPgKbjhijeZ00Zm",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.qRUqoezeEnQ2KdyT",
    },
    {
        name: "Boggard Scout",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.wifELOkkRO2634bc",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.s2TkernjfKVEhlJY",
    },
    {
        name: "Stone Giant",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.WiOY3YbiKEJKIQQz",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.zT3fSxNatEbrkCzN",
    },
    {
        name: "Living Whirlwind",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.wjw8FQp4icafYash",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.XgGeD4fz5m7nQQlN",
    },
    {
        name: "Giant Animated Statue",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.wKVZdVVcXtvLxgsY",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.I00S3LWnDJfCn4zv",
    },
    {
        name: "Ankhrav",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.wMomrpcaC8QvIdlj",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.V1Kr5aiPaTM0mDFu",
    },
    {
        name: "Great White Shark",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.WNiNj0Brn2LCYmwd",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.uNNOQFvuMq8ZsQkn",
    },
    {
        name: "Krooth",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.WNqPRMjKW0oCHZ8X",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.f15mNNhOT3aq66VQ",
    },
    {
        name: "Pixie",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.wpmvdP5w936Kmq0e",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Ehtm5k9iBYTvSUcZ",
    },
    {
        name: "Leopard",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.wqPYzMNgYvrO6oEP",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.kB7FNn3vosp6cqQg",
    },
    {
        name: "Will-o'-Wisp",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.wRQ7TZdd0n5UIIao",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.KgJq51AeYrENo3Db",
    },
    {
        name: "Wyvern",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.wuaSG22lLjQ6yali",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.5iqkL9Me5164H7NY",
    },
    {
        name: "Tor Linnorm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.x6wfK4UCJ6wYok9t",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.0H54u83vZ1w3xHcD",
    },
    {
        name: "Chimera",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.x81PGKEsOtPquFVa",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.bVn0EUj4xrOWjtna",
    },
    {
        name: "Lustspawn",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.x8ZWNcFOfpJYjXOw",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.k4fqHhiax2GPrkbh",
    },
    {
        name: "Ratfolk Grenadier",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.XbClt5wkqECrQToJ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.C1gYuDSwTkTIkAcC",
    },
    {
        name: "Orc Commander",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.XLqbEDjmGpIc4XoY",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.PLZk6zY5iwccPTPS",
    },
    {
        name: "Elemental Avalanche",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.XoXf5ExS95Vv6lNf",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Oq31fcKwH0EE9R89",
    },
    {
        name: "Shadow",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.XrmHgbKgcHDi4OnK",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.VotlWUsFKdOrHWF6",
    },
    {
        name: "Lyrakien",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.XUTUBrQixSs7VLov",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.iNwaxIYuD0OTDNjJ",
    },
    {
        name: "Gorilla",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.XVX9Uhqb8shG5Pwm",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.PlkRv9NMKq9TShYf",
    },
    {
        name: "Living Landslide",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.xYlOudjXyTakF1m8",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.4Ejgj6p1LAu1RAN3",
    },
    {
        name: "Desert Drake",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.Y3T7XfC2BeiNBmuS",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.irl1wnfk4b83JWkY",
    },
    {
        name: "Chimera",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.YdlmpfZso6GwPr2D",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.bVn0EUj4xrOWjtna",
    },
    {
        name: "Mammoth",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.yIXRooXdsKtbcw2D",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.jkp7THTZMc0ivN8Y",
    },
    {
        name: "Tiger",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.ypLkUfuHHfNDsVUQ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.JGwKk83oX4gTGlqe",
    },
    {
        name: "Riding Pony",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.YUk9S6caKqheRsUQ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.F3ungAqpGjFotwUK",
    },
    {
        name: "Vampire Mastermind",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.yxCmLBpw6xqWFU3E",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.TZt3H39oxVdZRKs9",
    },
    {
        name: "Lizardfolk Stargazer",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.yzyaD2yGDrxmYh7P",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.gGdIV6uUHzX23vz6",
    },
    {
        name: "Goblin Pyro",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.z0l0lHc79NbMxiqZ",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.Ky5eNRvN71O0tY9l",
    },
    {
        name: "Naiad Queen",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.zA1I5YXI9GCSaksP",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.H8lGFF3PKUv2yRL2",
    },
    {
        name: "Keketar",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.zBPGUUP788b0g1Ng",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.z1TEwL0plpK4l2uf",
    },
    {
        name: "Ort",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.zJro50sLFmOcDLdO",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.kohQQtOfhwxbzWZB",
    },
    {
        name: "Giant Scorpion",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.zJZqpx6pPW7dxEUV",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.BWm17BRQYGMLqtNe",
    },
    {
        name: "Great Cyclops",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.Zn0p5YjELMjEwkqx",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.6mdq7UV9gFXAEOpJ",
    },
    {
        name: "Centipede Swarm",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.ZPAM4OavHmdgmGnw",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.sldauWtSyK4JEiRl",
    },
    {
        name: "Wight",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.ZPjQkKVMi3xoPcU0",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.DBTbqI9QQRtlJwWh",
    },
    {
        name: "Living Wildfire",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.zRNHsSxi1g3IFYFu",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.pVbggIyXxCo8pPue",
    },
    {
        name: "Dero Strangler",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.ZsduIlmluQe4ZxFy",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.uUP9MQscB0EFPptr",
    },
    {
        name: "Hyena",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.Zv6eaumsdz4HdxRV",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.tUWchW8dXavTFeBy",
    },
    {
        name: "Cassisian",
        linkOld: "Compendium.pf2e.pathfinder-bestiary.Actor.ZzMJ7Y4qxapAVvlF",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.9qERA2jk7Yv74Hqq",
    },
    {
        name: "Dryad",
        linkOld: "Compendium.pf2e.pfs-season-1-bestiary.Actor.bfTmy4404MFMykxH",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.4MoqBCDQA6FR1sPw",
    },
    {
        name: "Boggard Warrior",
        linkOld: "Compendium.pf2e.pfs-season-1-bestiary.Actor.pJck5AXRMWcAequ5",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.EH84J9FedbK3ax50",
    },
    {
        name: "Charlatan",
        linkOld: "Compendium.pf2e.pfs-season-4-bestiary.Actor.8xeZ6N46DLqnOw32",
        linkNew: "Compendium.pf2e.npc-gallery.Actor.7GGHuOlSzcaF2AdL",
    },
    {
        name: "Dero Stalker",
        linkOld: "Compendium.pf2e.pfs-season-4-bestiary.Actor.oH2KT9LhUs299AN9",
        linkNew: "Compendium.pf2e.pathfinder-monster-core.Actor.BxOlYmZiwLRpxGWp",
    },
    {
        name: "Geist",
        linkOld: "Compendium.pf2e.seven-dooms-for-sandpoint-bestiary.Actor.6zMzd6ICd3p1Ye4q",
        linkNew: "Compendium.pf2e.book-of-the-dead-bestiary.Actor.iEQOUQk1wVHFsajW",
    },
    {
        name: "Alchemical Golem",
        linkOld: "Compendium.pf2e.the-slithering-bestiary.Actor.idj4GBmsLUNUbk9r",
        linkNew: "Compendium.pf2e.pathfinder-bestiary.Actor.Tpuqwt6Af29EMtqX",
    },
];