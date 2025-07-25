document.getElementById("calcForm").addEventListener("submit", function(e) {
  e.preventDefault();
  let num1 = document.getElementById("num1").value;
  let num2 = document.getElementById("num2").value;
  const operation = document.getElementById("operation").value;
  const resultDisplay = document.getElementById("result");

  let number1 = parseFloat(num1);
  let number2 = parseFloat(num2);

  if (isNaN(number1) || isNaN(number2)) {
    resultDisplay.textContent = "Please enter valid numbers.";
    return;
  }

  if (!operation) {
    resultDisplay.textContent = "Please select an operation.";
    return;
  }

  let result;

  switch (operation) {
    case "add":
      result = number1 + number2;
      break;
    case "sub":
      result = number1 - number2;
      break;
    case "mul":
      result = number1 * number2;
      break;
    case "div":
      if (number2 === 0) {
        resultDisplay.textContent = "Cannot divide by zero.";
        return;
      }
      result = number1 / number2; 
      break;
    default:
      result = "Invalid operation.";
  }
  resultDisplay.textContent = `Result: ${result}`;
});
