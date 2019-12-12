const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});
const userRoot = new axios.create({
  baseURL: "http://localhost:3000/user"
});
const statusRoot = new axios.create({
  baseURL: "http://localhost:3000/account/status"
})

var classes;
var planned;
let classCatalog = getClassCatalog();
let userStatus1 = window.localStorage.getItem('newUser1');
let userStatus2 = window.localStorage.getItem('newUser2');
if (userStatus1 != 'yes') {
  planned = getUserPlans();
}
else {
  planned = [];
}
if (userStatus2 != 'yes') {
  classes = getUserClasses();
}
else {
  classes = [];
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

function autocomplete(inp, arr) {

    document.getElementById('root-taken').innerHTML = renderClassesTaken();
    document.getElementById('root-planned').innerHTML = renderClassesPlanned();
    document.getElementById('myInput').value="";

    let token = localStorage.getItem("jwt");
    let userData = getUserData(token)
    const first = userData.first;
    const last = userData.last;
    let fullname = first+" "+last;
    document.getElementById('username').innerHTML = `<b>Registering for user ${fullname}</b>`
    
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

function getClassCatalog() {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:3000/public/Portal/ClassTitles', false);
  request.send(null);
  return JSON.parse(request.response).result;
}

function renderClassesTaken() {
  let classesHTML = ``;
  for (let x = 0; x < classes.length; x++) {
      classesHTML = classesHTML + `
      <div id="class${x}" style="margin-top: 5px;">
          ${classes[x]}
          <button class="delete deleteTaken is-medium is-pulled-right" data="${x}" id="${x}"></button>
      </div>
      `;
  }
  return classesHTML;
}

function renderClassesPlanned() {
    let classesHTML = ``;
    for (let x = 0; x < planned.length; x++) {
        classesHTML = classesHTML + `
        <div id="class${x}" style="margin-top: 5px;">
            ${planned[x]}
            <button class="delete deletePlanned is-medium is-pulled-right" data="${x}" id="${x}"></button>
        </div>
        `;
    }
    return classesHTML;
}

async function getUser(token) {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:3000/account/status', false);
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

function deleteClassPlan(event) {
    let number = event.target.getAttribute('data');
    let newClasses = new Array(planned.length-1);
    if (number == 0) {
        for (let x =0; x<planned.length-1; x++) {
            newClasses[x] = planned[x+1];
        }
    } else if (number == planned.length-1) {
        for (let x = 0; x < planned.length-1; x++) {
            newClasses[x] = planned[x];
        }
    } else {
        let y = 0;
        for (let x = 0; x < newClasses.length; x++) {
            newClasses[x]=planned[y];
            if ((y+1) == number) {
                y++;
            }
            y++;
        }
    }
    planned=newClasses;
    if (planned.length == 0) {
        document.getElementById('root-planned').innerHTML = `None`;
    } else {
        document.getElementById('root-planned').innerHTML = renderClassesPlanned();
    }
    $(".deletePlanned").on("click", deleteClassPlan);
}
function deleteClassTaken(event) {
  let number = event.target.getAttribute('data');
  let newClasses = new Array(classes.length-1);
  if (number == 0) {
      for (let x =0; x<classes.length-1; x++) {
          newClasses[x] = classes[x+1];
      }
  } else if (number == classes.length-1) {
      for (let x = 0; x < classes.length-1; x++) {
          newClasses[x] = classes[x];
      }
  } else {
      let y = 0;
      for (let x = 0; x < newClasses.length; x++) {
          newClasses[x]=classes[y];
          if ((y+1) == number) {
              y++;
          }
          y++;
      }
  }
  classes=newClasses;
  if (classes.length == 0) {
      document.getElementById('root-taken').innerHTML = `None`;
  } else {
      document.getElementById('root-taken').innerHTML = renderClassesTaken();
  }
  $(".deleteTaken").on("click", deleteClassTaken);
}

function addButtonPlan() {
    let name = document.getElementById('myInput').value;
    let badClasses = [];
    if (!classCatalog.includes(name)) {
      badClasses.push(name);
      document.getElementById('warnings-planned').innerHTML = `<span class=has-text-danger>${name} is not a class</span>`;
    }
    else {
      planned[planned.length] = name;
      document.getElementById('root-planned').innerHTML = renderClassesPlanned();
      document.getElementById('myInput').value="";
    }
    $(".deletePlanned").on("click", deleteClassPlan);
    $("#cancelButtonPlan").on("click", cancelClassesPlan);
}

function cancelClassesPlan() {
  window.location.replace('http://localhost:3001/html/home/home.html');
}

function addButtonTaken() {
  let name = document.getElementById('myInput').value;
  let badClasses = [];
  if (!classCatalog.includes(name)) {
    badClasses.push(name);
    document.getElementById('warnings-taken').innerHTML = `<span class=has-text-danger>${name} is not a class</span>`;
  }
  else {
    classes[classes.length] = name;
    document.getElementById('root-taken').innerHTML = renderClassesTaken();
    document.getElementById('myInput').value="";
  }
  $(".deleteTaken").on("click", deleteClassTaken);
  $("#cancelButtonTaken").on("click", cancelClassesTaken);
}

function cancelClassesTaken() {
  window.location.replace('http://localhost:3001/html/home/home.html');
}

async function submitClassesPlan() {
  let token = localStorage.getItem("jwt");
  for (let i = 0; i < planned.length; i++) {
    if (!classCatalog.includes(planned[i])) {
      badClasses.push(planned[i]);
      document.getElementById('warnings').innerHTML += `<span class=has-text-danger>${planned[i]} is not a class</span>`;
      planned.splice(i, 1);
    }
  }
  axios.post('http://localhost:3000/user/plans/', {data: planned}, {headers: {authorization: 'Bearer ' + token}});
  
  const newUserBool = window.localStorage.getItem('newUser');
  window.localStorage.setItem('newUser1', 'no');
  if (newUserBool == 'yes') {
    window.localStorage.setItem("registered", "yes");
    window.location.replace('http://localhost:3001/html/home/home.html');
  }
}

async function submitClassesTaken() {
  let token = localStorage.getItem("jwt");
  for (let i = 0; i < classes.length; i++) {
    if (!classCatalog.includes(classes[i])) {
      badClasses.push(classes[i]);
      document.getElementById('warnings').innerHTML += `<span class=has-text-danger>${classes[i]} is not a class</span>`;
      classes.splice(i, 1);
    }
  }
  axios.post('http://localhost:3000/user/classes/', {data: classes}, {headers: {authorization: 'Bearer ' + token}});
  
  const newUserBool = window.localStorage.getItem('newUser');
  window.localStorage.setItem('newUser2', 'no');
  if (newUserBool == 'yes') {
    window.localStorage.setItem("registered", "yes");
    window.location.replace('http://localhost:3001/html/home/home.html');
  }
}

$(document).ready(function() {
    autocomplete(document.getElementById("myInput"), classCatalog);
    $root = $("#root-taken");

    $("#addButtonTaken").on("click", addButtonTaken);
    $("#addButtonPlanned").on("click", addButtonPlan);
    $(".deleteTaken").on("click", deleteClassTaken);
    $(".deletePlanned").on("click", deleteClassPlan);
    $("#cancelButtonPlan").on("click", cancelClassesPlan);
    $("#submitButtonPlan").on("click", submitClassesPlan); 
    $("#cancelButtonTaken").on("click", cancelClassesTaken);
    $("#submitButtonTaken").on("click", submitClassesTaken);    
});

