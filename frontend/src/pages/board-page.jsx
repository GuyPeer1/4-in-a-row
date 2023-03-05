import React, { useState } from 'react'
import Turn from '../cmps/turn.jsx'

import { boardService } from '../services/board.service'
import logo from '../assets/imgs/logo.svg'
import marker from '../assets/imgs/marker-red.svg'
import { useNavigate } from 'react-router-dom'

export function BoardPage() {
    const [modalOpen, setOpenModal] = useState(false)
    const [board, setBoard] = useState(boardService.getEmptyBoard())

    const navigate = useNavigate()

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
                    <button onClick={toggleModal} className='btn'>CONTINUE GAME</button>
                    <button className='btn'>RESTART</button>
                    <button onClick={() => navigate('/')} className='btn quit'>QUIT GAME</button>
                </div>

            </article>}

            <div className='board-options'>
                <button onClick={toggleModal} className="btn">MENU</button>
                <button className="btn">RESTART</button>
            </div>

            <section className='board'>
                <img className="img-game-logo" src={logo} />
                <img className="img-marker" src={marker} />
                {board.map((row, index) => <div key={index} className="row flex" >
                    {row.map((cell, indexC) => <div
                        key={indexC}
                        className={`cell ${cell.pos.i}-${cell.pos.j}`}
                        onClick={(ev) => addToBoard(ev, cell.pos.i, cell.pos.j)}
                    ></div>)}

                </div>)}
            </section>
            <Turn />
        </section >
    )
}