/**
@author Jonathan Stelzer
Interface to communicate with IPFS
@function uploadFile(file) Upload file to IPFS
@function downloadFiles(pathList) Download files from IPFS with path-list
@function downloadFile(path) Download file from IPFS with one path

*/
//Imports and global variables
import { create } from 'ipfs-http-client';
const client = create('https://ipfs.infura.io:5001/api/v0');

/** 
* Upload file to IPFS
* @param {file} file FileObject to upload
* @returns {string} path Path to file
*/
export async function uploadFile(file) {
    try {
        console.log("uploading file...");
        const added = await client.add(file);
        console.log("uploading file successful");
        return added.path;
    } catch (err) {
        console.error(`An error occurred while uploading file to IPFS`);
        console.error(err);
    }
}

/** 
* Download files from IPFS with path-list
* @param {string[]} path Path to files
* @returns {file[]} files FileObjects to download
*/
export async function downloadFiles(pathList) {
    try {
        console.log("downloading files...");
        var filesAsUint8 = [];
        var chunks = [];
        for (var i = 0; i < pathList.length; i++) {
            for await (const chunk of client.get(pathList[i])) {
                chunks.push(chunk)
            }

            // Get the total length of all arrays.
            let length = 0;
            chunks.forEach(item => {
                length += item.length;
            });

            // Create a new array with total length and merge all source arrays.
            let mergedArray = new Uint8Array(length);
            let offset = 0;
            chunks.forEach(item => {
                mergedArray.set(item, offset);
                offset += item.length;
            });
            filesAsUint8.push(mergedArray);
        }
        console.log("downloading files successful");
        return filesAsUint8;
    } catch (err) {
        console.error(`An error occurred while downloading files from IPFS`);
        console.error(err);
    }
}

/** 
* Download file from IPFS with one path
* @param {string} path Path to file
* @returns {file} file FileObject to upload
*/
export async function downloadFile(path) {
    try {
        console.log("downloading file...");
        var chunks = [];
        for await (const chunk of client.get(path)) {
            chunks.push(chunk)
        }

        // Get the total length of all arrays.
        let length = 0;
        chunks.forEach(item => {
            length += item.length;
        });

        // Create a new array with total length and merge all source arrays.
        let fileAsUint8 = new Uint8Array(length);
        let offset = 0;
        chunks.forEach(item => {
            fileAsUint8.set(item, offset);
            offset += item.length;
        });

        console.log("downloading file successful");
        return fileAsUint8;
    } catch (err) {
        console.error(`An error occurred while downloading file from IPFS`);
        console.error(err);
    }
}