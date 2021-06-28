/*----



----*/
const buttons = [
  ["AC", "clearAll"],
  ["DEL", "del"],
  ["%", "mod"],
  ["/", "divide"],
  ["7", "seven"],
  ["8", "eight"],
  ["9", "nine"],
  ["+", "addition"],
  ["4", "four"],
  ["5", "five"],
  ["6", "six"],
  ["-", "subtract"],
  ["1", "one"],
  ["2", "two"],
  ["3", "three"],
  ["*", "multiply"],
  ["0", "zero"],
  [".", "dot"],
  ["=", "equal"],
];
let input = "";
const roundingConstant = 100000000;
// Building DOM for calculator

function createElement(element, parent, type, id, listClass = [], text = null) {
  element = document.createElement(type);
  if (id) {
    element.id = id;
  }
  if (listClass.length != 0) {
    listClass.forEach((c) => element.classList.add(c));
  }
  if (text != null) {
    element.textContent = text;
  }
  parent.appendChild(element);
  return element;
}

createElement("calculator", document.body, "div", "calculator");
createElement("display", calculator, "div", "display");
createElement("input", display, "div", "input");
createElement("output", display, "div", "output");
createElement("buttonsContainer", calculator, "div", "buttonsContainer");

buttons.forEach((b) => {
  let el = createElement(
    b[0],
    buttonsContainer,
    "button",
    b[1],
    ["button"],
    b[0]
  );
  if (el.id == "equal") return;
  el.addEventListener("click", concatInput);
});

const allClear = document.getElementById("clearAll");
const del = document.getElementById("del");
const equal = document.getElementById("equal");

const inputDisplay = document.getElementById("input");
const outputDisplay = document.getElementById("output");

allClear.addEventListener("click", clearDisplay);

del.addEventListener("click", () => {
  let out = outputDisplay.innerHTML;
  out = out.substr(0, out.length - 1);
  input = out;
  inputDisplay.innerHTML = "";
  outputDisplay.innerHTML = out;
});

equal.addEventListener("click", calculateAnswer);

function concatInput(e) {
  let buttonClicked = e.target.textContent;
  input += buttonClicked;
  inputDisplay.innerHTML = input;
}

function calculateAnswer(e) {
  try {
    let answer = Math.round(roundingConstant * eval(input)) / roundingConstant;
    outputDisplay.innerHTML = answer;
    input = answer;
  } catch (error) {
    clearDisplay();
    outputDisplay.innerHTML = "ERROR";
  }
}
function clearDisplay() {
  input = " ";
  inputDisplay.innerHTML = "";
  outputDisplay.innerHTML = "";
}
