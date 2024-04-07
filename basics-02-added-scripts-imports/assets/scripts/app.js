let currentResult = 0
let opHist = []

function logHist(op,init,final,change){
    let opObject = {
        Op : op,
        oldValue : init,
        currValue : final,
        change : change
    };

    opHist.push(opObject)
    console.log(opHist)
}

function calc(op, oldResult,input) {
   
    let calcDesc = ''
    if (op==='ADD') {
        
        currentResult = oldResult + input
        calcDesc = `${oldResult} + ${userInput.value}`
    }
    else if(op==='SUBTRACT') {
        currentResult = oldResult - input
        calcDesc = `${oldResult} - ${userInput.value}`
    }
    else if(op==='MULTIPLY') {
        currentResult = oldResult * input
        calcDesc = `${oldResult} * ${userInput.value}`
    }
    else if(op==='DIVIDE') {
        currentResult = oldResult / input
        calcDesc = `${oldResult} / ${userInput.value}`
    }
    logHist(op,oldResult,currentResult,input)
    outputResult(currentResult,calcDesc)
}

function add() {
     
    let oldResult = currentResult
    let input = parseInt(userInput.value)
    calc('ADD',oldResult,input)
    
}

function subtract() {
    
    let oldResult = currentResult
    let input = parseInt(userInput.value)
    calc('SUBTRACT',oldResult,input)
}

function multiply() {
    
    let oldResult = currentResult
    let input = parseInt(userInput.value)
    calc('MULTIPLY',oldResult,input)
}

function divide() {
    
    let oldResult = currentResult
    let input = parseInt(userInput.value)
    calc('DIVIDE',oldResult,input)
}

addBtn.addEventListener("click",add)
subtractBtn.addEventListener("click",subtract)
multiplyBtn.addEventListener("click",multiply)
divideBtn.addEventListener("click",divide)
    




