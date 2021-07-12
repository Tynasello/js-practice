const projectsBtn = document.getElementById("projects-title");
const projectsList = document.getElementById("current-projects-list");

projectsBtn.addEventListener("click", projectsDropdown);

function projectsDropdown() {
  if (projectsList.style.transform == "scale(0)") {
    projectsList.style.transform = "scale(1)";
    for (let i = 1; i < projectsList.childNodes.length; i++) {
      projectsList.childNodes[i].style.display = "flex";
    }
  } else {
    projectsList.style.transform = "scale(0)";
    for (let i = 1; i < projectsList.childNodes.length; i++) {
      projectsList.childNodes[i].style.display = "none";
    }
  }
}

/* ----------------

---------------- */

//PROJECT DESC DROPDOWN ----------------------

const task = document.querySelector(".task");
task.addEventListener("click", taskClicked);

function taskClicked() {
  if (this.querySelector(".task-info-dropdown").style.display == "flex") {
    this.querySelector(".task-info-dropdown").style.display = "none";
  } else {
    this.querySelector(".task-info-dropdown").style.display = "flex";
  }
}

// EDIT TASK --------------------------------

// const editBtn = document.querySelector(".task-edit-btn");
// editBtn.addEventListener("click", editTask);

// function editTask() {
//   overlay.classList.add("active");
//   modalContainer.classList.add("active");
//   modalTitle.textContent = "Edit Task";
//   taskConfirmBtn.textContent = "Confirm Edit"
// }

// ----------------------------------------------------------------
const overlay = document.getElementById("overlay");

let subfolders = JSON.parse(localStorage.getItem("subfolders")) || [];
let selectedSubfolderId = localStorage.getItem("selectedSubfolderId");

/*----- 
HELPER FUNCTIONS
-----*/
function removeFromDOM(element) {
  element.innerHTML = " ";
}

/*----- 
UPDATING DOM / LOCAL STORAGE 
-----*/

const projectListContainer = document.getElementById("current-projects-list");
const activeProjectHeader = document.getElementById("tasks-of-subfolder");
const tasksContainer = document.getElementById("tasks-list");

function updateDomStorage() {
  updateDOM();
  localStorage.setItem("subfolders", JSON.stringify(subfolders));
  localStorage.setItem("selectedSubfolderId", selectedSubfolderId);
}

function updateDOM() {
  removeFromDOM(projectListContainer);
  removeFromDOM(tasksContainer);
  displaySubfolders();
  projectsDropdown();
  projectsDropdown();

  const selectedSubfolder = subfolders.find(
    (subfolder) => subfolder.id === selectedSubfolderId
  );
  if (selectedSubfolder != null) {
    activeProjectHeader.textContent = `${selectedSubfolder.name}`;
    displayTasks(selectedSubfolder);
  } else {
    activeProjectHeader.textContent = "";
  }
}

function displaySubfolders() {
  Object.keys(subfolders).forEach((key) => {
    const value = subfolders[key];
    const li = document.createElement("li");
    li.classList.add("project");
    li.classList.add("btn");
    li.id = value.id;
    const h3 = document.createElement("h3");
    h3.textContent = `-> ${value.name}`;
    li.appendChild(h3);
    projectListContainer.append(li);
    li.style.display = "none";
    li.addEventListener("click", () => {
      selectedSubfolderId = li.id;
      localStorage.setItem("selectedSubfolderId", selectedSubfolderId);
      updateDOM();
    });
  });
}

function displayTasks(subfolder) {
  subfolder.tasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task");
    li.id = `${task.id}`;
    if (task.complete == "checked") {
      li.classList.add("checked");
    } else {
      li.classList.remove("checked");
    }
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
    let completedTaskBtn = li.querySelector(`input`);
    let deleteTaskBtn = li.querySelector("i.task-delete-btn");
    addTaskFunctionality(li, completedTaskBtn, deleteTaskBtn);
    tasksContainer.appendChild(li);
  });
}
/*----- 
TASK FUNCTIONALITY
-----*/

function addTaskFunctionality(task, completedTaskBtn, deleteTaskBtn) {
  task.querySelector(".task-above").addEventListener("click", () => {
    if (task.querySelector(".task-info-dropdown").style.display == "flex") {
      task.querySelector(".task-info-dropdown").style.display = "none";
    } else {
      task.querySelector(".task-info-dropdown").style.display = "flex";
    }
  });
  completedTaskBtn.addEventListener("click", () => {
    task.classList.toggle("checked");
    const updatedTask = subfolders
      .find((subfolder) => subfolder.id === selectedSubfolderId)
      .tasks.find((t) => t.id === task.querySelector("input").id);
    if (updatedTask.complete == " ") {
      updatedTask.complete = "checked";
    } else {
      updatedTask.complete = " ";
    }
    localStorage.setItem("subfolders", JSON.stringify(subfolders));
    subfolders = JSON.parse(localStorage.getItem("subfolders")) || [];
  });
  deleteTaskBtn.addEventListener("click", () => {
    task.style.display = "none";
    const subfolderOfTask = subfolders.find(
      (subfolder) => subfolder.id === selectedSubfolderId
    );
    const removeIndex = subfolderOfTask.tasks.indexOf(
      subfolderOfTask.tasks.find((t) => t.id === task.querySelector("input").id)
    );
    subfolderOfTask.tasks.splice(removeIndex, 1);
    localStorage.setItem("subfolders", JSON.stringify(subfolders));
    subfolders = JSON.parse(localStorage.getItem("subfolders")) || [];
  });
}

/*----- 
PROJECT / SUBFOLDER --- CREATION / UPDATE
-----*/
const subfolderModal = document.getElementById("subfolder-modal");
const addProjectBtn = document.getElementById("add-subfolder-btn");
const submitProjectBtn = document.getElementById("confirm-subfolder");
const subfolderContainer = document.getElementById("subfolders-list");
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
  subfolders.push(newSubfolder);
  removeOverlay();
  updateDomStorage();
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
    complete: " ",
  };
  const selectedSubfolder = subfolders.find(
    (subfolder) => subfolder.id === selectedSubfolderId
  );
  selectedSubfolder.tasks.push(newTask);
  removeOverlay();
  updateDomStorage();
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

/*----- 
-----*/
updateDOM();
