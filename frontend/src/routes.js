import { BoardPage } from './pages/board-page.jsx'
import { HomePage } from './pages/home-page.jsx'

const routes = [
    {
        path: '/',
        component: <HomePage />
    },

    {
        path: '/board-page',
        component: <BoardPage />
    }
]

export default routes