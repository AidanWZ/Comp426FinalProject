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
var content3 = JSON.parse(fs.readFileSync(process.cwd() + '/class-files/json/allClassesList.json'));
var classes = content3.classes.sort();

allReqs = [];
var obj = {};
for (let i = 0; i < majors.length; i++) {
    console.log(majors[i]);
    tempobj = {};
    requirementList = [];
    newList = [];
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
    var newList = [];
    for (let j = 0; j < table.length; j++) {
        requirementList.push(table[j].rawText.replace('�', ' '));
    }
    requirementList.remove('\r\n');
    requirementList.shift();
    var hours = requirementList[requirementList.length-1].substring(requirementList[requirementList.length-1].length-2, 
                                                                    requirementList[requirementList.length-1].length);                                                              
    for(let x = 0; x < requirementList.length; x++) {
        if (requirementList[x].substring(0,2) == 'or') {
            requirementList[x] = requirementList[x].substring(3,11);
        }
        else {
            requirementList[x] = requirementList[x].substring(0,8);
        }

        if (depts.includes(requirementList[x].substring(0,4))) {
            requirementList[x] = requirementList[x].substring(0,4) + requirementList[x].substring(5,8);
        }
        else if (depts.includes(requirementList[x].substring(0,3))) {
            requirementList[x] = requirementList[x].substring(0,3) + requirementList[x].substring(4,7);
        }
        if (classes.includes(requirementList[x])) {
            newList.push(requirementList[x]);         
        }
        
    }
    
    tempobj = {}
    tempobj['reqs'] = newList;
    tempobj['hours'] = hours;
    obj[majors[i]] = tempobj;
}
var result = {
    requirements: obj
}
var objResult = JSON.stringify(result);
fs.writeFileSync(process.cwd() + '/class-files/json/requirements.json', objResult, 'utf8');