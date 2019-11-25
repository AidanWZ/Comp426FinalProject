import loadPortal from home;

const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});

$(document).ready(function(){
    var counter = 1;
    $("#addButton").click();
    $("#removeButton").click();
    $("submitButton").on("click", {"info": username}, submitRegistry);
    $("cancelButton").on("click", loadPortal);
});

function addButton() {
    var newTextBoxDiv = $(document.createElement('div')).attr("id", 'TextBoxDiv' + counter);
    newTextBoxDiv.after().html(`<label>Textbox#${counter}</label>
                                <input type="text" class="derp" name="textbox${counter}" id="textbox${counter}"  value="">`);
    newTextBoxDiv.appendTo("#TextBoxesGroup");
    counter++;
}
function removeButton() {
    if(counter==1){
        return false;
    }   
    counter--;
    $("#TextBoxDiv" + counter).remove();
}
function submitClasses() {
    var fields = document.getElementsByClassName("derp")
    var classes = []
    for(let i = 0; i < fields.length; i++) {
        classes.append(fields[i].value)
    }
    const result = await pubRoot.post('/User-data/Taken', {
        data: classes
    })
    window.location.href = 'http://localhost:300/home.html';
}
function cancelClasses() {
    window.location.href = 'http://localhost:300/home.html';
}
