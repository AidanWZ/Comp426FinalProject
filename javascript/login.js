const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});

$(document).ready(function(){
    alert("hello");
    $("#loginbutton").on("click", login);
    $("#createbutton").on("click", createAccount);
});

function login() {
    alert("hello2");
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    if (isValidUser(username, password)) {
        const goodFeedback = `<span class="has-text-success">Suck-sess!</span>`
        document.getElementById("feedback").append(goodFeedback);
        window.location.href = 'http://localhost:3000/home.html'
    }
    else {
        const badFeedback = `<span class="has-text-danger">Invalid login</span>`
        document.getElementById("feedback").append(badFeedback);
    }   
}
function createAccount() {
    window.location.href = 'http://localhost:3000/registration.html';
}

async function isValidUser(username, password) {
    const serverpassword = await pubRoot.post('/User-data/registered/', {
        data: true
    });
    return password == serverpassword;
}