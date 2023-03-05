import React, { useState } from 'react'
import { boardService } from '../services/board.service'

export function BoardPage() {

    const [board, setBoard] = useState(boardService.getEmptyBoard())

    function addToBoard(ev, i, j) {
        console.log(ev.target)
        if (board[i][j].isEmpty === false) return
        ev.target.className += board[i][j].color
        board[i][j].isEmpty = false
        boardService.checkWin(board, i, j)

    }

    return (
        <section className='board-page'>


            <section className='board'>
                {board.map((row, index) => <div key={index} className="row flex" >

                    {row.map((cell, indexC) => <div
                        key={indexC}
                        className={`cell ${cell.pos.i}-${cell.pos.j}`}
                        onClick={(ev) => addToBoard(ev, cell.pos.i, cell.pos.j)}
                    ></div>)}

                </div>)}

            </section>


        </section >
    )
}