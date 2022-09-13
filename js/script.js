const X_Class = 'x'
const Circle_Class = 'circle'
const Winning_Combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const winningMessage = document.querySelector('[data-winning-message]')
const restart = document.getElementById('restartbutton')
let xTurn

startGame()

restart.addEventListener('click', startGame)

function handleClick(e) {
    //placeMark
    const cell = e.target
    const currentClass = xTurn ? X_Class : Circle_Class
    placeMark(cell, currentClass)
    
    //Check for win
    if (checkWin(currentClass)) {
        endGame(false)
    }
    //Check for draw
    else if (isDraw()) {
        endGame(true)
    } else {
    //switch turns
    swapTurns()
    setBoardHoverClass() 
    }
    
}

function startGame() {
    xTurn = true
    cellElements.forEach(cell => {
        cell.classList.remove(X_Class)
        cell.classList.remove(Circle_Class)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick, {
            once: true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_Class) || cell.classList.contains(Circle_Class)
    })
}

function endGame(draw) {
    if (draw) {
      winningMessage.innerText = `Draw!`
    } else {
        winningMessage.innerText = `${xTurn ? "X's" : "O's"} Wins!`
    }
    winningMessageElement.classList.add('show')
  }

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    xTurn = !xTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_Class)
    board.classList.remove(Circle_Class)
    if(xTurn) {
        board.classList.add(X_Class)
    } else {
        board.classList.add(Circle_Class)
    }
}

function checkWin(currentClass) {
    return Winning_Combinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}