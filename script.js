const playerFactory = (name) => {
    return {
        name
    };
};
const player1 = playerFactory('blank');
const player2 = playerFactory('blank');

//Event handler for the board
document.querySelectorAll('.cell').forEach(item => {
    item.addEventListener('click', () => {
        gameBoard.playTurn(item.dataset.coordinates)
    })
})

//Event handlers for the player name inputs
const p1Input = document.querySelector('#p1')
const p2Input = document.querySelector('#p2')
p1Input.addEventListener('input', () => {
    player1.name = p1Input.value
    if (p1Input.value == "") {
        player1.name = "blank"
    }
})
p2Input.addEventListener('input', () => {
    player2.name = p2Input.value
    if (p2Input.value == "") {
        player2.name = "blank"
    }
})

//Event handler for the start game button 
document.querySelector('#start').addEventListener('click', () => {
    if (player1.name == "blank" || player2.name == "blank") {
        alert("Please fill out player names before stating a new game")
    } else {
        gameBoard.started = true
        alert(`${player1.name}, you will start first. The starting player will alternate each game`)
    }
})

const gameBoard = (() => {

    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
    let startPlayer = player1
    let currentPlayer = "x"
    let started = false

    const readCell = (x, y) => {
        return board[y][x]
    }

    const writeCell = (x, y, val) => {
        board[y][x] = val
        renderBoard()
    }

    const clearBoard = () => {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
        renderBoard()
    }

    const changePlayer = () => {
        currentPlayer = currentPlayer == "x" ? "0" : "x"
    }

    const playTurn = (coordinates) => {

        const splitCoordinates = coordinates.split(",")
        const x = splitCoordinates[0]
        const y = splitCoordinates[1]

        if (gameBoard.started == true) {

            if (readCell(x, y) !== "") {
                alert("Cell is already filled")
            } else {
                writeCell(x, y, currentPlayer)
                changePlayer()
                checkWin()
            }

        } else {
            alert(`Click the "Start Game" button to find out who goes first!`)
        }

    }

    const checkWin = () => {

        let winner = ""

        function checkRows() {
            for (let i = 0; i < board.length; i++) {
                const row = board[i];
                if (allEqual(row)) {
                    winner = row[0]
                    return true
                }
            }
            return false
        }

        function checkCols() {
            const colsArray = [
                [board[0][0],board[1][0],board[2][0]],
                [board[0][1],board[1][1],board[2][1]],
                [board[0][2],board[1][2],board[2][2]]
            ]
            for (let i = 0; i < colsArray.length; i++) {
                const cols = colsArray[i];
                if (allEqual(cols)) {
                    winner = cols[0]
                    return true
                }
            }
            return false
        }

        function checkDiag() {
            const diag = [
                [board[0][0],board[1][1],board[2][2]],
                [board[2][0],board[1][1],board[0][2]]    
            ]
            for (let i = 0; i < diag.length; i++) {
                const line = diag[i];
                if (allEqual(line)) {
                    winner = line[0]
                    return true
                }
            }
            return false
        }

        function allEqual(arr) {
            if (arr.includes("")) {
                return false
            }
            return new Set(arr).size == 1;
        }

        if (checkRows() == true || checkCols() == true || checkDiag() == true) {
            alert(`${winner} Wins!`)
        }

    }

    const renderBoard = () => {

        c = 0

        for (let y = 0; y < board.length; y++) {
            const row = board[y];
            for (let x = 0; x < row.length; x++) {

                const selector = `div[data-cell='${c}']`
                const cell = document.querySelector(selector)

                if (readCell(x, y) == "x") {
                    cell.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-letter-x" height="200" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><line x1="7" y1="4" x2="17" y2="20" /><line x1="17" y1="4" x2="7" y2="20" /></svg>'
                } else if (readCell(x, y) == "0") {
                    cell.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-letter-o" height="200" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M18 9a5 5 0 0 0 -5 -5h-2a5 5 0 0 0 -5 5v6a5 5 0 0 0 5 5h2a5 5 0 0 0 5 -5v-6"></path></svg>'
                } else {
                    cell.innerHTML = ""
                }

                c++

            }
        }
    }

    return {
        board,
        started,
        checkWin,
        readCell,
        writeCell,
        clearBoard,
        changePlayer,
        playTurn,
        renderBoard
    }

})()