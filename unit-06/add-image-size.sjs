// Document-read transformation to add the size of the binary image.

function getBinarySize(jsonDoc) {
  var binaryURI = jsonDoc.binary;
  // Retrieve the binary document
  var binaryDoc = cts.doc(binaryURI);
  return xdmp.binarySize(binaryDoc.root);
}

function addImageSize(context, params, content)
{
  if (context.inputType.search('json') >= 0) {
      // Turn it into a JS object
    var mutableDoc = content.toObject();

    if (mutableDoc.hasOwnProperty('snippet-format')) {
      // This is a full search result

      for (var i in mutableDoc.results) {
        var jsonURI = mutableDoc.results[i].uri;
        // retrieve the JSON document
        var jsonDoc = cts.doc(jsonURI).root;
        mutableDoc.results[i].binarySize = getBinarySize(jsonDoc);
      }

      return mutableDoc;

    } else {
      // This is one document

      // Find and record the size of the binary (in bytes)
      mutableDoc.binarySize = getBinarySize(mutableDoc);

      // Return the revised data
      return mutableDoc;
    }
  }

  return content;

}

exports.transform = addImageSize;
