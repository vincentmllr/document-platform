const pdfHandler = require("./PDFhandler");
const elastic = require("./elastic");
const ganache = require("./ganache");
const ifps = require("./ifps");

export async function submit(thesisToSubmit) {
    var base64 = await pdfHandler.addMetaPage(thesisToSubmit);
    var file = await pdfHandler.urltoFile('data:application/pdf;base64,' + base64, thesisToSubmit.fileName, 'application/pdf');
    var hash = await pdfHandler.generateSHA256(file);
    var path = await ifps.uploadFile(file);
    await ganache.deploy([thesisToSubmit.title, thesisToSubmit.author.name, path , hash, thesisToSubmit.author.metaMaskAddress, thesisToSubmit.examiner.metaMaskAddress]);
}

export async function verificate(path) {

    var u8int = await ifps.downloadFile(path);
    var hashToCheck = await ganache.getHashOfPath(path);
    return await pdfHandler.checkHash(hashToCheck, u8int);
}

export async function actionOfListener() {
    console.log("Listener started");
    var addresses = await ganache.getAddressOfContracts();
    var pathList = await ganache.getPathOfContracts(addresses);
    var filesAsUint8 = await ifps.downloadFiles(pathList);
    for (var i = 0; i < filesAsUint8.length; i++) {
      elastic.indexPDF(await pdfHandler.getMetadata(filesAsUint8[i], pathList[i]));
    }
    console.log("Listener completed");
}

export async function changeThesis(newThesis, oldID) {
    console.log("Thesis Change started");
    var base64 = await pdfHandler.addMetaPage(newThesis);
    var file = await pdfHandler.urltoFile('data:application/pdf;base64,' + base64, newThesis.fileName, 'application/pdf');
    var hash = await pdfHandler.generateSHA256(file);
    var newPath = await ifps.uploadFile(file);
    var contract = await ganache.getContractOfPath(newThesis.filePath)

    console.log(newPath);
    //listener should react to this and index PDF, old indexed object will be deleted
    var success = await contract.methods.changeThesis(newThesis.title, newThesis.author.name, newPath, hash, newThesis.author.metaMaskAddress, newThesis.examiner.metaMaskAddress).send({
        from: await ganache.getAccount()
        });
    if (success) {
        await elastic.deleteByID(oldID);
        console.log("Thesis changed")
    }
}