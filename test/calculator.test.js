import test from "node:test";
import assert from "node:assert/strict";
import { calculate, clearInputs, operationForKey } from "../src/calculator.js";

test("supports all four operations", () => {
  assert.equal(calculate(7, "+", 3), 10);
  assert.equal(calculate(7, "-", 3), 4);
  assert.equal(calculate(7, "*", 3), 21);
  assert.equal(calculate(7, "/", 2), 3.5);
});

test("rejects division by zero and invalid input", () => {
  assert.throws(() => calculate(7, "/", 0), /divide by zero/i);
  assert.throws(() => calculate("", "+", 2), /valid numbers/i);
});

test("clear resets both inputs and output", () => {
  const left = { value: "1" }; const right = { value: "2" }; const result = { textContent: "Result: 3" };
  clearInputs(left, right, result);
  assert.deepEqual([left.value, right.value, result.textContent], ["", "", "Result: —"]);
});

test("Enter maps to addition while unrelated keys do nothing", () => {
  assert.equal(operationForKey("Enter"), "+");
  assert.equal(calculate(8, operationForKey("Enter"), 5), 13);
  assert.equal(operationForKey("Escape"), null);
});
