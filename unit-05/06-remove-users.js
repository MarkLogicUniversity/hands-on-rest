// Remove the users that were created for this unit

var fs = require('fs');
var bPromise = require('bluebird');
var request = bPromise.promisify(require('request'));

var conn = require('../config.js').admin;

function getAuth() {
  return {
    user: conn.user,
    password: conn.password,
    sendImmediately: false
  };
}

function removeUser(user) {
  var username = user['user-name'];
  console.log('removing: ' + username);
  return request({
      url: 'http://localhost:8002/manage/v2/users/' + username,
      method: 'DELETE',
      auth: getAuth(),
      headers: {
        'Content-type': 'application/json'
      },
      json: user
    });
}

bPromise.all([
  removeUser(JSON.parse(fs.readFileSync('user-reader.json'))),
  removeUser(JSON.parse(fs.readFileSync('user-writer.json'))),
  removeUser(JSON.parse(fs.readFileSync('user-admin.json'))),
  removeUser(JSON.parse(fs.readFileSync('user-nobody.json'))),
  removeUser({'user-name': 'hon-fail'})
]).then(function() {
  console.log('Users removed.');
}).catch(function(error) {
  console.log('Something went wrong: ' + error);
});
