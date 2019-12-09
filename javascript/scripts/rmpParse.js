var parser = require('node-html-parser');
var fs = require('fs');

var content = JSON.parse(fs.readFileSync(process.cwd() + '/class-files/json/allTeachersList.json'));
var teachers = content.teachers;

for (let i = 0; i < teachers.length; i++) {
    var data = fs.readFileSync(process.cwd() + '/class-files/html/teachers/' + teachers[i] + '.html').toString('utf8');
    const root = parser.parse(data);
    var sectionsList = root.querySelector('body').childNodes[12].childNodes[4].childNodes[4].childNodes[1];
    console.log(sectionsList);
}