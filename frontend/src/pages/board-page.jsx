import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Turn from '../cmps/turn.jsx'

import { boardService } from '../services/board.service'
import logo from '../assets/imgs/logo.svg'
import marker from '../assets/imgs/marker-red.svg'
import redDisc from '../assets/imgs/counter-red-large.svg'
import yellowDisc from '../assets/imgs/counter-yellow-large.svg'
import { utilService } from '../services/util.service.js'

export function BoardPage() {
    const [modalOpen, setOpenModal] = useState(false)
    const [board, setBoard] = useState(boardService.getEmptyBoard())
    const [turn, setTurn] = useState(' yellow-disc')
    const navigate = useNavigate()

    let user1 = { discUrl: redDisc }
    let user2 = { discUrl: yellowDisc }
    let currUser = {}

    useEffect(() => {
        document.querySelector('.main-layout').style.backgroundColor = '#7945FF'
        if (turn === ' yellow-disc') {
            const pos = boardService.getCmpMove(board)
            addToBoard(pos.i, pos.j, turn)
        }
    }, [])


    function addToBoard(i, j, turn ) {
        if (board[i][j].isEmpty === false) return
        
        board[i][j].isEmpty =  false
        board[i][j].color = turn
        const newBoard = board.slice()
        setBoard(newBoard)
        setTurn(turn === ' red-disc' ? ' yellow-disc' : ' red-disc');
        boardService.checkWin(board, i, j)
    }

   
    function startGame(player) {

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
                        className={`cell ${cell.pos.i}-${cell.pos.j} ${cell.color ? cell.color : ''}`}
                        onClick={() => addToBoard( cell.pos.i, cell.pos.j)}
                    ></div>)}

                </div>)}
            </section>
            <Turn />
        </section >
    )
}