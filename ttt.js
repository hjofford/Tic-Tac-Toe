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

const startMsgEl = document.getElementById('startMsg')
const startBtn = document.getElementById('startBtn')

const winMsgEl = window.document.getElementById('winMsg')
const restartBtn = document.getElementById('restartBtn')
const winMsgTextEl = document.querySelector('[data-win-msg-text]')

const xScoreResult = document.getElementById('xScore')
const oScoreResult = document.getElementById('oScore')

// define a player variable to use boolean values in functions to define player turn
let oTurn

// let currentPlayer = ''

// ------------------------------------------ //


// Start game mesage popup on first page load

window.addEventListener('load', function() {
  startMessage();
})

function startMessage() {
  startMsgEl.classList.add('show');
}

startBtn.addEventListener('click', function() {
  startMsgEl.classList.remove('show')
})

// function closeWindow() {
//   startMsgEl.modal('show')
//   startBtn.addEventListener('click')
//   startMsgEl.classList.remove('show')
// }
// startBtn.addEventListener('click', startGame)

// ------------------------------------------ //
startGame()

// link Restart to startGame function

restartBtn.addEventListener('click', startGame)

// ------------------------------------------ //

// Start game function
function startGame() {
  oTurn = false
  cellEl.forEach(cell => {
    cell.classList.remove(xClass)
    cell.classList.remove(oClass)
    cell.removeEventListener('click', ifClicked)
    cell.addEventListener('click', ifClicked, { once: true })
  })
  setBoardHoverClass()
  winMsgEl.classList.remove('show')
}

// Main gamplay code
function ifClicked(event) {
  const cell = event.target
  const currentClass = oTurn ? oClass : xClass
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
    scoreResult()
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
    winMsgTextEl.innerText = "It's a tie baby!"
  } else {
    winMsgTextEl.innerText = `${oTurn ? "O" : "X"} ... You're a winner baby!`
  }
  winMsgEl.classList.add('show')
}

// Track score
function scoreResult() {
  const currentClass = oTurn ? oClass : xClass
  if ('x' === currentClass) {
    let currentXScore = Number(xScoreResult.innerText)
    xScoreResult.innerHTML = currentXScore + 1
  } else if ('o' === currentClass) {
    let currentOScore = Number(oScoreResult.innerText)
    oScoreResult.innerHTML = currentOScore + 1
  }
}

// ------------------------------------------ //

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
    // .some determines whether the specified callback => returns 'true' boolean for any element in the array
  return winCombo.some(combination => {
      // .every determines whether all members of an array satisfy the test (above)
    return combination.every(index => {
      return cellEl[index].classList.contains(currentClass)
    })
  })
}