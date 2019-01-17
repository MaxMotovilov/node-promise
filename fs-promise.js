/**
* Node fs module that returns promises
*/

var fs = require("fs"),
  convertNodeAsyncFunction = require("./promise").convertNodeAsyncFunction;

// convert all the non-sync functions
for (var i in fs) {
  if (!(i.match(/Sync$/)) && fs[i]) {
    exports[i] = convertNodeAsyncFunction(fs[i]);
  }
}

// Convert the functions that don't have a declared callback. Note that
// declared arity of writeFile and readFile has changed in node 8.x so
// the override is no longer required.

if( fs.writeFile.length == 2 )
	exports.writeFile = convertNodeAsyncFunction(fs.writeFile, true);

if( fs.readFile.length == 2 )
	exports.readFile = convertNodeAsyncFunction(fs.readFile, true);
