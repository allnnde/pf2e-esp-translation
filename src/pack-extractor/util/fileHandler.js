import { copyFileSync, existsSync, lstatSync, mkdirSync, readdirSync, rmdirSync, unlinkSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { BlobReader, BlobWriter, ZipReader } from "@zip.js/zip.js";
import { postExtractMessage } from "../helper/pack-extractor.js";

/**
 * Read zip file, return array of objects containing filename, file type, file path, and file content (as string)
 * @param {Blob} file                                                                       The file as Blob
 * @returns {Promise<{path: string, fileName: string, fileType: string, content: string}>}  Promise containing file name, file type, file path, and file content
 */
export async function getContentFromZip(file) {
    const zipReader = new ZipReader(new BlobReader(file));
    const zipContent = await zipReader.getEntries();
    const zipFiles = zipContent.filter((entry) => !entry.filename.endsWith("/"));
    const fileContentPromises = [];
    zipFiles.forEach((entry) => {
        fileContentPromises.push(entry.getData(new BlobWriter()).then((blobRes) => blobRes.text()));
    });
    const fileContents = await Promise.all(fileContentPromises);
    let i = 0;
    const results = zipFiles.map((entry) => {
        const parsedPath = parsePath(entry.filename);
        const mappedEntry = {
            ...parsedPath,
            ["content"]: fileContents[i],
        };
        i = i + 1;
        return mappedEntry;
    });
    return results;
}

/**
 * Get file from URL as blob
 *
 * @param {URL} url             The file URL
 * @returns {Promise<Blob>}     A Promise for the file's Blob data
 */
export async function getFileFromURL(url) {
    return fetch(url).then((res) => res.blob());
}

/**
 * Get path, file name and file extension from file path
 *
 * @param {string} filePath                                         The complete file path
 * @returns {{path: string, fileName: string, fileType: string}}    Object containing path, file name und file type
 */
export function parsePath(filePath) {
    const parts = filePath.split(/\/|\\/g);
    const fileNameParts = parts.pop().split(".");
    const fileType = fileNameParts.pop();
    const fileName = fileNameParts.join(".");
    const path = parts.join("/") + "/";
    return { path: path, fileName: fileName, fileType: fileType };
}

/**
 * Fetch zip file from URL and return array containing file name, file type, file path, and file content
 *
 * @param {URL} url                                                                         The file URL
 * @returns {Promise<{path: string, fileName: string, fileType: string, content: string}>}  Promise containing file name, file type, file path, and file content
 */
export async function getZipContentFromURL(url) {
    return getContentFromZip(await getFileFromURL(url));
}

/**
 * Write files from Blob
 *
 * @param {Array<{fileName:string, fileType: string, content: Blob}>} files         Array of files that should get saves to a directory
 * @param {string} savePath                                                         Destination directory for the files
 * @param {string} extractMessageHeader                                             Caption for the info log in the console
 */
export function writeFilesFromBlob(files, savePath, extractMessageHeader) {
    postExtractMessage(extractMessageHeader, true);
    files.forEach((entry) => {
        const filePath = `${savePath}/${entry.fileName}.${entry.fileType}`;
        let content = entry.content;

        if (entry.fileType === "json") {
            content = JSON.stringify(JSON.parse(content), null, 2);
        }

        writeFileSync(filePath, content);
        postExtractMessage(`${entry.fileName}.${entry.fileType}`);
    });
}

/**
 * Delete a directory, including all files and subdirectories
 *
 * @param {string} folderPath Path to the directory that should get deleted
 */
export function deleteFolderRecursive(folderPath) {
    if (existsSync(folderPath)) {
        readdirSync(folderPath).forEach((file) => {
            const curPath = join(folderPath, file);
            if (lstatSync(curPath).isDirectory()) {
                // If subdirectory, delete recusively
                deleteFolderRecursive(curPath);
            } else {
                // Delete files
                unlinkSync(curPath);
            }
        });

        // Delete the empty directory
        rmdirSync(folderPath);
    }
}

/**
 * Saves a file to a specified location, creating all required subdirectories
 *
 * @param {string} filePath     Path to the file including the file name
 * @param {string} fileContent  File content
 */
export function saveFileWithDirectories(filePath, fileContent) {
    // Create required directories recursively
    const directoryPath = dirname(filePath);
    if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath, { recursive: true });
    }

    // Write file
    writeFileSync(filePath, fileContent);
}

/**
 * Copies alls subdirectories and files from the source to the target directory
 *
 * @param {string} sourceDir Path to the source directory
 * @param {string} targetDir Path to the target directory
 */
export function copyDirectory(sourceDir, targetDir) {
    if (!existsSync(targetDir)) {
        mkdirSync(targetDir, { recursive: true });
    }

    const files = readdirSync(sourceDir);

    for (const file of files) {
        const sourceFilePath = join(sourceDir, file);
        const targetFilePath = join(targetDir, file);

        if (lstatSync(sourceFilePath).isDirectory()) {
            // If subdirectory, copy recursively
            copyDirectory(sourceFilePath, targetFilePath);
        } else {
            // Copy files
            copyFileSync(sourceFilePath, targetFilePath);
        }
    }
}
