let currentNum = '';
let previousNum = '';
let operator = '';

//UI
const equalButton = document.getElementById('equalButton');
const previousOperand = document.getElementById('prevOperand');
const currentOperand = document.getElementById('currOperand');
const clearButton = document.getElementById('clearButton');
const pointButton = document.getElementById('pointButton');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const deleteButton = document.getElementById('deleteButton');

window.addEventListener('keydown', handleKeyPress);

numberButtons.forEach(button => {
    button.addEventListener('click', (e) =>{
        appendNumber(e.target.textContent);
    });
})

operationButtons.forEach(button =>{
    button.addEventListener('click', (e) =>{
        appendOperator(e.target.textContent);
    })
})

equalButton.addEventListener('click', () =>{
    if(currentNum != '' && previousNum != ''){
        operate();
    }
});

pointButton.addEventListener('click', () =>{
    addDecimal();
});

deleteButton.addEventListener('click', deleteNum);


clearButton.addEventListener('click', clearCalculator);








// equalButton.addEventListener('click', evaluate);
// clearButton.addEventListener('click', clear);

function appendNumber(number){
    if(previousNum !== "" && currentNum !== "" && operator === ""){
        previousNum = "";
        currentOperand.textContent = currentNum;
    }
    if(currentNum.length <= 11){
        currentNum += number;
        currentOperand.textContent = currentNum;
    }
}

function appendOperator(op){
    if(previousNum === ""){
        previousNum = currentNum;
        operatorCheck(op);
    }
    else if(currentNum === ""){
        operatorCheck(op);
    }
    else {
        operate();
        operator = op;
        currentOperand.textContent = '0';
        previousOperand.textContent = previousNum + " " + operator;
    }
    
}

function operatorCheck(text){
    operator = text;
    previousOperand.textContent = previousNum + " " + operator;
    currentOperand.textContent = "";
    currentNum = "";
}



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


function operate(){
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);
    if(operator === "+"){
        previousNum = add(previousNum, currentNum);
    }
    else if(operator === '-'){
        previousNum = subtract(previousNum, currentNum);
    }
    else if(operator === '*'){
        previousNum = multiply(previousNum, currentNum);
    }
    else if(operator === '/'){
        if(currentNum <= 0){
            currentOperand.innerText = "Error";
            displayResults();
            return;
        }
        previousNum = divide(previousNum, currentNum);
       
    }
    previousNum = roundNumber(previousNum); 
    previousNum = previousNum.toString();
    displayResults();
}

function roundNumber(num){
    return Math.round(num * 1000000) / 1000000;
}

function displayResults(){
    if(previousNum.length <= 11){
        currentOperand.textContent = previousNum;
    }else {
        currentOperand.textContent = previousNum.slice(0, 11) + "...";
    }
    previousOperand.textContent = "";
    operator = "";
    currentNum = "";
}

function clearCalculator(){
    currentNum = '';
    previousNum = ''
    operator = '';
    currentOperand.textContent = '0';
    previousOperand.textContent = '';

}

function addDecimal(){
    if(!currentNum.includes(".")){
        currentNum += ".";
        currentOperand.textContent = currentNum;
    }
}

// function deleteNum(){
//     currentOperand = currentOperand.toString().slice(0, -1);
// }

function handleKeyPress(e) {
    e.preventDefault();
    if(e.key >= 0 && e.key <= 9){
        appendNumber(e.key);
    }
    if(e.key === "Enter" || e.key === "=" && currentNum != "" && previousNum != ""){
        operate();
    }
    if(e.key === "+" || e.key === "-" || e.key === "/" || e.key === "*"){
        appendOperator(e.key);
    }
    if(e.key === "."){
        addDecimal();
    }
    if(e.key === "Backspace"){
        deleteNum();
    }
}

function deleteNum(){
    if(currentNum != ""){
        currentNum = currentNum.slice(0, -1);
        currentOperand.textContent = currentNum;
        if(currentNum === ""){
            currentOperand.textContent = "0";
        }
    }
    if(currentNum === "" && previousNum !== "" && operator === ""){
        previousNum = previousNum.slice(0, -1);
        currentOperand.textContent = previousNum;
    }
}