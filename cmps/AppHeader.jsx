const { Link, NavLink, Fragment } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <div className="logo">
                <img src="/assets/img/horse.png" />
                <h2>Appsus</h2>
            </div>
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
