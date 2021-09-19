//Imports and global variables
const { Client } = require("elasticsearch"); 
                   require("dotenv").config();

const elasticUrl = process.env.ELASTIC_URL || "http://localhost:9200";
const esclient   = new Client({ node: elasticUrl });
const pdf2base64 = require('pdf-to-base64'); //muss man installiern
const index = "peerindex";

/**
* createIndex named by const index
*/
export async function createIndex() { 
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
export async function indexPDF(filename, id, title, author, year) { 
  try {
	
  //creates base64 string 
	var base64pdf = await pdf2base64("/usr/src/app/src/data/"+filename); //hier auf Pfad achten (PDF einfach in Ordner Data ablegen)

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
export async function addPipeline(){
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
export async function simpleSearchPDF(keyword) {

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
	
<<<<<<< HEAD:app/src/elastic.js
  const res = await esclient.search({
    index: index, 
    body:  query
  });
  
  var results = [];
  for (let hit in res ) {
=======
  const res = await esclient.helpers.search({
    index: index, 
    body:  query
  });

  var results = [];
  for await (let hit of res ) {
>>>>>>> 7ec1f32205595bdf61144067493fe1548eb35062:Project/Test/app/js/elastic.js
    results.push({
      title:hit.title,
      author:hit.author
    });
  }

<<<<<<< HEAD:app/src/elastic.js
  return JSON.stringify(res);
=======
  return results;
>>>>>>> 7ec1f32205595bdf61144067493fe1548eb35062:Project/Test/app/js/elastic.js

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
export async function advancedSearchPDF(title, author, year) {

try {
  const query = {
  "min_score": 0.1,	  
  "query": { 
    "bool": { 
      "should": [
        { "match": { "title":  {query: title , boost: 2, fuzziness: "auto"  }}},
        { "match": { "author" : {query: author, boost: 1 }}},
		{ "match": { year : year}}
	  ]
    }
  }
}	
	
<<<<<<< HEAD:app/src/elastic.js
const res = await esclient.search({
=======
const res = await esclient.helpers.search({
>>>>>>> 7ec1f32205595bdf61144067493fe1548eb35062:Project/Test/app/js/elastic.js
  index: index, 
  body:  query
});

var results = [];
<<<<<<< HEAD:app/src/elastic.js
for (let hit in res ) {
=======
for await (let hit of res ) {
>>>>>>> 7ec1f32205595bdf61144067493fe1548eb35062:Project/Test/app/js/elastic.js
  results.push({
    title:hit.title,
    author:hit.author
  });
}

<<<<<<< HEAD:app/src/elastic.js
return JSON.stringify(res);
=======
return results;
>>>>>>> 7ec1f32205595bdf61144067493fe1548eb35062:Project/Test/app/js/elastic.js

}  catch (err) {
    console.error(`An error occurred while searching PDF`);
    console.error(err);
    }	
}



// module.exports = {
//   esclient,
//   createIndex,
//   indexPDF,
//   simpleSearchPDF,
//   advancedSearchPDF
// };