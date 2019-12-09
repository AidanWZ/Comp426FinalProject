var parser = require('node-html-parser');
var fs = require('fs');
var content = fs.readFileSync(process.cwd() + '/class-files/html/course-catelog.html').toString('utf8');

const root = parser.parse(content)
deptList = root.querySelector('body').childNodes[10].childNodes[6].childNodes[1].childNodes[2].childNodes[1].childNodes[5].childNodes[2].childNodes;

deptList.shift();
reducedDeptList = []
for (let i = 0; i < deptList.length; i++) {
    if (deptList[i].childNodes[0] != null) {
        reducedDeptList.push(deptList[i].childNodes[0].childNodes[0].rawText.replace('-&#8203;', '-'));
    }
}

var obj = JSON.stringify({
    depts: reducedDeptList,
});
fs.writeFileSync(process.cwd() + '/class-files/json/deptTitles.json', obj, 'utf8');