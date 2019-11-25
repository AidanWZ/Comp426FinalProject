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
        alert("here");
        const goodFeedback = `<span class="has-text-success">Suck-sess!</span>`
        document.getElementById("feedback").append(goodFeedback);
        window.location.assign('http://localhost:3001/html/home.html');
    }
    else {
        alert("there");
        const badFeedback = `<span class="has-text-danger">Invalid login</span>`
        document.getElementById("feedback").innerHTML = "";
        document.getElementById("feedback").append(badFeedback);
    }  
}
function createAccount() {
    window.location.replace('http://localhost:3001/html/createUser.html');
}

async function isValidUser(username, password) {
    alert("everywhere");
    const serverpassword = await pubRoot.get('/User-data/Login/'+username);
    return password == serverpassword;
}