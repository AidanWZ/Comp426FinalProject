const pubRoot = new axios.create({
    baseURL: "http://localhost:3001/public/Portal"
});

let classCatalog = getClassCatalog();
let classes = getUserClasses();

$(document).ready(function(){
    autocomplete(document.getElementById("myInput"), classCatalog);
    $root = $("#root");
    $("#submit").on("click", submit);
    $("#clear").on("click", logout);
})

function autocomplete(inp, arr) {
    let token = localStorage.getItem("jwt");
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

async function submit() {
    console.log("submitting");
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

    var classes = getOfferedClasses();
    var userClasses = getUserClasses();
    var catelogData = getClassCatelogLookup([deptString, classString]);
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
        document.getElementById('available').innerHTML = `<span class="info has-text-success" id="waitlist">Yes</span>`;
        var taken = userClasses.includes(classString);
        if (taken) {
            document.getElementById('taken').innerHTML = `<span class="info has-text-success" id="waitlist">Yes</span>`;
        }
        else {
            document.getElementById('taken').innerHTML = `<span class="info has-text-danger" id="waitlist">No</span>`;
        }
    }
    else {
        document.getElementById('name').innerHTML = classString;
        document.getElementById('subtitle').innerHTML = catelogData.subtitle;
        document.getElementById('description').innerHTML = catelogData.description;
        document.getElementById('taken').innerHTML = `<span class="info has-text-danger" id="waitlist">No</span>`;
        var taken = userClasses.includes(classString);
        if (taken) {
            document.getElementById('taken').innerHTML = `<span class="info has-text-success" id="waitlist">Yes</span>`;
        }
        else {
            document.getElementById('taken').innerHTML = `<span class="info has-text-danger" id="waitlist">No</span>`;
        }
    }

}
function clear() {
    console.log("clearing");
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

function getClassCatalog() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/public/Portal/ClassTitles', false);
    request.send(null);
    return JSON.parse(request.response).result;
}

async function getClassCatelogLookup(layers) {
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

async function getClassOfferings() {
    var token = window.localStorage.getItem('jwt');
    const classOfferings = await axios ({
        method: 'get',
        url: 'http://localhost:3000/public/Portal/ClassOfferings',
        headers: {authentication: "bearer " + token}
    });
    return classOfferings.data.result;
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