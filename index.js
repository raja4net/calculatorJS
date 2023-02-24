console.clear();
let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldResetScreen = false;

const numbers = document.querySelectorAll("#number");
const operators = document.querySelectorAll("#operator");
const equals = document.getElementById("equals");
const decimal = document.querySelector("#decimal");
const clearScreen = document.querySelector("#clear");
const deleteBtn = document.querySelector("#delete");
const lastOperationScreen = document.querySelector(".calculation");
const currentOperationScreen = document.querySelector(".input");
let btnValue = "";

window.addEventListener("keydown", handleKeyboardInput);
numbers.forEach((number) => {
  number.addEventListener("click", () => appendNumber(number.textContent));
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => setOperation(operator.textContent));
});

equals.addEventListener("click", evaluate);

// CLEAR button functionality
clearScreen.addEventListener("click", clear);

//DELETE button functionality
deleteBtn.addEventListener("click", deleteFunction);

decimal.addEventListener("click", appendPoint);

function resetScreen() {
  currentOperationScreen.textContent = "";
  shouldResetScreen = false;
}

function clear() {
  currentOperationScreen.textContent = "0";
  lastOperationScreen.textContent = "";
  firstOperand = "";
  secondOperand = "";
  currentOperation = null;
}

function deleteFunction() {
  btnValue = currentOperationScreen.textContent;
  btnValue = btnValue.slice(0, btnValue.length - 1);
  console.log(btnValue);
  currentOperationScreen.innerHTML = btnValue;
  if (currentOperationScreen.innerHTML == "") {
    currentOperationScreen.innerHTML = "0";
  }
}

function appendPoint() {
  if (shouldResetScreen) resetScreen();
  if (currentOperationScreen.textContent === "")
    currentOperationScreen.textContent = "0";
  if (currentOperationScreen.textContent.includes(".")) return;
  currentOperationScreen.textContent += ".";
}

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = currentOperationScreen.textContent;
  currentOperation = operator;
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === "÷" && currentOperationScreen.textContent === "0") {
    alert("You can't divide by 0!");
    return;
  }
  secondOperand = currentOperationScreen.textContent;
  currentOperationScreen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  lastOperationScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === ".") appendPoint();
  if (e.key === "=" || e.key === "Enter" || e.keyCode == 13) evaluate();
  if (e.key === "Backspace") deleteNumber();
  if (e.key === "Escape") clear();
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/")
    setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "−";
  if (keyboardOperator === "+") return "+";
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return substract(a, b);
    case "x":
      return multiply(a, b);
    case "÷":
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}

function appendNumber(number) {
  if (currentOperationScreen.textContent === "0" || shouldResetScreen)
    resetScreen();
  if (currentOperationScreen.textContent.length > 14) {
    return;
  }
  currentOperationScreen.textContent += number;
}
