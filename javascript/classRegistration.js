const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public/Portal"
});
var counter = 2;

$(document).ready(function(){
    $("#addButton").on("click", addButton);
    $("#removeButton").on("click", removeButton);
    $("#submitButton").on("click", submitClasses);
    $("#cancelButton").on("click", cancelClasses);
});

function addButton() {
    var newTextBoxDiv = $(document.createElement('div')).attr("id", 'TextBoxDiv' + counter);
    newTextBoxDiv.after().html(`<label>Class title</label>
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
async function submitClasses() {
    var fields = document.getElementsByClassName("derp")
    var classes = []
    for(let i = 0; i < fields.length; i++) {
        classes.push(fields[i].value);
    }
    const username = localStorage.getItem("username");
    const result = await pubRoot.post('/User-data/' + username, {
        data: {
            Taken: classes
        }
    })
    window.location.href = 'http://localhost:3001/html/home/home.html';
}
function cancelClasses() {
    window.location.href = 'http://localhost:3001/html/home/home.html';
}
