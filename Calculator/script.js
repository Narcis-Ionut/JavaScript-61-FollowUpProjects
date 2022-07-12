const numberButtons = document.querySelectorAll("[data-number]");
const operationsButtons = document.querySelectorAll("[data-operation]");
const equalsButtons = document.querySelector("[data-equals]");
const deleteButtons = document.querySelector("[data-delete]");
const allclearButtons = document.querySelector("[data-all-clear]");
// const equalsButtons = document.querySelector("[data-equals]");
const previousoperandEl = document.querySelector("[data-previous-operand]");
const currentoperandEl = document.querySelector("[data-current-operand]");

class Calculator {
  constructor(previousoperandEl, currentoperandEl) {
    this.previousoperandEl = previousoperandEl;
    this.currentoperandEl = currentoperandEl;
    this.clear();
  }

  clear() {
    this.currentoperand = "";
    this.previousoperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentoperand = this.currentoperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentoperand.includes(".")) return;
    this.currentoperand = this.currentoperand.toString() + number.toString();
  }

  chooseOperations(operation) {
    if (this.currentoperand === "") return;
    if (this.previousoperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousoperand = this.currentoperand;
    this.currentoperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousoperand);
    const current = parseFloat(this.currentoperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentoperand = computation;
    this.operation = undefined;
    this.previousoperand = "";
  }

  updateDisplay() {
    this.currentoperandEl.innerText = this.currentoperand;
    this.previousoperandEl.innerText = this.previousoperand;
  }
}

const calculator = new Calculator(previousoperandEl, currentoperandEl);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperations(button.innerText);
    calculator.updateDisplay();
  });
});

equalsButtons.addEventListener("click", (button) => {
  calculator.compute();
  calculator.updateDisplay();
});
allclearButtons.addEventListener("click", (button) => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteButtons.addEventListener("click", (button) => {
  calculator.delete();
  calculator.updateDisplay();
});
