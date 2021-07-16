/* --------------------------------
To-do list app
Jul 16, 2021
---

TOC ---------------
LINE 25  - HELPER FUNCTIONS
LINE 59  - UPDATING DOM / LOCAL STORAGE 
LINE 252 - TASK FUNCTIONALITY
LINE 390 - PROJECT / SUBFOLDER --- CREATION / UPDATE
LINE 458 - TASK --- CREATION / UPDATE
LINE 609 - REMOVE OVERLAY
----------------

-------------------------------- */

// Used to calculate if user inputed date should fall into the today and this week subfolders
import { toDate, isToday, isThisWeek } from "date-fns";

// Using local storage to store all subfolders and the id of the currently selected subfolder
let subfolders = JSON.parse(localStorage.getItem("subfolders")) || [];
let selectedSubfolderId = localStorage.getItem("selectedSubfolderId");

/*----- 

HELPER FUNCTIONS

-----*/

const projectsBtn = document.getElementById("projects-title");
const projectsList = document.getElementById("current-projects-list");
const arrow = document.querySelector(".fa-chevron-down");

// Displays all current projects in drop-down fashion and rotates chevron when projects button is clicked
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

//

function removeFromDOM(element) {
  element.innerHTML = " ";
}

/*----- 

UPDATING DOM / LOCAL STORAGE 

-----*/

const projectListContainer = document.getElementById("current-projects-list");
const activeProjectHeader = document.getElementById("tasks-of-subfolder");
const tasksContainer = document.getElementById("tasks-list");

// updateDOM() and then update subfolders and selectedSubfolderId in localStorage

function updateDomStorage() {
  updateDOM();
  localStorage.setItem("subfolders", JSON.stringify(subfolders));
  localStorage.setItem("selectedSubfolderId", selectedSubfolderId);
}

function updateDOM() {
  // Remove all projects and tasks from the DOM - they need to be refreshed and displayed again
  removeFromDOM(projectListContainer);
  removeFromDOM(tasksContainer);
  // Display all subfolders and then tasks of the currently selected subfolder
  displaySubfolders();
  displayTaskContainer();
}

//

function displaySubfolders() {
  // Iterates through all subfolders (stored in localStorage)
  Object.keys(subfolders).forEach((key) => {
    // The value of the subfolder contains id, name, tasks, and static names
    const value = subfolders[key];
    // Don't display the static subfolders - all tasks, today and this week
    if (value.static == true) return;
    // Create a new list item for this subfolder
    const li = document.createElement("li");
    li.classList.add("project");
    li.classList.add("btn");
    // Important that these ids match so we can relate list elements by id with the subfolder objects by id
    li.id = value.id;
    const h3 = document.createElement("h3");
    h3.textContent = `-> ${value.name}`;
    li.appendChild(h3);
    // Append list item to project container and display as none - we only want to display if the project button is clicked
    projectListContainer.append(li);
    li.style.display = "none";
    // If the list item is clicked, update selectedSubfolderId globally and in localStorage
    // Update DOM since new tasks corresponding to the newly selected subfolder need to be displayed
    li.addEventListener("click", () => {
      selectedSubfolderId = li.id;
      localStorage.setItem("selectedSubfolderId", selectedSubfolderId);
      updateDOM();
    });
  });
  // When a new subfolder is clicked, displaySubfolders() is called
  // projectsDropdown is called twice to close it and then open it again
  projectsDropdown();
  projectsDropdown();
}

//

function displayTaskContainer() {
  // Display the tasks container
  tasksContainer.style.display = "";
  // Find the selected subfolder, if it's null (no folder was selected), make the all tasks subfolder the selected subfolder
  let selectedSubfolder = subfolders.find(
    (subfolder) => subfolder.id === selectedSubfolderId
  );
  if (selectedSubfolder == null) {
    selectedSubfolder = subfolders.find(
      (subfolder) => subfolder.id === "all-tasks"
    );
  }
  // Set the task's header to the name value of selectedSubfolder
  activeProjectHeader.textContent = `${selectedSubfolder.name}`;
  // Add a delete project button to the task's header and delete project functionality only if the selected subfolder is not static
  // We want to be able to delete projects but not the static subfolders
  if (!selectedSubfolder.static) {
    activeProjectHeader.innerHTML += `<i class="fas fa-trash-alt task-delete-btn btn" onclick="event.stopPropagation()"></i>`;
    //
    const deleteProjectBtn = activeProjectHeader.querySelector(".fas");
    // When deleting either a project or task, we need to have the element display none and then remove the element from localStorage
    // Here, the selected subfolder and its tasks are removed from subfolders in localStorage, and the selected subfolder in the tasks
    // Projects list, the task container and the task's header are all given a style of display none
    deleteProjectBtn.addEventListener("click", () => {
      const ulProjects = projectListContainer.querySelectorAll(".project");
      // Iterate through each li (project) in ulProjects
      ulProjects.forEach((li) => {
        // Only perform delete operation on subfolder if the id of the li is the same as the selected subfolder
        if (li.id == selectedSubfolder.id) {
          // Remove the li (project in projects dropdown), the task container, and set the task's header to empty
          li.style.display = "none";
          tasksContainer.style.display = "none";
          activeProjectHeader.textContent = "";
          // Remove all of the children (tasks) from the deleted project
          let children = tasksContainer.children;
          for (let i = 0; i < children.length; i++) {
            // removeTasks() removes all the tasks of the selected subfolder from the subfolders name in localStorage
            removeTasks(children[i], [
              "all-tasks",
              "tasks-week",
              "tasks-today",
            ]);
          }
          // There's only one selected subfoler, so return once we've found it
          return;
        }
      });
      // Find the index of the selected subfolder in subfolders
      const removeIndex = subfolders.indexOf(
        subfolders.find((subfolder) => subfolder.id === selectedSubfolderId)
      );
      // Remove this subfolder from subfolders
      subfolders.splice(removeIndex, 1);
      // Update subfolders name in localStorage
      localStorage.setItem("subfolders", JSON.stringify(subfolders));
    });
  }
  // Now that the container has been displayed with valid header and delete functionality, display the tasks of the selected subfolder
  displayTasks(selectedSubfolder);
}

//

function displayTasks(subfolder) {
  // Iterate through each task in subfolder.tasks
  subfolder.tasks.forEach((task) => {
    // Create list item for task
    const li = document.createElement("li");
    li.classList.add("task");
    li.id = `${task.id}`;
    // Add or remove class of checked to list item
    if (task.complete == "checked") {
      li.classList.add("checked");
    } else {
      li.classList.remove("checked");
    }
    // Create deleteIcon string variable with html for a delete button
    let deleteIcon = `<i class="fas fa-trash-alt task-delete-btn btn" onclick="event.stopPropagation()"></i>`;
    // Set deleteIcon to empty string if the current subfolder has an id of tasks-week or tasks-today
    // Tasks in these subfolders shouldn't be able to be deleted
    if (subfolder.id == "tasks-week" || subfolder.id == "tasks-today") {
      deleteIcon = " ";
    }
    // Add innerHTML to list item. Use template literal string to make the li unique to each task in the subfolder
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
    // Add task functionality of the list items completed task, delete, and edit buttons
    addTaskFunctionality(li, completedTaskBtn, deleteTaskBtn, editBtn);
    // Add the priority color to the list item
    addTaskColor(li, task.priority);
    // Append the list item to the tasks container
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

//

function addTaskFunctionality(task, completedTaskBtn, deleteTaskBtn, editBtn) {
  //
  // Drop-down appears when task if clicked. Drop-down shows summary of task
  task.querySelector(".task-above").addEventListener("click", () => {
    if (task.querySelector(".task-info-dropdown").style.display == "flex") {
      task.querySelector(".task-info-dropdown").style.display = "none";
    } else {
      task.querySelector(".task-info-dropdown").style.display = "flex";
    }
  });

  //

  completedTaskBtn.addEventListener("click", () => {
    // If completed task button is clicked, toggle the checkd class on the task
    task.classList.toggle("checked");
    // Find the updated task object in subfolders
    const updatedTask = subfolders
      .find((subfolder) => subfolder.id === selectedSubfolderId)
      .tasks.find((t) => t.id === task.querySelector("input").id);
    // For each task in each subfoler, if it has the same id as the updated task then they are the same task
    // Toggle the complete value
    subfolders.forEach((subfolder) => {
      subfolder.tasks.forEach((task) => {
        if (task.id == updatedTask.id) {
          if (task.complete == " ") {
            task.complete = "checked";
          } else {
            task.complete = " ";
          }
        }
      });
    });
    // Update subfolders in localStorage and then update subfolders
    localStorage.setItem("subfolders", JSON.stringify(subfolders));
    subfolders = JSON.parse(localStorage.getItem("subfolders")) || [];
  });

  //

  editBtn.addEventListener("click", () => {
    // When edit task button is clicked, activate the overlay and task modal
    overlay.classList.add("active");
    taskModal.classList.add("active");
    // Edit the text content of the modal title and submit task button (should be Edit task instead of normal Add task)
    modalTitle.textContent = "Edit Task";
    submitTaskBtn.textContent = "Confirm Edit";
    // Update editedTask
    editedTask = subfolders
      .find((subfolder) => subfolder.id === selectedSubfolderId)
      .tasks.find((t) => t.id === task.querySelector("input").id);
    // Update form input values with editedTask values
    // Takes the previously filled in values from the edite task and adds then to the task modal form input values
    formItemName.querySelector("input").value = editedTask.name;
    formItemDesc.querySelector("textarea").value = editedTask.description;
    formItemDueDate.querySelector("input").value = editedTask.dueDate;
    formItemPriority.querySelector("select").value = editedTask.priority;
  });

  //
  // If there is no delete task button ( today and this week subfolders ), return

  if (!deleteTaskBtn) return;
  deleteTaskBtn.addEventListener("click", () => {
    // Add style of display none of the task when its delete task button is clicked
    task.style.display = "none";
    // Find the subfolder of the current task
    const subfolderOfTask = subfolders.find(
      (subfolder) => subfolder.id === selectedSubfolderId
    );
    // Find the index of the task in subfolderOfTask
    let removeIndex = subfolderOfTask.tasks.indexOf(
      subfolderOfTask.tasks.find((t) => t.id === task.querySelector("input").id)
    );
    // Remove the task from its subfolder
    subfolderOfTask.tasks.splice(removeIndex, 1);
    // Create subfolderIds and fill it with the ids of each subfolder in subfolders
    let subfolderIds = [];
    subfolders.forEach((subfolder) => subfolderIds.push(subfolder.id));
    // Remove current task from all subfolders in subfolders (in localStorage)
    removeTasks(task, subfolderIds);
    // Update subfolders
    localStorage.setItem("subfolders", JSON.stringify(subfolders));
    subfolders = JSON.parse(localStorage.getItem("subfolders")) || [];
  });
}

//

function removeTasks(task, subfolderIds) {
  // Iterate through each subfolderId in subfolderIds
  subfolderIds.forEach((subfolderId) => {
    // Find the subfolder with matching ids
    const subfolder = subfolders.find(
      (subfolder) => subfolder.id === subfolderId
    );
    // Find the index of the task in the subfolder
    let removeIndex = subfolder.tasks.indexOf(
      subfolder.tasks.find((t) => t.id === task.querySelector("input").id)
    );
    // Remove the task from the subfolder if removeIndex isn't -1, ie it was found
    if (removeIndex != -1) {
      subfolder.tasks.splice(removeIndex, 1);
    }
  });
}

//

function addTaskColor(task, priority) {
  // Add a color to the style of the tasks flag icon corresponding to the priority level
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

const projectModal = document.getElementById("subfolder-modal");
const addProjectBtn = document.getElementById("add-subfolder-btn");
const submitProjectBtn = document.getElementById("confirm-subfolder");

//
// When the add project button is clicked, add a class of active the overlay and the subfolder modal
addProjectBtn.addEventListener("click", () => {
  overlay.classList.add("active");
  projectModal.classList.add("active");
});

//
// Displays the static subfolders - today and this week
function staticSubfolders() {
  const ids = ["all-tasks", "tasks-today", "tasks-week"];
  const names = ["All Tasks", "Today", "This Week"];
  ids.forEach((idVal, i) => {
    // Create new subfolder object
    let newSubfolder = {
      id: idVal,
      name: names[i],
      tasks: [],
      static: true,
    };
    // Only push the new subfolder object to subfolders if subfolders length is less than 3
    // Makes sure theres no duplicates of static subfolers in the DOM
    if (subfolders.length < 3) {
      subfolders.push(newSubfolder);
    }

    const subfolder = document.getElementById(`${idVal}`);
    //
    subfolder.addEventListener("click", () => {
      // If the static subfolder is clicked update selectedSubfolderId, then updateDOM
      selectedSubfolderId = subfolder.id;
      localStorage.setItem("selectedSubfolderId", subfolder.id);
      updateDOM();
    });
  });
}

//

submitProjectBtn.addEventListener("click", () => {
  // Find the input value of the subfolder modal when the submit project button is clicked
  const newSubfolderName = projectModal.querySelector(
    "input#subfolder-title-name-input"
  ).value;
  // Return if no valid project name was entered
  if (newSubfolderName == "" || newSubfolderName == null) return;
  // Else create new subfolder object with id, name, and tasks name
  let newSubfolder = {
    id: Date.now().toString(),
    name: newSubfolderName,
    tasks: [],
  };
  // Push the newly created subfolder to subfolders
  subfolders.push(newSubfolder);
  // Remove the overlay and update DOM and storage
  removeOverlay();
  updateDomStorage();
});

/*----- 

TASK --- CREATION / UPDATE

-----*/

const addTaskBtn = document.getElementById("add-task-button");
const allTasksSubfolder = subfolders.find(
  (subfolder) => subfolder.id === "all-tasks"
);
const tasksTodaySubfolder = subfolders.find(
  (subfolder) => subfolder.id === "tasks-today"
);
const tasksWeekSubfolder = subfolders.find(
  (subfolder) => subfolder.id === "tasks-week"
);

//

addTaskBtn.addEventListener("click", () => {
  // If the selected subfolder is the today or this week subfolder return
  // Adding tasks can't be done from today and this week subfolders
  if (
    selectedSubfolderId == "tasks-week" ||
    selectedSubfolderId == "tasks-today"
  )
    return;
  // Activate overlay and taskModal
  overlay.classList.add("active");
  taskModal.classList.add("active");
  // Edit the text content of the modal title and submit task button
  modalTitle.textContent = "Add Task";
  submitTaskBtn.textContent = "Add Task";
  // Initialize starting values of null ( Low for priority ) for form input values
  formItemName.querySelector("input").value = null;
  formItemDesc.querySelector("textarea").value = null;
  formItemDueDate.querySelector("input").value = null;
  formItemPriority.querySelector("select").value = "Low";
});

//

submitTaskBtn.addEventListener("click", (e) => {
  // When the submit task button is clicked get the form input values and store them in corresponding variables
  let nameVal = taskModal.querySelector("input#task-title-name-input").value;
  let descriptionVal = taskModal.querySelector("textarea#description").value;
  let dueDateVal = taskModal.querySelector("input#task-due-date-input").value;
  let priorityVal = taskModal.querySelector("select#task-priority-input").value;
  // Check to see if the inputs are valid. If they aren't, return
  if (!checkInputs(nameVal, dueDateVal)) return;
  // Create new task object
  let newTask = {};
  // If the modal title is "Edit task", we are editing the task not creating a new one
  if (modalTitle.textContent == "Edit Task") {
    // Iterate through each task in each subfolder
    subfolders.forEach((subfolder) => {
      subfolder.tasks.forEach((task) => {
        // If the task has the same id as the edited task id, update all values of the current task object to the newly inputed valued
        if (task.id == editedTask.id) {
          task.name = nameVal;
          task.description = descriptionVal;
          task.dueDate = dueDateVal;
          task.priority = priorityVal;
        }
      });
    });
  } else {
    // Else a new task is being created
    newTask = {
      id: Date.now().toString(),
      name: nameVal,
      description: descriptionVal,
      dueDate: dueDateVal,
      priority: priorityVal,
      complete: " ",
    };
    // Find the selected subfolder
    const selectedSubfolder = subfolders.find(
      (subfolder) => subfolder.id === selectedSubfolderId
    );
    // Push the newly created task to the tasks array of all tasks subfolder and the selected subfolder
    selectedSubfolder.tasks.push(newTask);
    // Only push to allTasksSubfolder.tasks if allTasksSubfolder is not the currently selected subfolder ( avoids adding twice )
    if (selectedSubfolder.id != allTasksSubfolder.id) {
      allTasksSubfolder.tasks.push(newTask);
    }
    // Get inputted date
    const date = toDate(
      new Date(
        dueDateVal.substring(0, 4),
        dueDateVal.substring(5, 7) - 1,
        dueDateVal.substring(8, 10)
      )
    );
    // Push the new task object to the tasks today and tasks this week subfolder tasks array if the inputted date is today and this week respectively.
    if (isToday(date)) {
      tasksTodaySubfolder.tasks.push(newTask);
    }
    if (isThisWeek(date)) {
      tasksWeekSubfolder.tasks.push(newTask);
    }
  }
  // Remove overlay and update DOM and storage
  removeOverlay();
  updateDomStorage();
});

//
// Validate form input values
function checkInputs(name, date) {
  // Initilaize passed to true, execute a series of checks which may make passed equal to false
  let passed = true;

  //
  // If the input value is empty or null, the inputs are not valid, else they are valid
  // If the inputs are not valid:
  //    -> Add a class of validation-fail and remove a class of validation-pass to the form items
  //    -> Add a error message below the form item
  //    -> Set passed variable to false
  // Else the inputs are valid:
  //    -> Add a class of validation-pass and remove a class of validation-fail to the form items
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

  //

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

  //
  // The description and priority input values are automatically valid, therefore add a class of validation-pass to the form items
  formItemDesc.classList.add("validation-pass");
  formItemPriority.classList.add("validation-pass");
  return passed;
}

/*----- 

REMOVE OVERLAY

-----*/

const removeOverlayBtns = document.querySelectorAll(".close-modal");

//
// For each remove overlay button (all buttons with .close-modal class) call the removeOverlay function when clicked
removeOverlayBtns.forEach((btn) => {
  btn.addEventListener("click", removeOverlay);
});

function removeOverlay() {
  // Remove class of active from overlay and both task and project modals
  overlay.classList.remove("active");
  taskModal.classList.remove("active");
  projectModal.classList.remove("active");
}

/*----- 
-----*/
// Display the static subfolders - all tasks, today, and this week
// Since these subfolders can't be deleted, they are only displayed once (every page refresh)
staticSubfolders();
// updateDOM
updateDOM();
