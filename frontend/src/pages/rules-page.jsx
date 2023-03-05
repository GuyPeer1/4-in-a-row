import { useNavigate } from 'react-router-dom'
import checkImg from '../assets/imgs/icon-check.svg'


export function RulesPage() {

    const navigate = useNavigate()
    
    function moveToHome() {
        navigate('/')
    }

    return (
        <article className="rules-modal">
            <h1>RULES</h1>

            <h4>OBJECTIVE</h4>
            <p>
                Be the first player to connect 4 of the same colored discs in
                a row either vertically, horizontally, or diagonally.
            </p>


            <h4>HOW TO PLAY</h4>
            <div className="ruels">
                <p>1. <span>Red goes first in the first game.</span></p>
                <p>2. <span>Players must alternate turns, and only one disc can be dropped in each turn.</span></p>
                <p>3. <span>The game ends when there is a 4-in-a-row or a stalemate.</span></p>
                <p>4. <span>The starter of the previous game goes second on the next game.</span></p>
            </div>

            <img onClick={moveToHome} src={checkImg} alt="" />
        </article>
    )
}