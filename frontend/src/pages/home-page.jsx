import { useNavigate } from 'react-router-dom'
import logoImg from '../assets/imgs/logo.svg'
import cpuImg from '../assets/imgs/player-vs-cpu.svg'
import playerVsPlayerImg from '../assets/imgs/player-vs-player.svg'

export function HomePage() {
    const navigate = useNavigate()

    function moveToRules() {
        navigate('/rules')
    }

    return (
        <section className='home-page'>

            <article className="start-modal">

                <img src={logoImg} alt="" />


                <div className="btn-area">
                    <button className='btn cpu'><span>PLAY VS CPU</span> <img src={cpuImg} alt="" /></button>
                    <button className='btn player'><span>PLAY VS PLAYER</span> <img src={playerVsPlayerImg} alt="" /></button>
                    <button onClick={moveToRules} className='btn rules'>GAME RULES</button>
                </div>

            </article>


        </section >
    )
}