const display = document.getElementById('display');
const buttons = document.querySelectorAll('.button');

let currentInput = '';
let operator = '';
let firstOperand = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.value;

        if (value === 'C') {
            // Clear everything
            currentInput = '';
            operator = '';
            firstOperand = '';
            display.value = '';
        } else if (value === '=') {
            // Calculate the result
            if (firstOperand !== '' && operator !== '' && currentInput !== '') {
                const result = calculate(Number(firstOperand), operator, Number(currentInput));
                display.value = result;
                firstOperand = result;
                currentInput = '';
                operator = '';
            }
        } else if (['+', '-', '*', '/'].includes(value)) {
            // Set the operator
            if (currentInput !== '') {
                firstOperand = currentInput;
                currentInput = '';
            }
            operator = value;
            display.value = `${firstOperand} ${operator}`;
        } else {
            // Update the display with digits or dot
            currentInput += value;
            display.value = operator 
                ? `${firstOperand} ${operator} ${currentInput}` 
                : currentInput;
        }
    });
});

function calculate(a, operator, b) {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        default: return 0;
    }
}
