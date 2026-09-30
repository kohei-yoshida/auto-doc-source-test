export function calculate(left, operator, right) {
  if (String(left).trim() === "" || String(right).trim() === "") throw new Error("Enter two valid numbers.");
  const a = Number(left);
  const b = Number(right);
  if (!Number.isFinite(a) || !Number.isFinite(b)) throw new Error("Enter two valid numbers.");
  if (operator === "+") return a + b;
  if (operator === "-") return a - b;
  if (operator === "*") return a * b;
  if (operator === "/") {
    if (b === 0) throw new Error("Cannot divide by zero.");
    return a / b;
  }
  throw new Error("Unsupported operation.");
}

export function clearInputs(leftInput, rightInput, resultElement) {
  leftInput.value = "";
  rightInput.value = "";
  resultElement.textContent = "Result: —";
}
