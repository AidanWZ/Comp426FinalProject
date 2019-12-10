var parser = require('node-html-parser');
var fs = require('fs');
var request = require("request");
var data = JSON.parse(fs.readFileSync(process.cwd() + '/class-files/json/dept-abbr.json'));
var depts = data.depts.sort();

var obj = {};
for(let i = 0; i < depts.length; i++) {
    console.log(depts[i]);
    var info = JSON.parse(fs.readFileSync(process.cwd() + '/class-files/json/depts/' + depts[i] +'.json'));
    obj[depts[i]] = {};
    for(let j = 0; j < info.classes.length; j++) {
        obj[depts[i]][info.classes[j].title] = info.classes[j];
    }
}

var result = JSON.stringify(obj);
fs.writeFileSync(process.cwd() + '/class-files/json/catelog.json', result, 'utf8');
