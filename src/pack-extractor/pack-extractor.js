import { readFileSync } from "fs";
import { parseArgs } from "node:util";
import { PF2_DEFAULT_MAPPING } from "../helper/pack-extractor/constants.js";
import { buildItemDatabase, extractPack, extractPackGroupList, postExtractMessage } from "../helper/pack-extractor/pack-extractor.js";
import { getFileFromURL, getZipContentFromURL, saveFileWithDirectories } from "../helper/util/file-handler.js";
import { extractAndReadPacksFromZip } from "../helper/util/level-db.js";
import { replaceProperties } from "../helper/util/utilities.js";
import { preparePF2ePacks, resolvePF2eRelease } from "./pf2e-release.js";

const { values: options } = parseArgs({ options: {
  version: { type: "string" },
  "system-only": { type: "boolean", default: false },
} });

// Read config file
const configFile = JSON.parse(readFileSync("./src/pack-extractor/pack-extractor-config.json", "utf-8"));

const release = await resolvePF2eRelease({ ...configFile.pf2eRelease, version: options.version });
postExtractMessage(`PF2e ${release.version} (${release.tag})`, true);
const [zipEntries, manifestBlob] = await Promise.all([
  getZipContentFromURL(release.zipURL),
  getFileFromURL(release.manifestURL),
]);
const manifest = JSON.parse(await manifestBlob.text());
if (manifest.version !== release.version) throw new Error(`PF2e manifest version ${manifest.version} does not match ${release.tag}`);
const prepared = preparePF2ePacks(zipEntries, manifest, configFile);
const CONFIG = { ...configFile, packs: prepared.groups, mappings: structuredClone(PF2_DEFAULT_MAPPING) };
const packs = prepared.packs;

// Validate all configured language files before generating or writing any output.
const i18nFiles = CONFIG.i18nFiles.map(file => {
  const entry = packs.find(pack => `${pack.path}${pack.fileName}.${pack.fileType}` === `lang/${file}`);
  if (!entry) throw new Error(`${release.tag} is missing lang/${file}`);
  JSON.parse(entry.content);
  return entry;
});
const outputFiles = new Map();
const addJSON = (file, data) => outputFiles.set(file, JSON.stringify(data, null, 2));

// Replace linked mappings and savePaths with actual data
replaceProperties(CONFIG.mappings, ["subMapping"], CONFIG.mappings);
replaceProperties(CONFIG.packs, ["mapping"], CONFIG.mappings);
replaceProperties(CONFIG.packs, ["savePath"], CONFIG.filePaths.packs);

// Build item database in order to compare actor items with their comdendium entries
const itemDatabase = buildItemDatabase(packs, CONFIG.itemDatabase);

// Extract data for all configured packs
const extractedPackGroupList = extractPackGroupList(packs, CONFIG.packs, itemDatabase);

// Collect outputs; a failed download or extraction must not leave a partially updated source tree.
Object.keys(extractedPackGroupList.extractedPackGroups).forEach((packGroup) => {
  const path = CONFIG.packs[packGroup].savePath;
  Object.keys(extractedPackGroupList.extractedPackGroups[packGroup]).forEach((pack) => {
    addJSON(`${path}/${pack}.json`, extractedPackGroupList.extractedPackGroups[packGroup][pack]);
  });
});

// Write dictionary to target directory
addJSON(CONFIG.filePaths.dictionary, extractedPackGroupList.packGroupListDictionary);

// Extract and write i18n files
for (const file of i18nFiles) addJSON(`${CONFIG.filePaths.i18n}/${file.fileName}.${file.fileType}`, JSON.parse(file.content));

// Extract and write i18n files and compendiums for modules
postExtractMessage("module localizations", true);
for (const [moduleId, moduleData] of Object.entries(options["system-only"] ? {} : configFile.moduleLocalizations.modules ?? {})) {
  const zipEntries = await getZipContentFromURL(moduleData.url);

  // Get i18n file
  if (moduleData.i18nFile) {
    const i18nFile = zipEntries.find((o) => `${o.path}${o.fileName}.${o.fileType}` === moduleData.i18nFile);
    if (!i18nFile) {
      throw new Error(`${moduleId}: ZIP is missing ${moduleData.i18nFile}`);
    } else {
      postExtractMessage(`i18n for ${moduleId}`);
      addJSON(`${configFile.moduleLocalizations.savePathi18n}/${moduleId}.json`, JSON.parse(i18nFile.content));
    }
  }

  // Extract compendiums
  if (moduleData.compendiums) {
    for (const comp of moduleData.compendiums) {
      const extractedDBs = await extractAndReadPacksFromZip(zipEntries, comp.subDirName, comp.levelDBs);
      if (extractedDBs.length !== comp.levelDBs.length) throw new Error(`${moduleId}: incomplete compendium extraction`);
      for (const extractedDB of extractedDBs) {
        const extractedPack = extractPack(extractedDB.fileName, extractedDB.fileContent.packData, CONFIG.mappings[extractedDB.mapping]);
        addJSON(`${configFile.moduleLocalizations.savePathCompendium}/${extractedDB.fileName}`, extractedPack.extractedPack);
      }
    }
  }
}

addJSON(CONFIG.filePaths.sourceMetadata, {
  system: manifest.id,
  ...release,
  compatibility: manifest.compatibility,
  packCount: manifest.packs.length,
});
for (const [file, content] of outputFiles) saveFileWithDirectories(file, content);
postExtractMessage(`Saved ${outputFiles.size} source files for PF2e ${release.version}`, true);
