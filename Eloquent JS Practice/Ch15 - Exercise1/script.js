/*----

Write a page that displays a balloon (using the balloon emoji, 🎈). 
When you press the up arrow, it should inflate (grow) 10 percent, 
and when you press the down arrow, it should deflate (shrink) 10 percent.
You can control the size of text (emoji are text) by setting the 
font-size CSS property (style.fontSize) on its parent element. 
Remember to include a unit in the value—for example, pixels (10px).
The key names of the arrow keys are "ArrowUp" and "ArrowDown". 
Make sure the keys change only the balloon, without scrolling the page.
When that works, add a feature where, if you blow up the balloon 
past a certain size, it explodes. In this case, exploding means that 
it is replaced with an 💥 emoji, and the event handler is removed 
(so that you can’t inflate or deflate the explosion).
https://eloquentjavascript.net/15_event.html#c_0ajEiAUCqr
----*/


// Get p that holds balloon emoji - it is the only element in the html
p = document.querySelector('p')
// Get the current font-size of p - convert to int
size = parseInt(p.style.fontSize);

// Add event listener to window, run expand function anytime a key is pressed
window.addEventListener("keydown", expand);

// When expand is called, the keydown event is passed in as a parameter
function expand(event){
	// Check if the size is greater than 200. If it is, replace the text content of p to an explosion emoji
	if (size>200){
		p.textContent = "💥";	
		// Remove event listener from window to prevent the p from further expanding
		window.removeEventListener("keydown",expand);
	}
	// Only expand the emoji if ArrowDown is the key which is pressed
	if (event.key == 'ArrowDown'){
		// Increase size by 10%
		size *= 1.1;
		// Update p font-size
		p.style.fontSize = size ;
	}		
}