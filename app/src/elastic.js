/**
Interface to communicate with elasticsearch
@function createIndex() Create index named by const index
@function addPipeline() Adding requiered pipeline for indexing PDFs
@function indexPDF(thesis) indexing Thesis/PDF
@function simpleSearchPDF(keyword) Search PDF by keyword
@function advancedSearchPDF(keyword, title, author, year, language, country, university) Search PDF by multiple optinal params
@function resultsToTheses(results) Convert search results to thesis-object array
@function deleteByID(ID) Deletes indexed object by ID
@function newID() Returns a not used ID between 0 and 99999 for indexing new object 

*/
//Imports and global variables
const { Client } = require("elasticsearch"); 
                   require("dotenv").config();
const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";
const esclient   = new Client({ node: elasticUrl });
const model  = require('./model');
const index = "peerindex"; //indexname

/**
* Create index named by const index
* @returns true if successful
*/
export async function createIndex() {
  try {

    var exists = await esclient.indices.exists({ index: index });  //check if index exists
    if (exists) {
      console.log("index already exists")
    }
    else {
      await esclient.indices.create({ index: index });
      console.log(`Created index ${index}`);
      await addPipeline();
      return true;
    }

  } catch (err) {
    console.error(`An error occurred while creating the index ${index}:`);
    console.error(err);
  }
}

/**
* Adding requiered pipeline for indexing PDFs
* @returns true if successful
*/
async function addPipeline() {
  await esclient.ingest.putPipeline({
    id: 'attachment',
    body: {
      "description": "Extract attachment information",
      "processors": [
        {
          "attachment": {
            "field": "fileBase64"
          }
        }]
    }
  })
    .then(function () {
      console.log("putPipeline successful");
      return true;
    })
    .catch(function (error) {
      console.log(`An error occurred while put Pipeline`);
      console.log(error);
    });
};

/**
* Indexing Thesis/PDF
* @param thesis
* @returns true if successful
*/
export async function indexPDF(thesis) {
  try {
    var base64pdf = thesis.fileBase64;
    base64pdf = thesis.fileBase64.substring(base64pdf.indexOf(",") + 1); //delete some chars at beginning of base64 which are not necessery
    await esclient.index({
      index: index,
      id: thesis.id,
      pipeline: "attachment",
      body: {

        title: thesis.title,
        
        authorName: thesis.author.name,
        authorMail: thesis.author.email,
        authorUniversity: thesis.author.university,
        authorFieldOfStudy: thesis.author.fieldOfStudy,
        authorStudyInterests: thesis.author.studyInterests,
        authorMetaMaskAddress: thesis.author.metaMaskAddress,

        examinerName: thesis.examiner.name,
        examinerMail: thesis.examiner.email,
        examinerUniversity: thesis.examiner.university,
        examinerInstitute: thesis.examiner.institute,
        examinerWebsite: thesis.examiner.website,
        examinerMetaMaskAddress: thesis.examiner.metaMaskAddress,

        year: thesis.year,     
        language: thesis.language,
        country: thesis.country,
        abstract: thesis.abstract,
        university: thesis.university,
        grade: thesis.grade,
     
        file: thesis.file, //maybe not able to index => if error, change also in resultsToThesis
        fileName: thesis.fileName,
        fileBase64: base64pdf,
        filePath: thesis.filePath,

        reviews: thesis.reviews

      }

    }
    );
    console.log(`indexing pdf was successful`);
    return true;
  }
  catch (err) {
    console.error(`An error occurred while indexing the PDF`);
    console.error(err);
  }
}

/**
* Search PDF by keyword
* @param {string} keyword The phrase to search for
* @returns {Thesis[]} array of matching Theses
*/
export async function simpleSearchPDF(keyword) {

  try {
    const query = {
      query: {
        match: {
          "attachment.content": {
            query: keyword,
            fuzziness: "auto"         //fuzziness for get results even if searchparameter is not 100% matching
          }
        }
      }
    }

    const res = await esclient.search({
      index: index,
      body: query
    });

    return resultsToTheses(JSON.stringify(res));

  } catch (err) {
    console.error(`An error occurred while searching PDF`);
    console.error(err);
  }
}

/**
* Search PDF by multiple optinal params
* Not filled textfields should hand over an empty string ("")
* @param {string} keyword, title, author, year, language, country, university
* @returns {Thesis[]} array of matching Theses
*/
export async function advancedSearchPDF(keyword, title, author, year, university, examiner) {

  try {
    const query = {
      "min_score": 0,
      "query": {
        "bool": {
          "should": [
            { "match": { "attachment.content": { query: keyword, boost: 3.5, fuzziness: "auto" } } },    //boost content, title and author for make these more relevant
            { "match": { "title": { query: title, boost: 2.5, fuzziness: "auto" } } },                   //fuzziness for get results even if searchparameter is not 100% matching
            { "match": { "authorName": { query: author, boost: 1.5 } } },
            { "match": { year: year } },
            { "match": { examinerName: examiner } },
            { "match": { university: university } }
          ]

        }
      }
    }

    const res = await esclient.search({
      index: index,
      body: query
    });

    return resultsToTheses(JSON.stringify(res));

  } catch (err) {
    console.error(`An error occurred while searching PDF`);
    console.error(err);
  }
}


/**
* Convert search results to thesis-object array
* @param {JSON} results The search results as JSON
* @returns {Thesis[]} theses Array of matching Theses
*/
export async function resultsToTheses(results) {

  var resultsObject;
  if (results !== undefined) {              //check if results != undefinded
    resultsObject = JSON.parse(results);
  }
  var theses = [];
  var gotResults = (resultsObject.hits.total.value !== 0);      //check if there are results
  if (gotResults) {                                               
    for (let hit of resultsObject.hits.hits) {
      theses.push(
        new model.Thesis(
          hit._id, 
          hit._source.title, 
          new model.Author(
            hit._source.authorName,
            hit._source.authorMail,
            hit._source.authorUniversity,
            hit._source.authorFieldOfStudy,
            hit._source.authorStudyInterests,
            hit._source.authorMetaMaskAddress 
          ),
          new model.Examiner(
            hit._source.examinerName,
            hit._source.examinerMail, 
            hit._source.examinerUniversity, 
            hit._source.examinerInstitute, 
            hit._source.examinerWebsite, 
            hit._source.examinerMetaMaskAddress  
          ),
          hit._source.year, 
          hit._source.language, 
          hit._source.country, 
          hit._source.university, 
          hit._source.abstract, 
          hit._source.grade, 
          hit._source.file,
          hit._source.fileBase64,
          hit._source.filePath,
          hit._source.fileName,
          hit._source.reviews, 
          ));
    }
  }
  return theses;
}

/**
* delete indexed object by ID
* @param {int} ID The ID of the object to be deleted
* @returns true if successful
*/
export async function deleteByID(ID) {
  try {
    await esclient.delete({
      index: index,
      id: ID,
    });
    return true;
  }
  catch (err) {
    console.error(`An error occurred deleting object by ID`);
    console.error(err);
  }

}

/**
* Returns a not used ID between 0 and 99999 for indexing new object 
* @returns freeID Or 0 if no object is indexed
*/
export async function newID() {

  var results = await esclient.search({
    index: index,
    body: {
      "query": {
        "match_all": {}
      },
      "stored_fields": []
    }
  });

  results= JSON.stringify(results);
  var resultsObject;
  if (results !== undefined) {              //check if results != undefinded
    resultsObject = JSON.parse(results);
  }

  var IDs = new Array();
  var gotResults = (resultsObject.hits.total.value !== 0);      //check if there are results
  if (gotResults) {

    for await (let hit of resultsObject.hits.hits) {
      IDs.push(hit._id);
    }

    IDs = IDs.map(function (x) {
      return parseInt(x, 10);
    });

    var freeID;
    do {

      freeID = Math.floor(Math.random() * 100000);

    } while (IDs.includes(freeID))

    
    return freeID;
  }
  else {
    
    return 0;
  }
}