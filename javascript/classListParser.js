var parser = require('node-html-parser');
var fs = require('fs');
var request = require("request");
var data = JSON.parse(fs.readFileSync(process.cwd() + '/class-files/json/course-titles.json'));
var depts = data.shorts;
var content;
var allClasses = []
for (let i = 0; i < depts.length; i++) {
    try {
        var content = fs.readFileSync(process.cwd() + '/class-files/html/' + depts[i] + '.html').toString('utf8');
    }
    catch {
        continue;
    }
    const root = parser.parse(content);

    var classList = root.querySelector('body').childNodes[10].childNodes[3].childNodes[1].childNodes[3].childNodes[1].childNodes;
    var classLines = [];
    var classObjects = [];
    for (let j = 1; j < classList.length; j++) {
        if (classList[j] != null) {
            classLines.push(classList[j].childNodes[1].rawText.replace('&nbsp;', ''));
            classLines.push(classList[j].childNodes[3].rawText.replace('&nbsp;', ''));
        }
    }
    for (let x = 0; x < classLines.length; x++) {
        if (classLines[x].substring(0,4) == depts[i].toUpperCase()) {
            classLines[x] = classLines[x].substring(0,4) + classLines[x].substring(5,classLines[x].length);
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
            title = classLines[k].substring(0,7);
            subtitle = classLines[k].substring(9, classLines[k].length)
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
    fs.writeFileSync(process.cwd() + '/class-files/json/' + depts[i] + '.json', objResult, 'utf8');
    allClasses.push(objResult);
}
var FinalObj = JSON.stringify({
    classList: allClasses
});

fs.writeFileSync(process.cwd() + '/class-files/json/allClasses.json', FinalObj, 'utf8');

var classesList = [];
for (let a = 0; a < allClasses.length; a++) {
    for (let b = 0; b < allClasses[a].classes.length; b++) {
        classesList.push(allClasses[a].classes[b].title);
    }
}

var FinalObjList = JSON.stringify({
    classList: classesList
});
fs.writeFileSync(process.cwd() + '/class-files/json/allClassesList.json', FinalObjList, 'utf8');

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public/Portal"
});

const result = await pubRoot.post('');
const result = await pubRoot.post('');