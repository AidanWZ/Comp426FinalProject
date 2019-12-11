const pubRoot = new axios.create({
    baseURL: "http://localhost:3001/public/Portal"
});

const userRoot = new axios.create({
    baseURL: "http://localhost:3000/user"
});

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        console.log(this.parentNode);
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
          if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
            b = document.createElement("DIV");
            b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
            b.innerHTML += arr[i].substr(val.length);
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                b.addEventListener("click", function(e) {
                inp.value = this.getElementsByTagName("input")[0].value;
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          currentFocus++;
          addActive(x);
        } else if (e.keyCode == 38) {
          currentFocus--;
          addActive(x);
        } else if (e.keyCode == 13) {
          e.preventDefault();
          if (currentFocus > -1) {
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      if (!x) return false;
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

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
    request.open('GET', 'http://localhost:3000/user/data', false);
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
    let result = JSON.parse(request.response).result;
    let major1 = getUserMajor();
    let minor1 = getUserMinor();
    console.log(result[major1]['reqs']);
    return result[major1]['reqs'];
}

async function loadWorksheet() {
    let greetings = ['Hello', 'Bonjour', 'Hola', 'Hallo', 'Ciao', 'Ola', 'Namaste', 'Salaam', 'Zdras-Tvuy-te', 'Konnichiwa', 'ahn-young-se-yo', 'marhaba'];
    var item = greetings[Math.floor(Math.random()*greetings.length)];
    let token = localStorage.getItem("jwt");
    const username = getUserData(token).name;
    document.getElementById('name').innerHTML = `${item} ${username}!`;
    const major = getUserMajor();
    const minor = getUserMinor();
    
    document.getElementById('major-name').innerHTML = `You are currently registered as a ${major}`;
    document.getElementById('minor-name').innerHTML = `and are currently registered as a ${minor}`;

    
    const classesTaken = getUserClasses();
    const requirements = getRequirements();
    var majorReqs = requirements;
    var minorReqs = requirements;
    console.log(majorReqs);
    let userRequirements = {
        MajorReqs: majorReqs,
        MinorReqs: minorReqs
    }
    // let userRequirements = {
    //     MajorReqs: ['COMP110', 'COMP401', 'COMP116'],
    //     MinorReqs: ['COMP110']
    // }

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
    for(let i = 0; i < userRequirements.MinorReqs.length; i++) {
        if (classesTaken.includes(userRequirements.MinorReqs[i])) {
            document.getElementById("minorReqs").innerHTML +=
                "<div>"+userRequirements.MajorReqs[i]+": <span class='has-text-success'>success</span></div>";
        }
        else {
            document.getElementById("minorReqs").innerHTML += 
            "<div>"+userRequirements.MajorReqs[i]+": <span class='has-text-danger'>success</span></div>";
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

function getMajorList() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/public/Portal/majorTitles', false);
    request.send(null);
    console.log(request.response);
    return JSON.parse(request.response).result;
}

function getMinorList() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/public/Portal/minorTitles', false);
    request.send(null);
    console.log(request.response);
    return JSON.parse(request.response).result;
}

$(document).ready(function(){
    loadWorksheet();
    let majorList = getMajorList();
    let minorList = getMinorList();
    autocomplete(document.getElementById("major"), majorList);
    autocomplete(document.getElementById("minor"), minorList);
    $("#home").on("click", home);
    $("#major-tracker").on("click", majorTracker);
    $("#class-registration").on("click", classRegistration);
    $("#planner").on("click", planner);
    $("#logout").on("click", logout);
})