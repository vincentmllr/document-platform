import fetch from "node-fetch";
const { PDFDocument } = require('pdf-lib');
const CryptoJS = require("crypto-js");

 //return a promise that resolves with a File instance
 //getPDF.urltoFile('data:application/pdf;base64,'+res, 'hello.pdf','application/pdf'
    export function urltoFile(url, filename, mimeType){
        return (fetch(url)
            .then(function(res){return res.arrayBuffer();})
            .then(function(buf){return new File([buf], filename,{type:mimeType});})
        );
    }
    
    export async function addMetaPage(base64, thesis) {
        // Load cover and content pdfs
        const content = await PDFDocument.load(base64);
      
        // Create a new document
        const doc = await PDFDocument.create();
      
        // Add the cover to the new doc
        const pages = content.getPages()
        const firstPage = pages[0]
        const { width, height } = firstPage.getSize()
        const page = doc.addPage([width, height]);
      
        var x1 = 30;        //var for location left-side
        var x2 = 300;       //var for location right-side
        var xd = 50;        //var for textField distance
      
        var textsize = 8;
      
        const form = doc.getForm()
        page.drawText('peer-metadata thesis', { x: x1 + xd, y: 780, size: 28 });
      
        //left-side
        page.drawText('title: ', { x: x1, y: 730, size: textsize });
        const titleField = form.createTextField('title');
        titleField.setText(thesis.title);
        titleField.enableMultiline();
        titleField.enableReadOnly();
        titleField.addToPage(page, { x: xd + x1, y: 710 });
      
        page.drawText('ID: ', { x: x1, y: 680, size: textsize });
        const IDField = form.createTextField('ID');
        IDField.setText(thesis.id);
        IDField.enableMultiline();
        IDField.enableReadOnly();
        IDField.addToPage(page, { x: xd + x1, y: 660 });
      
        page.drawText('year: ', { x: x1, y: 630, size: textsize });
        const yearField = form.createTextField('year');
        yearField.setText(thesis.year);
        yearField.enableMultiline();
        yearField.enableReadOnly();
        yearField.addToPage(page, { x: xd + x1, y: 610 });
      
        page.drawText('university: ', { x: x1, y: 580, size: textsize });
        const uniField = form.createTextField('university');
        uniField.setText(thesis.university);
        uniField.enableMultiline();
        uniField.enableReadOnly();
        uniField.addToPage(page, { x: xd + x1, y: 560 });

        page.drawText('abstract: ', { x: x1, y: 530, size: textsize });
        const abstractField = form.createTextField('abstract');
        abstractField.setText(thesis.abstract);
        abstractField.enableMultiline();
        abstractField.enableReadOnly();
        abstractField.addToPage(page, { x: xd + x1, y: 510 });

        page.drawText('grade: ', { x: x1, y: 480, size: textsize });
        const gradeField = form.createTextField('grade');
        gradeField.setText(thesis.grade);
        gradeField.enableMultiline();
        gradeField.enableReadOnly();
        gradeField.addToPage(page, { x: xd + x1, y: 460 });

        page.drawText('reviews: ', { x: x1, y: 430, size: textsize });
        const reviewField = form.createTextField('reviews');
        reviewField.setText(thesis.reviews);
        reviewField.enableMultiline();
        reviewField.enableReadOnly();
        reviewField.addToPage(page, { x: xd + x1, y: 410 });

        page.drawText('authorName: ', { x: x1, y: 380, size: textsize });
        const authorNameField = form.createTextField('authorName');
        authorNameField.setText(thesis.author.name);
        authorNameField.enableMultiline();
        authorNameField.enableReadOnly();
        authorNameField.addToPage(page, { x: xd + x1, y: 360 });

        page.drawText('authorMail: ', { x: x1, y: 330, size: textsize });
        const authorMailField = form.createTextField('authorMail');
        authorMailField.setText(thesis.author.mail);
        authorMailField.enableMultiline();
        authorMailField.enableReadOnly();
        authorMailField.addToPage(page, { x: xd + x1, y: 310 });

        page.drawText('authorFoS: ', { x: x1, y: 280, size: textsize });
        const authorFoSField = form.createTextField('authorFoS');
        authorFoSField.setText(thesis.author.fieldOfStudy);
        authorFoSField.enableMultiline();
        authorFoSField.enableReadOnly();
        authorFoSField.addToPage(page, { x: xd + x1, y: 260 });

        page.drawText('authorName: ', { x: x1, y: 230, size: textsize });
        const authorNameField = form.createTextField('authorName');
        authorNameField.setText(thesis.author.name);
        authorNameField.enableMultiline();
        authorNameField.enableReadOnly();
        authorNameField.addToPage(page, { x: xd + x1, y: 210 });

        page.drawText('authorName: ', { x: x1, y: 180, size: textsize });
        const authorNameField = form.createTextField('authorName');
        authorNameField.setText(thesis.author.name);
        authorNameField.enableMultiline();
        authorNameField.enableReadOnly();
        authorNameField.addToPage(page, { x: xd + x1, y: 160 });

        page.drawText('authorName: ', { x: x1, y: 130, size: textsize });
        const authorNameField = form.createTextField('authorName');
        authorNameField.setText(thesis.author.name);
        authorNameField.enableMultiline();
        authorNameField.enableReadOnly();
        authorNameField.addToPage(page, { x: xd + x1, y: 110 });


      
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
        //fs.writeFileSync('./test.pdf', await doc.save());
        return await doc.saveAsBase64();
      }

      export async function getMetadata(u8int) {

        //const doc = await PDFDocument.load(fs.readFileSync('./test.pdf'));
        const doc = await PDFDocument.load(u8int);
        const form = doc.getForm()
      
      
        const title = form.getTextField('title').getText();
        const author = form.getTextField('author').getText();
        const year = form.getTextField('year').getText();
      
        console.log("Titel: " + title + " Autor: " + author + " year: " + year);
      }
      
      export async function generateSHA256(file) {
      
        const hash = CryptoJS.SHA256(file).toString(CryptoJS.enc.Hex);
        return hash;
      }
      
      export async function checkHash(hashToCheck, file) {
      
        const newHash = CryptoJS.SHA256(file).toString(CryptoJS.enc.Hex);
        if (hashToCheck == newHash) {
      
          return true;
        }
        else {
          
          return false;
        }
      }