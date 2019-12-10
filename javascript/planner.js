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
    var classString = document.getElementById('myInput').value;
    var classes = offeredClasses();
    var allClasses = getAllClasses();
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
        document.getElementById('name').innerHTML = ``;
        document.getElementById('description').innerHTML = ``;
        document.getElementById('catelog').innerHTML = ``;
        document.getElementById('section').innerHTML = ``;
        document.getElementById('classNum').innerHTML = ``;
        document.getElementById('title').innerHTML = ``;
        document.getElementById('component').innerHTML = ``;
        document.getElementById('units').innerHTML = ``;
        document.getElementById('bldg').innerHTML = ``;
        document.getElementById('room').innerHTML = ``;
        document.getElementById('days').innerHTML = ``;
        document.getElementById('time').innerHTML = ``;
        document.getElementById('seats').innerHTML = ``;
        document.getElementById('waitlist').innerHTML = ``;
    }
    else {

    }

}
function clear() {
    document.getElementById('myInput').value = '';
}

async function getAllClasses() {
    
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