var parser = require('node-html-parser');
var fs = require('fs');
var request = require("request");
var content = fs.readFileSync(process.cwd() + '/class-files/json/course-titles.json', 'utf8');
var obj = JSON.parse(content);

courses = obj.shorts;

for (let i = 0; i < 1; i++) {
    var html = request({
        uri: 'https://catalog.unc.edu/courses/' + courses[i] + '/'
    })
    fs.writeFileSync(process.cwd() + '/class-files/html/' + courses[i] + '.html', html, 'utf8');
    
    const root = parser.parse(content)
    var classList = root.querySelector('body');
    var reducedClassList = []
    classObjects = []
    for (let i = 0; i < classList.length; i++) {
        if (classList[i].childNodes[0] != null) {
            reducedClassList.push(classList[i].childNodes[0].classList[0].rawText.replace('-&#8203;', '-'));
        }
    }
    for (let j = 0; j < reducedClassList.length; j++) {
        var title = null;
        
        classObjects.push()
    }
    var obj = JSON.stringify({
        classes: 
    });
    fs.writeFileSync(process.cwd() + '/class-files/json/course-titles.json', obj, 'utf8', function(err) {
        if (err) throw err;
        console.log('complete');
        });
}
