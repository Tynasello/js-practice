const projectsBtn = document.getElementById("projects-title");
const projectsList = document.getElementById("current-projects-list");
const addProjectBtn = document.getElementById("add-project-btn");
const addTaskBtn = document.getElementById("add-task-button");

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

// const task = document.querySelector(".task");
// task.addEventListener("click", taskClicked);

// function taskClicked() {
//   if (this.querySelector(".task-info-dropdown").style.display == "flex") {
//     this.querySelector(".task-info-dropdown").style.display = "none";
//   } else {
//     this.querySelector(".task-info-dropdown").style.display = "flex";
//   }
// }

// const taskCompletedLabel = document.getElementById("sometask");
// taskCompletedLabel.addEventListener("click", taskCompleted);
// function taskCompleted() {
//   if (
//     this.parentElement.querySelector("label").style["text-decoration"] ==
//     "line-through"
//   ) {
//     this.parentElement.querySelector("label").style["text-decoration"] = "none";
//     this.parentElement.parentElement.parentElement.style.color = "#566573";
//   } else {
//     this.parentElement.querySelector("label").style["text-decoration"] =
//       "line-through";
//     this.parentElement.parentElement.parentElement.style.color = "#B3B6B7";
//   }
// }

const editBtn = document.querySelector(".task-edit-btn");
editBtn.addEventListener("click", editTask);
const modalContainer = document.querySelector(".modal-container");
const overlay = document.getElementById("overlay");
const exitEditTaskBtn = document.querySelector(".close-modal");
overlay.addEventListener("click", removeOverlay);
exitEditTaskBtn.addEventListener("click", removeOverlay);

function editTask() {
  overlay.classList.add("active");
  modalContainer.classList.add("active");
}
function removeOverlay() {
  overlay.classList.remove("active");
  modalContainer.classList.remove("active");
}
