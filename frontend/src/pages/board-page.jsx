import React, { useState } from 'react'
import Turn from '../cmps/turn.jsx'

import { boardService } from '../services/board.service'
import logo from '../assets/imgs/logo.svg'
import marker from '../assets/imgs/marker-red.svg'

export function BoardPage() {
    const [modalOpen, setOpenModal] = useState(false)
    const [board, setBoard] = useState(boardService.getEmptyBoard())

    function addToBoard(ev, i, j) {
        console.log(ev.target)
        if (board[i][j].isEmpty === false) return
        ev.target.className += board[i][j].color
        board[i][j].isEmpty = false
        boardService.checkWin(board, i, j)

    }

    function toggleModal() {
        modalOpen ? setOpenModal(false) : setOpenModal(true)
        document.querySelector('body').classList.toggle('shadow')
    }

    return (
        <section className='board-page'>
            {modalOpen && <article className='menu-modal'>

                <h1>PAUSE</h1>

                <div className="btn-area">
                    <button className='btn'>CONTINUE GAME</button>
                    <button className='btn'>RESTART</button>
                    <button className='btn quit'>QUIT GAME</button>
                </div>

            </article>}

            <div className='board-options'>
                <button onClick={toggleModal} className="btn">MENU</button>
                <img className="img-game-logo" src={logo} />
                <button className="btn">RESTART</button>
            </div>
            <section className='board'>
                <img className="img-marker" src={marker} />
                {board.map((row, index) => <div key={index} className="row flex" >
                    {row.map((cell, indexC) => <div
                        key={indexC}
                        className={`cell ${cell.pos.i}-${cell.pos.j}`}
                        onClick={(ev) => addToBoard(ev, cell.pos.i, cell.pos.j)}
                    ></div>)}

                </div>)}
                <div className="turn-wrapper">
                    <Turn />
                </div>
            </section>


        </section >
    )
}