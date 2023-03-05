import React, { useState } from 'react'
import { boardService } from '../services/board.service'

export function HomePage() {

    const [board, setBoard] = useState(boardService.getEmptyBoard())
    console.table(board)
    return (
        <section className='home-page'>
            <h2>hiii</h2>
            <table>
                    {board.map((row, index) => <tr key={index}>
                        
                        {row.map((cell, indexC) => <td key={indexC} >
                            <div className="cell"></div>
                        </td>
                        )}

                    </tr>)}
            </table>
        </section >
    )
}