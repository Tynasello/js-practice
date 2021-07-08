/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const projectsBtn = document.getElementById(\"projects-title\");\nconst projectsList = document.getElementById(\"current-projects-list\");\nconst addProjectBtn = document.getElementById(\"add-project-btn\");\nconst addTaskBtn = document.getElementById(\"add-task-button\");\n\nprojectsBtn.addEventListener(\"click\", projectsDropdown);\n\nfunction projectsDropdown() {\n  if (projectsList.style.transform == \"scale(1)\") {\n    projectsList.style.transform = \"scale(0)\";\n  } else {\n    projectsList.style.transform = \"scale(1)\";\n  }\n}\n\n/* ----------------\n\n---------------- */\n\n// const task = document.querySelector(\".task\");\n// task.addEventListener(\"click\", taskClicked);\n\n// function taskClicked() {\n//   if (this.querySelector(\".task-info-dropdown\").style.display == \"flex\") {\n//     this.querySelector(\".task-info-dropdown\").style.display = \"none\";\n//   } else {\n//     this.querySelector(\".task-info-dropdown\").style.display = \"flex\";\n//   }\n// }\n\n// const taskCompletedLabel = document.getElementById(\"sometask\");\n// taskCompletedLabel.addEventListener(\"click\", taskCompleted);\n// function taskCompleted() {\n//   if (\n//     this.parentElement.querySelector(\"label\").style[\"text-decoration\"] ==\n//     \"line-through\"\n//   ) {\n//     this.parentElement.querySelector(\"label\").style[\"text-decoration\"] = \"none\";\n//     this.parentElement.parentElement.parentElement.style.color = \"#566573\";\n//   } else {\n//     this.parentElement.querySelector(\"label\").style[\"text-decoration\"] =\n//       \"line-through\";\n//     this.parentElement.parentElement.parentElement.style.color = \"#B3B6B7\";\n//   }\n// }\n\nconst editBtn = document.querySelector(\".task-edit-btn\");\neditBtn.addEventListener(\"click\", editTask);\nconst modalContainer = document.querySelector(\".modal-container\");\nconst overlay = document.getElementById(\"overlay\");\nconst exitEditTaskBtn = document.querySelector(\".close-modal\");\noverlay.addEventListener(\"click\", removeOverlay);\nexitEditTaskBtn.addEventListener(\"click\", removeOverlay);\n\nfunction editTask() {\n  overlay.classList.add(\"active\");\n  modalContainer.classList.add(\"active\");\n}\nfunction removeOverlay() {\n  overlay.classList.remove(\"active\");\n  modalContainer.classList.remove(\"active\");\n}\n\n\n//# sourceURL=webpack://to-do-app/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;