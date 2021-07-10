const projectsBtn = document.getElementById("projects-title");
const projectsList = document.getElementById("current-projects-list");

projectsBtn.addEventListener("click", projectsDropdown);

function projectsDropdown() {
  if (projectsList.style.transform == "scale(1)") {
    projectsList.style.transform = "scale(0)";
  } else {
    projectsList.style.transform = "scale(1)";
  }
}

/* ----------------

---------------- */

//PROJECT DESC DROPDOWN ----------------------

// const task = document.querySelector(".task");
// task.addEventListener("click", taskClicked);

// function taskClicked() {
//   if (this.querySelector(".task-info-dropdown").style.display == "flex") {
//     this.querySelector(".task-info-dropdown").style.display = "none";
//   } else {
//     this.querySelector(".task-info-dropdown").style.display = "flex";
//   }
// }

// EDIT TASK --------------------------------

// const editBtn = document.querySelector(".task-edit-btn");
// editBtn.addEventListener("click", editTask);

// function editTask() {
//   overlay.classList.add("active");
//   modalContainer.classList.add("active");
//   modalTitle.textContent = "Edit Task";
//   taskConfirmBtn.textContent = "Confirm Edit"
// }

//

// ----------------------------------------------------------------
const overlay = document.getElementById("overlay");

let subfolders = JSON.parse(localStorage.getItem("subfolders")) || [];
let selectedSubfolder = localStorage.getItem("selectedSubfolder");
/*----- 
HELPER FUNCTIONS
-----*/
function removeFromDOM(element) {
  element.textContent = "";
}

/*----- 
UPDATING DOM / LOCAL STORAGE 
-----*/
const projectListContainer = document.getElementById("current-projects-list");
const activeProjectHeader = document.getElementById("tasks-of-subfolder");
const tasksContainer = document.getElementById("tasks-list");

function updateDOMStorage() {
  updateDOM();
  localStorage.setItem("subfolders", JSON.stringify(subfolders));
  localStorage.setItem("selectedSubfolder", selectedSubfolder);
}

function updateDOM() {
  removeFromDOM(projectListContainer);
  displaySubfolders();
  activeProjectHeader.textContent = `${selectedSubfolder.name}`;
  removeFromDOM(tasksContainer);
  displayTasks(selectedSubfolder);
}

function displaySubfolders() {
  subfolders.forEach(subfolder, () => {
    const li = document.createElement("li");
    li.classList.add("project");
    li.id = subfolder.id;
    if (li.id == selectedSubfolder.id) {
      li.classList.add("active-subfolder");
    }
    const h3 = document.createElement("h3");
    h3.textContent = `→ ${subfolder.name}`;
    li.appendChild(h3);
    projectListContainer.append(li);
  });
}

function displayTasks(subfolder) {
  subfolder.forEach(task, () => {
    const li = document.createElement("li");
    li.classList.add("task");
    li.innerHTML = `
    <div class="task-above">
      <div class="task-left">
        <input
          type="checkbox"
          id="${task.id}"
          onclick="event.stopPropagation()"
          ${task.complete}
        />
        <label> ${task.name}</label><br />
      </div>
      <div class="task-right">
        <i
          class="fas fa-edit task-edit-btn btn"
          onclick="event.stopPropagation()"
        ></i>
        <i
          class="fas fa-flag priority-flag"
          onclick="event.stopPropagation()"
        ></i>
        <i
          class="fas fa-trash-alt task-delete-btn btn"
          onclick="event.stopPropagation()"
        ></i>
      </div>
    </div>
    <div class="task-info-dropdown">
      <div class="task-info-dropdown-left">
        <h3>Name: ${task.name}</h3>
        <h3>Description: ${task.description}</h3>
      </div>
      <div class="task-info-dropdown-right">
        <h3>Project: ${task.projectUnder}</h3>
        <h3>Due Date: ${task.dueDate}</h3>
        <h3>Priority Level: ${task.priority}</h3>
      </div>
    </div>`;
    let completedTaskBtn = li.querySelector(`input#${task.id}`);
    let deleteTaskBtn = li.querySelector("i.task-delete-btn");
    addTaskFunctionality(task, completedTaskBtn, deleteTaskBtn);
  });
}
/*----- 
TASK FUNCTIONALITY
-----*/

function addTaskFunctionality(task, completedTaskBtn, deleteTaskBtn) {
  completedTaskBtn.addEventListener("click", taskCompleted(task));
  deleteTaskBtn.addEventListener("click", removeTask(task));
}
function taskCompleted(task) {
  const taskLabel = task.querySelector("label");
  if (taskLabel.style["text-decoration"] == "line-through") {
    taskLabel.style["text-decoration"] = "none";
    task.style.color = "#566573";
  } else {
    taskLabel.style["text-decoration"] = "line-through";
    task.style.color = "#B3B6B7";
  }
}
function removeTask(task) {
  tasksContainer.removeChild(task);
}
/*----- 
PROJECT / SUBFOLDER --- CREATION / UPDATE
-----*/
const subfolderModal = document.getElementById("subfolder-modal");
const addProjectBtn = document.getElementById("add-subfolder-btn");
const submitProjectBtn = document.getElementById("confirm-subfolder");
addProjectBtn.addEventListener("click", projectPopUp);
function projectPopUp() {
  overlay.classList.add("active");
  subfolderModal.classList.add("active");
}
submitProjectBtn.addEventListener("click", () => {
  const newSubfolderName = subfolderModal.querySelector(
    "input#subfolder-title-name-input"
  ).value;
  if (newSubfolderName == "" || newSubfolderName == null) return;
  newSubfolder = {
    id: Date.now().toString(),
    name: newSubfolderName,
    tasks: [],
  };
  // subfolders.push(newSubfolder);
  removeOverlay();
  // updateDomStorage();
});

/*----- 
TASK --- CREATION / UPDATE
-----*/
const submitTaskBtn = document.getElementById("confirm-task");
const taskModal = document.getElementById("task-modal");
const addTaskBtn = document.getElementById("add-task-button");
const modalTitle = document.querySelector("h3.modal-title");

addTaskBtn.addEventListener("click", taskPopUp);
function taskPopUp() {
  overlay.classList.add("active");
  taskModal.classList.add("active");
  modalTitle.textContent = "Add Task";
  submitTaskBtn.querySelector(".btn").textContent = "Add Task";
}

submitTaskBtn.addEventListener("click", () => {
  const newTask = {
    id: Date.now().toString(),
    name: taskModal.querySelector("input#task-title-name-input").value,
    description: taskModal.querySelector("textarea#description").value,
    projectUnder: taskModal.querySelector("input#task-project-input").value,
    dueDate: taskModal.querySelector("input#task-due-date-input").value,
    priority: taskModal.querySelector("select#task-priority-input").value,
    complete: "",
  };
  let selectedSubfolder = localStorage.getItem("selectedSubfolder");
  // selectedSubfolder.tasks.push(newTask);
  removeOverlay();
  // updateDOMStorage();
});

/*----- 
REMOVE OVERLAY
-----*/
const removeOverlayBtns = document.querySelectorAll(".close-modal");

removeOverlayBtns.forEach((btn) => {
  btn.addEventListener("click", removeOverlay);
});

function removeOverlay() {
  overlay.classList.remove("active");
  taskModal.classList.remove("active");
  subfolderModal.classList.remove("active");
}
