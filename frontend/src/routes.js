import { BoardPage } from './pages/board-page.jsx'
import { HomePage } from './pages/home-page.jsx'
import { RulesPage } from './pages/rules-page.jsx'

const routes = [
    {
        path: '/',
        component: <HomePage />
    },
    {
        path: '/board-page',
        component: <BoardPage />
    },
    {
        path: '/rules',
        component: <RulesPage />
    }
]

export default routes