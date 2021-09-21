import { create } from 'ipfs-http-client';

/* Create an instance of the client */
const client = create('https://ipfs.infura.io:5001/api/v0');

/* upload the file */
export async function uploadFile(file){
    const added = await client.add(file);
    return added.path;
}

export async function downloadFiles(path){
    for await (const chunk of client.cat(path)) {
        console.log(chunk);
      }
}