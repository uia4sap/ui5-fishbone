var fs = require('fs-extra');

fs.copySync('./node_modules/ui5lab-browser/dist/', './test/ui5lab/browser');
fs.copySync('./node_modules/d3/dist/d3.js', './src/ui5/fishbone/libs/d3/d3.js');
fs.copySync('./node_modules/d3/dist/d3.min.js', './src/ui5/fishbone/libs/d3/d3.min.js');

// read library namespace from package.json
var oPackage = require('./package.json');
var sNamespace = oPackage.ui5lab.namespace || "ui5lab.library";

// add library namespace to browser library list
var sBrowserLibraryFile = './test/ui5lab/browser/libraries.json';
fs.readFile(sBrowserLibraryFile, 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }

    var result = data.replace(/\[((\r)?\n\t)*\]/m, '[\r\n\t\t"' + sNamespace + '"\r\n\t]');

    fs.writeFile(sBrowserLibraryFile, result, 'utf8', function(err) {
        if (err) return console.log(err);
    });
});
