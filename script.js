const smallDisplayLive = document.querySelector(".smalldisplay");
const mainDisplayLive = document.querySelector(".bigdisplay");
const numbersEl = document.querySelectorAll(".number");
const operatorsEl = document.querySelectorAll(".operators");
const equalEl = document.querySelector(".equal");
const clearAllEl = document.querySelector(".all-clear");
const clearLastEl = document.querySelector(".last-entity-clear");

let smallDisplayNumber = "";
let mainDisplayNumber = "";
let result = null;
let lastOperation = "";
let haveDot = false;

numbersEl.forEach((number) => { 
  number.addEventListener("click", (e) => {               // for every digit
    if (e.target.innerText === "." && !haveDot) {         // if we're trying to add a dot, and the display doesn't have a dot 
      haveDot = true;                                     // haveDot = true means add a dot
    } else if (e.target.innerText === "." && haveDot) {   // if we're tying to add a dot, and the display has a dot, return
      return;
    }
    mainDisplayNumber += e.target.innerText;              // main display will add the numbers we target, += means it doesnt just work once
    mainDisplayLive.innerText = mainDisplayNumber;        // we will see the main display numbers in the main display live
    // console.log();
  });
});

operatorsEl.forEach((operator) => {                      
  operator.addEventListener("click", (e) => {     // for each operator button clicked
    if (!mainDisplayNumber) return;               // if we don't already have a main number clicked, nothing happens
    haveDot = false;                              // in this case: we don't have a dot either, which means: we can add a dot
      const operationName = e.target.innerText;   // we're saying that anything we click (for operators) is going to be saved as operationName
    console.log("lastOperation = [" +  lastOperation + "] & the operationName = [" + operationName +"]")
      lastOperation = operationName;              // we're saving the current operatorName as lastOperation too     
    if (smallDisplayNumber && mainDisplayNumber && lastOperation) {  // if we have a smalldisplaynumber and bigdisplaynumber and a lastOperation 
                                                                     // keep in mind that we have a lastOperation if we had at least one operationName
        mathOperation();                                             // we can go ahead with the mathOperation
    // keep in mind that we need two numbers to make the mathOperation run, so we are forced to have a smalldisplaynumb (the first one we chose) 
    // and a maindisplaynumb, the one we chose second to be able to make mathOperation run
    } else {                                      // if we don't have the three requirements
      result = parseFloat(mainDisplayNumber);     // what is displayed is the maindisplaynumb
    }
    clearVar(operationName);          
  });
});

function clearVar(name = "") {
  smallDisplayNumber += mainDisplayNumber + " " + name + " ";
  smallDisplayLive.innerText = smallDisplayNumber;
  mainDisplayLive.innerText = "";
  mainDisplayNumber = "";
}

function mathOperation() {
  if (lastOperation === "x") {
    result = parseFloat(result) * parseFloat(mainDisplayNumber);
  } else if (lastOperation === "+") {
    result = parseFloat(result) + parseFloat(mainDisplayNumber);
  } else if (lastOperation === "-") {
    result = parseFloat(result) - parseFloat(mainDisplayNumber);
  } else if (lastOperation === "/") {
    result = parseFloat(result) / parseFloat(mainDisplayNumber);
  } else if (lastOperation === "%") {
    result = parseFloat(result) % parseFloat(mainDisplayNumber);
  }
}
// operation();

equalEl.addEventListener("click", () => {
  if (!mainDisplayNumber || !smallDisplayNumber) return;
  haveDot = false;
  mathOperation();
  clearVar();
  mainDisplayLive.innerText = result;
  mainDisplayNumber = result;
  smallDisplayNumber = "";
});

clearAllEl.addEventListener("click", () => {
  smallDisplayNumber = "";
  mainDisplayNumber = "";
  smallDisplayLive.innerText = "";
  mainDisplayLive.innerText = "";
  result = "";
});

clearLastEl.addEventListener("click", () => {
  mainDisplayLive.innerText = "";
  mainDisplayNumber = "";
});

window.addEventListener("keydown", (e) => {
  if (
    e.key === "0" ||
    e.key === "1" ||
    e.key === "2" ||
    e.key === "3" ||
    e.key === "4" ||
    e.key === "5" ||
    e.key === "6" ||
    e.key === "7" ||
    e.key === "8" ||
    e.key === "9" ||
    e.key === "."
  ) {
    clickButtonEl(e.key);
    // console.log(e.key)
  } else if (e.key === "+" || e.key === "-" || e.key === "/" || e.key === "%") {
    clickOperation(e.key);
  } else if (e.key === "*") {
    clickOperation("x");
    // console.log(e.key)
  } else if (e.key == "Enter" || e.key === "=") {
    clickEqual();
  }
  // console.log(e.key)
});
function clickButtonEl(key) {
  numbersEl.forEach((button) => {
    if (button.innerText === key) {
      button.click();
    }
  });
}
function clickOperation(key) {
  operatorsEl.forEach((operation) => {
    if (operation.innerText === key) {
      operation.click();
    }
  });
}
function clickEqual() {
  equalEl.click();
}
