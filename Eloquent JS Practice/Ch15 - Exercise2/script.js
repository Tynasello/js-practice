/*----
In this exercise, I want you to implement a mouse trail. 
Use absolutely positioned <div> elements with a fixed 
size and background color (refer to the code in the 
“Mouse Clicks” section for an example). Create a bunch 
of such elements and, when the mouse moves, display them 
in the wake of the mouse pointer.
https://eloquentjavascript.net/15_event.html#mouse_drawing
----*/

// Will hold all cursor trailing divs
let trails = []
// There will be 8 trailing shapes
const numTrails = 8;
let trailIndex = 0;
let trail;
let shape;

// Iterate numTrails times
for (let i=0;i<numTrails;i++){
  // Create new div for trail
  trail = document.createElement('div');
  // Set trail class to trail to gain styling of trailing shapes
  trail.className = 'trail';
  trails.push(trail);
  document.body.appendChild(trail);
}

// When mousemove event occurs in document, run the callback function with parameter event
document.addEventListener('mousemove', event =>{
  // Set shape equal to the trailIndex index of trails - this  will be the trail which is farthest from current cursor position
  shape = trails[trailIndex];
  // Update left and right styles of shape (farthest trail) to current x and y position of cursor
  shape.style.left = (event.pageX) + "px";
  shape.style.top = (event.pageY) + "px";
  // Add one to trailIndex to get next trail. Get this number modulo numTrails to get index 0 of trails when we are at last index
  trailIndex = (trailIndex+1)%numTrails;
});

