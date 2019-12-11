const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});

const userRoot = new axios.create({
  baseURL: "http://localhost:3000/user"
});

const statusRoot = new axios.create({
  baseURL: "http://localhost:3000/account/status"
})



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

function getClassCatalog() {
  var request = new XMLHttpRequest();
  request.open('GET', 'http://localhost:3000/public/Portal/ClassTitles', false);
  request.send(null);
  return JSON.parse(request.response).result;
}

//let classCatalog = ["COMP110", "COMP401", "COMP410", "COMP411", "COMP426", "COMP431", "COMP455", "COMP535", "COMP550", "COMP585", "COMP410", "COMP411", "COMP426", "COMP431", "COMP455", "COMP535", "COMP850", "COMP885"];
let classCatalog = getClassCatalog();
let classes = [];

function renderClasses() {
    let classesHTML = ``;
    for (let x = 0; x < classes.length; x++) {
        classesHTML = classesHTML + `
        <div id="class${x}" style="margin-top: 5px;">
            ${classes[x]}
            <button class="delete is-medium is-pulled-right" data="${x}" id="${x}"></button>
        </div>
        `;
    }
    return classesHTML;
}

async function getUserClasses() {
  var token = window.localStorage.getItem('jwt');
  var username = getUser(token);

  const userClasses = await axios ({
      method: 'get',
      url: 'http://localhost:3000/user/' + username + '/',
      headers: {authentication: "bearer " + token}
  });
  console.log(userClasses.data.result);
  return userClasses.data.result;
}

function deleteClass(event) {
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
        document.getElementById('root').innerHTML = `None`;
    } else {
        document.getElementById('root').innerHTML = renderClasses();
    }
    $(".delete").on("click", deleteClass);
}

function addButton() {
    let name = document.getElementById('myInput').value;
    classes[classes.length] = name;
    document.getElementById('root').innerHTML = renderClasses();
    document.getElementById('myInput').value="";
    $(".delete").on("click", deleteClass);
    $("#cancelButton").on("click", cancelClasses);

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

function cancelClasses() {
  window.location.replace('http://localhost:3001/html/home/home.html');
}

async function submitClasses() {
  let token = localStorage.getItem("jwt");
  let username = getUser(token);
  axios.post('http://localhost:3000/user/classes/', {data: classes}, {headers: {authorization: 'Bearer ' + token}});
    
  // window.location.replace('http://localhost:3001/html/home/home.html');
}

$(document).ready(function() {
    autocomplete(document.getElementById("myInput"), classCatalog);
    $root = $("#root");

    $("#addButton").on("click", addButton);
    $(".delete").on("click", deleteClass);
    $("#cancelButton").on("click", cancelClasses);
    $("#submitButton").on("click", submitClasses);    
});

