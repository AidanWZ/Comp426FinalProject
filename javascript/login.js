const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public/Portal"
});
$(document).ready(function(){
    $("#loginbutton").on("click", login);
    $("#createbutton").on("click", createAccount);
    fixShit();
});
async function fixShit() {
    
    
}
async function readCoursicle() {
    var reader = new FileReader();
    reader.onload = function(e) {
        var content = e.target.result;
        var days = document.getElementsByClassName('days');
        var instructors = document.getElementsByClassName('instructor');
        var times = document.getElementsByClassName('time');
        var buildings = document.getElementsByClassName('building');
        var genEds = document.getElementsByClassName('genEds');
    }
}
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (isValidUser(username, password)) {
        localStorage.setItem("username", username);
        document.getElementById("message").innerHTML = '<span class="has-text-success">Success! You are now logged in.</span>';
        window.location.assign('http://localhost:3001/html/home/home.html');
    }
    else {
        $message.html('<span class="has-text-danger">Something went wrong and you were not logged in. Check your email and password and your internet connection.</span>');
    }  
}
function createAccount() {
    window.location.replace('http://localhost:3001/html/create-user/createUser.html');
}

async function isValidUser(username, password) {
    const serverpassword = await pubRoot.get('/User-data/Login/'+username);
    return password == serverpassword;
}