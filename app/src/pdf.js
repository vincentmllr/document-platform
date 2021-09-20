const { PDFDocument } = require('pdf-lib');
const CryptoJS = require("crypto-js");
const fs = require('fs');

addMetaPage('./Testvor.pdf');

async function addMetaPage(file) {
  // Load cover and content pdfs
  const content = await PDFDocument.load(fs.readFileSync(file));
  //const content = await PDFDocument.load(file);

  // Create a new document
  const doc = await PDFDocument.create();

  // Add the cover to the new doc
  const pages = content.getPages()
  const firstPage = pages[0]
  const { width, height } = firstPage.getSize()
  const page = doc.addPage([width, height]);

  var x1 = 30;        //var for location left-side
  var x2 = 300;       //var for location right-side
  var xd = 50;

  var textsize = 8;

  const form = doc.getForm()
  page.drawText('peer-metadata', { x: x1 + xd, y: 780, size: 28 });

  //left-side
  page.drawText('title: ', { x: x1, y: 730, size: textsize });
  const titleField = form.createTextField('title');
  titleField.setText('Entwicklung aktueller Energieszenarien');
  titleField.enableMultiline();
  titleField.enableReadOnly();
  titleField.addToPage(page, { x: xd + x1, y: 710 });

  page.drawText('author: ', { x: x1, y: 680, size: textsize });
  const authorField = form.createTextField('author');
  authorField.setText('Jonathan Stelzer');
  authorField.enableMultiline();
  authorField.enableReadOnly();
  authorField.addToPage(page, { x: xd + x1, y: 660 });

  page.drawText('year: ', { x: x1, y: 630, size: textsize });
  const yearField = form.createTextField('year');
  yearField.setText('2020');
  yearField.enableMultiline();
  yearField.enableReadOnly();
  yearField.addToPage(page, { x: xd + x1, y: 610 });

  page.drawText('university: ', { x: x1, y: 580, size: textsize });
  const uniField = form.createTextField('university');
  uniField.setText('Karlsruher Institut für Technologie');
  uniField.enableMultiline();
  uniField.enableReadOnly();
  uniField.addToPage(page, { x: xd + x1, y: 560 });

  //right-side
  page.drawText('language: ', { x: x2, y: 730, size: textsize });
  const langField = form.createTextField('language');
  langField.setText('deutsch');
  langField.enableMultiline();
  langField.enableReadOnly();
  langField.addToPage(page, { x: x2 + xd, y: 710 });

  page.drawText('country: ', { x: x2, y: 680, size: textsize });
  const countryField = form.createTextField('country');
  countryField.setText('Deutschland');
  countryField.enableMultiline();
  countryField.enableReadOnly();
  countryField.addToPage(page, { x: x2 + xd, y: 660 });

  // Add individual content pages
  const contentPages = await doc.copyPages(content, content.getPageIndices());
  for (const page of contentPages) {
    doc.addPage(page);
  }

  // Write the PDF to a file
  fs.writeFileSync('./test.pdf', await doc.save());
  //return await doc.save();
}

async function getMetadata(file) {

  //const doc = await PDFDocument.load(fs.readFileSync('./test.pdf'));
  const doc = await PDFDocument.load(file);
  const form = doc.getForm()


  const title = form.getTextField('title').getText();
  const author = form.getTextField('author').getText();
  const year = form.getTextField('year').getText();

  console.log("Titel: " + title + " Autor: " + author + " year: " + year);
}

async function generateSHA256(file) {
  //var file = fs.readFileSync('./testx.pdf');
  //file = file.toString("hex");

  const hash = CryptoJS.SHA256(file).toString(CryptoJS.enc.Hex);
  return hash;
}

async function checkHash(hashToCheck, file) {

  //var file = fs.readFileSync('./test.pdf');
  //file = file.toString("hex");

  const newHash = CryptoJS.SHA256(file).toString(CryptoJS.enc.Hex);
  if (hashToCheck == newHash) {

    return true;
  }
  else {
    
    return false;
  }
}