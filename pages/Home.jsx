
const { NavLink } = ReactRouterDOM

export function Home() {

    return (
        <section className="home">
            <div className="welcome-area">
                <div className="welcome-message">
                    <p>  Capture your thoughts easily </p>
                    <p>  Organize, edit, and find your notes - all in one place. </p>
                    <NavLink to="/note">
                        <button className="btn btn-try-now"> Try now</button>
                    </NavLink>
                </div>
                <div className="main-img-container">
                </div>
            </div>
        </section>
    )
}