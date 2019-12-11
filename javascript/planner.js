const pubRoot = new axios.create({
    baseURL: "http://localhost:3001/public/Portal"
});

let classList = getClassList();
let classCatalog = getClassCatalog();
let userClasses = getUserClasses();
let classOfferings = getClassOfferings();
var depts = getDepts();

$(document).ready(function(){
    autocomplete(document.getElementById("myInput"), classList);
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
    clearInfo();
    var name = document.getElementById('myInput').value;
    var badClasses = []
    if (!classList.includes(name)) {
        badClasses.push(name);
        document.getElementById('warnings').innerHTML = `<span class=has-text-danger>${name} is not a class</span>`;
    }
    else {
        var deptString;
        for (let a = 0; a < depts.length; a++) {            
            if (name.substring(0,3).toLowerCase() == depts[a]) {
                deptString = name.substring(0,3).toLowerCase();
                break;
            }
            else if (name.substring(0,4).toLowerCase() == depts[a]) {
                deptString = name.substring(0,4).toLowerCase();
                break;
            }
        }
        var catelogData = classCatalog[deptString][name];
        var isOffered = false;
        var index = -1;
        var classData;
        for (let i = 0; i < classOfferings.length; i++) {
            var classString = classOfferings[i].subject.toUpperCase() + classOfferings[i].catelogNum;
            if (name == classString) {
                isOffered = true;
                index = i;
                classData = classOfferings[i];
                break;
            }
        }
        if (isOffered) {
            document.getElementById('class-title').innerHTML = 
            `<h3><b>Title</b></h3>
            <span class="info" id="subject">${classString}</span>`;
            
            document.getElementById('class-subtitle').innerHTML = 
            `<h3><b>Subtitle</b></h3>
            <span class="info" id="subject">${catelogData.subtitle}</span>`;;
            
            document.getElementById('class-description').innerHTML = 
            `<h3><b>Description</b></h3>
            <span class="info" id="subject">${catelogData.description}</span>`;
            
            document.getElementById('subject').innerHTML = 
            `<h3><b>Subject</b></h3>
            <span class="info" id="subject">${deptString.toUpperCase()}</span>`;

            document.getElementById('catelog').innerHTML = 
            `<h3><b>Catelog Number</b></h3>
            <span class="info" id="subject">${classData.catelogNum}</span>`;
            
            document.getElementById('section').innerHTML = 
            `<h3><b>Section</b></h3>
            <span class="info" id="subject">${classData.section}</span>`;
            
            document.getElementById('classNum').innerHTML = 
            `<h3><b>Class Number</b></h3>
            <span class="info" id="subject">${classData.classNum}</span>`;
            
            document.getElementById('component').innerHTML = 
            `<h3><b>Component</b></h3>
            <span class="info" id="subject">${classData.component}</span>`;
            
            document.getElementById('units').innerHTML = 
            `<h3><b>Units</b></h3>
            <span class="info" id="subject">${classData.units}</span>`;
            
            document.getElementById('bldg').innerHTML = 
            `<h3><b>Building</b></h3>
            <span class="info" id="subject">${classData.bldg}</span>`;
            
            document.getElementById('room').innerHTML = 
            `<h3><b>Room</b></h3>
            <span class="info" id="subject">${classData.room}</span>`;
            
            document.getElementById('days').innerHTML = 
            `<h3><b>Days</b></h3>
            <span class="info" id="subject">${classData.days}</span>`;
            
            document.getElementById('time').innerHTML = 
            `<h3><b>Time</b></h3>
            <span class="info" id="subject">${classData.time}</span>`;
            
            document.getElementById('seats').innerHTML = 
            `<h3><b>Seat Count</b></h3>
            <span class="info" id="subject">${classData.seats}</span>`;
            
            document.getElementById('waitlist').innerHTML = 
            `<h3><b>Waitlist Capacity</b></h3>
            <span class="info" id="subject">${classData.waitlist}</span>`;
            
            document.getElementById('available').innerHTML = 
            `<h3><b>Available?</b></h3>
            <span class="info has-text-success" id="subject">Yes</span>`;
            
            var taken = userClasses.includes();
            if (taken) {
                document.getElementById('taken').innerHTML = 
                `<h3><b>Taken</b></h3>
                <span class="info has-text-success" id="subject">Yes</span>`;
            }
            else {
                document.getElementById('taken').innerHTML = 
                `<h3><b>Taken</b></h3>
                <span class="info has-text-danger" id="subject">Yes</span>`;
            }
        }
        else {
            document.getElementById('class-title').innerHTML = 
            `<h3><b>Title</b></h3>
            <span class="info" id="subject">${name}</span>`;

            document.getElementById('class-subtitle').innerHTML = 
            `<h3><b>Subtitle</b></h3>
            <span class="info" id="subject">${catelogData.subtitle}</span>`;

            document.getElementById('class-description').innerHTML = 
            `<h3><b>Description</b></h3>
            <span class="info" id="subject">${catelogData.description}</span>`;

            document.getElementById('subject').innerHTML = 
            `<h3><b>Subject</b></h3>
            <span class="info" id="subject">${deptString.toUpperCase()}</span>`;

            document.getElementById('available').innerHTML = 
            `<h3><b>Available</b></h3>
            <span class="info has-text-danger" id="subject">No</span>`;

            var taken = userClasses.includes(classString);
            if (taken) {
                document.getElementById('taken').innerHTML = 
                `<h3><b>Taken</b></h3>
                <span class="info has-text-success" id="subject">Yes</span>`;
            }
            else {
                document.getElementById('taken').innerHTML = 
                `<h3><b>Taken</b></h3>
                <span class="info has-text-danger" id="subject">Yes</span>`;
            }
        }
    }
    

}
function clear() {
    document.getElementById('myInput').value = '';
    clearInfo()
}

function clearInfo() {
    document.getElementById('class-title').innerHTML = "";
    document.getElementById('class-subtitle').innerHTML = "";
    document.getElementById('class-description').innerHTML = "";
    document.getElementById('subject').innerHTML = "";
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
    document.getElementById('available').innerHTML = "";
    document.getElementById('taken').innerHTML = "";
}

function getDepts() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/public/Portal/depts', false);
    request.send(null);
    return JSON.parse(request.response).result;
}

function getClassList() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/public/Portal/ClassTitles', false);
    request.send(null);
    return JSON.parse(request.response).result;
}

function getClassCatalog() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/public/Portal/catelog', false);
    request.send(null);
    return JSON.parse(request.response).result;
}

async function getClassCatelogLookup(layers) {
    var path = 'http://localhost:3000/public/Portal/catelog/';
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

function getClassOfferings() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/public/Portal/ClassOfferings', false);
    request.send(null);
    return JSON.parse(request.response).result;
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