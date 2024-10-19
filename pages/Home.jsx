const { useEffect } = React

const { NavLink } = ReactRouterDOM

export function Home() {

    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF'
    }, [])

    return (
        <section className="home">

            {/* <div className="animation-container">
                <video
                    src="assets/animation/horse.mp4"
                    width="100"
                    autoPlay
                    // controls
                    loop
                />
            </div> */}

            <div className="welcome-area">
                <h1>Appsus</h1>

                <div className="welcome-message">
                    <p>Welcome to Appsus 👋 </p>
                    <p>  Your all-in-one solution for staying organized and productive. </p>
                    <p>  From managing emails to capturing notes, </p>
                    <p>  Appsus makes it easy to keep everything in one place!</p>
                </div>
            </div>

            <div className="apps-container">
                <h2>Our Apps</h2>
                <div className="logos">
                    <NavLink to="/mail"> <div className="app-logo"> <img src="assets/img/mail-icons/gmail-logo.png" /></div></NavLink>
                    <NavLink to="/note"> <div className="app-logo">  <img src="assets/img/keeps.png" /></div></NavLink>
                </div>
            </div>
        </section>
    )
}