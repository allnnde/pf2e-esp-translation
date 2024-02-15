import { resolvePath, resolveValue } from "path-value";
import { convertArray, deletePropertyRecursively, sortObject, mergeNestedObjects } from "../util/utilities.js";

/**
 * Extract pack data from a list of pack groups
 * Returns extracted data and a dictionary for specified fields
 *
 * @param {Array<Object>} packs An array of compendium packs
 * @param {Object} config       Contains the config for the packGroupList
 * @param {Object} itemDatabase Contains a database for compendium items to validate nested item entries against
 * @returns {Object}            Extracted data, stored in extractedPackGroups and packGroupListDictionary
 */
export function extractPackGroupList(packs, config, itemDatabase = {}) {
    const extractedPackGroupListData = {
        extractedPackGroups: {},
        packGroupListDictionary: {},
    };
    for (const [groupName, packGroupConfig] of Object.entries(config)) {
        const extractedPackGroupData = extractPackGroup(
            groupName,
            packs.filter((pack) => packGroupConfig.packNames.includes(pack.fileName)),
            packGroupConfig.mapping,
            itemDatabase
        );
        extractedPackGroupListData.extractedPackGroups[groupName] = extractedPackGroupData.extractedPacks;
        extractedPackGroupListData.packGroupListDictionary = mergeNestedObjects(
            extractedPackGroupListData.packGroupListDictionary,
            extractedPackGroupData.packGroupDictionary
        );
    }
    return extractedPackGroupListData;
}

/**
 * Extract pack data from a pack group
 * Returns extracted data and a dictionary for specified fields
 *
 * @param {Array<Object>} groupName Name of the pack group
 * @param {Array<Object>} packs     An array of compendium packs
 * @param {Object} mapping          Contains the mapping for the packGroup
 * @param {Object} itemDatabase     Contains a database for compendium items to validate nested item entries against
 * @returns {Object}                Extracted data, stored in extractedPacks and packGroupDictionary
 */
export function extractPackGroup(groupName, packs, mapping, itemDatabase = {}) {
    postExtractMessage(groupName, true);

    const extractedPackGroupData = {
        extractedPacks: {},
        packGroupDictionary: {},
    };

    packs.forEach((pack) => {
        const extractedPackData = extractPack(pack.fileName, JSON.parse(pack.content), mapping, itemDatabase);
        extractedPackGroupData.extractedPacks[pack.fileName] = extractedPackData.extractedPack;
        extractedPackGroupData.packGroupDictionary = mergeNestedObjects(
            extractedPackGroupData.packGroupDictionary,
            extractedPackData.packDictionary
        );
    });

    return extractedPackGroupData;
}

/**
 * Extract data from a pack
 * Returns extracted data and a dictionary for specified fields
 *
 * @param {Array<Object>} packName  Name of the pack
 * @param {Array<Object>} pack      A compendium pack
 * @param {Object} mapping          Contains the mapping for the pack
 * @param {Object} itemDatabase     Contains a database for compendium items to validate nested item entries against
 * @returns {Object}                Extracted data, stored in extractedPack and packDictionary
 */
export function extractPack(packName, pack, mapping, itemDatabase = {}) {
    postExtractMessage(packName);

    const extractedPackData = {
        extractedPack: {
            label: packName,
            entries: {},
            mapping: {},
        },
        packDictionary: {},
    };

    pack.forEach((entry) => {
        const extractedEntryData = extractEntry(entry, mapping, itemDatabase);

        extractedPackData.extractedPack.entries[entry.name] = extractedEntryData.extractedEntry;

        extractedPackData.extractedPack.mapping = mergeNestedObjects(
            extractedPackData.extractedPack.mapping,
            extractedEntryData.entryMapping
        );

        extractedPackData.packDictionary = mergeNestedObjects(
            extractedPackData.packDictionary,
            extractedEntryData.entryDictionary
        );
    });
    extractedPackData.extractedPack.entries = sortObject(extractedPackData.extractedPack.entries);
    return extractedPackData;
}

/**
 * Extract data from an entry
 * Returns extracted data, a dictionary, and a mapping for specified fields
 *
 * @param {Object} entry                                                                Entry with data that should get extracted
 * @param {Object} mapping                                                              Paths to fields that should get extracted
 * @param {Object} itemDatabase                                                         Contains a database for compendium items to validate nested item entries against
 * @param {boolean|string} nestedEntryType                                              Specifies, if the entry is nested within other entries, e.g. an ector item
 * @returns {{extractedEntry: Object, entryMapping: Object, entryDictionary: Object}}   Extracted data, mapping, and dictionary entries
 */
export function extractEntry(entry, mapping, itemDatabase = {}, nestedEntryType = false) {
    const extractedEntryData = {
        extractedEntry: {},
        entryMapping: {},
        entryDictionary: {},
    };

    // Initialize default extract options for entry fields
    const defaultExtractOptions = {
        addToDictionary: false, // Defines if values should get extracted to a dictionary
        addToMapping: true, // Defines if keys should get added to mapping if data is found
        convertArray: true, // Defines if an array should get converted to an object list
        specialExtraction: false, // Defines special extractions: actorItems, nameAsKey, nameCollection, tableResults, textCollection, adventureActor
        extractValue: true, // Defines if value should get extracted
        extractOnActorItem: true, // Defines if value should get extracted for items within actors
        extractOnAdventureActor: false, // For special extraction adventureActor, only data for non-compendium actors gets extracted by default. Set to true in order to extract the data
        alternateMappingKey: false, // Defines if a different key should get used for the mapping
        alwaysAddMapping: false, // Defines if mapping should always get added, even if no value is found
        subMapping: false, // Defines if a submapping exists (for nested entries like rules or actor items)
        subMappingAsMapping: false, // Defines if the mapping of the sub-entry should get used as mapping
    };

    // Loop through mappings for the entry, extract matching data
    for (let [mappingKey, mappingData] of Object.entries(mapping)) {
        // Get extract options for the current mapping entry
        const extractOptions = mappingData.extractOptions
            ? { ...defaultExtractOptions, ...mappingData.extractOptions }
            : defaultExtractOptions;

        // Check if alternate mapping key should be used
        mappingKey = extractOptions.alternateMappingKey ? extractOptions.alternateMappingKey : mappingKey;

        // Check if the current field uses a converter
        let hasConverter = false;
        if (mappingData.converter) hasConverter = mappingData.converter;

        // Check for special adventure convertes that should get used instead of the regular converters
        if (
            typeof nestedEntryType === "string" &&
            nestedEntryType.startsWith("adventure") &&
            mappingData.adventureConverter
        ) {
            hasConverter = mappingData.adventureConverter;
        }

        // Check if the current field exists in the compendium entry and extract its value
        let extractedValue = resolvePath(entry, mappingData.path).exists
            ? resolveValue(entry, mappingData.path)
            : false;

        // Add mappings that should always be included
        if (extractOptions.alwaysAddMapping) {
            addMapping(extractedEntryData.entryMapping, { [mappingKey]: mappingData.path }, hasConverter);
        }

        // Check if the current field is relevant for localization
        // Skip further steps if not relevant
        if (!checkLocalizationRelevance(extractedValue)) continue;

        // Further progress extraction steps if field is relevant for localization

        // Don't extract fields that are excluded for actor items
        if (["actorItems", "adventureActorItems"].includes(nestedEntryType) && !extractOptions.extractOnActorItem)
            continue;

        // Don't extract fields on compendium actors within adventures that don't specifically define extraction
        if (nestedEntryType === "adventureCompendiumActors" && !extractOptions.extractOnAdventureActor) {
            continue;
        }

        // Add mapping
        if (extractOptions.addToMapping && !extractOptions.alwaysAddMapping && !extractOptions.subMappingAsMapping) {
            addMapping(extractedEntryData.entryMapping, { [mappingKey]: mappingData.path }, hasConverter);
        }

        // Add to dictionary
        if (extractOptions.addToDictionary) {
            extractedEntryData.entryDictionary = mergeNestedObjects(extractedEntryData.entryDictionary, {
                [mappingKey]: { [String(extractedValue).toLowerCase()]: extractedValue },
            });
        }

        // Check if the current field should get extracted
        // Skip further steps if not
        if (!extractOptions.extractValue) continue;

        // Further progress extraction steps if field should get extracted

        // If extracted value is an array, convert it to an object list
        if (Array.isArray(extractedValue) && extractOptions.convertArray) {
            extractedValue = convertArray(extractedValue);
        }

        if (extractOptions.subMapping) {
            // Loop through list of sub entries and extract their data
            Object.keys(extractedValue).forEach((subEntry) => {
                let subEntryKey = subEntry;
                let nestedEntry = false;

                // For adventure actors, use the name entry as key instead of the array index
                // Also indicate the type of adventure actor for the nested entry extraction
                if (extractOptions.specialExtraction === "adventureActors") {
                    subEntryKey = extractedValue[subEntry].name;
                    nestedEntry = "adventureActors";
                    if (
                        resolvePath(extractedValue[subEntry], "flags.core.sourceId").exists &&
                        extractedValue[subEntry].flags.core.sourceId !== null &&
                        extractedValue[subEntry].flags.core.sourceId.includes("Compendium.pf2e.")
                    ) {
                        nestedEntry = "adventureCompendiumActors";
                    }
                }

                // For actor items, build special key indicate the subentry is an actor item to start a modified extraction
                if (extractOptions.specialExtraction === "actorItems") {
                    subEntryKey = `${extractedValue[subEntry].type}->`;
                    if (extractedValue[subEntry].type === "melee") {
                        subEntryKey = `strike-${extractedValue[subEntry].system.weaponType.value}->`;
                    }
                    subEntryKey = subEntryKey.concat(`${extractedValue[subEntry].name}`);
                    nestedEntry = "actorItems";
                }

                // For items within adventure actors, a special kind of extraction will be done
                if (
                    ["adventureActors", "adventureCompendiumActors"].includes(nestedEntryType) &&
                    extractOptions.specialExtraction === "actorItems"
                ) {
                    nestedEntry = "adventureActorItems";
                }

                // For adventure journal pages, use the name entry as key instead of the array index
                if (extractOptions.specialExtraction === "adventureJournalPages") {
                    subEntryKey = extractedValue[subEntry].name;
                    nestedEntry = "adventureJournalPages";
                }

                // For table results, build special key consisting of the roll ranges
                if (extractOptions.specialExtraction === "tableResults") {
                    subEntryKey = `${extractedValue[subEntry].range[0]}-${extractedValue[subEntry].range[1]}`;
                    nestedEntry = "plainData";
                }

                // For arrays, there might be the need for using the name entry as key instead of the array index
                if (extractOptions.specialExtraction === "nameAsKey") {
                    subEntryKey = extractedValue[subEntry].name;
                }

                // For plain data collections (e.g. notes on scenes) use the entry as key
                if (["nameCollection", "textCollection"].includes(extractOptions.specialExtraction)) {
                    subEntryKey = extractedValue[subEntry][extractOptions.specialExtraction.replace("Collection", "")];
                    nestedEntry = "plainData";
                }

                // Initialize object that contains extrated values
                let extractedSubEntry = {
                    extractedEntry: {},
                    entryMapping: {},
                    entryDictionary: {},
                };

                extractedSubEntry = extractEntry(
                    extractedValue[subEntry],
                    extractOptions.subMapping,
                    itemDatabase,
                    nestedEntry
                );

                // Initialize structure for the current entry in order to receive subentry data and assign subentry data
                if (Object.keys(extractedSubEntry.extractedEntry).length > 0) {
                    extractedEntryData.extractedEntry[mappingKey] = extractedEntryData.extractedEntry[mappingKey] || {};

                    // For regular subentries add the extracted data
                    if (!extractedSubEntry.extractedEntry.hasOwnProperty("duplicateId")) {
                        Object.assign(extractedEntryData.extractedEntry[mappingKey], {
                            [subEntryKey]: extractedSubEntry.extractedEntry,
                        });

                        // For actor items check for duplicates and either add the data or create an array in order to keep all duplicates
                    } else {
                        entryDuplicates(
                            extractedEntryData.extractedEntry[mappingKey],
                            subEntryKey,
                            extractedSubEntry.extractedEntry
                        );
                    }
                }

                // If the sub-entries' mapping should get used instead of the entry mapping, use it
                if (extractOptions.subMappingAsMapping && Object.keys(extractedSubEntry.entryMapping).length > 0) {
                    extractedEntryData.entryMapping[mappingKey] = extractedEntryData.entryMapping[mappingKey] || {};
                    extractedEntryData.entryMapping[mappingKey] = mergeNestedObjects(
                        extractedEntryData.entryMapping[mappingKey],
                        extractedSubEntry.entryMapping
                    );
                }

                extractedEntryData.entryDictionary = mergeNestedObjects(
                    extractedEntryData.entryDictionary,
                    extractedSubEntry.entryDictionary
                );
            });

            // Delete all duplicateIds since those were only required to identify multiple item copies
            deletePropertyRecursively(extractedEntryData.extractedEntry, "duplicateId");

            // During actor item extraction duplicate entries (e.g. two shortswords) were added to the extracted entry as an array with the id as identifier
            // However, entries that only contain the id with not other extracted data are not needed and have to be deleted
            if (typeof extractedEntryData.extractedEntry[mappingKey] === "object") {
                Object.keys(extractedEntryData.extractedEntry[mappingKey]).forEach((subEntry) => {
                    if (Array.isArray(extractedEntryData.extractedEntry[mappingKey][subEntry])) {
                        extractedEntryData.extractedEntry[mappingKey][subEntry] = extractedEntryData.extractedEntry[
                            mappingKey
                        ][subEntry].filter((data) => Object.keys(data).length > 1);
                        if (extractedEntryData.extractedEntry[mappingKey][subEntry].length === 0) {
                            delete extractedEntryData.extractedEntry[mappingKey][subEntry];
                        }
                    }
                });
            }

            continue;
        }
        // Apply special extraction rules on value level
        // Special extraction for actor items
        if (["actorItems", "adventureActorItems"].includes(nestedEntryType)) {
            const formatedActorItem = formatActorItem(
                extractedValue,
                mappingKey,
                mappingData.path,
                entry,
                itemDatabase,
                nestedEntryType
            );
            if (formatedActorItem) {
                extractedEntryData.extractedEntry[mappingKey] = formatedActorItem;
            }

            // Add the item id in order to identify item duplicates (e.g. two shortswords in the actor's inventory)
            extractedEntryData.extractedEntry.duplicateId = entry._id;
            continue;
        }

        // Special extraction for adventure journal pages
        if (nestedEntryType === "adventureJournalPages") {
            // Add the pages id in order to identify multiple pages with the same name
            extractedEntryData.extractedEntry.duplicateId = entry._id;
        }

        // For plain data collections, return the plain value instead of an object using the mapping key
        // This is neccessary due to the required babele data structure for rollable tables
        if (nestedEntryType === "plainData") {
            extractedEntryData.extractedEntry = extractedValue;
            continue;
        }

        extractedEntryData.extractedEntry[mappingKey] = extractedValue;
    }
    return extractedEntryData;
}

/**
 * Formats an extracted value for an actor item
 * This is neccessary, due to the Foundry data structure of many actor items being
 * copies from compendium entries, but receive changes in differenz fields (e.g. name)
 *
 * @param {string} extractedValue   The extracted value that should get formated
 * @param {string} mappingKey       The data field that got its value extracted
 * @param {string} mappingPath      Path to the data field
 * @param {Object} item             The current actor item
 * @param {Object} itemDatabase     Contains a database for compendium items to validate nested item entries against
 * @param {string} nestedEntryType  Defines if the item is an actorItem or an adventureActorItem
 * @returns {string}                The formated value
 */
function formatActorItem(extractedValue, mappingKey, mappingPath, item, itemDatabase = {}, nestedEntryType) {
    const skills = [
        "Acrobatics",
        "Arcana",
        "Athletics",
        "Crafting",
        "Deception",
        "Diplomacy",
        "Intimidation",
        "Medicine",
        "Nature",
        "Occultism",
        "Performance",
        "Religion",
        "Society",
        "Stealth",
        "Survival",
        "Thievery",
    ];

    // Do some special treatment first...

    // ...don't extract names for skills
    if (item.type === "lore" && mappingKey === "name" && skills.includes(item.name)) {
        return false;
    }

    // Check if the item exists in a pf2 system compendium
    if (resolvePath(item, "flags.core.sourceId").exists && itemDatabase[item.flags.core.sourceId]) {
        const databaseItem = itemDatabase[item.flags.core.sourceId];

        // For regular actor items, reduce localization load since items are pulled and merged from a compendium during translation.
        // For adventure actor items however, items may have gotten modified and mustn't get merged with the compendium version.
        // As a result, adventure actor items need to get all relevant fields extracted
        if (nestedEntryType === "actorItems") {
            // Don't extract descriptions for defined item types. Those always use the description from the compendium entry
            if (
                mappingKey === "description" &&
                ["ancestry", "background", "class", "feat", "heritage", "spell"].includes(item.type)
            ) {
                return false;
            }
            if (
                databaseItem[mappingPath] &&
                resolvePath(item, mappingPath).exists &&
                databaseItem[mappingPath] === resolveValue(item, mappingPath)
            ) {
                return false;
            }
        }
        // Add note for description and name to use <Compendium> as a translation if the value should be taken from the compendium
        if (["description", "name"].includes(mappingKey)) {
            return `<Compendium> tag will get replaced with text from compendium entry @UUID[${item.flags.core.sourceId}]\n${extractedValue}`;
        }
    }
    return extractedValue;
}

/**
 * Add mappingData to existing mapping object without duplicates
 * @param {Object} mapping      The current mapping data
 * @param {Object} mappingData  The new mapping that should get added
 * @param {boolean} converter   Specifies if the added mapping has a converter entry
 */
function addMapping(mapping, mappingData, converter = false) {
    Object.keys(mappingData).forEach((mappingKey) => {
        if (!resolvePath(mapping, mappingKey).exists) {
            // Check if the current mapping entry already contains a complete converter mapping
            if (resolvePath(mappingData, [mappingKey, converter]).exists) {
                Object.assign(mapping, { [mappingKey]: mappingData[mappingKey] });
            } else {
                const newMapping = converter
                    ? { path: mappingData[mappingKey], converter: converter }
                    : mappingData[mappingKey];

                Object.assign(mapping, { [mappingKey]: newMapping });
            }
        }
    });
}

/**
 * Post extraction status messages to console
 * @param {string} extractedContent Name of the extracted content
 * @param {boolean} header          Set for posting a header message
 */
export function postExtractMessage(extractedContent, header = false) {
    const message = header
        ? `\n--------------------------\nExtracting: ${extractedContent}\n--------------------------`
        : `Extracted file: ${extractedContent}`;
    console.log(message);
}

/**
 * Check data for localization relevance
 * Ignore empty data fields, empty arrays, and empty objects
 * Ignore numbers, values already containing a localization variable like "PF2E." and other variables
 *
 * @param {*} data      The data that should get checked for relevance
 * @return {boolean}    The check result
 */
function checkLocalizationRelevance(data) {
    if (!data) return false;
    if (Array.isArray(data) && !data.length > 0) return false;
    if (!Array.isArray(data) && typeof data === "object" && !Object.keys(data).length > 0) return false;
    if (!Array.isArray(data) && typeof data !== "object") {
        if (data === null || data === "") return false;
        if (!isNaN(data)) return false;
        if (data.substring(0, 4) === "PF2E") return false;
        if (data.search(RegExp(`^\\{[^\\}]*\\}$`, "g")) !== -1) return false;
        if (data.search(RegExp(`^<p>@Localize\\[[^\\]]*\\]</p>$`, "g")) !== -1) return false;
    }
    return true;
}

/**
 * Create an item database consisting of the Foundry compendium links and defined item properies
 *
 * @param {{path: string, fileName: string, fileType: string, content: string}} itemPacks   The item packs
 * @param {{blacklist: Array<string>, fields: Array<string>, packs: Object}} packMapping    Maps pack files to compendium links and defines required property fields for the database and blacklisted items
 * @returns {Object}                                                                        The item database
 */
export function buildItemDatabase(itemPacks, packMapping) {
    const itemDatabase = {};

    // Loop through item packs and build a database of existing items and defined properties
    itemPacks.forEach((pack) => {
        // Get the packMapping for the current pack if it exists
        if (packMapping.packs[pack.fileName] !== undefined) {
            // Loop through the pack items and build database, exclude items on blacklist
            JSON.parse(pack.content).forEach((item) => {
                const itemLink =
                    item.flags?.core?.sourceId && !packMapping.blacklist.includes(item.flags.core.sourceId)
                        ? item.flags.core.sourceId
                        : "";

                const itemFields = {};

                // Get the required item properties for the item database
                packMapping.fields.forEach((field) => {
                    if (resolvePath(item, field).exists) {
                        itemFields[field] = resolveValue(item, field);
                    }
                });
                if (itemLink !== "" && Object.keys(itemFields).length > 0) {
                    itemDatabase[itemLink] = itemFields;
                }
            });
        }
    });
    return itemDatabase;
}

/**
 * Checks if an object has the specified property
 * If no, the property is added with the value
 * If yes, an array with the old and the new value are created within the property
 * In addition, the new value gets the item's Id added as an identifier
 *
 * @param {Object} obj      The object that should get checked
 * @param {string} property The property that should get added
 * @param {Object} value    The value for the property
 */
function entryDuplicates(obj, property, value) {
    if (!obj.hasOwnProperty(property)) {
        Object.assign(obj, {
            [property]: value,
        });
    } else if (obj.hasOwnProperty(property) && Array.isArray(obj[property])) {
        obj[property].push({
            ...value,
            id: value.duplicateId,
        });
    } else {
        obj[property] = [
            {
                ...obj[property],
                id: obj[property].duplicateId,
            },
            {
                ...value,
                id: value.duplicateId,
            },
        ];
    }
}
