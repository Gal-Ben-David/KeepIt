
const { useEffect } = React

export function About() {

    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF'
    }, [])

    return (
        <section className="about">
            <h1>About Page</h1>
            <div className="animation-container">
                <video
                    src="assets/animation/fist-bump.mp4"
                    width="200"
                    autoPlay
                // controls
                // loop
                />
            </div>
        </section>
    )
}
