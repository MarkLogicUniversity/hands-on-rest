// Attempt to create a user without having permission to do so.
//
// Promisify has some trouble with request's erorr handling, so we're using
// a callback here.

var request = require('request');

var conn = require('../config.js').writer;

function getAuth() {
  return {
    user: conn.user,
    password: conn.password,
    sendImmediately: false
  };
}

request('http://localhost:8002/manage/v2/users?format=json',
  {
    method: 'POST',
    auth: getAuth(),
    headers: {
      'Content-type': 'application/json',
      'Accept': 'application/json'
    },
    json: {
      'user-name': 'hon-fail',
      'password': 'failPass',
      'description': 'This will not work'
    }
  },
  function(error, response, body) {
    if (!error && response.statusCode < 300) {
      console.log('Success: ' + JSON.stringify(response));
    } else {
      console.log('That didn\'t work: ' + response.statusCode + '; ' + JSON.stringify(body));
    }
  });
