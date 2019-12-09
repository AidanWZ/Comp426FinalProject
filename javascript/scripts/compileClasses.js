var fs = require('fs');
var data = JSON.parse(fs.readFileSync(process.cwd() + '/class-files/json/dept-abbr.json'));
var depts = data.depts;

var allClasses = []
for (let i = 0; i < depts.length; i++) {
    var deptData = JSON.parse(fs.readFileSync(process.cwd() + '/class-files/json/depts/' + depts[i] + '.json'));
    var classList = deptData.classes;
    for (let j = 0; j < classList.length; j++) {
        allClasses.push(classList[j].title);
    }
}
for (let j = 0; j < allClasses.length; j++) {
    if (allClasses[j].charAt(allClasses[j].length - 1) == '.') {
        allClasses[j] = allClasses[j].substring(0, allClasses[j].length - 1);
    }
    if (allClasses[j].length > 10) {
        allClasses.splice(j, 1);
    }
}

function removeDups(names) {
    let unique = {};
    names.forEach(function(i) {
      if(!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
}


var FinalObjList = JSON.stringify({
    classes: removeDups(allClasses).sort()
});
fs.writeFileSync(process.cwd() + '/class-files/json/allClassesList.json', FinalObjList, 'utf8');