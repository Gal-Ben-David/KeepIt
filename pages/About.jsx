
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

            <div className="team-lead">
                <div className="profile-img"><img src="assets/img/team-batel.png" /></div>

                <ul className="contact-info">
                    <h2>Batel Katiei</h2>
                    <h3>Team Lead</h3>
                    <li> <i className="fa-regular fa-envelope"></i><span>batelkatiei1@gmail.com</span></li>
                </ul>
            </div>

            <article className="team-data">
                <div className="team-member">
                    <div className="team-member-description">
                        <h2>Matan Odentz</h2>
                        <h3>App Developer</h3>
                    </div>
                    <div className="profile-img"><img src="assets/img/team-matan.png" /></div>
                    <ul className="contact-info">
                        <hr />
                        <li> <i className="fa-solid fa-phone"></i><span>+972-54-445-42430</span></li>
                        <li> <i className="fa-regular fa-envelope"></i><span>matanodentz@gmail.com</span></li>
                    </ul>
                </div>

                <div className="team-member">
                    <div className="team-member-description">
                        <h2>Gal Ben David</h2>
                        <h3>App Developer</h3>
                    </div>
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
