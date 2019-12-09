var fs = require('fs');
var data = JSON.parse(fs.readFileSync(process.cwd() + '/class-files/json/dept-abbr.json'));
var depts = data.depts;

var data = JSON.parse(fs.readFileSync(process.cwd() + '/class-files/json/courseOfferings.json'));
var classes = data.classes;
var allTeachers = [];
for (let b = 0; b < classes.length; b++) {
  allTeachers.push(classes[b].teacher.substring(12, classes[b].teacher.length));
}

for( var i = allTeachers.length-1; i--;){
  if (allTeachers[i].substring(0,2) == 'ap') allTeachers.splice(i, 1);
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
    teachers: removeDups(allTeachers)
});
fs.writeFileSync(process.cwd() + '/class-files/json/allTeachersList.json', FinalObjList, 'utf8');