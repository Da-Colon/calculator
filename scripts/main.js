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
  let operators = []

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
      operators.push(targetValue)
      operationArray.push(targetValue)
      updateDisplay();
    }
  }

  const squareRootEvent = (e) => {
    e.preventDefault()
    equalEvent(e)
    if(operators.length === 0){
      const number = Number(operationArray.join(''))
      const result = Math.sqrt(number) 
      display.innerText = result
      operationArray.length = 0
      operationArray = operationArray.concat(Array.from(String(result)))
      if(operationArray.length >= 16){
        operationArray.length = 15
        updateDisplay();
      }
    }
  }

  const equalEvent = (e) => {
    e.preventDefault()
    if(operators.length === 0){
      return;
    }
    operationArray = createEquationArray();

    while(operators.includes("x")){
      const index = operationArray.indexOf("x")
      const multiply = operationArray.slice(index - 1, index + 2)
      operationArray.splice(index - 1, 3, Number(multiply[0]) * Number(multiply[2]))
      operators.splice(operators.indexOf("x"), 1)
    }
    while(operators.includes("÷")){
      const index = operationArray.indexOf("÷")
      const multiply = operationArray.slice(index - 1, index + 2)
      operationArray.splice(index - 1, 3, Number(multiply[0]) / Number(multiply[2]))
      operators.splice(operators.indexOf("÷"), 1)
    }
    while(operators.includes("+")){
      const index = operationArray.indexOf("+")
      const multiply = operationArray.slice(index - 1, index + 2)
      operationArray.splice(index - 1, 3, Number(multiply[0]) + Number(multiply[2]))
      operators.splice(operators.indexOf("+"), 1)
    }
    while(operators.includes("-")){
      const index = operationArray.indexOf("-")
      const multiply = operationArray.slice(index - 1, index + 2)
      operationArray.splice(index - 1, 3, Number(multiply[0]) - Number(multiply[2]))
      operators.splice(operators.indexOf("-"), 1)
    }

    display.innerText = operationArray.join('')
    operationArray.length = 0
    operationArray = operationArray.concat(Array.from(String(display.innerText)))
  }

  const clearEvent = (e) => {
    e.preventDefault()
    operationArray.length = 0
    operators.length = 0
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

  const createEquationArray = () => {
    let equationArr = []
    operatorArr = [...operators]
    operators.forEach(operator => {
      const index = operationArray.indexOf(operatorArr.shift())
      equationArr = equationArr.concat(operationArray.splice(0, index).join(''))
      equationArr.push(operationArray.shift())
    })
    return equationArr = equationArr.concat(operationArray.join(''))
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