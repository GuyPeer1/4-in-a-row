import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { boardService } from '../services/board.service'
import { utilService } from '../services/util.service.js'
import { AppFooter } from '../cmps/app-footer'

import logo from '../assets/imgs/logo.svg'
import marker from '../assets/imgs/marker-red.svg'
import player1 from '../assets/imgs/player-one.svg'
import player2 from '../assets/imgs/player-two.svg'
import RingLoader from 'react-spinners/RingLoader.js';


import Turn from '../cmps/turn.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
import { socketService } from '../services/socket.service'
import { userService } from '../services/user.service'

export function BoardPage() {

    const [time, setTime] = useState(30)
    const [oppTurn, setOppTurn] = useState(null)
    const [loader, setLoader] = useState(false)
    const [modalOpen, setOpenModal] = useState(false)
    const [board, setBoard] = useState(boardService.getEmptyBoard())
    const [winner, setWinner] = useState(null)
    const [turn, setTurn] = useState(userService.getLoggedinUser().discColor)
    const navigate = useNavigate()
    const intervalId = useRef(null)

    const cpuMode = useSelector(storeState => storeState.userModule.cpuMode)

    //// util
    useEffect(() => {
        document.querySelector('.main-layout').style.backgroundColor = '#7945FF'
        const board = document.querySelector('.board')
        board.addEventListener('mousemove', handleMouseMove)
        return () => {
            board.removeEventListener('mousemove', handleMouseMove)
        }
    }, [])

    useEffect(() => {
        if (!cpuMode) {

            socketService.emit('join-to-room', userService.getLoggedinUser()._id)

            socketService.on('player1', data => {
                let discColor = userService.saveDiscColor(data).discColor
                setTurn(discColor)
                setLoader(true)
            })

            socketService.on('player2', data => {
                let discColor = userService.saveDiscColor(data).discColor
                setTurn(discColor)
                setOppTurn(true)
            })

            socketService.on('start-game', data => {
                setLoader(false)
                showSuccessMsg('pls start playing')
                setTimerForPlayers()

            })

            socketService.on('received-played-move', (data) => {
                addToBoard(data.coulmnNumber, true, data.discColor)
                setOppTurn(false)
                setTimerForPlayers()
            })

            socketService.on('game-over', (data) => {
                showErrorMsg('bad player has won ):')
                setWinner(true)
            })

            return () => {
                socketService.off('player1')
                socketService.off('player2')
                socketService.off('start-game')
                socketService.off('received-played-move')
                socketService.off('game-over')
            }

        }
    }, [])


    function handleMouseMove(event) {
        const container = document.querySelector('.board')
        const containerRect = container.getBoundingClientRect()
        const xPosition = event.clientX - containerRect.left
        const imgMarker = document.querySelector('.img-marker')
        imgMarker.style.left = xPosition - 20 + 'px'
    }

    /// for vs cpu
    function playerVsCpu(coulmnNumber) {

        if (winner) return
        const placeToSit = boardService.getEmptyLocation(board, coulmnNumber)
        board[placeToSit.i][placeToSit.j].isEmpty = false
        board[placeToSit.i][placeToSit.j].color = 'red'


        const newBoard = board.slice()
        setBoard((oldBoard) => newBoard)

        let win = boardService.checkWin(board, placeToSit.i, placeToSit.j, 'red')

        if (win) {
            setWinner(true)
            showSuccessMsg('You won')
        }

        setTimeout(() => {
            getCmpMove()
        }, 500)

    }


    /// main function
    function addToBoard(coulmnNumber, fromSocket, discColor) {
        if (cpuMode) return playerVsCpu(coulmnNumber)
        if (winner) return
        if (oppTurn) return

        const data = GetDataForBoard(coulmnNumber)

        const placeToSit = boardService.getEmptyLocation(board, coulmnNumber)
        board[placeToSit.i][placeToSit.j].isEmpty = false
        board[placeToSit.i][placeToSit.j].color = turn

        if (fromSocket !== true) {
            socketService.emit('played-move', data)
            setOppTurn(true)
            setStateForPlayer()
            setTimerForPlayers()
        }

        else if (fromSocket === true) {
            if (discColor) {
                board[placeToSit.i][placeToSit.j].color = discColor
            }
        }

        const newBoard = board.slice()
        setBoard(newBoard)

        let win = boardService.checkWin(board, placeToSit.i, placeToSit.j, turn)

        if (win) {
            setWinner(true)
            showSuccessMsg('You won')
            socketService.emit('i-won', data)
        }
    }

    function GetDataForBoard(coulmnNumber) {
        const userId = userService.getLoggedinUser()._id
        const data = {
            coulmnNumber,
            userId,
            discColor: userService.getLoggedinUser().discColor
        }
        return data
    }


    function setTimerForPlayers() {
        clearInterval(intervalId.current)

        intervalId.current = setInterval(() => {
            setTime((prevTime) => prevTime -= 1)
        }, 1000)

        setTimeout(() => {
            clearInterval(intervalId.current)
            setTime(30)
            intervalId.current = setInterval(() => {
                setTime((prevTime) => prevTime -= 1)
            }, 1000)
        }, 5000)
    }

    function setStateForPlayer() {
        setTimeout(() => {
            oppTurn ? setOppTurn(false) : setOppTurn(true)
        }, 30000)

    }

    function toggleModal() {
        modalOpen ? setOpenModal(false) : setOpenModal(true)
        document.querySelector('body').classList.toggle('shadow')
    }

    function getCmpMove() {

        let colmunIdx = utilService.getRandomIntInclusive(0, 6)
        const placeToSit = boardService.getEmptyLocation(board, colmunIdx)
        if(!placeToSit) placeToSit = boardService.getEmptyLocation(board, colmunIdx)

        board[placeToSit.i][placeToSit.j].isEmpty = false
        board[placeToSit.i][placeToSit.j].color = 'yellow'

        const newBoard = board.slice()
        setBoard((oldBoard) => newBoard)

        let win = boardService.checkWin(board, placeToSit.i, placeToSit.j, 'yellow')

        if (win) {
            setWinner(true)
            showSuccessMsg('Cpu won')
        }

    }

    function restartGame() {
        setBoard(boardService.getEmptyBoard())
        setWinner(null)
        socketService.emit('restart-game', 'blablabla')
    }

    function loaderSize() {
        let loaderSize = {
            width: '80px',
            height: '80px'
        }
        return loaderSize
    }

    return (
        <section className='board-page'>
            {loader && <div className="loader"><RingLoader size={250} color="#FFCE67" /></div>}

            {modalOpen && <article className='menu-modal'>

                <h1>PAUSE</h1>

                <div className="btn-area">
                    <button onClick={toggleModal} className='btn'>CONTINUE GAME</button>
                    <button className='btn'>RESTART</button>
                    <button onClick={() => navigate('/')} className='btn quit'>QUIT GAME</button>
                </div>

            </article>}

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
                    <Turn time={time} />
                </section>

                <article className='player-modal player2'>
                    <img src={player2} alt="" />
                    <p>PLAYER 2</p>
                    <h4>23</h4>
                </article>

                {/* <section className="app-footer"></section> */}
            </section>}


        </section >
    )
}