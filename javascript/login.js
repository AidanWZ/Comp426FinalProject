var fs = require('fs');

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public/Portal"
});
$(document).ready(function(){
    $("#loginbutton").on("click", login);
    $("#createbutton").on("click", createAccount);
    fixShit();
});
async function fixShit() {
        console.log('test');
        let headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36"
        }
        let teacher = "Ketan+Mayer-Patel";
        let schoolId = 1232;
        //let words = document.getElementById('rmpInput').value;
        let result = await axios({
            method: 'get',
            url: "https://www.ratemyprofessors.com/search.jsp?queryoption=HEADER&queryBy=teacherName&schoolName=The+University+of+North+Carolina+at+Chapel+Hill&schoolID=%s&query=%1232Ketan+Mayer-Patel",
            // headers: headers, 
        });
        console.log(result);
        fs.writeFileSync(process.cwd() + '/class-files/html/rmpTest.html', result, 'utf8');
    // const result = await pubRoot.get('/Login/' + username);
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