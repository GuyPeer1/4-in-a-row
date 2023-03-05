import marker from '../assets/imgs/turn-background-red.svg'

export default function Turn({ name = "PLAYER 1" }) {
    return <section className="turn">
        <img className="img-env" src={marker} />
        <div className="img-txt">
            <span className='player-name'>{name}'S TURN</span>
            <span className='time-left'>3s</span>
        </div>
    </section>
}
