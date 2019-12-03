const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public/Portal"
});
$(document).ready(function(){
    $("#loginbutton").on("click", login);
    $("#createbutton").on("click", createAccount);
    fixShit();
});
async function fixShit() {
    // const result = await pubRoot.delete();
    // alert("fixed");
}
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (isValidUser(username, password)) {
        localStorage.setItem("username", username);
        $message.html('<span class="has-text-success">Success! You are now logged in.</span>');
        window.location.assign('http://localhost:3001/html/home.html');
    }
    else {
        $message.html('<span class="has-text-danger">Something went wrong and you were not logged in. Check your email and password and your internet connection.</span>');
    }  
}
function createAccount() {
    window.location.replace('http://localhost:3001/html/createUser.html');
}

async function isValidUser(username, password) {
    const serverpassword = await pubRoot.get('/User-data/Login/'+username);
    return password == serverpassword;
}