const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from "./cmps/AppHeader.jsx"
import { Home } from "./pages/Home.jsx"
import { NoteIndex } from "./apps/note/pages/NoteIndex.jsx"
import { UserMsg } from "./cmps/UserMsg.jsx"


export function App() {
    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/note" element={<NoteIndex />} />
                    </Routes>
                </main>
                <UserMsg />
            </section>
        </Router>
    )
}
