
const { NavLink } = ReactRouterDOM

export function Home() {

    return (
        <section className="home">
            <div className="welcome-area">
                <div className="welcome-message">
                    <p>  Capture your thoughts easily </p>
                    <p>  Organize, edit, and find your notes - all in one place. </p>
                    <button className="btn btn-try-now"> Try now</button>
                </div>
                <div>
                    <img className="main-img" src="assets\img\task-people2.png" />
                </div>
            </div>
        </section>
    )
}