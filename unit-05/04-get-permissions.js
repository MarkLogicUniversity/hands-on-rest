// Read a document's permissions from the database.
// Handle the response using the Promise approach.

var ml = require('marklogic');
var reader = require('../config.js').reader;
var db = ml.createDatabaseClient(reader);

// document URI in the database
var imgURI = '/image/01.JPG.json';

db.documents.read({
  uris: [imgURI],
  categories: ['permissions']
}).result()
  .then(function(docs) {
    // write out the document
    console.log(JSON.stringify(docs));
  })
  .catch(function(error) {
    console.log(error);
  });
