import { ClassicLevel } from "classic-level";
import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { deleteFolderRecursive } from "./file-handler.js";
import { isDoc } from "./utilities.js";

// Supported database types
const DB_KEYS = ["adventures", "actors", "items", "journal", "macros", "tables"];

// Database options
const DB_OPTIONS = { keyEncoding: "utf8", valueEncoding: "json" };

/**
 * Extracts the relevant keys for a pack from the pack's keys
 *
 * @param {Array<string>} packKeys                          Array containing the pack's keys
 * @returns {{dbKey:string|null,subKey:string|null}|null}   Object containing key and sub key for a database
 */
function getPackKeys(packKeys) {
  for (const packKey of packKeys) {
    for (const dbKey of DB_KEYS) {
      if (packKey.startsWith(`!${dbKey}!`)) {
        return { dbKey: dbKey, subKey: getSubKey(dbKey) };
      }
    }
  }
  return null;
}

/**
 * Gets the sub key for a given pack type
 *
 * @param {string} packType     The pack type
 * @returns {string|null}       The sub key for the pack type
 */
function getSubKey(packType) {
  switch (packType) {
    case "actors":
      return "items";
    case "journal":
      return "pages";
    case "tables":
      return "results";
    default:
      return null;
  }
}

/**
 * Extracts data from a levelDB pack
 *
 * @param {string} databasePath                                                         Path to the levelDB database
 * @returns {Promise<{packType:string, packData:Array<Object>,folders:Array<Object>}>}  Promise for an object including the pack type, pack data and the pack's folders
 */
export async function getJSONfromPack(databasePath, packType = null) {
  const db = new ClassicLevel(databasePath, DB_OPTIONS);
  const { dbKey, subKey } = packType ? { dbKey: packType, subKey: getSubKey(packType) } : getPackKeys(await db.keys().all());

  if (!dbKey) {
    return null;
  }

  const mainDb = db.sublevel(dbKey, DB_OPTIONS);
  const subDb = dbKey ? db.sublevel(`${dbKey}.${subKey}`, DB_OPTIONS) : null;
  const foldersDb = db.sublevel("folders", DB_OPTIONS);

  const packData = [];
  for await (const [mainId, source] of mainDb.iterator()) {
    if (subKey && source[subKey] && subDb) {
      const subDocs = await subDb.getMany(source[subKey]?.map((subId) => `${mainId}.${subId}`) ?? []);
      source[subKey] = subDocs;
    }
    packData.push(source);
  }
  const folders = [];
  for await (const [_key, folder] of foldersDb.iterator()) {
    folders.push(folder);
  }
  await db.close();

  return { packType: dbKey, packData: packData, folders: folders };
}

/**
 * Creates a Foundry levelDB pack. Can also add folder structures if provided
 *
 * @param {string} databasePath         Save path for the LevelDB
 * @param {string} packType             The pack type (adventures, actors, items, journal, macros, tables)
 * @param {Array<Object>} sourceData    The pack's data
 * @param {Array<Object>} folders       The pack's folders
 */
export async function createPack(databasePath, packType, sourceData, folders = []) {
  const db = new ClassicLevel(databasePath, DB_OPTIONS);
  await db.open();
  const { dbKey, subKey } = { dbKey: packType, subKey: getSubKey(packType) };

  // Initialize sublevel DBs
  const mainDb = db.sublevel(dbKey, DB_OPTIONS);
  await mainDb.open();
  const subDb = dbKey ? db.sublevel(`${dbKey}.${subKey}`, DB_OPTIONS) : null;
  await subDb?.open();
  const foldersDb = db.sublevel("folders", DB_OPTIONS);

  const docBatch = mainDb.batch();
  const embeddedBatch = subDb?.batch();

  // Loop through pack data
  for (const source of sourceData) {
    if (subKey) {
      const embeddedDocs = source[subKey];
      if (Array.isArray(embeddedDocs)) {
        for (let i = 0; i < embeddedDocs.length; i++) {
          const doc = embeddedDocs[i];
          if (isDoc(doc) && embeddedBatch) {
            embeddedBatch.put(`${source._id}.${doc._id}`, doc);
            embeddedDocs[i] = doc._id;
          }
        }
      }
    }
    docBatch.put(source._id, source);
  }
  await docBatch.write();
  if (embeddedBatch?.length) {
    await embeddedBatch.write();
  }

  // Add pack folders if provided
  if (folders.length) {
    const folderBatch = foldersDb.batch();
    for (const folder of folders) {
      folderBatch.put(folder._id, folder);
    }
    await folderBatch.write();
  }
  await db.close();
}

/**
 * Creates json files from LevelDB directories within a ZIP file
 *
 * @param {Object} zipEntries                           ZIP file contents
 * @param {string} subDirName                           Subdirectory within ZIP fiule conaining the LevelDB directories
 * @returns {[{fileName:string, fileContent:string}]}   Array of Objects containing name and content for the json file
 */
export async function extractAndReadPacksFromZip(zipEntries, subDirName, levelDBs) {
  // Filter subdirectory
  const relevantFiles = zipEntries.filter((e) => e.path?.startsWith(subDirName + "/"));
  if (relevantFiles.length === 0) {
    console.warn(`No data within '${subDirName}/'`);
    return [];
  }

  // Create temp directory
  const tempRoot = join(process.cwd(), `packs-${Date.now()}`);
  mkdirSync(tempRoot, { recursive: true });

  // Write ZIP files to temp directory
  for (const entry of relevantFiles) {
    const fileName = entry.fileName + (entry.fileType ? `.${entry.fileType}` : "");
    const fullPath = join(tempRoot, entry.path, fileName);
    mkdirSync(dirname(fullPath), { recursive: true });
    writeFileSync(fullPath, entry.content);
  }

  // Read only requested LevelDBs
  const packsRoot = join(tempRoot, subDirName);
  const packResults = [];

  for (const { levelDBName, fileName, mapping } of levelDBs || []) {
    const dbPath = join(packsRoot, levelDBName);
    const data = await getJSONfromPack(dbPath);
    if (data) {
      packResults.push({
        fileName,
        fileContent: data,
        mapping,
      });
    }
  }

  // Delete temp directory
  deleteFolderRecursive(tempRoot);

  return packResults;
}
