import { utilService } from "./util.service"

export const boardService = {
    getEmptyBoard,
    checkWin
}

function getEmptyBoard() {
    let board = []
    for (let i = 0; i < 6; i++) {
        board[i] = []

        for (let j = 0; j < 7; j++) {
            board[i][j] = _getEmptyCell(i, j)

        }
    }
    return board
}

function checkWin(board, i, j) {
    let counter = 0
    console.log(board.length)
    for (let i = 0; i < board.length; i++) {

        for (let j = 0; j < board[0].length; j++) {
            if (board[i][j].isEmpty === false) {
                counter++
            }
        }
    }

    console.log(counter)
    if(counter === 4) {
        return alert('you won')
    }
}


const colors = [' red', ' blue', ' pink', ' green']

function _getEmptyCell(i, j) {
    const cell = {
        isEmpty: true,
        color: colors[utilService.getRandomIntInclusive(0, 3)],
        pos: { i, j }
    }

    return cell
}