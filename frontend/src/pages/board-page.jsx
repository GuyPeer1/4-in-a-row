import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { boardService } from '../services/board.service'
import { utilService } from '../services/util.service.js'

import logo from '../assets/imgs/logo.svg'
import marker from '../assets/imgs/marker-red.svg'
import player1 from '../assets/imgs/player-one.svg'
import player2 from '../assets/imgs/player-two.svg'

import Turn from '../cmps/turn.jsx'
import { showSuccessMsg } from '../services/event-bus.service'

export function BoardPage() {
    const [modalOpen, setOpenModal] = useState(false)
    const [board, setBoard] = useState(boardService.getEmptyBoard())
    const [turn, setTurn] = useState(' yellow-disc')
    const navigate = useNavigate()

    useEffect(() => {
        document.querySelector('.main-layout').style.backgroundColor = '#7945FF'
    }, [])

    function addToBoard(coulmnNumber) {
        let possibleLocations = []
        for (let row = 0; row < board.length; row++) {
            let currColumnCell = board[row][coulmnNumber]
            currColumnCell.isEmpty ? possibleLocations.push(currColumnCell.pos.i) : console.log('')
        }
        let placeToSit = { i: '', j: coulmnNumber }
        placeToSit.i = Math.max(...possibleLocations)
        board[placeToSit.i][placeToSit.j].isEmpty = false
        board[placeToSit.i][placeToSit.j].color = turn
        const newBoard = board.slice()
        setBoard(newBoard)
        setTurn(turn === ' red-disc' ? ' yellow-disc' : ' red-disc')
        /// need negs loop
        let win = boardService.checkWin(board, placeToSit.i, placeToSit.j, turn)
        if (win) showSuccessMsg('You won!')
    }

    function startGame(player) {

    }

    function toggleModal() {
        modalOpen ? setOpenModal(false) : setOpenModal(true)
        document.querySelector('body').classList.toggle('shadow')
    }

    function getCmpMove() {
        let colmunIdx = utilService.getRandomIntInclusive(0, 6)
        return addToBoard(colmunIdx)
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
            <section className='board-layout'>
                <article className='player-modal player1'>
                    <img src={player1} alt="" />
                    <p>PLAYER 1</p>
                    <h4>12</h4>
                </article>
                <section className='board'>

                    <img className="img-game-logo" src={logo} />
                    <img className="img-marker" src={marker} />
                    {board.map((row, indexR) => <div key={indexR} className="row flex">
                        {row.map((cell, indexC) => <div
                            key={indexC}
                            onClick={() => addToBoard(indexC)}
                            className={`cell ${cell.pos.i}-${cell.pos.j} ${cell.color ? cell.color : ''}`}
                        ></div>)}

                    </div>)}
                </section>

                <article className='player-modal player2'>
                    <img src={player2} alt="" />
                    <p>PLAYER 2</p>
                    <h4>23</h4>
                </article>

            </section>
            <Turn />
        </section >
    )
}