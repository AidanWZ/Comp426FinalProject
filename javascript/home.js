const pubRoot = new axios.create({
    baseURL: "http://localhost:3001/public/Portal"
});

function loadRequirements(classes) {
    //insert axios call to figure out if BS or BA
    let major = 'BS';

    if(major.equals('BS')) {
        return `
        `;
    } else {
        return `
        `;
    }
}

function loadClassesTaken(classes) {
    return `
        `;
}

function loadClassesEditForm() {
     
}

async function loadWorksheet() {
    //insert axios call to retreive classes that the user inputed
    //let this variable be named classes;
    const classes;

    const $classesTaken = $('#left');
    $classesTaken.append(loadClassesTaken(classes));
    const $requirements = $('#right');
    $requirements.append(loadRequirements(classes));
}

$(document).ready(function(){
    loadWorksheet();
})

