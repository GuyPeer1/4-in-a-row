export const boardService = {
    getEmptyBoard,
}

function getEmptyBoard() {
    let board = []
    for (let i = 0; i < 6; i++) {
        board[i] = []

        for (let j = 0; j < 7; j++) {
            board[i][j] = _getEmptyCell()

        }
    }
    return board
}

function _getEmptyCell() {
    const cell = {
        isEmpty: true,
        color: 'yellow'
    }

    return cell
}