const pubRoot = new axios.create({
    baseURL: "http://localhost:3001/public/Portal"
});

$(document).ready(function(){
    $("#home").on("click", home);
    $("#major-tracker").on("click", majorTracker);
    $("#class-registration").on("click", classRegistration);
    $("#planner").on("click", planner);
    $("#logout").on("click", logout);
    loadWorksheet();
})

async function loadWorksheet() {
    const username = localStorage.getItem("username");
    const userdata = await pubRoot.get('/User-data/' + username);
    const requirements = await pubRoot.get('/Requirements/' + userdata.Major)
    
    for(let i = 0; i < userdata.Taken.length; i++) {
        document.getElementById("classesTaken").innerHTML.push(
            `
            <li>${userdata.Taken[i]}:</li>
            `
        );
    }
     
    for(let i = 0; i < requirements.MajorReqs.length; i++) {
        if (userdata.Taken.includes(requirements.MajorReqs[i])) {
            document.getElementById("MajorReqs").innerHTML.push(
                `
                <li>${requirements.MajorReqs[i]}: <span class='has-text-success'>success</span></li>
                `
            );
        }
        else {
            document.getElementById("MajorReqs").innerHTML.push(
                `
                <li>${requirements.MajorReqs[i]}: <span class='has-text-danger'>success</span></li>
                `
            );
        }
    }
    for(let i = 0; i < requirements.Electives.length; i++) {
        if (userdata.Taken.includes(requirements.Electives[i])) {
            document.getElementById("Electives").innerHTML.push(
                `
                <li>${requirements.Electives[i]}: <span class='has-text-success'>success</span></li>
                `
            );
        }
        else {
            document.getElementById("Electives").innerHTML.push(
                `
                <li>${requirements.Electives[i]}: <span class='has-text-danger'>success</span></li>
                `
            );
        }
    }
    for(let i = 0; i < requirements.Additional.length; i++) {
        if (userdata.Taken.includes(requirements.Additional[i])) {
            document.getElementById("Additional").innerHTML.push(
                `
                <li>${requirements.Additional[i]}: <span class='has-text-success'>success</span></li>
                `
            );
        }
        else {
            document.getElementById("Additional").innerHTML.push(
                `
                <li>${requirements.Additional[i]}: <span class='has-text-danger'>success</span></li>
                `
            );
        }
    }
}
const pubRoot = new axios.create({
    baseURL: "http://localhost:3001/public/Portal"
});

$(document).ready(function(){
    
    $("#home").on("click", home)
    $("#major-tracker").on("click", majorTracker)
    $("#class-registration").on("click", classRegistration)
    $("#planner").on("click", planner)
    $("#logout").on("click", logout)
})

function home() {
    window.location.replace('http://localhost:3001/html/home/home.html');
}
function majorTracker() {
    window.location.replace('http://localhost:3001/html/major-tracker/major-tracker.html');
}
function classRegistration() {
    window.location.replace('http://localhost:3001/html/class-registration/class-registration.html');
}
function planner() {
    window.location.replace('http://localhost:3001/html/planner/planner.html');
}
function logout() {
    window.localStorage.clear();
    window.location.replace('http://localhost:3001/index.html');
}