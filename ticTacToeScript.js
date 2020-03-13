const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const PRE_WINNING_COMBINATIONS = [
  [1, 2],
  [0, 1],
  [0, 2],
  [3, 4],
  [4, 5],
  [3, 5],
  [6, 7],
  [7, 8],
  [6, 8],
  [0, 3],
  [0, 6],
  [3, 6],
  [1, 4],
  [1, 7],
  [4, 7],
  [5, 8],
  [2, 8],
  [2, 5],
  [0, 4],
  [0, 8],
  [4, 8],
  [4, 6],
  [2, 6],
  [2, 4]
]

const HIGH_WINNING_COMBINATIONS = [
  [8, 0, 2],
  [6, 2, 8],
  [6, 0, 8],
  [2, 0, 6],

  [4, 0, 2],
  [4, 2, 8],
  [4, 6, 8],
  [4, 0, 6],

  [4, 1, 0],
  [4, 2, 0],
  [4, 2, 1],

  [4, 6, 0],
  [4, 6, 3],
  [4, 3, 0],

  [4, 6, 8],
  [4, 6, 7],
  [4, 7, 8],

  [4, 8, 2],
  [4, 5, 8],
  [4, 5, 2]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click', startGame)

function startGame() {
  circleTurn = false
  cellElements.forEach(cell => {
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.removeEventListener('click', handleClick)
    cell.addEventListener('click', handleClick, { once: true })
  })
  setBoardHoverClass()
  winningMessageElement.classList.remove('show')
}

function handleClick(e) {
  const cell = e.target
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
  placeMark(cell, currentClass)
  if (checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
    aiTurn()
  }
}

function aiTurn(){
  mediumAITurn()
  if (checkWin(CIRCLE_CLASS)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
}

function mediumAITurn(){

  //take middle of open
  if (openCell(4)){
    placeMark(cellElements[4], CIRCLE_CLASS)
  //win if possible
  } else if (checkWinningMove(CIRCLE_CLASS)) {
    placeMark(cellElements[winningMove(CIRCLE_CLASS)], CIRCLE_CLASS)
  //prevent opponent from winning
  } else if (checkWinningMove(X_CLASS)) {
    placeMark(cellElements[winningMove(X_CLASS)], CIRCLE_CLASS)
  //try to make a smart move
  } else if (checkHighMove(CIRCLE_CLASS)) {
    placeMark(cellElements[highWinMove(CIRCLE_CLASS)], CIRCLE_CLASS)
  //pick open spot
  } else {
    placeMark(cellElements[randomMove(CIRCLE_CLASS)], CIRCLE_CLASS)
  }
}

function winningMove(currentClass){
  var i
  for (i = 0; i < 9; i++) {
    if (openCell(i)){
      placeMark(cellElements[i], currentClass)
      if (checkWin(currentClass)){
        removeMark(cellElements[i], currentClass)
        return i;
      }
      removeMark(cellElements[i], currentClass)
    }
  }
  return -1;
}

function checkWinningMove(currentClass){
    if (winningMove(currentClass) == -1){
      return false
    }else{
      return true
    }
}

function checkHighMove(currentClass){
  if (highWinMove(currentClass) == -1){
    return false
  }else{
    return true
  }
}


function highWinMove(currentClass){
  var i
  for (i = 0; i < 9; i++) {
    if (openCell(i)){
      placeMark(cellElements[i], currentClass)
      if (checkHighWin(currentClass)){
        removeMark(cellElements[i], currentClass)
        return i;
      }
      removeMark(cellElements[i], currentClass)
    }
  }
  return -1;
}

function openCell(i){
  if (!cellElements[i].classList.contains(X_CLASS) && !cellElements[i].classList.contains(CIRCLE_CLASS)){
    return true
  }
  return false
}

function randomMove(currentClass){
  var i
  for (i = 0; i < 9; i++) {
    if (openCell(i)){
      return i
    }
  }
  return -1

}

function checkHighWin(currentClass) {
  return HIGH_WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

function removeMark(cell, currentClass) {
  cell.classList.remove(currentClass)

}

function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!'
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
  }
  winningMessageElement.classList.add('show')
}

function isDraw() {
  return [...cellElements].every(cell => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
  })
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass)

}

function swapTurns() {
  circleTurn = !circleTurn
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS)
  board.classList.remove(CIRCLE_CLASS)
  if (circleTurn) {
    board.classList.add(CIRCLE_CLASS)
  } else {
    board.classList.add(X_CLASS)
  }
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClass)
    })
  })
}

