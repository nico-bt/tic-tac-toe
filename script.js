// ==============================================================
// Select elements
// ==============================================================

const cellElements = document.querySelectorAll(".cell")
const messageElement = document.getElementById("winning-message")
const messageText = document.getElementById("message-text")
const restartBtn = document.getElementById("restartButton")


// ==============================================================
// Event listeners
// ==============================================================

cellElements.forEach(cell => {
    cell.addEventListener("click", handleClick, { once: true })
})

restartBtn.addEventListener("click", restartGame)


// ==============================================================
// Functions
// ==============================================================

// Board as an array:
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

class Player {
    constructor(marker) {
        this.marker = marker
        this.moves = []
        this.win = false
    }
    addMove(move) {
        this.moves.push(move)
    }
    checkWin() {
        // if 3 moves match with a winning combination --> win
        winningCombinations.forEach(combination => {
            let count = 0
            combination.forEach(cell => {
                if (this.moves.includes(cell)) {
                    count++
                    if (count == 3) {
                        this.win = true
                    }
                }
            })
        })
    }
    restart() {
        this.moves = []
        this.win = false
    }
}

let playerX = new Player("x")
let playerCircle = new Player("o")

let turnX = true
let numMoves = 0

function handleClick(e) {
    if (turnX) {
        e.target.classList.add("cell-x")
        playerX.addMove(parseInt(e.target.id))
        playerX.checkWin()
        if (playerX.win) {
            messageElement.classList.add("show")
            messageText.textContent = "X Wins!"
            return
        }
    } else {
        e.target.classList.add("circle")
        playerCircle.addMove(parseInt(e.target.id))
        playerCircle.checkWin()
        if (playerCircle.win) {
            messageElement.classList.add("show")
            messageText.textContent = "O Wins!"
            return
        }
    }
    turnX = !turnX
    numMoves++

    if(numMoves==9){
        messageElement.classList.add("show")
        messageText.textContent = "Draw"
    }
}

function restartGame() {
    playerCircle.restart()
    playerX.restart()
    turnX = true
    numMoves = 0
    messageElement.classList.remove("show")
    messageText.textContent = ""
    cellElements.forEach(cell => {
        cell.classList.remove("cell-x","circle")
        cell.addEventListener("click", handleClick, { once: true })
    })
}