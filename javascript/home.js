const pubRoot = new axios.create({
    baseURL: "http://localhost:3001/public/Portal"
});

function isSatisfied(){
    return `<span class='has-text-success'>success</span>`;
}

function loadRequirements(classes) {
    //insert axios call to figure out if BS or BA
    let major = 'BS';


    if(major.equals('BS')) {
        return `
                <div class='has-text-weight-normal is-family-primary has-text-black is-size-4' style='padding: 10px'>
                    Here are the Major Requirements
                    <div id="classesTaken" class='has-text-weight-normal is-family-primary is-lowercase has-text-black is-size-6'>
                        <li>COMP110: ` + ${isSatisfied()} +`</li>
                        <li>COMP401: <span class='has-text-success'>success</span></li>
                        <li>COMP410: <span class='has-text-success'>success</span></li>
                        <li>COMP411: <span class='has-text-success'>success</span></li>
                        <li>COMP283 or MATH381: <span class='has-text-success'>success</span></li>
                        <li>COMP455: <span class='has-text-success'>success</span></li>
                        <li>COMP550: <span class='has-text-success'>success</span></li>
                        <li>MATH231: <span class='has-text-success'>success</span></li>
                        <li>MATH232: <span class='has-text-success'>success</span></li>
                        <li>MATH233: <span class='has-text-success'>success</span></li>
                        <li>MATH547: <span class='has-text-danger'>failure</span></li>
                        <li>PHYS116 or PHYS118: <span class='has-text-success'>success</span></li>
                        <li>Store435: <span class='has-text-danger'>failure</span></li>
                        <li>Second Science Course: <span class='has-text-danger'>failure</span></li>
                        <li>5 Courses Over COM411: <span class='has-text-danger'>failure</span></li>
                    </div>
                </div>
        `;
    } else {
        return `
                <div class='has-text-weight-normal is-family-primary has-text-black is-size-4' style='padding: 10px'>
                    Here are the Major Requirements
                    <div id="classesTaken" class='has-text-weight-normal is-family-primary is-lowercase has-text-black is-size-6'>
                        <li>COMP401: <span class='has-text-success'>success</span></li>
                        <li>COMP410: <span class='has-text-success'>success</span></li>
                        <li>COMP411: <span class='has-text-success'>success</span></li>
                        <li>COMP283 or MATH381: <span class='has-text-success'>success</span></li>
                        <li>MATH231: <span class='has-text-success'>success</span></li>
                        <li>STOR155: <span class='has-text-success'>success</span></li>
                        <li>6 Courses Numbered COMP426 or Greater: <span class='has-text-danger'>failure</span></li>
                    </div>
                </div>
        `;
    }
}

function classesTaken(classes){
    let result = `${classes[0]}`;
    for (let x = 1; x < classes.length; x++) {
        result = result + `, ` + classes[x];
    }
    return result;
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

