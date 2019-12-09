var parser = require('node-html-parser');
var fs = require('fs');

var content = JSON.parse(fs.readFileSync(process.cwd() + '/class-files/json/allClassesList.json'));
var classes = content.classes.sort();

for (let i = 0; i < 1; i++) {
    var data = fs.readFileSync(process.cwd() + '/class-files/html/courses/' + classes[i] + '.html').toString('utf8');
    const root = parser.parse(data);
    var sectionsList = root.querySelector('body').childNodes[12].childNodes[4].childNodes[4].childNodes[1];
    console.log(sectionsList);
}