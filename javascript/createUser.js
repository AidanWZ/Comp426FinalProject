const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public/Portal"
});

$(document).ready(function(){
    $("#submit-user").on("click", submitRegistry);
    $("#cancel-user").on("click", cancelRegistry);
});

async function submitRegistry() {
    const username = document.getElementById("username").value;
    const name = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const major = document.getElementById("major").value;
    const email = (document.getElementById("email").value != "Email (optional)") ? document.getElementById("email").value : null;
    const userData = {
        "Name": name,
            "Username": username,
            "Major": major,
            "Taken": [],
            "Planned": [],
            "registered": true
    } 
    const result1 = await pubRoot.post('/User-data/' + username + '/', {
        data: userData
    });
    const result2 = await pubRoot.post('/Login/' + username, {
        data: password
    });
    localStorage.setItem("username", username);
    window.location.assign('http://localhost:3001/html/add-classes-now/addClassesNow.html');
}
function cancelRegistry() {
    window.location.assign('http://localhost:3001/index.html');
}

async function getRegistered(username) {
    return await pubRoot.get('/User-data/' + name + '/registered');
}
async function registerUser(username) {
    return await pubRoot.post('/User-data/registered/', {
        data: true
    });
}