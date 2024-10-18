
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
                </div>

                <div className="team-member">
                    <h1>Gal Ben David</h1>
                </div>

            </article>
        </section>
    )
}
