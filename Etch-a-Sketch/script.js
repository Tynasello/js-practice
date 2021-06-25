/*---
Jun 24 2021
Etch-a-Sketch project
The color of the elements of a grid change as the user hovers over them.
The grid starts off at 16x16 fr but can be changed by the user.
Project idea is from the Odin Project Lessons. 
https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/etch-a-sketch-project
---*/

// Base width, hue of grid and last changed index
const baseWidth = 16;
let hue = 0;
let lastChanged;

// GRID
// Create new div called container which will be our grid elements container
const container = document.createElement("div");
container.id = "container";
// Create grid with baseWidth
createGrid(baseWidth);

// SIZE BUTTON
// Create new button which will allow user to input new size of grid
const changeSizeBtn = document.createElement("button");
changeSizeBtn.textContent = "Change Width";
changeSizeBtn.classList.add("btn");

// Add container and changeSizeBtn to the body of the document
document.body.appendChild(changeSizeBtn);
document.body.appendChild(container);

// EVENT LISTENERS
// If the change size button is clicked run getNewWidth callback function
changeSizeBtn.addEventListener("click", getNewWidth);
// Any time the mouse moves within the container element, run the changeColor callback function
container.addEventListener("mousemove", changeColor);

function createGrid(width) {
  // Clear previous grid
  container.innerHTML = "";
  // Update width of container
  container.style.gridTemplateColumns = `repeat(${width},1fr)`;

  // Iterate width^2 times (the number of grid elements)
  for (let i = 0; i < width ** 2; i++) {
    // Create  div element which will be our grid element
    let gridEl = document.createElement("div");
    gridEl.classList.add("gridEl");
    // Make grid element a child of container
    container.appendChild(gridEl);
  }
}

function changeColor(e) {
  // Get current x and y positions of mousemove event
  const currX = e.x;
  const currY = e.y;
  // For each child in container -> the grid elements -> get there x and y positions aswell as their height and widths
  container.childNodes.forEach((gridEl, i) => {
    // Make sure the last changed index is not the same as the current. Prevents color change when moving over same square
    if (lastChanged == i) return;
    gridElCoords = gridEl.getBoundingClientRect();
    x = gridElCoords.x;
    y = gridElCoords.y;
    height = gridElCoords.height;
    width = gridElCoords.width;
    // Find which grid element encompasses the current mouse position
    if (currX >= x && currY >= y && currX <= x + width && currY <= y + height) {
      // Update color using hsl and incriment hue by some number to traverse all colors
      gridEl.style.backgroundColor = `hsl(${hue},100%,50%)`;
      hue += 5;
      // Update last changed index
      lastChanged = i;
    }
  });
}

function getNewWidth() {
  // Prompt the user for a new width and store in width variable
  let width = prompt("Please enter new width. 1-50 (fractions):");
  // Only attempt to create new grid if the number submitted by the user is an integer between 1 and 50 inclusive
  if (!(width == parseInt(width, 10)) || width < 1 || width > 50) return;
  createGrid(width);
}
