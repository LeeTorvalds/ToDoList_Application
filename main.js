const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

inputBox.onkeyup = ()=>{
    // Lấy giá trị khi user nhập vào
    let userEnteredValue = inputBox.value;
    // Nếu user nhập vào giá trị ( không phải là khoảng trắng )
    if(userEnteredValue.trim() != 0){
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
      task.setAttribute("draggable", true);
      task.dataset.index = index; // Gắn chỉ số để theo dõi vị trí
  
      task.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.dataset.index); // Lưu chỉ số của mục đang kéo
        task.classList.add("dragging");
      });
  
      task.addEventListener("dragend", () => {
        task.classList.remove("dragging");
      });
    });
  
    todoList.addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggingTask = document.querySelector(".dragging");
      const afterElement = getDragAfterElement(todoList, e.clientY); // Tìm mục cần đặt phía sau
      if (afterElement == null) {
        todoList.appendChild(draggingTask);
      } else {
        todoList.insertBefore(draggingTask, afterElement);
      }
    });
  
    todoList.addEventListener("drop", () => {
      const newOrder = [];
      document.querySelectorAll(".todoList li").forEach((task) => {
        newOrder.push(task.textContent.replace("Delete", "").trim());
      });
  
      // Lưu thứ tự mới vào localStorage
      localStorage.setItem("New todo", JSON.stringify(newOrder));
      showTasks(); // Cập nhật giao diện
    });
  }
  
  // Hàm hỗ trợ tìm phần tử phía sau khi kéo thả
  function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll("li:not(.dragging)")];
  
    return draggableElements.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - (box.top + box.height / 2);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      { offset: Number.NEGATIVE_INFINITY }
    ).element;
  }
  
  // Ghi đè hàm showTasks để kích hoạt drag-and-drop
  const originalShowTasks = showTasks;
  showTasks = function () {
    originalShowTasks(); // Gọi lại hàm gốc
    enableDragAndDrop(); // Kích hoạt tính năng kéo thả
  };
  