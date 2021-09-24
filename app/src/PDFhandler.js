/**
@author Jonathan Stelzer
Interface to handle PDFs
@function urltoFile(url, filename, mimeType) Create file from url
@function addMetaPage(thesis) Attach metapage to file
@function getMetadata(uint8, path) Read metadata from metapage
@function generateSHA256(file) Generate SHA256 hash of file
@function checkHash(hashToCheck, uint8) Compare if SHA256 hash is same as of file
*/

//Imports and global variables
import fetch from "node-fetch";
const { PDFDocument } = require('pdf-lib');
const CryptoJS = require("crypto-js");
const model = require("./model");

/**
* Create file from url
* @param {string} url Url to be converted (mostly base64)
* @param {string} filename Name of File
* @param {string} mimeType MIME-Type of the File
* @returns {File} new FileObject
*/
export async function urltoFile(url, filename, mimeType) {
  try {
    return (fetch(url)
      .then(function (res) { return res.arrayBuffer(); })
      .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
    );
  } catch (err) {
    console.error(`An error occurred while creating file from url`);
    console.error(err);
  }
}
/**
* Attach metapage to file
* @param {object} thesis Object to which a page is to be attached
* @returns {string} PDF with metapage as base64
*/
export async function addMetaPage(thesis) {
  try {
    console.log("adding metapage");
    const content = await PDFDocument.load(thesis.fileBase64);
    const doc = await PDFDocument.create();

    const pages = content.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    const page = doc.addPage([width, height]);

    var x1 = 20;        //var for location left-side
    var x2 = 300;       //var for location right-side
    var xd1 = 60;       //var for textField distance left
    var xd2 = 70;       //var for textField distance right

    var textsize = 8;

    const form = doc.getForm()
    page.drawText('peer-metadata thesis', { x: x1 + xd1, y: 780, size: 28 });

    //left-side
    page.drawText('title: ', { x: x1, y: 730, size: textsize });
    const titleField = form.createTextField('title');
    titleField.setText(thesis.title);
    titleField.enableMultiline();
    titleField.enableReadOnly();
    titleField.addToPage(page, { x: xd1 + x1, y: 710 });

    page.drawText('ID: ', { x: x1, y: 680, size: textsize });
    const IDField = form.createTextField('ID');
    IDField.setText(thesis.id.toString());
    IDField.enableMultiline();
    IDField.enableReadOnly();
    IDField.addToPage(page, { x: xd1 + x1, y: 660 });

    page.drawText('year: ', { x: x1, y: 630, size: textsize });
    const yearField = form.createTextField('year');
    yearField.setText(thesis.year);
    yearField.enableMultiline();
    yearField.enableReadOnly();
    yearField.addToPage(page, { x: xd1 + x1, y: 610 });

    page.drawText('university: ', { x: x1, y: 580, size: textsize });
    const uniField = form.createTextField('university');
    uniField.setText(thesis.university);
    uniField.enableMultiline();
    uniField.enableReadOnly();
    uniField.addToPage(page, { x: xd1 + x1, y: 560 });

    page.drawText('abstract: ', { x: x1, y: 530, size: textsize });
    const abstractField = form.createTextField('abstract');
    abstractField.setText(thesis.abstract);
    abstractField.enableMultiline();
    abstractField.enableReadOnly();
    abstractField.addToPage(page, { x: xd1 + x1, y: 510 });

    page.drawText('grade: ', { x: x1, y: 480, size: textsize });
    const gradeField = form.createTextField('grade');
    gradeField.setText(thesis.grade);
    gradeField.enableMultiline();
    gradeField.enableReadOnly();
    gradeField.addToPage(page, { x: xd1 + x1, y: 460 });

    page.drawText('reviews: ', { x: x1, y: 430, size: textsize });
    const reviewField = form.createTextField('reviews');
    reviewField.setText("");
    reviewField.enableMultiline();
    reviewField.enableReadOnly();
    reviewField.addToPage(page, { x: xd1 + x1, y: 410 });

    page.drawText('authorName: ', { x: x1, y: 380, size: textsize });
    const authorNameField = form.createTextField('authorName');
    authorNameField.setText(thesis.author.name);
    authorNameField.enableMultiline();
    authorNameField.enableReadOnly();
    authorNameField.addToPage(page, { x: xd1 + x1, y: 360 });

    page.drawText('authorMail: ', { x: x1, y: 330, size: textsize });
    const authorMailField = form.createTextField('authorMail');
    authorMailField.setText(thesis.author.mail);
    authorMailField.enableMultiline();
    authorMailField.enableReadOnly();
    authorMailField.addToPage(page, { x: xd1 + x1, y: 310 });

    page.drawText('authorFoS: ', { x: x1, y: 280, size: textsize });
    const authorFoSField = form.createTextField('authorFoS');
    authorFoSField.setText(thesis.author.fieldOfStudy);
    authorFoSField.enableMultiline();
    authorFoSField.enableReadOnly();
    authorFoSField.addToPage(page, { x: xd1 + x1, y: 260 });

    page.drawText('authorUni: ', { x: x1, y: 230, size: textsize });
    const authorUniField = form.createTextField('authorUni');
    authorUniField.setText(thesis.author.university);
    authorUniField.enableMultiline();
    authorUniField.enableReadOnly();
    authorUniField.addToPage(page, { x: xd1 + x1, y: 210 });

    page.drawText('authorStudy: ', { x: x1, y: 180, size: textsize });
    const authorStudyField = form.createTextField('authorStudy');
    authorStudyField.setText(thesis.author.fieldOfStudy);
    authorStudyField.enableMultiline();
    authorStudyField.enableReadOnly();
    authorStudyField.addToPage(page, { x: xd1 + x1, y: 160 });

    page.drawText('authorAddress: ', { x: x1, y: 130, size: textsize });
    const authorAddressField = form.createTextField('authorAddress');
    authorAddressField.setText(thesis.author.metaMaskAddress);
    authorAddressField.enableMultiline();
    authorAddressField.enableReadOnly();
    authorAddressField.addToPage(page, { x: xd1 + x1, y: 110 });



    //right-side
    page.drawText('language: ', { x: x2, y: 730, size: textsize });
    const langField = form.createTextField('language');
    langField.setText(thesis.language);
    langField.enableMultiline();
    langField.enableReadOnly();
    langField.addToPage(page, { x: x2 + xd2, y: 710 });

    page.drawText('country: ', { x: x2, y: 680, size: textsize });
    const countryField = form.createTextField('country');
    countryField.setText(thesis.country);
    countryField.enableMultiline();
    countryField.enableReadOnly();
    countryField.addToPage(page, { x: x2 + xd2, y: 660 });

    page.drawText('examinerName: ', { x: x2, y: 630, size: textsize });
    const examinerNameField = form.createTextField('examinerName');
    examinerNameField.setText(thesis.examiner.name);
    examinerNameField.enableMultiline();
    examinerNameField.enableReadOnly();
    examinerNameField.addToPage(page, { x: x2 + xd2, y: 610 });

    page.drawText('examinerMail: ', { x: x2, y: 580, size: textsize });
    const examinerMailField = form.createTextField('examinerMail');
    examinerMailField.setText(thesis.examiner.email);
    examinerMailField.enableMultiline();
    examinerMailField.enableReadOnly();
    examinerMailField.addToPage(page, { x: x2 + xd2, y: 560 });

    page.drawText('examinerUni: ', { x: x2, y: 530, size: textsize });
    const examinerUniField = form.createTextField('examinerUni');
    examinerUniField.setText(thesis.examiner.university);
    examinerUniField.enableMultiline();
    examinerUniField.enableReadOnly();
    examinerUniField.addToPage(page, { x: x2 + xd2, y: 510 });

    page.drawText('examinerInstitute: ', { x: x2, y: 480, size: textsize });
    const examinerInstituteField = form.createTextField('examinerInstitute');
    examinerInstituteField.setText(thesis.examiner.institute);
    examinerInstituteField.enableMultiline();
    examinerInstituteField.enableReadOnly();
    examinerInstituteField.addToPage(page, { x: x2 + xd2, y: 460 });

    page.drawText('examinerWebsite: ', { x: x2, y: 430, size: textsize });
    const examinerWebsiteField = form.createTextField('examinerWebsite');
    examinerWebsiteField.setText(thesis.examiner.website);
    examinerWebsiteField.enableMultiline();
    examinerWebsiteField.enableReadOnly();
    examinerWebsiteField.addToPage(page, { x: x2 + xd2, y: 410 });

    page.drawText('examinerAddress: ', { x: x2, y: 380, size: textsize });
    const examinerAddressField = form.createTextField('examinerAddress');
    examinerAddressField.setText(thesis.examiner.metaMaskAddress);
    examinerAddressField.enableMultiline();
    examinerAddressField.enableReadOnly();
    examinerAddressField.addToPage(page, { x: x2 + xd2, y: 360 });

    page.drawText('fileName: ', { x: x2, y: 330, size: textsize });
    const fileNameField = form.createTextField('fileName');
    fileNameField.setText(thesis.fileName);
    fileNameField.enableMultiline();
    fileNameField.enableReadOnly();
    fileNameField.addToPage(page, { x: x2 + xd2, y: 310 });

    page.drawText('filePath: ', { x: x2, y: 280, size: textsize });
    const filePathField = form.createTextField('filePath');
    filePathField.setText(thesis.filePath);
    filePathField.enableMultiline();
    filePathField.enableReadOnly();
    filePathField.addToPage(page, { x: x2 + xd2, y: 260 });

    const contentPages = await doc.copyPages(content, content.getPageIndices());
    for (const page of contentPages) {
      doc.addPage(page);
    }


    return await doc.saveAsBase64();
  } catch (err) {
    console.error(`An error occurred while adding Metapage`);
    console.error(err);
  }
}

/**
* Read metadata from metapage
* @param {Uint8Arry} uint8 PDF as uint8
* @param {string} path Filepath of PDF
* @returns {object} thesis New thesis-object
*/
export async function getMetadata(uint8, path) {
  try {
    console.log("getting metadata");
    const doc = await PDFDocument.load(uint8);
    const dummyBase64 = await doc.saveAsBase64();
    const form = doc.getForm();

    var thesis = new model.Thesis(
      parseInt(form.getTextField('ID').getText()),
      form.getTextField('title').getText(),
      new model.Author(
        form.getTextField('authorName').getText(),
        form.getTextField('authorMail').getText(),
        form.getTextField('authorUni').getText(),
        form.getTextField('authorFoS').getText(),
        form.getTextField('authorStudy').getText(),
        form.getTextField('authorAddress').getText()
      ),
      new model.Examiner(
        form.getTextField('examinerName').getText(),
        form.getTextField('examinerMail').getText(),
        form.getTextField('examinerUni').getText(),
        form.getTextField('examinerInstitute').getText(),
        form.getTextField('examinerWebsite').getText(),
        form.getTextField('examinerAddress').getText()
      ),
      form.getTextField('year').getText(),
      form.getTextField('language').getText(),
      form.getTextField('country').getText(),
      form.getTextField('university').getText(),
      form.getTextField('abstract').getText(),
      form.getTextField('grade').getText(),
      "",//await urltoFile('data:application/pdf;base64,'+dummyBase64, form.getTextField('fileName').getText(),'application/pdf'),  Not Used till now
      dummyBase64,
      path,
      form.getTextField('fileName').getText(),
      []//form.getTextField('reviews').getText()
    )

    return thesis;
  } catch (err) {
    console.error(`An error occurred while get metadata`);
    console.error(err);
  }
}

/**
* Generate hash of file
* @param {File} file FileObject to which a hash is to be generated
* @returns {string} hash Hashvalue of file
*/
export async function generateSHA256(file) {
  try {
    console.log("generating hash");
    const hash = CryptoJS.SHA256(file).toString(CryptoJS.enc.Hex);
    return hash;
  } catch (err) {
    console.error(`An error occurred while generating hash`);
    console.error(err);
  }
}

/**
* Compare if hash is same as of file
* @param {string} hashToCheck FileObject to which a hash is to be generated
* @param {Uint8Array} uint8 FileObject as uint8array
* @returns {boolean} true if the same hash, false if not
*/
export async function checkHash(hashToCheck, uint8) {
  try {
    console.log("checking hash");
    const doc = await PDFDocument.load(uint8);
    var base64 = await doc.saveAsBase64();
    var file = urltoFile('data:application/pdf;base64,' + base64, 'FileToCheck.pdf', 'application/pdf');
    const newHash = CryptoJS.SHA256(file).toString(CryptoJS.enc.Hex);
    if (hashToCheck == newHash) {

      return true;
    }
    else {

      return false;
    }
  } catch (err) {
    console.error(`An error occurred while get metadata`);
    console.error(err);
  }
}

