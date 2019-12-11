const createRoot = new axios.create({
    baseURL: "http://localhost:3000/account/create"
});

const userRoot = new axios.create({
    baseURL: "http://localhost:3000/user"
});

$(document).ready(function(){
    let majorList = getMajorList();
    let minorList = getMinorList();
    autocomplete(document.getElementById("major"), majorList);
    autocomplete(document.getElementById("minor"), minorList);
    $("#signupbtn").on("click", submitRegistry);
    $("#cancelbtn").on("click", cancelRegistry);
});

function getMajorList() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/public/Portal/majorTitles', false);
    request.send(null);
    return JSON.parse(request.response).result;
}

function getMinorList() {
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:3000/public/Portal/minorTitles', false);
    request.send(null);
    return JSON.parse(request.response).result;
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

async function submitRegistry() {
    const username = document.getElementById("username").value;
    const first = document.getElementById("first").value;
    const last = document.getElementById("last").value;
    const password = document.getElementById("psw").value;
    const confirm = document.getElementById("psw-repeat").value;
    const major = document.getElementById("major").value;
    const minor = document.getElementById("minor").value;

    if (username != "" &&
        first != "" && 
        last != "" && 
        password != "" && 
        confirm != "" && 
        major != "" &&
        minor != "") {
            usernameExists = false;
            if (!usernameExists) {
                if (password == confirm) {
                    try {
                        const result1 = await axios ({
                            method: 'post',
                            url: 'http://localhost:3000/account/create',
                            data: {
                                'name': username,
                                'pass': password,
                            },
                        });
                        
                        const result = await axios ({
                            method: 'post',
                            url: 'http://localhost:3000/account/login',
                            data: {
                                'name': username,
                                'pass': password,
                            },
                        });
                        let token = result.data.jwt;
                        let object1 = {
                            'major': major,
                            'minor': minor,
                            'username': username,
                            'password': password,
                            'first': first,
                            'last': last
                        }
                        console.log(object1);
                        axios.post('http://localhost:3000/user/data/', {data: object1}, {headers: {authorization: 'Bearer ' + token}});
                        localStorage.setItem("jwt", token);
                        localStorage.setItem("newUser", true);
                        window.location.assign('http://localhost:3001/html/add-classes-now/addClassesNow.html');
                    }
                    catch {
                        document.getElementById('notes').innerHTML = 
                        `<div class="alert">
                            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                            Something went wrong with the server.
                        </div>`;
                    }
                    
                }
                else {
                    document.getElementById('notes').innerHTML = 
                        `<div class="alert">
                            <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                            Passwords did not match, please retry.
                        </div>`;
                }
            }
            else {
                document.getElementById('notes').innerHTML = 
                    `<div class="alert">
                        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                        That username is already used, please pick a different username.
                    </div>`;
            } 
        }
    else {
        var note = "";
        var counter = 0;
        if (first == "") {
            note = note + "first name, ";
            counter++;
        }
        if (last == "") {
            note = note + "last name, ";
            counter++;
        }
        if (username == "") {
            note = note + "username, ";
            counter++;
        }
        if (password == "") {
            note = note + "password, ";
            counter++;
        }
        if (confirm == "") {
            note = note + "confirm password, ";
            counter++;
        }
        if (major == "") {
            note = note + "intended major,";
            counter++;
        }
        if (minor == "") {
            note = note + "intended minor";
            counter++;
        }
        
        if (counter > 1) {
            note = note + " were not entered, please enter."
        }
        else {
            note = note + " was not entered, please enter."
        }
        
        document.getElementById('notes').innerHTML = 
                    `<div class="alert">
                        <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span>
                        ${note}
                    </div>`;
    }
}
function cancelRegistry() {
    window.location.assign('http://localhost:3001/index.html');
}

function getIndicesOf(searchStr, str, caseSensitive) {
    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}