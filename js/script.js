let firstNumber = null,
  secondNumber = null;
let operator = "";
let result = null;

const display = document.querySelector("#display");
const btns = document.querySelectorAll("button");

const operate = (firstNumber, secondNumber, operator) => {
  
  switch (operator) {
    case "+":
      result = firstNumber + secondNumber;
      break;

    case "-":
      result = firstNumber - secondNumber;
      break;

    case "*":
      result = firstNumber * secondNumber;
      break;

    case "/":
      result = firstNumber / secondNumber;
      break;
  }

  return result;
};

const updateDisplay = (key) => {
  display.value = key;
}
  

const reset = () => {
  result = null;
  firstNumber = null;
  secondNumber = null;
  operator = "";
  updateDisplay(0);
}

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let key = e.target.innerText;
    
    if(key == "+" || key == "-" || key == "/" || key == "*"){
      operator = key;
      
      if(firstNumber != null && secondNumber != null) {
        result = operate(firstNumber, secondNumber, operator);
        updateDisplay(result);
        if(result != null) {
          firstNumber = result;
          secondNumber = null;
        }
      }
    } else if (firstNumber == null){
      firstNumber = Number(key);
      updateDisplay(firstNumber);
    } else if (secondNumber == null){
      secondNumber = Number(key);
      updateDisplay(secondNumber);
    } else if(key == "=") {
      updateDisplay(operate(firstNumber, secondNumber, operator));
    }

    if(key == "C") {
      reset();
    }
  });
});



