// Read a document from the database.
//
// The hon-nobody user has no roles, and so does not have permission to read
// the document.

var ml = require('marklogic');
var nobody = require('../config.js').nobody;
var db = ml.createDatabaseClient(nobody);

// document URI in the database
var imgURI = '/image/01.JPG.json';

db.documents.read(imgURI).result()
  .then(function(docs) {
    // write out the document
    console.log(docs[0]);
  })
  .catch(function(error) {
    console.log('Not happening: ' + '(' + error.statusCode + ') ' + error.message);
  });
