const result = document.getElementById('result');

function appendToDisplay(value) {
    result.value += value;
}

function clearDisplay() {
    result.value = '';
}

function deleteLastChar() {
    result.value = result.value.slice(0, -1);
}

function calculate() {
    try {
        // Replace × with * for calculation
        let expression = result.value.replace('×', '*');
        // Evaluate the expression
        let answer = eval(expression);
        
        // Check if the result is a valid number
        if (isNaN(answer) || !isFinite(answer)) {
            throw new Error('Invalid calculation');
        }
        
        // Round to 8 decimal places to avoid floating point issues
        answer = Math.round(answer * 100000000) / 100000000;
        result.value = answer;
    } catch (error) {
        result.value = 'Error';
        // Clear the error message after 1 second
        setTimeout(clearDisplay, 1000);
    }
}

// Add keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    
    // Numbers and operators
    if (/[\d+\-*/.%]/.test(key)) {
        appendToDisplay(key);
    }
    // Enter key for calculation
    else if (key === 'Enter') {
        calculate();
    }
    // Backspace for deletion
    else if (key === 'Backspace') {
        deleteLastChar();
    }
    // Escape key for clear
    else if (key === 'Escape') {
        clearDisplay();
    }
}); 