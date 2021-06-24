/*----
Extend the cat animation defined earlier so that both the cat and 
his hat (<img src="img/hat.png">) orbit at opposite sides of the 
ellipse. Or make the hat circle around the cat. Or alter the
animation in some other interesting way.
https://eloquentjavascript.net/14_dom.html
----*/

// Cat and hat images
let cat = document.querySelector("#cat");
let hat = document.querySelector("#hat");

// catAngle and hatAngle start on opposite sides of unit circle
let catAngle = 0;
let hatAngle = Math.PI;
let lastTime = null;

// cat2 will rotate around hat2 which is stationary
// In seperate div in HTML from car and hat
let cat2 = document.querySelector("#cat-2");
let catAngle2 = 0;


// Current time (in millis) is passed into animate function when requestAnimationFrame() is called
function animate(time) {
  // If last time is not null, update all angles 
  if (lastTime != null){
    //time-lastTime * a small constant will continously move the angles about the unit circle
    catAngle += (time - lastTime) * 0.001;
    hatAngle += (time - lastTime) * 0.001;
    catAngle2 += (time - lastTime) * 0.001;
  } 

  // Update lastTime to current time
  lastTime = time;

  // Change top and left properties to each image, creates appearance of moving
  // Sin function will oscilate the top property
  // Cos function will oscilate the left property
  // Multiplying by the constants to increase the magnitudes at which the images oscilate about the origin
  cat.style.top = (Math.sin(catAngle) * 100 ) + "px";
  cat.style.left = (Math.cos(catAngle) * 200 ) + "px";

  hat.style.top = (Math.sin(hatAngle) * 100 ) + "px";
  hat.style.left = (Math.cos(hatAngle) * 200 ) + "px";

  // In seperate div in HMTL, doesn't affect cat and hat
  // Oscilates around seperate stationary hat2 image
  cat2.style.top = (Math.sin(hatAngle) * 150 ) + "px";
  cat2.style.left = (Math.cos(hatAngle) * 250 ) + "px";

  //Continuously run animate 
  requestAnimationFrame(animate);
}
// Tell browser to run animation animate
requestAnimationFrame(animate);



//---------------