import React, { useState } from 'react'
import { boardService } from '../services/board.service'

export function HomePage() {

    const [board, setBoard] = useState(boardService.getEmptyBoard())

    console.log(board)
    return (
        <section className='home-page'>
            <h2>hiii</h2>
            <table>
                <tbody>
                   {board.map((row,index) => <tr key={index}>
                    {board.map((cell,indexC) => <td key={indexC} className="cell"></td> )}
                   </tr> )}
                </tbody>
            </table>

        </section >
    )
}