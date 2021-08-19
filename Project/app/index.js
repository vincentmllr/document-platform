const elastic = require("./elastic");
const ganache = require("./ganache");
const express = require('express');
const app = express();

/*
async function start() {
  await app.listen(5000, () => console.log('Server is up and running'));

  await elastic.createIndex();
  //Auf Dateipfad achten!
  await elastic.indexPDF("Kabel.pdf",1,"Wie man Kabel verlegt","VDE", "2015");
  await elastic.indexPDF("RWE_Abschlussarbeit.pdf",2,"Abschlussarbeit RWE","Thasilo","2020");
  await elastic.indexPDF("testpdf.pdf",3,"TestPDF","Ich", "2021");

  setTimeout(async function () {
        const result = await elastic.advancedSearchPDF("TestPDF","Thasilo","");
		app.get('/', (req, res) => {res.send(result)});
    }, 5000);
}

start();
*/
app.listen(5000, () => console.log('Server is up and running'));
console.log(ganache.compileContract());


https://docs.moonbeam.network/getting-started/local-node/deploy-contract/