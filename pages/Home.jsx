const { useState, useEffect } = React

const { NavLink } = ReactRouterDOM

export function Home() {

    const [animation, setAnimation] = useState(false)

    const handleImageLoad = () => {
        setAnimation(true)
    }

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
                <div>
                    <img className={`main-img ${animation ? 'animation' : ''}`}
                        src="https://res.cloudinary.com/dvykycdey/image/upload/f_auto,q_auto,w_600/v1745168066/task-people2_tishnt.png"
                        onLoad={handleImageLoad} />
                </div>
            </div>
        </section>
    )
}