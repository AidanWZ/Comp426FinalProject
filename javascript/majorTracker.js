const pubRoot = new axios.create({
    baseURL: "http://localhost:3001/public/Portal"
});

const userRoot = new axios.create({
    baseURL: "http://localhost:3000/user"
});

const majorList = getMajorList();
majorList.push("undecided");
const minorList = getMinorList();
minorList.push("undecided");

function getMajorList() {
    let token = localStorage.getItem("jwt");
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/public/Portal/majorTitles', false);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.send(null);
    let result = JSON.parse(request.response).result;
    return result;
}
function getMinorList() {
    let token = localStorage.getItem("jwt");
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/public/Portal/minorTitles', false);
    request.setRequestHeader("Authorization", "Bearer " + token);
    request.send(null);
    let result = JSON.parse(request.response).result;
    return result;
}

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

function getUserPlans() {
    let token = localStorage.getItem("jwt");
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/user/plans', false);
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
    return result;
}

async function loadWorksheet() {
    let greetings = ['Hello', 'Bonjour', 'Hola', 'Hallo', 'Ciao', 'Ola', 'Namaste', 'Salaam', 'Zdras-Tvuy-te', 'Konnichiwa', 'ahn-young-se-yo', 'marhaba'];
    var item = greetings[Math.floor(Math.random()*greetings.length)];
    let token = localStorage.getItem("jwt");
    let userData = getUserData(token)
    const first = userData.first;
    const last = userData.last;
    let fullname = first+" "+last;
    document.getElementById('name').innerHTML = `${item} ${fullname}!`;
    const major = getUserMajor();
    const minor = getUserMinor();  
    document.getElementById('major-name').innerHTML = `You are currently registered as a <span class="derp" style="color: #111";>${major}</span>`;
    document.getElementById('minor-name').innerHTML = `and are currently registered as a <span class="derp" style="color: #111";>${minor}</span>`;
    var classesTaken;
    var classesPlanned;
    if (window.localStorage.getItem("registered") == "yes"){
        classesTaken = getUserClasses();
        classesPlanned = getUserPlans();
    }
    else {
        classesTaken = [];
        classesPlanned = [];
    }
    const requirements = getRequirements();
    var majorReqs;
    var minorReqs;
    if (major == 'undecided') {
        majorReqs = [];
    }
    else {
        majorReqs = requirements[major]['reqs'];
    }
    if ( minor == 'undecided') {
        minorReqs = [];
    }
    else {
        minorReqs = requirements[minor]['reqs'];
    }
    for (let i = 0; i < majorReqs.length; i++) {
        if(majorReqs[i].length > 8) {
            majorReqs.splice(i, 1);
        }
    }
    for (let i = 0; i < minorReqs.length; i++) {
        if(!minorReqs[i].length > 8) {
            minorReqs.splice(i, 1);
        }
    }
    if (classesTaken.length == 0) {
        document.getElementById("classesTaken").innerHTML = `<span class="has-text-info">Go register for classes!</span>`;
    }
    else {
        for(let i = 0; i < classesTaken.length; i++) {
            document.getElementById("classesTaken").innerHTML += "<div>" + classesTaken[i] + "<div>";
        }
    }

    if (majorReqs.length == 0) {
        document.getElementById("majorReqs").innerHTML +=
        "<div><span class='has-text-info'>Currently undecided</span></div>"; 
        document.getElementById("majorReqs").innerHTML +=
        "<div><span class='has-text-info'>Add a major above</span></div>";   
    }
    else {
        for(let i = 0; i < majorReqs.length; i++) {
            if (classesTaken.includes(majorReqs[i])) {
                document.getElementById("majorReqs").innerHTML +=
                    "<div>"+majorReqs[i]+": <span class='has-text-success'>Taken</span></div>";
            }
            else if (classesPlanned.includes(majorReqs[i])) {
                document.getElementById("majorReqs").innerHTML +=
                    "<div>"+majorReqs[i]+": <span class='has-text-info'>Planned</span></div>";
            }
            else {
                document.getElementById("majorReqs").innerHTML += 
                "<div>"+majorReqs[i]+": <span class='has-text-danger'>Not taken</span></div>";
            }
        }
    }
    if (minorReqs.length == 0) {
        document.getElementById("minorReqs").innerHTML +=
        "<div><span class='has-text-info'>Currently undecided</span></div>"; 
        document.getElementById("minorReqs").innerHTML +=
        "<div><span class='has-text-info'>Add a minor above</span></div>";   
    }
    else {
        for(let i = 0; i < minorReqs.length; i++) {
            if (classesTaken.includes(minorReqs[i])) {
                document.getElementById("minorReqs").innerHTML +=
                    "<div>"+minorReqs[i]+": <span class='has-text-success'>Taken</span></div>";
            }
            else if (classesPlanned.includes(minorReqs[i])) {
                document.getElementById("minor").innerHTML +=
                    "<div>"+minorReqs[i]+": <span class='has-text-info'>Planned</span></div>";
            }
            else {
                document.getElementById("minorReqs").innerHTML += 
                "<div>"+minorReqs[i]+": <span class='has-text-danger'>Not taken</span></div>";
            }
        }
    }
}

async function submitMajor() {
    let major = document.getElementById('major').value;
    if (majorList.includes(major)) {
        let token = localStorage.getItem("jwt");
        axios.post('http://localhost:3000/user/data/major/', {data: major}, {headers: {authorization: 'Bearer ' + token}});
    }
    else {
        document.getElementById('major-warnings').innerHTML = 
        `<span class="has-text-danger">${major} is not a major</span>`;
    }
    
}

async function submitMinor() {
    let minor = document.getElementById('minor').value;
    if (minorList.includes(minor)) {
        let token = localStorage.getItem("jwt");
        axios.post('http://localhost:3000/user/data/minor/', {data: minor}, {headers: {authorization: 'Bearer ' + token}});
    }
    else {
        document.getElementById('minor-warnings').innerHTML = 
        `<span class="has-text-danger">${minor} is not a minor</span>`;
    }
}

$(document).ready(function(){
    loadWorksheet();
    let majorList = getMajorList();
    majorList.push("undecided");
    let minorList = getMinorList();
    minorList.push("undecided");
    autocomplete(document.getElementById("major"), majorList);
    autocomplete(document.getElementById("minor"), minorList);
    $("#majorSubmit").on("click", submitMajor);
    $("#minorSubmit").on("click", submitMinor);
})