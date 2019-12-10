const pubRoot = new axios.create({
    baseURL: "http://localhost:3001/public/Portal"
});

const userRoot = new axios.create({
    baseURL: "http://localhost:3000/user"
});

async function getUser(token) {
    const result = await axios ({
      method: 'get',
      url: 'http://localhost:3000/account/status',
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
    return result.data.user.name;
}

async function getUser(token) {
    const result = await axios ({
      method: 'get',
      url: 'http://localhost:3000/account/status',
      headers: {
        authorization: 'Bearer ' + token,
      },
    });
    return result.data.user.name;
}

async function loadWorksheet() {
    let token = localStorage.getItem("jwt");
    const username = getUser(token);
    document.getElementById('name').innerHTML = `Hi ${username}`;
    const major = await axios ({
        method: 'get',
        url: 'http://localhost:3000/user/major',
        headers: {
            authorization: 'Bearer ' + token,
          },
    });
    document.getElementById('major').innerHTML = `It looks like you are a ${major} Major`;
    //let classesTaken = ['COMP110', 'COMP401', 'COMP410', 'COMP411', 'COMP426'];
    const classesTaken = await axios ({
        method: 'get',
        url: 'http://localhost:3000/user/classes',
        headers: {
            authorization: 'Bearer ' + token,
        },
    });

    //const requirements = await pubRoot.get('/Requirements/' + userdata.Major)
    let requirements = {
        MajorReqs: ['COMP110', 'COMP401', 'COMP410', 'COMP411', 'COMP426', 'COMP455', 'COMP550'],
        Electives: ['MATH233', 'MATH547'],
        Additional: ['PHYS118', 'CHEM101']

    }
    // change back to user data
    for(let i = 0; i < classesTaken.length; i++) {
        document.getElementById("classesTaken").innerHTML += "<div>" + classesTaken[i] + "<div>";
    }
     
    for(let i = 0; i < requirements.MajorReqs.length; i++) {
        if (classesTaken.includes(requirements.MajorReqs[i])) {
            document.getElementById("majorReqs").innerHTML +=
                "<div>"+requirements.MajorReqs[i]+": <span class='has-text-success'>success</span></div>";
        }
        else {
            document.getElementById("majorReqs").innerHTML += 
            "<div>"+requirements.MajorReqs[i]+": <span class='has-text-danger'>success</span></div>";
        }
    }
    for(let i = 0; i < requirements.Electives.length; i++) {
        if (classesTaken.includes(requirements.Electives[i])) {
            document.getElementById("Electives").innerHTML +=
            "<div>"+requirements.Electives[i]+": <span class='has-text-success'>success</span></div>";
        }
        else {
            document.getElementById("Electives").innerHTML += 
            "<div>"+requirements.Electives[i]+": <span class='has-text-danger'>success</span></div>";    
        }
    }
    for(let i = 0; i < requirements.Additional.length; i++) {
        if (classesTaken.includes(requirements.Additional[i])) {
            document.getElementById("Additional").innerHTML += 
            "<div>"+requirements.Additional[i]+": <span class='has-text-success'>success</span></div>";
        }
        else {
            document.getElementById("Additional").innerHTML += 
            "<div>"+requirements.Additional[i]+": <span class='has-text-danger'>success</span></div>";    
        }
    }
}

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


$(document).ready(function(){
    loadWorksheet();
    $("#home").on("click", home);
    $("#major-tracker").on("click", majorTracker);
    $("#class-registration").on("click", classRegistration);
    $("#planner").on("click", planner);
    $("#logout").on("click", logout);
})