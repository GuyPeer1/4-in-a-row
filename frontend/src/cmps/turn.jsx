import marker from '../assets/imgs/turn-background-red.svg'

export default function Turn({ name = "PLAYER 1" }) {
    return <section className="turn">
        {/* <div className="img-container"> */}
        <img className="img-env" src={marker} />
        <div className="img-txt">
            <span className='player-name'>{name}'S TURN</span>
            <span className='time-left'>30s</span>
        </div>
        {/* </div> */}
    </section>
}
