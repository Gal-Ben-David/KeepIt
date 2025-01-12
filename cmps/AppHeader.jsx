const { NavLink } = ReactRouterDOM
const { useRef } = React

export function AppHeader() {
    const navRef = useRef()
    const backdropRef = useRef()

    function toggleMenu() {
        navRef.current.classList.toggle('show')
        backdropRef.current.classList.toggle('hide')
    }

    function onBackdrop() {
        navRef.current.classList.remove('show')
        backdropRef.current.classList.add('hide')
    }


    return <header className="app-header">
        <NavLink to="/">
            <div className="logo">
                <img src="assets\img\notepad.png" />
                <h2>KeepIt</h2>
            </div>
        </NavLink>

        <div onClick={toggleMenu} className="apps-icon hide"><img src="assets\img\apps_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="apps" /></div>
        <nav ref={navRef}>
            <NavLink to="/" onClick={onBackdrop}>
                <div className="nav-word">Home</div>
                <div className="nav-logo hide"><img src="assets\img\home_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="home" /></div>
            </NavLink>
            <NavLink to="/note" onClick={onBackdrop}>
                <div className="nav-word">Notes</div>
                <div className="nav-logo hide"><img src="assets\img\keeps.png" alt="notes" /></div>
            </NavLink>
        </nav>
        <div onClick={onBackdrop} ref={backdropRef} className="menu-backdrop hide"></div>
    </header>
}
