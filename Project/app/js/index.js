const elastic = require("./elastic");
const ganache = require("./ganache");
const express = require('express');
const app = express();

//Was hier gemacht wurde ist eig nur ein kleines Workaround zu Testzwecken

//Der Abschnitt ist für ElasticSearch
//Wichtig für Vincent sind die Funktionen IndexPDF und simple bzw. AdvancedSearch. Damit indexiert man und kann die Indexierten dann suchen
//Ich hatte mir das so vorgestellt, dass man auf einen Button suchen klickt, und dann werden die Felder auf der Website ausgelesen und mit der Funktion übergeben.

/*
async function start() {
  await app.listen(5000, () => console.log('Server is up and running')); //Express-Server auf Port 5000

  await elastic.createIndex(); /Hier wird ein index erstellt, falls es noch keinen gibt
  await elastic.indexPDF("Kabel.pdf",1,"Wie man Kabel verlegt","VDE", "2015");  //Hier werden PDFs indexiert, man übergibt den Dateinahmen, eine Eindeutige ID, Titel, Autor und Jahr
  await elastic.indexPDF("RWE_Abschlussarbeit.pdf",2,"Abschlussarbeit RWE","Thasilo","2020");
  await elastic.indexPDF("testpdf.pdf",3,"TestPDF","Ich", "2021");

  setTimeout(async function () {
        const result = await elastic.advancedSearchPDF("TestPDF","Thasilo",""); //Es gibt 2 Suchfunktionen (simple und advanced), Simple sucht Keyword im Ganzen Text, Advanced sucht nach Titel, Autor, Jahr, wobei einfach "" geschrieben werden kann, falls man eine der Angaben weglässt
		app.get('/', (req, res) => {res.send(result)}); //Sendet Suchergebnis auf Express-Server Port 5000
    }, 5000);
}

start();
*/

//Der Abschnitt ist für Blockchain

const account_from = { //Account mit privateKey und Adresse
  privateKey: "0xb2c488b68a775c823263a436bbb8876c4ba64c4b21a0713c5fede5ad369ef89b",
  address: "0x5fe9dD4c80ab7742B62Fb40CE1fBE37D226645A1",
};

async function start() {
  app.listen(5000, () => console.log('Server is up and running')); //Unwichtig für dich Adrian, habe ich nur drin, damit das Programm weiterläuft

  const compf = await ganache.compileContract("Incrementer.sol","Incrementer"); //Hier werden die .sol Dateien aus dem Ordner smart_contracts eingelesen und compiliert, zurück bekommt man eine Variable mit der Compilierten Datei
  //const wissenschaftlicheArbeit = await ganache.deploy(Mathe, Mueller);
  
  const incrementer = await ganache.deploy(compf,[19], account_from); //Diese Datei übergibt man zusammen mit einer Liste an Argumenten für den Konstruktor (hier [19]) und dem Account, um die Funktion Deploy auszuführen, wobei damit eine Transaktion auf der Blockchain ausgeführt wird und ein weiter Block erstellt wird (denke weil Automining)  
  //Zurück gibt die Funktion Deploy ein JSON aus dem Vertrag (hier icrementer.contract) und der Adresse des Vertrags (hier incrementer.address)
// const suchIndex = await wissenschaftlicheArbeit.contract.methods.getSuchindex();
  const data = await incrementer.contract.methods.number().call(); //über .methods  und .call() kann man nun vom Smart contract die Variable number auslesen.
  console.log(`The current number stored is: ${data}`); //hier wird sie ausgegeben

  const incrementerTx = await incrementer.contract.methods.increment(3); //um eine Funktion des Smart_Contracts auszuführen, muss wie hier links erstmal ein eine Variable mit der Funktion erstellt werden
  await ganache.signTx(incrementer.address,incrementerTx,account_from); //Um die Funktion auszuführen. muss eine Transaktion ausgeführt und signed werden. Das macht man dann wie hier links, mit Adresse des Contracts, der Variable von der Zeile davor sowie dem Account

  const data_after = await incrementer.contract.methods.number().call(); //Hier dann nochmal der Vergleich zu davor, dass die Variable number um 3 erhöht wurde.
  console.log(`The current number stored is: ${data_after}`);

}

start();



