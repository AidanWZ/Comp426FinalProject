const pubRoot = new axios.create({
    baseURL: "http://localhost:3001/public/Portal"
});

$(document).ready(function(){
    
    $("#home").on("click", home);
    $("#major-tracker").on("click", majorTracker);
    $("#class-registration").on("click", classRegistration);
    $("#planner").on("click", planner);
    $("#logout").on("click", logout);
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