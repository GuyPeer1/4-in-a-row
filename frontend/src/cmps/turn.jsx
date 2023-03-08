import { useState } from 'react'
import marker from '../assets/imgs/turn-background-red.svg'

export default function Turn({ name = "PLAYER 1", time }) {
    

    return (
        <div className="turn">
            <img className="img-env" src={marker} />

            <div className="turn-txt">
                <p className='player-name'>{name}'S TURN</p>
                <p className='time-left'>{time}S</p>
            </div>
        </div>
    )
}
