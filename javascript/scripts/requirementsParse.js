var parser = require('node-html-parser');
var fs = require('fs');

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
var content1 = JSON.parse(fs.readFileSync(process.cwd() + '/class-files/json/dept-abbr.json'));
var depts = content1.depts.sort();
depts = depts.map(function(x){ return x.toUpperCase() });
var content2 = JSON.parse(fs.readFileSync(process.cwd() + '/class-files/json/majors.json'));
var majors = content2.majorNames.sort();

allReqs = [];
var obj = {};
for (let i = 0; i < majors.length; i++) {
    console.log(majors[i]);
    tempobj = {}
    requirementList = [];
    var data = fs.readFileSync(process.cwd() + '/class-files/html/majors/' + majors[i] + '.html').toString('utf8');
    const root = parser.parse(data);
    var table;
    try {
        table = root.querySelector('tbody').childNodes;
    }
    catch {
        continue;
    }
    
    var requirementList = []
    for (let j = 0; j < table.length; j++) {
        requirementList.push(table[j].rawText.replace('�', ' '));
    }
    requirementList.remove('\r\n');
    requirementList.shift();
    requirementList.shift();
    var hours = requirementList[requirementList.length-1].substring(requirementList[requirementList.length-1].length-2, 
                                                                    requirementList[requirementList.length-1].length);
    for(let x = 0; x < requirementList.length; x++) {
        var words = requirementList[x].split(' ');
        if (words[0].length == 4 && depts.includes(words[0])) {
            requirementList[x] = requirementList[x].substring(0,8);
            requirementList[x] = requirementList[x].substring(0,4) + requirementList[x].substring(5,8);
        }
        else if (words[0].length == 3 && depts.includes(words[0])) {
            requirementList[x] = requirementList[x].substring(0,7);
            requirementList[x] = requirementList[x].substring(0,3) + requirementList[x].substring(4,7);
        }

        if (requirementList[x].length > 7) {
            requirementList.splice(x,20);
        }
    }
    tempobj = {}
    tempobj['reqs'] = requirementList;
    tempobj['hours'] = hours;
    obj[majors[i]] = tempobj;
}
var result = {
    requirements: obj
}
console.log(result);
var objResult = JSON.stringify(result);
fs.writeFileSync(process.cwd() + '/class-files/json/requirements.json', objResult, 'utf8');