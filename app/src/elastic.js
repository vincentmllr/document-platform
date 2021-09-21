/**
Interface to communicate with elasticsearch
@function createIndex() Create index named by const index
@function addPipeline() Adding requiered pipeline for indexing PDFs
@function indexPDF(thesis) indexing Thesis/PDF
@function simpleSearchPDF(keyword) Search PDF by keyword
@function advancedSearchPDF(keyword, title, author, date, language, country, university) Search PDF by multiple optinal params
@function resultsToTheses(results) Convert search results to thesis-object array

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
            "field": "pdf"
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
        author: thesis.author.name,
        date: thesis.date,     
        language: thesis.language,
        country: thesis.country,
        abstract: thesis.abstract,
        university: thesis.university,
        fileName: thesis.fileName,
        examiner: thesis.examiner.name,
        pdf: base64pdf

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
* @param {string} keyword, title, author, date, language, country, university
* @returns {Thesis[]} array of matching Theses
*/
export async function advancedSearchPDF(keyword, title, author, date, language, country, university) {

  try {
    const query = {
      "min_score": 0,
      "query": {
        "bool": {
          "should": [
            { "match": { "attachment.content": { query: keyword, boost: 3.5, fuzziness: "auto" } } },    //boost content, title and author for make these more relevant
            { "match": { "title": { query: title, boost: 2.5, fuzziness: "auto" } } },                   //fuzziness for get results even if searchparameter is not 100% matching
            { "match": { "author": { query: author, boost: 1.5 } } },
            { "match": { date: date } },
            { "match": { language: language } },
            { "match": { country: country } },
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
      theses.push(new model.Thesis(hit._id, hit._source.title, hit._source.author, hit._source.examiner, hit._source.date, hit._source.language, hit._source.country, hit._source.university, hit._source.abstract, undefined, undefined, undefined, hit._source.fileName, undefined));
    }
  }
  return theses;
}
