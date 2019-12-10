const loginRoot = new axios.create({
    baseURL: "http://localhost:3000/account/login"
});
$(document).ready(function(){
    $("#loginbutton").on("click", login);
    $("#createbutton").on("click", createAccount);
    //fixShit();
});
async function fixShit() {
    let result = await pubRoot.post('test/', { data: {"testKey": "testing123"}});
}
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    try {
        const result = await axios ({
            method: 'post',
            url: 'http://localhost:3000/account/login',
            data: {
                'name': username,
                'pass': password,
            },
        });
        let token = result.data.jwt;
        localStorage.setItem("jwt", token);
        window.location.assign('http://localhost:3001/html/home/home.html');
    } catch (error) {
        document.getElementById('message').innerHTML = '<span class="has-text-danger">Something went wrong and you were not logged in. Check your email and password and your internet connection.</span>';
    }
}

function createAccount() {
    window.location.replace('http://localhost:3001/html/create-user/createUser.html');
}