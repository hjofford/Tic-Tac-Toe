// Set variables
const xClass = 'x'
const oClass = 'o'
const computerClass = 'o'

const winCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
]
 const winDiagDoublePts = [
  [0, 4, 8],
  [2, 4, 6]
]


const cellEl = document.querySelectorAll('[data-cell]')
// const cell = document.querySelectorAll('.cell')
const board = document.getElementById('board')
// const compBoard = ["", "", "", "", "", "", "", "", ""]

const startMsgEl = document.getElementById('startMsg')
const twoPlayerBtn = document.getElementById('twoPlayerBtn')
const computerBtn = document.getElementById('computerBtn')


const winMsgEl = window.document.getElementById('winMsg')
const restartBtn = document.getElementById('restartBtn')
const winMsgTextEl = document.querySelector('[data-win-msg-text]')

const dbPtsMsgEl = window.document.getElementById('dblPtsMsg')
const dblPtsRestartBtn = document.getElementById('dblPtsRestartBtn')
const dblPtsMsgTextEl = document.querySelector('[data-dbl-pts-msg-text]')

const drawMsgEl = window.document.getElementById('drawMsg')
const drawRestartBtn = document.getElementById('drawRestartBtn')
const drawMsgTextEl = document.querySelector('[data-draw-msg-text]')


const compWinMsgEl = window.document.getElementById('compWinMsg')
const compRestartBtn = document.getElementById('compRestartBtn')
const compWinMsgTextEl = document.querySelector('[data-comp-win-msg-text]')

const compDbPtsMsgEl = window.document.getElementById('compDblPtsMsg')
const compDblPtsRestartBtn = document.getElementById('compDblPtsRestartBtn')
const compDblPtsMsgTextEl = document.querySelector('[data-comp-dbl-pts-msg-text]')

const compDrawMsgEl = window.document.getElementById('drawMsg')
const compDrawRestartBtn = document.getElementById('drawRestartBtn')
const compDrawMsgTextEl = document.querySelector('[data-draw-msg-text]')


const xScoreResult = document.getElementById('xScore')
const oScoreResult = document.getElementById('oScore')

// create a player variable to use boolean values in functions to define player turn
let xTurn
let oTurn
let compTurn

// ------------------------------------------ //

// Start game mesage popup on first page load
window.addEventListener('load', function() {
  startMessage();
})

function startMessage() {
  startMsgEl.classList.add('show');
}
gameMode()
function gameMode() {
  twoPlayerBtn.addEventListener('click', function() {
    startMsgEl.classList.remove('show')
    twoPlayerGame()
  })

  computerBtn.addEventListener('click', function() {
    startMsgEl.classList.remove('show')
    compGame()
  })
}

// ------------------------------------------ //

// link restartBtn, drawRestartBtn and dblPtsRestartBtn to startGame function
restartBtn.addEventListener('click', twoPlayerGame)
dblPtsRestartBtn.addEventListener('click', twoPlayerGame)
drawRestartBtn.addEventListener('click', twoPlayerGame)

compRestartBtn.addEventListener('click', compGame)
compDrawRestartBtn.addEventListener('click', compGame)
compDblPtsRestartBtn.addEventListener('click', compGame)

// Start game function
function twoPlayerGame() {
  oTurn = false
  cellEl.forEach(cell => {
    cell.classList.remove(xClass)
    cell.classList.remove(oClass)
    cell.removeEventListener('click', twoPlayer)
    cell.addEventListener('click', twoPlayer, { once: true })
  })
  setBoardHoverClass()
  winMsgEl.classList.remove('show')
  drawMsgEl.classList.remove('show')
  dbPtsMsgEl.classList.remove('show')
}

function compGame() {
  compTurn = false
  cellEl.forEach(cell => {
    cell.classList.remove(xClass)
    cell.classList.remove(computerClass)
    cell.removeEventListener('click', compPlayer)
    cell.addEventListener('click', compPlayer, { once: true })
  })
  setBoardHoverClassComp()
  compWinMsgEl.classList.remove('show')
  compDrawMsgEl.classList.remove('show')
  compDbPtsMsgEl.classList.remove('show')
}

// Main gamplay code
function twoPlayer(event) {
  const cell = event.target
  const currentClass = oTurn ? oClass : xClass
  placeMark(cell, currentClass)
  if (checkDiag(currentClass)) {
    doublePointsGameTwoPlayer(false)
    twoPlayerDoubleScore()
  } else if (checkWin(currentClass)) {
    winGameTwoPlayer(false)
    twoPlayerScoreResult()
  } else if (isDraw()) {
    drawGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function compPlayer(event) {
  const cell = event.target
  const currentClass = compTurn ? computerClass : xClass
  if (currentClass === xClass) {
      setBoardHoverClassComp()
      placeMark(cell, xClass)
      } 
      if (checkDiag(currentClass)) {
        doublePointsGameCompPlayer(false)
        compPlayerDoubleScore()
      } else if (checkWin(currentClass)) {
        winGameCompPlayer(false)
        compPlayerScoreResult()
      } else if (isDrawComp()) {
        drawGameComp(true)
        
      } else {
        swapTurnsComp()
        
    };
    compChoice()
    if (checkDiagComp(currentClass)) {
      doublePointsGameCompPlayer()
      compPlayerDoubleScore()
    } else if (checkWinComp(currentClass)) {
      winGameCompPlayer()
      compPlayerScoreResult()
    } else if (isDrawComp()) {
      drawGameComp()
    } else {
      swapTurnsComp()
      setBoardHoverClassComp()
    };
}
  

// Draw message popup
function drawGame(draw) {
  if (draw) {
    drawMsgTextEl.innerText = "It's a tie baby!"
  } 
  drawMsgEl.classList.add('show')
}

function drawGameComp(draw) {
  currentClass = compTurn ? computerClass : xClass
  if (draw) {
    compDrawMsgTextEl.innerText = "It's a tie baby!"
  } 
  compDrawMsgEl.classList.add('show')
}

// Win Message popup
function winGameTwoPlayer() {
  const currentClass = oTurn ? oClass : xClass
  if (checkWin(currentClass)) {
    winMsgTextEl.innerText = `${oTurn ? "O" : "X"} ... You're a winner baby!`
  }
  winMsgEl.classList.add('show') 
}

function winGameCompPlayer() {
  const currentClass = compTurn ? computerClass : xClass
  if (checkWin(currentClass)) {
    compWinMsgTextEl.innerText = `${compTurn ? "O" : "X"} ... You're a winner baby!`
  }
  compWinMsgEl.classList.add('show') 
}

// Double Points popup
function doublePointsGameTwoPlayer() {
  const currentClass = oTurn ? oClass : xClass
  if (checkDiag(currentClass)) {
    dblPtsMsgTextEl.innerText = `${oTurn ? "O" : "X"} ... Double Points baby!`
  }
  dbPtsMsgEl.classList.add('show') 
}

function doublePointsGameCompPlayer() {
  const currentClass = compTurn ? computerClass : xClass
  if (checkDiag(currentClass)) {
    compDblPtsMsgTextEl.innerText = `${compTurn ? "O" : "X"} ... Double Points baby!`
  }
  compDbPtsMsgEl.classList.add('show') 
}

// ------------------------------------------ //

// Track score
function twoPlayerScoreResult() {
  const currentClass = oTurn ? oClass : xClass
  if ('x' === currentClass) {
    let currentXScore = Number(xScoreResult.innerText)
    xScoreResult.innerHTML = currentXScore + 1
  } else if ('o' === currentClass) {
    let currentOScore = Number(oScoreResult.innerText)
    oScoreResult.innerHTML = currentOScore + 1
  }
}

function compPlayerScoreResult() {
  const currentClass = compTurn ? computerClass : xClass
  if ('x' === currentClass) {
    let currentXScore = Number(xScoreResult.innerText)
    xScoreResult.innerHTML = currentXScore + 1
  } else if ('o' === currentClass) {
    let currentOScore = Number(oScoreResult.innerText)
    oScoreResult.innerHTML = currentOScore + 1
  }
}

// Double points if player has diagonal win

function twoPlayerDoubleScore() {
  const currentClass = oTurn ? oClass : xClass
  if ('x' === currentClass) {
    let currentXScore = Number(xScoreResult.innerText)
    xScoreResult.innerHTML = currentXScore + 2
  } else if ('o' === currentClass) {
    let currentOScore = Number(oScoreResult.innerText)
    oScoreResult.innerHTML = currentOScore + 2
  }
}

function compPlayerDoubleScore() {
  const currentClass = compTurn ? computerClass : xClass
  if ('x' === currentClass) {
    let currentXScore = Number(xScoreResult.innerText)
    xScoreResult.innerHTML = currentXScore + 2
  } else if ('o' === currentClass) {
    let currentOScore = Number(oScoreResult.innerText)
    oScoreResult.innerHTML = currentOScore + 2
  }
}

// ------------------------------------------ //

// functions to call in main code
function isDraw() {
  return [...cellEl].every(cell => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass)
  })
}

function isDrawComp() {
  return [...cellEl].every(cell => {
    return cell.classList.contains(xClass) || cell.classList.contains(computerClass)
  })

}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)
}

function placeMarkComp(cell, currentClass) {
  cell.classList.add(currentClass)
}

function compChoice(currentClass) {
  console.log("compChoice", cellEl, currentClass)
  let randomCell = Math.floor(Math.random() * (cellEl.length))
  console.log(randomCell, cellEl[randomCell])
  while (true) {
    randomCell = Math.floor(Math.random() * (cellEl.length))
    console.log(randomCell)
    if (cellEl[randomCell].classList.contains(xClass) || cellEl[randomCell].classList.contains(computerClass)) {
      console.log("isNotValid")
    } else {
      cellEl[randomCell].classList.add(computerClass)
      console.log("isValid")
      break;
    }  
  }
}

function swapTurns() {
  oTurn = !oTurn
}

function swapTurnsComp() {
  compTurn = !compTurn
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

function setBoardHoverClassComp() {
  board.classList.remove(xClass)
  board.classList.remove(computerClass)
  if (xClass) {
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

function checkDiag(currentClass) {
  return winDiagDoublePts.some(combination => {
    return combination.every(index => {
      return cellEl[index].classList.contains(currentClass)
    })
  })
}

function checkWinComp(currentClass) {
  currentClass = compTurn ? computerClass : xClass
  // .some determines whether the specified callback => returns 'true' boolean for any element in the array
  return winCombo.some(combination => {
      // .every determines whether all members of an array satisfy the test (above)
    return combination.every(index => {
      return cellEl[index].classList.contains(currentClass)
    })
  })
}

function checkDiagComp(currentClass) {
  currentClass = compTurn ? computerClass : xClass
  return winDiagDoublePts.some(combination => {
    return combination.every(index => {
      return cellEl[index].classList.contains(currentClass)
    })
  })
}

// ------------------------------------------ //
