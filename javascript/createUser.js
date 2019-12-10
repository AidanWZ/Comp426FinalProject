const createRoot = new axios.create({
    baseURL: "http://localhost:3000/account/create"
});

const userRoot = new axios.create({
    baseURL: "http://localhost:3000/user"
});

$(document).ready(function(){
    $("#signupbtn").on("click", submitRegistry);
    $("#cancelbtn").on("click", cancelRegistry);
});

async function submitRegistry() {
    const username = document.getElementById("username").value;
    const first = document.getElementById("first").value;
    const last = document.getElementById("last").value;
    const password = document.getElementById("psw").value;
    const confirm = document.getElementById("psw-repeat").value;
    const major = document.getElementById("major").value;
    const minor = (document.getElementById("minor").value != "") ? document.getElementById("minor").value : null;

    if (username != "" &&
        first != "" && 
        last != "" && 
        password != "" && 
        confirm != "" && 
        major != "" &&
        minor != "") {
            //const usernameExists = await pubRoot.get('/Login/');
            //console.log(usernameExists.data);
            usernameExists = false;
            //if (!usernameExists.data.result.includes(username)) {
            if (!usernameExists) {
                if (password == confirm) {
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
                    axios.post('http://localhost:3000/user/major/', {data: major}, {headers: {authorization: 'Bearer ' + token}});
                    axios.post('http://localhost:3000/user/minor/', {data: minor}, {headers: {authorization: 'Bearer ' + token}});
                    localStorage.setItem("jwt", token);
                    window.location.assign('http://localhost:3001/html/add-classes-now/addClassesNow.html');
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
        if (first == "") {
            note = note + "first name, ";
        }
        if (last == "") {
            note = note + "last name, ";
        }
        if (username == "") {
            note = note + "username, ";
        }
        if (password == "") {
            note = note + "password, ";
        }
        if (confirm == "") {
            note = note + "confirm password, ";
        }
        if (major == "") {
            note = note + "intended major";
        }
        note = note + " were not entered, please enter."
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