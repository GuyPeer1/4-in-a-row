import React from 'react'
import { Routes, Route } from 'react-router'

import routes from './routes'

import { AppHeader } from './cmps/app-header'
import { UserMsg } from './cmps/user-msg'

export function RootCmp() {

    return (
        <section className="main-layout">
            {/* <AppHeader /> */}
            <main>
                <Routes>
                    {routes.map(route => <Route key={route.path} exact={true} element={route.component} path={route.path} />)}
                </Routes>
            </main>
            <UserMsg />
        </section>
    )
}


