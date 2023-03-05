import { NavLink } from "react-router-dom"

export function AppHeader() {
    return <header className="full app-header">
        <nav className="header-nav flex">
            <NavLink to="/">Home</NavLink>
        </nav>
    </header>
}
