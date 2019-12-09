var parser = require('node-html-parser');
var fs = require('fs');
var request = require("request");
var data = JSON.parse(fs.readFileSync(process.cwd() + '/class-files/json/dept-abbr.json'));
var depts = data.depts;
var content;

for (let i = 0; i < depts.length; i++) {
    console.log('finding classes for dept:' + depts[i]);
    try {
        var content = fs.readFileSync(process.cwd() + '/class-files/html/depts/' + depts[i] + '.html').toString('utf8');
    }
    catch {
        console.log('no html file found');
        continue;
    }
    const root = parser.parse(content);

    var classList = root.querySelector('body').childNodes[10].childNodes[3].childNodes[1].childNodes[3].childNodes[1].childNodes;
    var classLines = [];
    var classObjects = [];
    for (let j = 1; j < classList.length; j++) {
        if (classList[j] != null) {
            classLines.push(classList[j].childNodes[1].rawText.replace('&nbsp;', '').replace('\r\n', ''));
            classLines.push(classList[j].childNodes[3].rawText.replace('&nbsp;', '').replace('\r\n', ''));
        }
    }
    for (let x = 0; x < classLines.length; x++) {
        if (classLines[x].substring(0,4) == depts[i].toUpperCase()) {
            classLines[x] = classLines[x].substring(0,4) + classLines[x].substring(5,classLines[x].length);
        }
        else if (classLines[x].substring(0,3) == depts[i].toUpperCase()) {
            classLines[x] = classLines[x].substring(0,3) + classLines[x].substring(4,classLines[x].length);
        }
    }
    var title = null
    var description = null
    var subtitle = null;
    var genEds = null
    var gradingStatus = null
    var repeatRules = null
    var requisites = null
    for (let k = 0; k < classLines.length; k++) {
        var words = classLines[k].split(' ');
        if (words.length == 0) {
            continue;
        }       
        if (words[0].substring(0,4) == depts[i].toUpperCase()) {
            var position = classLines[k].indexOf('.');
            title = classLines[k].substring(0,position);
            subtitle = classLines[k].substring(position+2, classLines[k].length)
        }
        else if (words[0].substring(0,3) == depts[i].toUpperCase()) {
            var position = classLines[k].indexOf('.');
            title = classLines[k].substring(0,position);
            subtitle = classLines[k].substring(position+2, classLines[k].length)
        }        
        else {
            description = classLines[k];
        }
           

        var keyCounter = 0
        if(title != null) {
            keyCounter += 1
        }
        if(description != null) {
            keyCounter += 1
        }
        if(keyCounter >= 2) {
            var obj = {
                "title" : title,
                "subtitle": subtitle,
                "description" : description,
                "genEds" : genEds,
                "requisites" : requisites,
                "repeatRules" : repeatRules,
                "gradingStatus" : gradingStatus,
            }
            classObjects.push(obj);
        }
    }
    var obj = {
        dept: depts[i],
        classes: classObjects
    }
    var objResult = JSON.stringify(obj);
    fs.writeFileSync(process.cwd() + '/class-files/json/depts/' + depts[i] + '.json', objResult, 'utf8');    
}
