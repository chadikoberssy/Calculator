// Javascript variables to store buttons and display of DOM
const btns = document.querySelectorAll("button");
const display = document.querySelector("#display");

let firstNumber = null,                         // first number
secondNumber = null,                            // second number
result = null,                                  // result after each operation
operator = "",                                  // Operator sign (+, -, *, /)
displayValue = 0,                               // Value to show on display screen
displayValueFlag = 0,                           // Value to concatenate display for numbers more that 1 digit
usedDecimalFlag = 0,                            // Allow user to enter only one dot
numbersArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],  // Array of calculator numbers
operatorsArray = ["+", "-", "*", "/"];          // Array of calculator operators

// Update display screen
const updateDisplay = () => {
  display.value = displayValue;
};

// Add event listeners to every button and call a function based on what button was pressed
const clickButton = () => {
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", (e) => {
      let key = e.target.innerText;
      if (btns[i].classList.contains("number")) {
        inputNumber(key);
        updateDisplay();
      } else if (btns[i].classList.contains("operator")) {
        inputOperator(key);
      } else if (btns[i].classList.contains("equals")) {
        inputEquals();
        updateDisplay();
      } else if (btns[i].classList.contains("decimal")) {
        inputDecimal(key);
        updateDisplay();
      } else if (btns[i].classList.contains("clear")) {
        reset();
      } else if (btns[i].classList.contains("backspace")) {
        inputBackspace();
        updateDisplay();
      }
      updateDisplay();
    });
  }

  // Keyboard click events to excecute operations
  document.addEventListener("keydown", (e) => {
    let keyPressed = e.key;
    console.log(keyPressed);
    if (numbersArray.includes(Number(keyPressed))) {
      inputNumber(keyPressed);
      updateDisplay();
      buttonAnimation(keyPressed);
    } else if (operatorsArray.includes(keyPressed)) {
      inputOperator(keyPressed);
      buttonAnimation(keyPressed);
    } else if (keyPressed == "=" || keyPressed == "Enter") {
      inputEquals();
      updateDisplay();
      buttonAnimation(keyPressed);
    } else if (keyPressed == ".") {
      inputDecimal(keyPressed);
      updateDisplay();
      buttonAnimation(keyPressed);
    } else if (keyPressed.toLowerCase() == "c") {
      reset();
      buttonAnimation(keyPressed);
    } else if (keyPressed == "Backspace") {
      inputBackspace();
      updateDisplay();
      buttonAnimation(keyPressed);
    }
    updateDisplay();
  });
};

// Main function to run javascript
clickButton();

// Handles behavior if a number is pressed
const inputNumber = (number) => {
  if (displayValueFlag == 0) {
    if (displayValue == "0") {
      displayValue = number;
    } else {
      displayValue += number;
    }
  } else if (displayValueFlag == 1) {
    displayValue = number;
  }
  displayValueFlag = 0;
};

// Handles behavior if an operator was pressed
const inputOperator = (operatorKey) => {
  if (firstNumber == null) {
    firstNumber = Number(displayValue);
    operator = operatorKey;
  } else if (secondNumber == null) {
    secondNumber = Number(displayValue);
    operate(firstNumber, secondNumber, operator);
    displayValue = Math.round((result) * 1000000) / 1000000;
    operator = operatorKey;
    firstNumber = result;
    secondNumber = null;
  }
  displayValueFlag = 1;
  usedDecimalFlag = 0;
};

// Handles equals behavior
const inputEquals = () => {
  if (firstNumber != null) {
    secondNumber = Number(displayValue);
    operate(firstNumber, secondNumber, operator);
    displayValue = Math.round((result) * 1000000) / 1000000;
    operator = null;
    firstNumber = result;
    secondNumber = null;
  }
};

// Handles behavior if decimal is pressed
const inputDecimal = (dot) => {
  if (usedDecimalFlag == 0) {
    if (displayValue == 0 || displayValue == "0") {
      displayValue += dot;
    } else {
      displayValue += dot;
    }
  }
  usedDecimalFlag = 1;
};

// Remove last character of the number in case user got a wrong button
const inputBackspace = () => {
  displayValue = displayValue.slice(0, -1);
};

// Excecute operation
const operate = (first, second, operation) => {
  switch (operation) {
    case "+":
      result = first + second;
      break;

    case "-":
      result = first - second;
      break;

    case "*":
      result = first * second;
      break;

    case "/":
      result = first / second;
      break;
  }
};

// Clear calculator and start fresh
const reset = () => {
  firstNumber = null;
  secondNumber = null;
  result = null;
  operator = "";
  displayValue = 0;
  displayValueFlag = 0;
  usedDecimalFlag = 0;
  updateDisplay();
};

// Get selector name from keyPressed 
const getSelector = (key) => {
  let selector = "";

  switch (key) {
    case "0":
      selector = "zero";
      break;

    case "1":
      selector = "one";
      break;

    case "2":
      selector = "two";
      break;

    case "3":
      selector = "three";
      break;

    case "4":
      selector = "four";
      break;

    case "5":
      selector = "five";
      break;

    case "6":
      selector = "six";
      break;

    case "7":
      selector = "seven";
      break;

    case "8":
      selector = "eight";
      break;

    case "9":
      selector = "nine";
      break;

    case "+":
      selector = "add";
      break;

    case "-":
      selector = "subtract";
      break;

    case "/":
      selector = "divide";
      break;

    case "*":
      selector = "multiply";
      break;

    case "=":
      selector = "equals";
      break;

    case "Enter":
      selector = "equals";
      break;

    case ".":
      selector = "decimal";
      break;

    case "c":
      selector = "clear";
      break;

    case "Backspace":
      selector = "backspace";
      break;
  }
  return selector;
};

// Animate button when pressed using keyboard
const buttonAnimation = (key) => {
  let activeButton = "";
  let selector = getSelector(key);
  activeButton = document.querySelector("#" + selector);
  activeButton.classList.add("pressed");
  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
};
