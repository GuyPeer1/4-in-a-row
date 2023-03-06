import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logoImg from '../assets/imgs/logo.svg'
import cpuImg from '../assets/imgs/player-vs-cpu.svg'
import playerVsPlayerImg from '../assets/imgs/player-vs-player.svg'
import { userService } from '../services/user.service'

export function HomePage() {
    const [credentials, setCredentials] = useState({ username: '', password: '', fullname: '' })
    const [loginModal, setLoginModal] = useState(false)
    const [isSignup, setIsSignup] = useState(true)


    const navigate = useNavigate()

    useEffect(() => {
        const user = userService.getLoggedinUser()
        if (!user) setLoginModal(true)
    }, [])

    function moveToRules() {
        navigate('/rules')
    }

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setCredentials({ ...credentials, [field]: value })
    }

    function toggleSignup() {
        setIsSignup(!isSignup)
    }

    function clearState() {
        setCredentials({ username: '', password: '', fullname: ''})
        setLoginModal(false)
    }

    function onLogin(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username) return
        userService.login(credentials)
        clearState()
    }

    function onSignup(ev = null) {
        if (ev) ev.preventDefault()
        if (!credentials.username || !credentials.password || !credentials.fullname) return
        userService.signup(credentials)
        clearState()
    }

    return (
        <section className='home-page'>

            <article className="start-modal">

                <img src={logoImg} alt="" />


                <div className="btn-area">
                    <button onClick={() => navigate('/board-page')} className='btn cpu'><span>PLAY VS CPU</span> <img src={cpuImg} alt="" /></button>
                    <button onClick={() => navigate('/board-page')} className='btn player'><span>PLAY VS PLAYER</span> <img src={playerVsPlayerImg} alt="" /></button>
                    <button onClick={moveToRules} className='btn rules'>GAME RULES</button>
                </div>

            </article>

            {loginModal && <section>
                {isSignup && <article className='login-signup-modal'>
                    <img src={logoImg} alt="" />
                    <form className='login-form' onSubmit={onLogin}>
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                            autoFocus
                        />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <button className="btn-signup-login">LOGIN</button>
                    </form>

                    <button className="btn-signup-login" onClick={toggleSignup}>{isSignup ? 'Signup' : 'Login'}</button>

                </article>}

                {!isSignup && <article className='login-signup-modal'>

                    <form className='signup-form' onSubmit={onSignup}>
                        <img src={logoImg} alt="" />
                        <input
                            type="text"
                            name="fullname"
                            value={credentials.fullname}
                            placeholder="Fullname"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            value={credentials.username}
                            placeholder="Username"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="password"
                            name="password"
                            value={credentials.password}
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />
                        <button className="btn-signup-login">SIGNUP</button>
                    </form>
                    <button className="btn-signup-login" onClick={toggleSignup}>{isSignup ? 'Signup' : 'Login'}</button>
                </article>}

            </section >}
        </section >
    )
}