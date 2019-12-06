var parser = require('node-html-parser');
var fs = require('fs');
var content = fs.readFileSync(process.cwd() + '/class-files/course-catelog.html').toString('utf8');

const root = parser.parse(content)
deptList = root.querySelector('body').childNodes[10].childNodes[6].childNodes[1].childNodes[2].childNodes[1].childNodes[5].childNodes[2].childNodes;

deptList.shift();
var reducedDeptList = []
var deptStrings = []
for (let i = 0; i < deptList.length; i++) {
    if (deptList[i].childNodes[0] != null) {
        reducedDeptList.push(deptList[i].childNodes[0].childNodes[0].rawText.replace('-&#8203;', '-'));
    }
}
for (let j = 0; j < reducedDeptList.length; j++) {
    deptStrings.push(reducedDeptList[j].substring(reducedDeptList[j].length-5, reducedDeptList[j].length-1).toLowerCase());
}
var obj = JSON.stringify({
    depts: reducedDeptList,
    shorts: deptStrings
});
fs.writeFileSync(process.cwd() + '/class-files/json/course-titles.json', obj, 'utf8');
console.log(deptStrings);