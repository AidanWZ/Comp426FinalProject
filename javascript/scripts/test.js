var fs = require('fs');
var content = JSON.parse(fs.readFileSync(process.cwd() + '/comp426-backend/data/public.json'));
var data = content.Portal.requirements;
console.log(data);