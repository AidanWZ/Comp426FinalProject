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
    document.getElementById("register").innerHTML = "";
    document.getElementById("register").innerHTML = `
        <div id="yesno">
            <div id="prompt">
                <h2>Do you want to add your classes now?</h2>
            </div>
            <div class="field">
                <div class="control">
                    <button id="class-yes" type="button">Yes!</button>
                    <button id="class-no"  data=${username} type="button">No...?</button>
                </div>
            </div>
        </div>
    `;
    $("#class-yes").on("click", loadClassForm);
    $("#class-no").on("click", loadHome);
}
function cancelRegistry() {
    window.location.href = 'http://localhost:3001/index.html';
}

async function getRegistered(username) {
    return await pubRoot.get('/User-data/' + name + '/registered');
}
async function registerUser(username) {
    return await pubRoot.post('/User-data/registered/', {
        data: true
    });
}
function loadClassForm() {
    window.location.assign('http://localhost:3001/html/classRegistration.html');
}
function loadHome() {
    window.location.assign('http://localhost:3001/html/home.html');
}