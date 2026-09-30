import { calculate, clearInputs, operationForKey } from "./calculator.js";

const left = document.querySelector("#left");
const right = document.querySelector("#right");
const result = document.querySelector("#result");

function showResult(operator) {
  try {
    result.textContent = `Result: ${calculate(left.value, operator, right.value)}`;
    result.dataset.state = "success";
  } catch (error) {
    result.textContent = `Error: ${error.message}`;
    result.dataset.state = "error";
  }
}

document.querySelectorAll("[data-operation]").forEach((button) => {
  button.addEventListener("click", () => showResult(button.dataset.operation));
});

[left, right].forEach((input) => {
  input.addEventListener("keydown", (event) => {
    const operator = operationForKey(event.key);
    if (operator) {
      event.preventDefault();
      showResult(operator);
    }
  });
});

document.querySelector("#clear").addEventListener("click", () => {
  clearInputs(left, right, result);
  delete result.dataset.state;
  left.focus();
});
