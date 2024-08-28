let firstNumber = '';
let secondNumber = '';
let currentOperator = null;
let shouldResetScreen = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

buttons.forEach((button) =>
    button.addEventListener('click', () => handleButtonClick(button))
);

function handleButtonClick(button) {
    if (button.id === 'clear') {
        resetCalculator();
    } else if (button.id === 'backspace') {
        deleteLastDigit();
    } else if (button.classList.contains('operator')) {
        chooseOperator(button.textContent);
    } else if (button.id === 'equals') {
        evaluate();
    } else if (button.id === 'decimal') {
        appendDecimal();
    } else {
        appendNumber(button.textContent);
    }
}

function resetCalculator() {
    display.textContent = '0';
    firstNumber = '';
    secondNumber = '';
    currentOperator = null;
}

function deleteLastDigit() {
    display.textContent = display.textContent.slice(0, -1) || '0';
}

function chooseOperator(operator) {
    if (currentOperator !== null) evaluate();
    firstNumber = display.textContent;
    currentOperator = operator;
    shouldResetScreen = true;
}

function appendNumber(number) {
    if (display.textContent === '0' || shouldResetScreen) {
        display.textContent = number;
        shouldResetScreen = false;
    } else {
        display.textContent += number;
    }
}

function appendDecimal() {
    if (shouldResetScreen) resetScreen();
    if (!display.textContent.includes('.')) {
        display.textContent += '.';
    }
}

function resetScreen() {
    display.textContent = '';
    shouldResetScreen = false;
}

function evaluate() {
    if (currentOperator === null || shouldResetScreen) return;
    if (currentOperator === '÷' && display.textContent === '0') {
        alert("No puedes dividir por 0!");
        resetCalculator();
        return;
    }
    secondNumber = display.textContent;
    display.textContent = roundResult(
        operate(currentOperator, firstNumber, secondNumber)
    );
    currentOperator = null;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '×':
            return a * b;
        case '÷':
            return a / b;
        default:
            return null;
    }
}
