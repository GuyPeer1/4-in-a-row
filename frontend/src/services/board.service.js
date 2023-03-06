import { utilService } from "./util.service"

export const boardService = {
    getEmptyBoard,
    checkWin,
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
    if (_checkVertical(board, i, j)) console.log('won')
    if (_checkHorizontal(board, i, j)) console.log('won')
    if (_checkLeftDiagnol(board, i, j)) console.log('won')
    if (_checkRightDiagnol(board, i, j)) console.log('won')
   
}

function _checkVertical(board, row, j) {
    let counter = 1
    for (let i = 1; i < board.length - 1; i++) {
        board[i][j].color === board[i + 1][j].color ? counter++ : counter = 1
    }

    if (counter === 4) return true
    return false
}

function _checkHorizontal(board, I, J) {
    let counter = 1
    for (let i = 0; i < board[0].length - 1; i++) {
        if (board[I][i].color === '') continue
        board[I][i].color === board[I][i + 1 ].color ? counter++ : counter = 1
        if (counter === 4) return true
    }
    return false
}

function _checkLeftDiagnol(board, I, J) {
  
}

function _checkRightDiagnol(board, I, J) {
   
}


function _getEmptyCell(i, j) {
    const cell = {
        isEmpty: true,
        color: '',
        pos: { i, j }
    }
    return cell
}

