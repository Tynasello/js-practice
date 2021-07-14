import { toDate, isToday, isThisWeek } from "date-fns";

const projectsBtn = document.getElementById("projects-title");
const projectsList = document.getElementById("current-projects-list");
const arrow = document.querySelector(".fa-chevron-down");
projectsBtn.addEventListener("click", projectsDropdown);

function projectsDropdown() {
  if (projectsList.style.transform == "scale(0)") {
    projectsList.style.transform = "scale(1)";
    for (let i = 1; i < projectsList.childNodes.length; i++) {
      projectsList.childNodes[i].style.display = "flex";
    }
    arrow.style.transform = "rotate(180deg)";
  } else {
    projectsList.style.transform = "scale(0)";
    for (let i = 1; i < projectsList.childNodes.length; i++) {
      projectsList.childNodes[i].style.display = "none";
    }
    arrow.style.transform = "rotate(0)";
  }
}

/* ----------------

---------------- */

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
  displayTaskContainer();
}

function displaySubfolders() {
  Object.keys(subfolders).forEach((key) => {
    const value = subfolders[key];
    if (value.static == true) return;
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
      // li.classList.add("active-subfolder");
      localStorage.setItem("selectedSubfolderId", selectedSubfolderId);
      updateDOM();
    });
  });
}
function displayTaskContainer() {
  tasksContainer.style.display = "";
  let selectedSubfolder = subfolders.find(
    (subfolder) => subfolder.id === selectedSubfolderId
  );
  if (selectedSubfolder == null) {
    selectedSubfolder = subfolders.find(
      (subfolder) => subfolder.id === "all-tasks"
    );
  }
  activeProjectHeader.textContent = `${selectedSubfolder.name}`;
  if (!selectedSubfolder.static) {
    activeProjectHeader.innerHTML += `<i
    class="fas fa-trash-alt task-delete-btn btn"
    onclick="event.stopPropagation()"
  ></i>`;
    const deleteProjectBtn = activeProjectHeader.querySelector(".fas");
    deleteProjectBtn.addEventListener("click", () => {
      const ulProjects = projectListContainer.querySelectorAll(".project");
      const subfolderOfTask = subfolders.find(
        (subfolder) => subfolder.id === selectedSubfolderId
      );
      ulProjects.forEach((li) => {
        if (li.id == selectedSubfolder.id) {
          li.style.display = "none";
          tasksContainer.style.display = "none";
          activeProjectHeader.textContent = "";
          let children = tasksContainer.children;
          for (let i = 0; i < children.length; i++) {
            removeTasks(children[i], [
              "all-tasks",
              "tasks-week",
              "tasks-today",
            ]);
          }
          return;
        }
      });

      const removeIndex = subfolders.indexOf(subfolderOfTask);
      subfolders.splice(removeIndex, 1);
      localStorage.setItem("subfolders", JSON.stringify(subfolders));
    });
  }
  displayTasks(selectedSubfolder);
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
    let deleteIcon = `<i class="fas fa-trash-alt task-delete-btn btn" onclick="event.stopPropagation()"></i>`;
    if (subfolder.id == "tasks-week" || subfolder.id == "tasks-today") {
      deleteIcon = " ";
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
        ${deleteIcon}
      </div>
    </div>
    <div class="task-info-dropdown">
      <div class="task-info-dropdown-left">
        <h3>Name: ${task.name}</h3>
        <h3>Description: ${task.description}</h3>
      </div>
      <div class="task-info-dropdown-right">
        <h3>Due Date: ${task.dueDate}</h3>
        <h3>Priority Level: ${task.priority}</h3>
      </div>
    </div>`;

    let completedTaskBtn = li.querySelector(`input`);
    let deleteTaskBtn = li.querySelector("i.task-delete-btn");
    let editBtn = li.querySelector("i.task-edit-btn");
    addTaskFunctionality(li, completedTaskBtn, deleteTaskBtn, editBtn);
    addTaskColor(li, task.priority);
    tasksContainer.appendChild(li);
  });
}
/*----- 
TASK FUNCTIONALITY
-----*/
const overlay = document.getElementById("overlay");
const taskModal = document.getElementById("task-modal");
const modalTitle = document.querySelector("h3.modal-title");
const submitTaskBtn = document.querySelector(".confirm-btn");
const formItemName = document.getElementById("form-item-name");
const formItemDesc = document.getElementById("form-item-description");
const formItemDueDate = document.getElementById("form-item-due-date");
const formItemPriority = document.getElementById("form-item-priority");
let editedTask = null;
function addTaskFunctionality(task, completedTaskBtn, deleteTaskBtn, editBtn) {
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
  if (!deleteTaskBtn) return;
  deleteTaskBtn.addEventListener("click", () => {
    task.style.display = "none";
    const subfolderOfTask = subfolders.find(
      (subfolder) => subfolder.id === selectedSubfolderId
    );
    let removeIndex = subfolderOfTask.tasks.indexOf(
      subfolderOfTask.tasks.find((t) => t.id === task.querySelector("input").id)
    );
    subfolderOfTask.tasks.splice(removeIndex, 1);
    let subfolderIds = [];
    subfolders.forEach((subfolder) => subfolderIds.push(subfolder.id));
    removeTasks(task, subfolderIds);
    localStorage.setItem("subfolders", JSON.stringify(subfolders));
    subfolders = JSON.parse(localStorage.getItem("subfolders")) || [];
  });
  editBtn.addEventListener("click", () => {
    overlay.classList.add("active");
    taskModal.classList.add("active");
    modalTitle.textContent = "Edit Task";
    submitTaskBtn.textContent = "Confirm Edit";
    editedTask = subfolders
      .find((subfolder) => subfolder.id === selectedSubfolderId)
      .tasks.find((t) => t.id === task.querySelector("input").id);
    formItemName.querySelector("input").value = editedTask.name;
    formItemDesc.querySelector("textarea").value = editedTask.description;
    formItemDueDate.querySelector("input").value = editedTask.dueDate;
    formItemPriority.querySelector("select").value = editedTask.priority;
  });
}
function removeTasks(task, subfolderIds) {
  subfolderIds.forEach((subfolderId) => {
    const subfolder = subfolders.find(
      (subfolder) => subfolder.id === subfolderId
    );

    let removeIndex = subfolder.tasks.indexOf(
      subfolder.tasks.find((t) => t.id === task.querySelector("input").id)
    );
    if (removeIndex != -1) {
      subfolder.tasks.splice(removeIndex, 1);
    }
  });
}
function addTaskColor(task, priority) {
  const flag = task.querySelector(".priority-flag");
  if (priority == "Low") {
    flag.style.color = "#3498DB";
  } else if (priority == "Medium") {
    flag.style.color = "#F39C12";
  } else {
    flag.style.color = "#E74C3C";
  }
}

/*----- 
PROJECT / SUBFOLDER --- CREATION / UPDATE
-----*/
const subfolderModal = document.getElementById("subfolder-modal");
const addProjectBtn = document.getElementById("add-subfolder-btn");
const submitProjectBtn = document.getElementById("confirm-subfolder");
const subfolderContainer = document.getElementById("subfolders-list");
addProjectBtn.addEventListener("click", () => {
  overlay.classList.add("active");
  subfolderModal.classList.add("active");
});
function staticSubfolders() {
  const ids = ["all-tasks", "tasks-today", "tasks-week"];
  const names = ["All Tasks", "Today", "This Week"];
  ids.forEach((idVal, i) => {
    let newSubfolder = {
      id: idVal,
      name: names[i],
      tasks: [],
      static: true,
    };
    if (subfolders.length <= 3) {
      subfolders.push(newSubfolder);
    }
    const element = document.getElementById(`${idVal}`);
    element.addEventListener("click", () => {
      selectedSubfolderId = element.id;
      localStorage.setItem("selectedSubfolderId", element.id);
      updateDOM();
    });
  });
}
submitProjectBtn.addEventListener("click", () => {
  const newSubfolderName = subfolderModal.querySelector(
    "input#subfolder-title-name-input"
  ).value;
  if (newSubfolderName == "" || newSubfolderName == null) return;
  let newSubfolder = {
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
const addTaskBtn = document.getElementById("add-task-button");

addTaskBtn.addEventListener("click", () => {
  if (
    selectedSubfolderId == "tasks-week" ||
    selectedSubfolderId == "tasks-today"
  )
    return;
  overlay.classList.add("active");
  taskModal.classList.add("active");
  modalTitle.textContent = "Add Task";
  submitTaskBtn.textContent = "Add Task";
  formItemName.querySelector("input").value = null;
  formItemDesc.querySelector("textarea").value = null;
  formItemDueDate.querySelector("input").value = null;
  formItemPriority.querySelector("select").value = "Low";
});

const allTasksSubfolder = subfolders.find(
  (subfolder) => subfolder.id === "all-tasks"
);
const tasksTodaySubfolder = subfolders.find(
  (subfolder) => subfolder.id === "tasks-today"
);
const tasksWeekSubfolder = subfolders.find(
  (subfolder) => subfolder.id === "tasks-week"
);
submitTaskBtn.addEventListener("click", (e) => {
  let nameVal = taskModal.querySelector("input#task-title-name-input").value;
  let descriptionVal = taskModal.querySelector("textarea#description").value;
  let dueDateVal = taskModal.querySelector("input#task-due-date-input").value;
  let priorityVal = taskModal.querySelector("select#task-priority-input").value;
  if (!checkInputs(nameVal, dueDateVal)) return;
  let newTask = {};
  if (modalTitle.textContent == "Edit Task") {
    let editedTasks = [];
    subfolders.forEach((subfolder) => {
      subfolder.tasks.forEach((task) => {
        if (task.id == editedTask.id) {
          task.name = nameVal;
          task.description = descriptionVal;
          task.dueDate = dueDateVal;
          task.priority = priorityVal;
        }
      });
    });
  } else {
    newTask = {
      id: Date.now().toString(),
      name: nameVal,
      description: descriptionVal,
      dueDate: dueDateVal,
      priority: priorityVal,
      complete: " ",
    };
    const selectedSubfolder = subfolders.find(
      (subfolder) => subfolder.id === selectedSubfolderId
    );
    allTasksSubfolder.tasks.push(newTask);
    selectedSubfolder.tasks.push(newTask);
    const date = toDate(
      new Date(
        dueDateVal.substring(0, 4),
        dueDateVal.substring(5, 7) - 1,
        dueDateVal.substring(8, 10)
      )
    );

    if (isToday(date)) {
      tasksTodaySubfolder.tasks.push(newTask);
    }
    if (isThisWeek(date)) {
      tasksWeekSubfolder.tasks.push(newTask);
    }
  }

  removeOverlay();
  updateDomStorage();
});
function checkInputs(name, date) {
  let passed = true;
  if (name == "" || name == null) {
    formItemName.classList.add("validation-fail");
    formItemName.classList.remove("validation-pass");
    formItemName.querySelector(".error-msg").textContent =
      "Please enter a valid task name ";
    passed = false;
  } else {
    formItemName.classList.add("validation-pass");
    formItemName.classList.remove("validation-fail");
  }
  if (date == "" || date == null) {
    formItemDueDate.classList.add("validation-fail");
    formItemDueDate.classList.remove("validation-pass");
    formItemDueDate.querySelector(".error-msg").textContent =
      "Please enter a valid date ";
    passed = false;
  } else {
    formItemDueDate.classList.add("validation-pass");
    formItemDueDate.classList.remove("validation-fail");
  }
  formItemDesc.classList.add("validation-pass");
  formItemPriority.classList.add("validation-pass");
  return passed;
}

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
staticSubfolders();
updateDOM();
