class Calculator {
  constructor(previousOpTextElement, currentOpTextElement) {
    this.previousOpTextElement = previousOpTextElement;
    this.currentOpTextElement = currentOpTextElement;
    this.clear();
  }

  // functions
  // Clears
  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }
  // Delete
  del() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  // Add number
  appendNumber(number) {
    // this If checks for more than 1 "." and stops the function if so
    if (number === "." && this.currentOperand.includes(".")) return;
    // This makes is it so that JS doesnt add the numbers. Need them as Strings
    // So I can display them as numbers without adding
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  //  choose operation

  chooseOp(operation) {
    if (this.currentOperand === "") return;
    if (this.currentOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  // calculations
  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);

    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "•":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const intergerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let intergerDisplay;
    if (isNaN(intergerDigits)) {
      intergerDisplay = "";
    } else {
      intergerDisplay = intergerDigits.toLocaleString("en", {
        maximumFractionDigits: 0
      });
    }
    if (decimalDigits != null) {
      return `${intergerDisplay}.${decimalDigits}`;
    } else {
      return intergerDisplay;
    }
  }

  // updates display
  updateDisplay() {
    this.currentOpTextElement.innerText = this.getDisplayNumber(
      this.currentOperand
    );
    if (this.operation != null) {
      this.previousOpTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand
      )} ${this.operation}`;
    } else {
      this, (previousOpTextElement.innerText = "");
    }
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operaitonButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-del]");
const clearButton = document.querySelector("[data-clear]");
const previousOpTextElement = document.querySelector("[data-pre]");
const currentOpTextElement = document.querySelector("[data-current]");

// creates ALC object
const calculator = new Calculator(previousOpTextElement, currentOpTextElement);

numberButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operaitonButtons.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOp(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButton.addEventListener("click", button => {
  calculator.compute();
  calculator.updateDisplay();
});

clearButton.addEventListener("click", button => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", button => {
  calculator.del();
  calculator.updateDisplay();
});
