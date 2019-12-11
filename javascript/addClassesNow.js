$(document).ready(function(){
    $("#yes").on("click", yes);
    $("#no").on("click", no);
});
function yes() {
    window.location.assign('http://localhost:3001/html/class-registration/classRegistration.html');
}
function no() {
    window.location.assign('http://localhost:3001/html/welcome/welcome.html');
}