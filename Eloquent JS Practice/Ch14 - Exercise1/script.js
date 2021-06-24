/*----
Given a data set of mountains, an array of objects with name, height, and place properties, 
generate the DOM structure for a table that enumerates the objects. It should have one 
column per key and one row per object, plus a header row with <th> elements at the top, 
listing the column names. Write this so that the columns are automatically derived from the 
objects, by taking the property names of the first object in the data. Add the resulting 
table to the element with an id attribute of "mountains" so that it becomes visible in the 
document.
https://eloquentjavascript.net/14_dom.html
----*/

// Create table element to insert rows into
const table = document.createElement("table");
const mountainsDiv = document.getElementById("mountains");
// List of all mountain objects
const MOUNTAINS = [
  { name: "Kilimanjaro", height: 5895, place: "Tanzania" },
  { name: "Everest", height: 8848, place: "Nepal" },
  { name: "Mount Fuji", height: 3776, place: "Japan" },
  { name: "Vaalserberg", height: 323, place: "Netherlands" },
  { name: "Denali", height: 6168, place: "United States" },
  { name: "Popocatepetl", height: 5465, place: "Mexico" },
  { name: "Mont Blanc", height: 4808, place: "Italy/France" },
];
const objKeys = Object.keys(MOUNTAINS[0]);
const n = MOUNTAINS.length;
const nKeys = objKeys.length;
// Create title row
let title = document.createElement("tr");

// Table headers
// Iterate nKeys times - number of keys in each object of MOUNTAINS
for (let i = 0; i < nKeys; i++) {
  let titleNode = document.createElement("th");
  // Create text nodes with values of objKeys. Append these to the child list of title
  titleNode.appendChild(document.createTextNode(objKeys[i]));
  title.appendChild(titleNode);
}
// Append title row to table element
table.appendChild(title);

// -----

// Iterate n times - number of objects in MOUNTAINS
for (let i = 0; i < n; i++) {
  let mountainNode = document.createElement("tr");
  // Iterate through each key-value pair in current MOUNTAINS object
  for (let ii = 0; ii < nKeys; ii++) {
    let node = document.createElement("td");
    // Append a created text node to node element of the current objects current value
    node.append(document.createTextNode(MOUNTAINS[i][objKeys[ii]]));
    mountainNode.appendChild(node);
  }
  table.appendChild(mountainNode);
}
mountainsDiv.appendChild(table);
