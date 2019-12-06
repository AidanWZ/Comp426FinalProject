const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public/Portal"
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
    const email = (document.getElementById("email").value != "") ? document.getElementById("email").value : null;

    if (username != "" &&
        first != "" && 
        last != "" && 
        password != "" && 
        confirm != "" && 
        major != "") {
            const usernameExists = await pubRoot.get('/Login/');
            console.log(usernameExists.data);
            if (!usernameExists.data.result.includes(username)) {
                if (password == confirm) {
                    const userData = {
                        "First": name,
                        "Last": last,
                        "Username": username,
                        "Major": major,
                        "Taken": [],
                        "Planned": [],
                        "registered": true
                    } 
                    const result = await pubRoot.post('/Login/', {
                        data: {username: password}
                    });
                    const result2 = await pubRoot.post('/User-data/', {
                        data: {
                            "Username": username,
                            "First": username,
                            "Last": username,
                            "Major": username,
                            "Taken": [],
                            "Planned": [],
                            "Registered": true,
                        }
                    });
                    localStorage.setItem("username", username);
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