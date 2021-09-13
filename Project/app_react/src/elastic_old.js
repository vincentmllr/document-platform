//Imports and global variables
const { Client } = require("elasticsearch");  // Muss man womöglich seperat installieren: npm install elasticsearch
                   require("dotenv").config();

const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";
const esclient   = new Client({ node: elasticUrl });
const pdf2base64 = require('pdf-to-base64'); //muss man installiern: npm install pdf-to-base64
const index = "peerindex";

/**
* createIndex named by const index
*/
async function createIndex() { 
  try {
	const indExists = await esclient.indices.exists({index : index}); //check if index exists
	if (!indExists.body) {
		await esclient.indices.create({ index: index});
		console.log(`Created index ${index}`);
		await addPipeline();
	}
	
  } catch (err) {
    console.error(`An error occurred while creating the index ${index}:`);
    console.error(err);
  }
}

/**
* indexing PDF
* @param filename, id, title, author
*/
async function indexPDF(filename, id, title, author, year) { 
  try {
	
    //creates base64 string 
	var base64pdf = await pdf2base64("/usr/src/app/src/data"+filename); //hier auf Pfad achten (PDF einfach in Ordner Data ablegen)
			    
					await esclient.index({
							index : index, 
							id : id,
							pipeline: "attachment",
							body : {
									title : title,
									author : author,
									year : year,
									pdf : base64pdf
									
							}
							
						}	
				);
			console.log(`indexing pdf was successful`);
        }
	catch (err) {
    console.error(`An error occurred while indexing the PDF`);
    console.error(err);
    }	
}

/**
* adding requiered pipeline for indexing PDFs
*/
async function addPipeline(){
  await esclient.ingest.putPipeline({
	id: 'attachment',
    body: {
		"description" : "Extract attachment information",
		"processors" : [
			{
				"attachment" : {
					"field" : "pdf"
				}
			}]
	}
  })
  .then(function () {
     console.log("putPipeline successful");
   })
  .catch(function (error) {
     console.log(`An error occurred while put Pipeline`);
	 console.log(error);
   });
};

/**
* search PDF by keyword
* @param keyoword
* @return JSON with Results
*/
async function simpleSearchPDF(keyword) {

try {	
  const query = {
    query: {
      match: {
        "attachment.content": {
          query: keyword,
          fuzziness: "auto"
        }
      }
    }
  }	
	
	const { body: { hits } } = await esclient.search({
    index: index, 
    body:  query
  });
  
  const results = hits.total.value;
  const values  = hits.hits.map((hit) => {
    return {
      id:     hit._id,
      title:  hit._source.title,
      author: hit._source.author,
      score:  hit._score
    }
  });
  
  return {
    results,
    values
  }
}  catch (err) {
    console.error(`An error occurred while searching PDF`);
    console.error(err);
    }	
}

/**
* Search PDF by multiple optinal params while at least one param must match exactly.
* Not filled textfields should hand over an empty string ("")
* @param title, author, year
* @return JSON with Results
*/
async function advancedSearchPDF(title, author, year) {

try {
  const query = {
  "min_score": 0.1,	  
  "query": { 
    "bool": { 
      "should": [
        { "match": { "title":  {query: title, boost: 2, fuzziness: "auto"  }}},
        { "match": { "author" : {query: author, boost: 1 }}},
		{ "match": { "year" : year}}
	  ]
    }
  }
}	
	
	const { body: { hits } } = await esclient.search({
    index: index, 
    body:  query
  });
  
  const results = hits.total.value;
  const values  = hits.hits.map((hit) => {
    return {
      id:     hit._id,
      title:  hit._source.title,
      author: hit._source.author,
      score:  hit._score
    }
  });

  return {
    results,
    values
  }
}  catch (err) {
    console.error(`An error occurred while searching PDF`);
    console.error(err);
    }	
}



module.exports = {
  esclient,
  createIndex,
  indexPDF,
  simpleSearchPDF,
  advancedSearchPDF
};