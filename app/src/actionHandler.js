/**
@author Jonathan Stelzer
Interface to handle actions
@function submit(thesisToSubmit) Handles submitting Thesis by deploy to blockchain
@function verificate(path) Handles verificate PDF
@function startListener() Starts listener
@function actionOfListener() Handles action for the listener
@function changeThesis(newThesis, oldID) Handles to change existing thesis
@function downloadThesis(thesis) Handles download PDF
*/

//Imports and global variables
const pdfHandler = require("./pdfHandler");
const elastic = require("./elastic");
const ganache = require("./ganache");
const ipfs = require("./ipfs");
const { PDFDocument } = require("pdf-lib");

/**
* Handles submitting Thesis by deploy to blockchain
* @param {object} thesisToSubmit the thesis to be submitted
*/
export async function submit(thesisToSubmit) {
    try {
        console.log("Submitting...");
        var base64 = await pdfHandler.addMetaPage(thesisToSubmit);
        var file = await pdfHandler.urltoFile('data:application/pdf;base64,' + base64, thesisToSubmit.fileName, 'application/pdf');
        var hash = await pdfHandler.generateSHA256(file);
        var path = await ipfs.uploadFile(file);
        var success = await ganache.deploy([thesisToSubmit.title, thesisToSubmit.author.name, path, hash, thesisToSubmit.author.metaMaskAddress, thesisToSubmit.examiner.metaMaskAddress]);
        if (success)
            console.log("Submitting successful");
    } catch (err) {
        console.error(`An error occurred while submitting`);
        console.error(err);
    }
}

/**
* Handles verificate PDF
* @param {string} FilePath of PDF
*/
export async function verificate(path) {
    try {
        console.log("Verifying...");
        var u8int = await ipfs.downloadFile(path);
        var hashToCheck = await ganache.getHashOfPath(path);
        console.log("Verification completed");
        return await pdfHandler.checkHash(hashToCheck, u8int);
    } catch (err) {
        console.error(`An error occurred while verifying`);
        console.error(err);
    }
}

/**
* Starts listener
*/
export async function startListener(){
    var web3 = await ganache.getWeb3();
    await actionOfListener();
    await web3.eth.subscribe('newBlockHeaders', function(error, result){
        if (!error) {
            return;
        }
        console.error(error);
    })
    .on("connected", function(){
        console.log("Listener Started and ready");
    })
    .on("data", function(){
        actionOfListener();
    })
    .on("error", console.error);
}

/**
* Handles action for the listener
*/
export async function actionOfListener() {
    try {
        console.log("Transaction detected");
        console.log("Getting data...");
        var addresses = await ganache.getAddressOfContracts();
        var pathList = await ganache.getPathOfContracts(addresses);
        var filesAsUint8 = await ipfs.downloadFiles(pathList);
        console.log("Indexing "+filesAsUint8.length+" files, please wait till get "+filesAsUint8.length+" indexing pdf was successful...");
        for (let i = 0; i < filesAsUint8.length; i++) {
            elastic.indexPDF(await pdfHandler.getMetadata(filesAsUint8[i], pathList[i]));
        }
        console.log("Action of listener completed, please wait till indexing completed...");
    } catch (err) {
        console.error(`An error occurred doing action of listener`);
        console.error(err);
    }
}

/**
* Handles to change existing thesis
* @param {object} newThesis Thesis object with new attributes
* @param {int} oldID Old elasticsearch ID
*/
export async function changeThesis(newThesis, oldID) {
    try {
        console.log("Thesis Change started");
        var base64 = await pdfHandler.addMetaPage(newThesis);
        var file = await pdfHandler.urltoFile('data:application/pdf;base64,' + base64, newThesis.fileName, 'application/pdf');
        var hash = await pdfHandler.generateSHA256(file);
        var newPath = await ipfs.uploadFile(file);
        var contract = await ganache.getContractOfPath(newThesis.filePath)

        //listener should react to this and index PDF, old indexed object will be deleted
        var success = await contract.methods.changeThesis(newThesis.title, newThesis.author.name, newPath, hash, newThesis.author.metaMaskAddress, newThesis.examiner.metaMaskAddress).send({
            from: await ganache.getAccount()
        });
        if (success) {
            await elastic.deleteByID(oldID);
            console.log("Thesis changed")
            return true;
        }
    } catch (err) {
        console.error(`An error occurred while change thesis`);
        console.error(err);
    }
}

/**
* Handles download PDF
* @param {object} thesis Thesis object of PDF which should be downloaded
*/
export async function downloadThesis(thesis) {
    try {
        console.log("download Thesis clicked");
        var uint8 = await ipfs.downloadFile(thesis.filePath);
        const doc = await PDFDocument.load(uint8);
        var base64 = await doc.saveAsBase64();
        var file = await pdfHandler.urltoFile('data:application/pdf;base64,' + base64, thesis.fileName, 'application/pdf');
        return file;
    } catch (err) {
        console.error(`An error occurred while download thesis`);
        console.error(err);
    }
}