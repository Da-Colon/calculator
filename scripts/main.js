const main = () => {
  // Selectors
  const numberButtons = document.querySelectorAll('.number')
  const operatorButtons = document.querySelectorAll('.operator')

  const display = document.querySelector('#display')
  const clearButton = document.querySelector('#clear')
  const deleteButton = document.querySelector('#del')
  const equalButton = document.querySelector('#equal')
  const squareRootButton = document.querySelector('#square-root')

  // Arrays
  let operationArray = []

  // Stored variables
  let operator = ""

  // Functions
  const numberEvent = (e) => {
    e.preventDefault()
    if(operationArray.length <= 15){
      const targetValue = e.target.value
      operationArray.push(targetValue)
      updateDisplay();
    }
  }

  const operatorEvent = (e) => {
    e.preventDefault()
    if(operationArray.length >= 1 && operationArray.length <= 15 ){
      const targetValue = e.target.value
      let index = 0
      operator = targetValue
      
      if(operationArray.includes("x")){
        index = operationArray.indexOf('x')
        operationArray[index] = targetValue
        updateDisplay();
        return;
      } 
      if (operationArray.includes("-")){
        index = operationArray.indexOf('-')
        operationArray[index] = targetValue
        updateDisplay();
        return; 
      } 
      if(operationArray.includes("+")){
        index = operationArray.indexOf('+')
        operationArray[index] = targetValue
        updateDisplay();
        return;
      }  
      if(operationArray.includes("÷")){
        index = operationArray.indexOf('÷')
        operationArray[index] = targetValue
        updateDisplay();
        return;
      } 
      operationArray.push(targetValue)
      updateDisplay();
    }
  }

  const squareRootEvent = (e) => {
    e.preventDefault()
    if(operator === ""){
      const number = Number(operationArray.join(''))
      const result = Math.sqrt(number) 
      display.innerText = result
      operationArray.length = 0
      operationArray = operationArray.concat(Array.from(String(result)))
      if(operationArray.length >= 16){
        operationArray.slice(16)
      }
    }
  }

  const equalEvent = (e) => {
    e.preventDefault()
    if(operator === ""){
      return;
    }
    const operatorIndex = operationArray.indexOf(operator)
    const leftNumbers = operationArray.slice(0, operatorIndex).join('')
    const rightNumbers = operationArray.slice(operatorIndex + 1).join('')
    if(operator === "x"){
      display.innerText = Number(leftNumbers) * Number(rightNumbers);
    }
    if(operator === "-"){
      display.innerText = Number(leftNumbers) - Number(rightNumbers);
    }
    if(operator === "÷"){
      display.innerText = Number(leftNumbers) / Number(rightNumbers);
    }
    if(operator === "+"){
      display.innerText = Number(leftNumbers) + Number(rightNumbers);
    }
    operationArray.length = 0
    operationArray.concat(Array.from(display.innerText))
  }

  const clearEvent = (e) => {
    e.preventDefault()
    operationArray.length = 0
    display.innerText = "0"
  }

  const deleteEvent = (e) => {
    e.preventDefault()
    operationArray.pop()
    updateDisplay()
    if(operationArray.length <= 0){
      display.innerText = "0"
    }
  }

  const updateDisplay = () => {
    display.innerText = ""
    operationArray.forEach( item => {
      display.innerText += item
    })
  }

  // Event Listeners
  numberButtons.forEach( (button) => {
    button.addEventListener('click', (e) => {
      numberEvent(e)
    })
  })

  operatorButtons.forEach( (button) => {
    button.addEventListener('click', (e) => {
      operatorEvent(e)
    })
  })

  clearButton.addEventListener('click',(e) => {
    clearEvent(e)
  })

  equalButton.addEventListener('click', (e) => {
    equalEvent(e)
  })

  deleteButton.addEventListener('click', (e) => {
    deleteEvent(e)
  })

  squareRootButton.addEventListener('click', (e) => {
    squareRootEvent(e)
  })
}

main()