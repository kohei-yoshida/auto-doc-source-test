import { calculate, clearInputs } from "./calculator.js";

const left = document.querySelector("#left");
const right = document.querySelector("#right");
const result = document.querySelector("#result");

document.querySelectorAll("[data-operation]").forEach((button) => {
  button.addEventListener("click", () => {
    try {
      result.textContent = `Result: ${calculate(left.value, button.dataset.operation, right.value)}`;
      result.dataset.state = "success";
    } catch (error) {
      result.textContent = `Error: ${error.message}`;
      result.dataset.state = "error";
    }
  });
});

document.querySelector("#clear").addEventListener("click", () => {
  clearInputs(left, right, result);
  delete result.dataset.state;
  left.focus();
});
