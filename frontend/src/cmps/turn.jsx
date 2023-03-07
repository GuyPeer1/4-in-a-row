import marker from '../assets/imgs/turn-background-red.svg'

export default function Turn({ name = "PLAYER 1" }) {
    return (
        <div className="turn">
            <img className="img-env" src={marker} />

            <div className="turn-txt">
                <p className='player-name'>{name}'S TURN</p>
                <p className='time-left'>3s</p>
            </div>
        </div>
    )
}
