var fs = require('fs');
var data = JSON.parse(fs.readFileSync(process.cwd() + '/class-files/json/course-titles.json'));
var deptTitles = data.depts;
var deptStrings = [];
for (let j = 0; j < deptTitles.length; j++) {
    deptStrings.push(deptTitles[j].substring(deptTitles[j].length-5, deptTitles[j].length-1).toLowerCase());
}

fixedDeptStrings = [];
for (let k = 0; k < deptStrings.length; k++) {
    if (deptStrings[k] == '(bcb') {
        fixedDeptStrings.push('bcb');
    }
    else if (deptStrings[k] == '(bcs') {
        fixedDeptStrings.push('bcs');
    }
    else if (deptStrings[k] == '(hpm') {
        fixedDeptStrings.push('hpm');
    } 
    else if (deptStrings[k] == '(kor') {
        fixedDeptStrings.push('kor');
    }
    else {
        fixedDeptStrings.push(deptStrings[k]);
    }
}

var obj = JSON.stringify({
    depts: fixedDeptStrings,
});
fs.writeFileSync(process.cwd() + '/class-files/json/dept-abbr.json', obj, 'utf8');