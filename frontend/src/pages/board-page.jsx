import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { boardService } from '../services/board.service'
import { utilService } from '../services/util.service.js'
import { AppFooter } from '../cmps/app-footer'

import logo from '../assets/imgs/logo.svg'
import marker from '../assets/imgs/marker-red.svg'
import player1 from '../assets/imgs/player-one.svg'
import player2 from '../assets/imgs/player-two.svg'

import Turn from '../cmps/turn.jsx'
import { showSuccessMsg } from '../services/event-bus.service'
import { socketService } from '../services/socket.service'
import { userService } from '../services/user.service'

export function BoardPage() {

    const [loader, setLoader] = useState(false)
    const [modalOpen, setOpenModal] = useState(false)
    const [board, setBoard] = useState(boardService.getEmptyBoard())
    const [winner, setWinner] = useState(null)
    const [turn, setTurn] = useState(' yellow-disc')
    const navigate = useNavigate()

    //// util
    useEffect(() => {
        document.querySelector('.main-layout').style.backgroundColor = '#7945FF'
        const board = document.querySelector('.board')
        board.addEventListener('mousemove', handleMouseMove)
        return () => {
            board.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    ///socketlistaners
    useEffect(() => {
        socketService.emit('join-to-room')

        socketService.on('player1', data => {
            let discColor = userService.saveDiscColor(data).discColor
            setTurn(discColor)
            setLoader(true)
        })

        socketService.on('start-game', data => {
            let discColor = userService.saveDiscColor(data).discColor
            setTurn(discColor)
            setLoader(false)
            showSuccessMsg('pls start playing')
        })

        socketService.on('received-played-move', (coulmnNumber) => {
            addToBoard(coulmnNumber, true)
        })

    }, [])


    function handleMouseMove(event) {
        const container = document.querySelector('.board');
        const containerRect = container.getBoundingClientRect();
        const xPosition = event.clientX - containerRect.left;
        const imgMarker = document.querySelector('.img-marker');
        imgMarker.style.left = xPosition - 20 + 'px';
    }

    function addToBoard(coulmnNumber, fromSocket) {
        if (winner) return

        const userId = userService.getLoggedinUser()._id
        const data = {
            coulmnNumber,
            userId
        }


        const placeToSit = boardService.getEmptyLocation(board, coulmnNumber)
        board[placeToSit.i][placeToSit.j].isEmpty = false
        board[placeToSit.i][placeToSit.j].color = turn

        if (fromSocket !== true) {
            socketService.emit('played-move', data)
        }

        const newBoard = board.slice()
        setBoard(newBoard)
        setTurn(turn === ' red-disc' ? ' yellow-disc' : ' red-disc')

        let win = boardService.checkWin(board, placeToSit.i, placeToSit.j, turn)

        if (win) {
            setWinner(true)
            showSuccessMsg('You won')
        }
    }

    function toggleModal() {
        modalOpen ? setOpenModal(false) : setOpenModal(true)
        document.querySelector('body').classList.toggle('shadow')
    }

    function getCmpMove() {
        let colmunIdx = utilService.getRandomIntInclusive(0, 6)
        return addToBoard(colmunIdx)
    }

    function restartGame() {
        setBoard(boardService.getEmptyBoard())
        setWinner(null)
    }

    return (
        <section className='board-page'>
            {loader && <h2>loading</h2>}

            {modalOpen && <article className='menu-modal'>

                <h1>PAUSE</h1>

                <div className="btn-area">
                    <button onClick={toggleModal} className='btn'>CONTINUE GAME</button>
                    <button className='btn'>RESTART</button>
                    <button onClick={() => navigate('/')} className='btn quit'>QUIT GAME</button>
                </div>

            </article>}

            {/* <img className="img-game-logo" src={logo} /> */}

            {!loader && <section className='board-layout'>

                <div className='board-options'>
                    <button onClick={toggleModal} className="btn">MENU</button>
                    <button className="btn" onClick={restartGame}>RESTART</button>
                </div>

                <article className='player-modal player1'>
                    <img src={player1} alt="" />
                    <p>PLAYER 1</p>
                    <h4>12</h4>
                </article>


                <section className='board'>

                    <img className="img-marker" src={marker} />
                    {board.map((row, indexR) => <div key={indexR} className="row flex">
                        {row.map((cell, indexC) => <div
                            key={indexC}
                            onClick={() => addToBoard(indexC)}
                            className={`cell ${cell.pos.i}-${cell.pos.j} ${cell.color ? cell.color : ''}`}
                        ></div>)}

                    </div>)}
                    <Turn />
                </section>

                <article className='player-modal player2'>
                    <img src={player2} alt="" />
                    <p>PLAYER 2</p>
                    <h4>23</h4>
                </article>

                <section className="app-footer"></section>
            </section>}


        </section >
    )
}