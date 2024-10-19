
const { useEffect } = React

export function About() {

    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF'
    }, [])

    return (
        <section className="about">
            <div className="animation-container">
                <video
                    src="assets/animation/fist-bump.mp4"
                    width="200"
                    autoPlay
                // controls
                // loop
                />
            </div>

            <article className="team-data">
                <div className="team-member">
                    <h1>Matan Odentz</h1>
                    <div className="profile-img"><img src="assets/img/team-matan.png" /></div>
                    <ul className="contact-info">
                        <hr />
                        <li> <i className="fa-solid fa-phone"></i><span>+972-54-445-42430</span></li>
                        <li> <i className="fa-regular fa-envelope"></i><span>matanodz@gmail.com</span></li>
                    </ul>
                </div>

                <div className="team-member">
                    <h1>Gal Ben David</h1>
                    <div className="profile-img"><img src="assets/img/team-gal.png" /></div>

                    <ul className="contact-info">
                        <hr />
                        <li> <i className="fa-solid fa-phone"></i><span>+972-52-429-4752</span></li>
                        <li>  <i className="fa-regular fa-envelope"></i><span>gal.benda3@gmail.com</span></li>
                    </ul>
                </div>

            </article>
        </section >
    )
}
