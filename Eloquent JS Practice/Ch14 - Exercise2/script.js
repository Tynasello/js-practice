/*---
  -- Elements by tag name -- 
The document.getElementsByTagName method returns all
child elements with a given tag name. Implement your own version of this as a
function that takes a node and a string (the tag name) as arguments and returns
an array containing all descendant element nodes with the given tag name. 
To find the tag name of an element, use its nodeName property. But note that this
will return the tag name in all uppercase. Use the toLowerCase or toUpperCase
string methods to compensate for this. 
https://eloquentjavascript.net/14_dom.html
---*/

function byTagName(node, tagName) {
  let matchingChildren = [];
  // tagName attributes of elements are capitalized therefore,
  // convert tagName to uppercase to allow comparison
  tagName = tagName.toUpperCase();

  let searchChildren = (node) => {
    // Execute search for all children of node
    node.childNodes.forEach((child) => {
      // Check if the child is of type 1 or ELEMENT_NODE
      if (child.nodeType == 1) {
        // If it has tagName attribute equal to tagName, push the child node to matchingChildren
        if (child.tagName == tagName) {
          matchingChildren.push(child);
        }
        // Search remaining children
        searchChildren(child);
      }
    });
  };

  searchChildren(node);
  return matchingChildren;
}

console.log(byTagName(document.body, "h1").length);
// → 1
console.log(byTagName(document.body, "span").length);
// → 3
let para = document.querySelector("p");
console.log(byTagName(para, "span").length);
// → 2
