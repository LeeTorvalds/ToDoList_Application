const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deletAllBtn = document.querySelector(".footer button")


inputBox.onkeyup = () => {
    // Take value when user type text into input
    let userEnteredValue = inputBox.value;
    (userEnteredValue.trim() != 0) ?
        // when click + , the button will light up
        addBtn.classList.add("active")
        // In condition, there is no value it will disable
        : addBtn.classList.remove("active");
}
// update the tasks list one again after click + button

    // Handle action click from user
    // get user value from input
addBtn.onclick = () =>{
    let userEnteredValue = inputBox.value;
    // get localStorage( local variable)
    let getLocalStorageData = localStorage.getItem("New todo");
    // Even if localStorage = null 
    // Will generate 1 array otherwise convert json string object
    getLocalStorageData == null? listArr = [] : listArr = JSON.parse(getLocalStorageData)
    // export the list of array
    listArr.push(userEnteredValue);
    localStorage.setItem("New todo",JSON.stringify(listArr))
    showTasks();
    addBtn.classList.remove("active");
}
function showTasks(){
    let getLocalStorageData = localStorage.getItem("New todo");
    // Even if localStorage = null 
    // Will generate 1 array otherwise convert json string object
    getLocalStorageData == null? listArr = [] : listArr = JSON.parse(getLocalStorageData);   
}