const pubRoot = new axios.create({
    baseURL: "http://localhost:3001/public/Portal"
});

$(document).ready(function(){
    
    $("#home").on("click", home);
    $("#major-tracker").on("click", majorTracker);
    $("#class-registration").on("click", classRegistration);
    $("#planner").on("click", planner);
    $("#logout").on("click", logout);
    $("#submit").on("click", logout);
    $("#clear").on("click", logout);
})

async function submit() {
    clearInfo();
    var classString = document.getElementById('myInput').value;
    var deptString;
    var depts = getDepts();
    for (let a = 0; a < depts.length; a++) {
        if (classString.substring(0,3) == depts[a]) {
            deptString = classString.substring(0,3);
        }
        else if (classString.substring(0,4) == depts[a]) {
            deptString = classString.substring(0,4);
        }
    }

    var classes = offeredClasses();
    var catelogData = getCatelog([deptString, classString]);
    var isOffered = false;
    var index = -1;
    var classData;
    for (let i = 0; i < classes.length; i++) {
        var classString = classes[i].subject.toUpperCase() + classes[i].catelogNum;
        if (name == classString) {
            isOffered = true;
            index = i;
            classData = classes[i];
            break;
        }
    }
    if (isOffered) {
        document.getElementById('name').innerHTML = classString;
        document.getElementById('subtitle').innerHTML = catelogData.subtitle;
        document.getElementById('description').innerHTML = catelogData.description;
        document.getElementById('catelog').innerHTML = classData.catelogNum;
        document.getElementById('section').innerHTML = classData.section;
        document.getElementById('classNum').innerHTML = classData.classNum;
        document.getElementById('component').innerHTML = classData.component;
        document.getElementById('units').innerHTML = classData.units;
        document.getElementById('bldg').innerHTML = classData.bldg;
        document.getElementById('room').innerHTML = classData.room;
        document.getElementById('days').innerHTML = classData.days;
        document.getElementById('time').innerHTML = classData.time;
        document.getElementById('seats').innerHTML = classData.seats;
        document.getElementById('waitlist').innerHTML = classData.waitlist;
    }
    else {
        document.getElementById('name').innerHTML = classString;
        document.getElementById('subtitle').innerHTML = catelogData.subtitle;
        document.getElementById('description').innerHTML = catelogData.description;
    }

}
function clear() {
    document.getElementById('myInput').value = '';
    clearInfo()
}

function clearInfo() {
    document.getElementById('name').innerHTML = "";
    document.getElementById('subtitle').innerHTML = "";
    document.getElementById('description').innerHTML = "";
    document.getElementById('catelog').innerHTML = "";
    document.getElementById('section').innerHTML = "";
    document.getElementById('classNum').innerHTML = "";
    document.getElementById('component').innerHTML = "";
    document.getElementById('units').innerHTML = "";
    document.getElementById('bldg').innerHTML = "";
    document.getElementById('room').innerHTML = "";
    document.getElementById('days').innerHTML = "";
    document.getElementById('time').innerHTML = "";
    document.getElementById('seats').innerHTML = "";
    document.getElementById('waitlist').innerHTML = "";
}

async function getDepts() {
    const classes = await axios ({
        method: 'get',
        url: 'http://localhost:3000/public/Portal/depts',
    });
    return classes.data.result;
}

async function getCatelog(layers) {
    var path = 'http://localhost:3000/public/Portal/Catelog/';
    for (let i = 0; i < layers.length-1; i++) {
        path = path + layers[i] +  '/'
    }
    path = path + layers[layers.length-1];
    
    const classes = await axios ({
        method: 'get',
        url: path,
    });
    return classes.data.result;
}

async function offeredClasses() {
    const classes = await axios ({
        method: 'get',
        url: 'http://localhost:3000/public/Portal/ClassOfferings',
    });
    return classes.data.result;
}

async function getClasses() {
    const classes = await axios ({
      method: 'get',
      url: 'http://localhost:3000/public/Portal/ClassTitles',
    });
    console.log(classes.data.result);
    return classes.data.result;
}

async function getUserClasses() {
    var token = window.localStorage.getItem('jwt');
    var username = getUser(token);
    const classes = await axios ({
        method: 'get',
        url: 'http://localhost:3000/user/' + username + '/',
        headers: {authentication: "bearer " + token}
    });
    console.log(classes.data.result);
    return classes.data.result;
}

async function getUser(token) {
    const result = await axios ({
        method: 'get',
        url: 'http://localhost:3000/account/status',
        headers: {
        authorization: 'Bearer ' + token,
        },
    });
    return result.data.user.name;
}

function home() {
    window.location.replace('http://localhost:3001/html/home/home.html');
}
function majorTracker() {
    window.location.replace('http://localhost:3001/html/major-tracker/major-tracker.html');
}
function classRegistration() {
    window.location.replace('http://localhost:3001/html/class-registration/class-registration.html');
}
function planner() {
    window.location.replace('http://localhost:3001/html/planner/planner.html');
}
function logout() {
    window.localStorage.clear();
    window.location.replace('http://localhost:3001/index.html');
}