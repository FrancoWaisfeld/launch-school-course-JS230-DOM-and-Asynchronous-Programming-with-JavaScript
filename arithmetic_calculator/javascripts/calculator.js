const operations = {
  '+': function(num1, num2) {
    return num1 + num2;
  },

  '-': function(num1, num2) {
    return num1 - num2;
  },

  '*': function(num1, num2) {
    return num1 * num2;
  },

  '/': function(num1, num2) {
    return num1 / num2;
  },
}

document.addEventListener('DOMContentLoaded', event => {
  let form = document.querySelector('form');

  form.addEventListener('submit', event => {
    event.preventDefault();

    let firstNumber = Number(document.getElementById('first-number').value);
    let secondNumber = Number(document.getElementById('second-number').value);
    let operator = document.getElementById('operator').selectedOptions[0].textContent;
    let operation = operations[operator];
    let result = operation(firstNumber, secondNumber);
    document.getElementById('result').textContent = `${result}`;
  });
});