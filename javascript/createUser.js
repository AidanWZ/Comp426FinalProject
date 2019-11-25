const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});

$(function () {
    $("#class-yes").on("click", loadClassForm);
    $("#class-no").on("click", loadPortal);
    $("#submit-user").on("click", submitRegistry);
    $("#cancel-user").on("click", cancelRegistry);
});

async function submitRegistry() {
    const username = document.getElementById("new-username").value;
    const name = document.getElementById("new-name").value;
    const password = document.getElementById("new-password").value;
    const major = document.getElementById("new-major").value;
    const email = (document.getElementById("new-email").value != "Email (optional)") ? document.getElementById("new-email").value : null;
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
    document.getElementById("register").innerHTML.append(`
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
    `)
}
function cancelRegistry() {
    window.location.href = 'http://localhost:3000/index.html';
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
    window.location.href = 'http://localhost:300/classRegistration.html';
}

export default loadClassForm