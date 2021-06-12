/*----
In this exercise you must implement a simple tabbed interface. 
Write a function, asTabs, that takes a DOM node and creates a 
tabbed interface showing the child elements of that node. It 
should insert a list of <button> elements at the top of the 
node, one for each child element, containing text retrieved 
from the data-tabname attribute of the child. All but one of 
the original children should be hidden (given a display style 
of none). The currently visible node can be selected by 
clicking the buttons. When that works, extend it to style the 
button for the currently selected tab differently so that it 
is obvious which tab is selected.
https://eloquentjavascript.net/15_event.html#c_0ajEiAUCqr
----*/

const tabPanel = document.getElementById("container");
let tabs = [];

// Run asTabs function, pass in tabPanel. (div with container id)
asTabs(tabPanel);

// Function takes a parent node, creates a button for each child node and displays the child node when the corresponding button is pressed
function asTabs(node) {

    // For each child in the child nodes of node, add it to the tabs array if it is a node of type 1 (ELEMENT_NODE)
    node.childNodes.forEach(child =>{
        if (child.nodeType == 1){
            tabs.push(child);
        }
    });

    // Create div to hold the buttons we are about to create
    let buttonDiv = document.createElement("div");

    // Iterate through each tab in tabs and run the callback function
    tabs.forEach((tab,i) =>{
        // Create button
        button = document.createElement("button");
        // Add appropriate text to button. Buttons will have same test as tabs 
        button.textContent = tab.getAttribute("data-tabname");
        buttonDiv.appendChild(button);
        // When a button is clicked, run pressed function with current index of tab in tabs (i)
        button.addEventListener('click', event=>pressed(i));
    });
    // Insert buttonDiv (holding all our buttons) at the beginning of node
    node.insertBefore(buttonDiv, node.firstChild);


    function pressed(buttonI){
        // For each tab in tabs, if it's index is equal to buttonI (the index of button pressed), add appropriate display and border styles
        tabs.forEach((tab,currI)=>{
            if (currI==buttonI){
                // Display and add border
                tab.style.display = "";
                buttonDiv.childNodes[currI].style.border = "2px solid red";

            }
            else{
                // Display none and remove border
                tab.style.display = "none";
                buttonDiv.childNodes[currI].style.border = "";

            }
        });
    }
    // Since we havn't pressed a button yet, we want all divs to originally be displaying none
    pressed(-1);

}
