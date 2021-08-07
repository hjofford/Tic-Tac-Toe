// Set variables
const xClass = 'x'
const oClass = 'o'
const winCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]
const cellEl = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winMsgEl = document.getElementById('winMsg')
const restartBtn = document.getElementById('restartBtn')
const winMsgTextEl = document.querySelector('[data-win-msg-text]')

// define a player variable to use boolean values in functions to define player turn
let oTurn

startGame()

// link Restart to startGame function
restartBtn.addEventListener('click', startGame)

function startGame() {
  oTurn = false
  cellEl.forEach(cell => {
    cell.classList.remove(xClass)
    cell.classList.remove(oClass)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winMsgEl.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = oTurn ? oClass : xClass
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

// Win/Draw message
function endGame(draw) {
  if (draw) {
    winMsgTextEl.innerText = 'Draw!'
  } else {
    winMsgTextEl.innerText = `${oTurn ? "O's" : "X's"} Wins!`
  }
  winMsgEl.classList.add('show')
}


// functions to call in main code
function isDraw() {
  return [...cellEl].every(cell => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function swapTurns() {
  oTurn = !oTurn
}

function setBoardHoverClass() {
  board.classList.remove(xClass)
  board.classList.remove(oClass)
  if (oTurn) {
    board.classList.add(oClass)
  } else {
    board.classList.add(xClass)
  }
}

function checkWin(currentClass) {
    // .some determines whether the specified callback => returs 'true' boolean for any element in the array
  return winCombo.some(combination => {
      // .every determines whether all members of an array satisfy the test (above)
    return combination.every(index => {
      return cellEl[index].classList.contains(currentClass)
    })
  })
}