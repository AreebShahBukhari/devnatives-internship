let expression = "";

const display = document.getElementById("display");
const resultDisplay = document.getElementById("result");
const buttons = document.querySelectorAll(".buttons button");
const calculateBtn = document.getElementById("calculate");
const clearBtn = document.getElementById("clear");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "C") return;

    expression += value;
    display.value = expression;
    resultDisplay.textContent = "";
  });
});

clearBtn.addEventListener("click", () => {
  expression = "";
  display.value = "";
  resultDisplay.textContent = "";
});

calculateBtn.addEventListener("click", () => {
  if (expression.trim() === "") {
    resultDisplay.textContent = "Enter an expression.";
    return;
  }

  try {
    const result = eval(expression);
    resultDisplay.textContent = `Answer: ${result}`;
  } catch (err) {
    resultDisplay.textContent = "Invalid expression.";
  }
});
