const pubRoot = new axios.create({
    baseURL: "http://localhost:3001/public/Portal"
});

const userRoot = new axios.create({
    baseURL: "http://localhost:3000/user"
});

async function getUser(token) {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/account/status', false);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.send(null);
    let result = JSON.parse(request.response).result;
    return result;
}

function getUserData() {
    let token = localStorage.getItem("jwt");
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/user', false);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.send(null);
    let result = JSON.parse(request.response).result;
    return result;
}

function getUserMajor() {
    let token = localStorage.getItem("jwt");
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/user/data/major', false);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.send(null);
    let result = JSON.parse(request.response).result;
    return result;
}

function getUserMinor() {
    let token = localStorage.getItem("jwt");
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/user/data/minor', false);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.send(null);
    let result = JSON.parse(request.response).result;
    return result;
}

function getUserClasses() {
    let token = localStorage.getItem("jwt");
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/user/classes', false);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.send(null);
    let result = JSON.parse(request.response).result;
    return result;
}

function getRequirementsLookup(major) {
    let token = localStorage.getItem("jwt");
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/public/Portal/requirements/'+major, false);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.send(null);
    let result = JSON.parse(request.response).result;
    return result;
}

function getRequirements() {
    let token = localStorage.getItem("jwt");
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/public/Portal/requirements', false);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.send(null);
    let result = request.response;
    return result;
}

async function loadWorksheet() {
    let greetings = ['Hello', 'Bonjour', 'Hola', 'Hallo', 'Ciao', 'Ola', 'Namaste', 'Salaam', 'Zdras-Tvuy-te', 'Konnichiwa', 'ahn-young-se-yo', 'marhaba'];
    var item = greetings[Math.floor(Math.random()*greetings.length)];
    let token = localStorage.getItem("jwt");
    const username = getUser(token);
    document.getElementById('name').innerHTML = `${item} ${username}!`;
    
    const major = getUserMajor();
    const minor = getUserMinor();
    
    document.getElementById('major-name').innerHTML = `You are currently registered as a ${major}`;
    document.getElementById('minor-name').innerHTML = `and are currently registered as a ${minor}`;

    const requirements = getRequirements();
    const classesTaken = getUserClasses();
    var majorReqs = requirements;
    var minorReqs = requirements;
    console.log(majorReqs);
    let userRequirements = {
        MajorReqs: majorReqs,
        MinorReqs: minorReqs
    }

    for(let i = 0; i < classesTaken.length; i++) {
        document.getElementById("classesTaken").innerHTML += "<div>" + classesTaken[i] + "<div>";
    }
     
    for(let i = 0; i < userRequirements.MajorReqs.length; i++) {
        if (classesTaken.includes(userRequirements.MajorReqs[i])) {
            document.getElementById("majorReqs").innerHTML +=
                "<div>"+userRequirements.MajorReqs[i]+": <span class='has-text-success'>success</span></div>";
        }
        else {
            document.getElementById("majorReqs").innerHTML += 
            "<div>"+userRequirements.MajorReqs[i]+": <span class='has-text-danger'>success</span></div>";
        }
    }
    for(let i = 0; i < userRequirements.Electives.length; i++) {
        if (classesTaken.includes(userRequirements.Electives[i])) {
            document.getElementById("Electives").innerHTML +=
            "<div>"+userRequirements.Electives[i]+": <span class='has-text-success'>success</span></div>";
        }
        else {
            document.getElementById("Electives").innerHTML += 
            "<div>"+userRequirements.Electives[i]+": <span class='has-text-danger'>success</span></div>";    
        }
    }
    for(let i = 0; i < userRequirements.Additional.length; i++) {
        if (classesTaken.includes(userRequirements.Additional[i])) {
            document.getElementById("Additional").innerHTML += 
            "<div>"+userRequirements.Additional[i]+": <span class='has-text-success'>success</span></div>";
        }
        else {
            document.getElementById("Additional").innerHTML += 
            "<div>"+userRequirements.Additional[i]+": <span class='has-text-danger'>success</span></div>";    
        }
    }
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


$(document).ready(function(){
    loadWorksheet();
    $("#home").on("click", home);
    $("#major-tracker").on("click", majorTracker);
    $("#class-registration").on("click", classRegistration);
    $("#planner").on("click", planner);
    $("#logout").on("click", logout);
})