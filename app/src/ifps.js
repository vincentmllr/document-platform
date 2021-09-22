import { create } from 'ipfs-http-client';

/* Create an instance of the client */
const client = create('https://ipfs.infura.io:5001/api/v0');

/* upload the file */
export async function uploadFile(file){
    const added = await client.add(file);
    return added.path;
}

export async function downloadFiles(pathList){
    
    var filesAsUint8 = [];
    var chunks =[];
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

        // Should print an array with length 90788 (5x 16384 + 8868 your source arrays)
        filesAsUint8.push(mergedArray);
    }

    return filesAsUint8;
}