const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    // Lấy giá trị khi user nhập vào
    let userEnteredValue = inputBox.value;
    // Nếu user nhập vào giá trị ( không phải là khoảng trắng )
    if(userEnteredValue.trim() != ''){
        //  Thì nút add của ta sẽ sáng lên
        // Trường hợp mình nhập toàn khoảng trắng ( space ) thì sẽ không sáng lên nhé 
        addBtn.classList.add("active");
    } else {
        // Ngược lại thì không sáng nè
        addBtn.classList.remove("active");
    }
}
showTasks();
// Giờ mình sẽ viết hàm để thao tác với nút Add nhen
addBtn.onclick = ()=>{
    // Khi user nhấn vào nút Add 
    // Lấy giá trị mà user đã nhập ở ô input
    let userEnteredValue = inputBox.value;
    // Lấy localStorage ( biến lưu trữ cục bộ )
    let getLocalStorageData = localStorage.getItem("New todo");
    if(getLocalStorageData == null){
        // Nếu như localStorage = null
        // Thì sẽ tạo ra 1 mảng rỗng
        listArray = [];
    } else {
        // Ngược lại thì sẽ chuyển JSON từ dạng string sang Object
        listArray = JSON.parse(getLocalStorageData);
    }
    // Đẩy giá trị mới vào mảng đã tạo
    listArray.push(userEnteredValue);

    localStorage.setItem("New todo", JSON.stringify(listArray)); // Chuyển JSON từ dạng Object sang String
    showTasks();
    addBtn.classList.remove("active");
}

function showTasks(){
    let getLocalStorageData = localStorage.getItem("New todo");
    if(getLocalStorageData == null){
        // Nếu như localStorage = null
        // Thì sẽ tạo ra 1 mảng rỗng
        listArray = [];
    } else {
        // Ngược lại thì sẽ chuyển JSON từ dạng string sang Object
        listArray = JSON.parse(getLocalStorageData);
    }
    const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; 
  if(listArray.length > 0){ 
    deleteAllBtn.classList.add("active"); 
  }else{
    deleteAllBtn.classList.remove("active"); 
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><button>Delete</button></span></li>`;
  });
  todoList.innerHTML = newLiTag; 
  inputBox.value = ""; 
  enableDragAndDrop(); // Kích hoạt chức năng kéo thả
  
}

function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); 
  localStorage.setItem("New todo", JSON.stringify(listArray));
  showTasks();
}

deleteAllBtn.onclick = ()=>{
  listArray = []; 
  localStorage.setItem("New todo", JSON.stringify(listArray)); 
  showTasks(); 
}
// Thêm tính năng kéo thả
function enableDragAndDrop() {
  const tasks = document.querySelectorAll(".todoList li");

  tasks.forEach((task, index) => {
      task.setAttribute("draggable", "true");

      // Khi bắt đầu kéo
      task.addEventListener("dragstart", (e) => {
          e.dataTransfer.setData("text/plain", index); // Lưu vị trí ban đầu
      });

      // Khi kéo qua một công việc khác
      task.addEventListener("dragover", (e) => {
          e.preventDefault(); // Cho phép thả
      });

      // Khi thả vào vị trí mới
      task.addEventListener("drop", (e) => {
          e.preventDefault();
          const draggedIndex = e.dataTransfer.getData("text/plain");
          const droppedIndex = index;

          // Hoán đổi vị trí trong mảng listArray
          const temp = listArray[draggedIndex];
          listArray.splice(draggedIndex, 1); // Xóa phần tử được kéo
          listArray.splice(droppedIndex, 0, temp); // Chèn vào vị trí mới

          // Cập nhật localStorage và giao diện
          localStorage.setItem("New todo", JSON.stringify(listArray));
          showTasks(); // Làm mới danh sách
      });
  });
}


