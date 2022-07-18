const numberButtons = document.querySelectorAll(`[data-number]`);
const operatorButtons = document.querySelectorAll(`[data-operator]`);



function add(a,b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}


function operate(operator, a, b){
    a = Number(a)
    b = Number(b)
    switch(operator){
        case "+":
            return add(a,b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            if (b===0) return null;
            else return divide(a,b);
        default:
            return null;
    }
}
