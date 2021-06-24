/*
----------------
main js
First project using JavaScript - in the learning phase
Followed Wes Bos' tutorial - https://www.youtube.com/watch?v=VuN8qwZoego
----------------
*/
window.addEventListener("keydown", (e) => {
  const audio = document.querySelector(`audio[class = "${e.keyCode}"]`);
  const keyPressed = document.querySelector(`.key[id = "${e.keyCode}"]`);
  if (audio == null) return;
  audio.currentTime = 0;
  audio.play();
  keyPressed.classList.add("key-pressed");
});

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("key-pressed");
}

const keys = document.querySelectorAll(".key");
keys.forEach((key) => key.addEventListener("transitionend", removeTransition));
