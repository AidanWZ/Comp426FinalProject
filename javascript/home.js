const pubRoot = new axios.create({
    baseURL: "http://localhost:3001/public/Portal"
});

$(document).ready(function(){
    $("#logout").on("click", logout)
    $("#editClasses").on("click", editClasses)
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

function logout() {
    localStorage.clear();
    window.location.assign('http://localhost:3001/index.html');
}