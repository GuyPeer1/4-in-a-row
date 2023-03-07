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

function checkWin(board, I, J, turn) {
    if (_checkVertical(board, J, turn)) return true
    else if (_checkHorizontal(board, I, turn)) return true
    else if (_checkTLBRDiagnol(board, I, J, turn)) return true
    else if (_checkBLTRDiagnol(board, I, J, turn)) return true
}

function _checkVertical(board, J, turn) {
    let count = 0
    for (let i = 0; i < board.length; i++) {
        board[i][J].color === turn ? count++ : count = 0
        if (count === 4) return true
    }
}

function _checkHorizontal(board, I, turn) {
    let count = 0
    for (let j = 0; j < board[0].length; j++) {
        board[I][j].color === turn ? count++ : count = 0
        if (count === 4) return true
    }
}

function _checkTLBRDiagnol(board, I, J, turn) {
    let count = 0
    let i = I, j = J
    while (i > 0 && j > 0) {
        i--
        j--
    }
    while (i < board.length && j < board[0].length) {
        if (board[i][j].color === turn) {
            count++
            if (count === 4) {
                return true
            }
        } else {
            count = 0
        }
        i++
        j++
    }
}

function _checkBLTRDiagnol(board, I, J, turn) {
    let count = 0
    let i = I
    let j = J
    while (i < board.length - 1 && j > 0) {
        i++
        j--
    }
    while (i >= 0 && j < board[0].length) {
        if (board[i][j].color === turn) {
            count++
            if (count === 4) {
                return true
            }
        } else {
            count = 0
        }
        i--
        j++
    }
}

function _getEmptyCell(i, j) {
    const cell = {
        isEmpty: true,
        color: '',
        pos: { i, j }
    }
    return cell
}

