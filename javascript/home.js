const pubRoot = new axios.create({
    baseURL: "http://localhost:3000/public"
});

$(function () {
    loadWorksheet();
})

function loadWorksheet(userdata) {
    const reqs =  await pubRoot.get('/Requirements/' + userdata.Major);
    const worksheet = 
    `
    
    `
}
export default loadWorksheet;