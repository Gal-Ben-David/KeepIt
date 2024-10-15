export function MailCompose() {
    return (
        <section className="mail-compose-container">
            <div className="compose-header">
                <span>New Message</span>
                <div className="top-buttons">
                    <button><img src="assets\img\mail-icons\minimize_24dp_666666_FILL1_wght400_GRAD0_opsz24.png" alt="minimize" /></button>
                    <button><img src="assets\img\mail-icons\close_24dp_666666_FILL1_wght400_GRAD0_opsz24.png" alt="close" /></button>
                </div>
            </div>
            <div>
                {/* <form onSubmit={onSubmit}> */}
                <form className="compose-main">
                    <input type="text" name="to" id="to" placeholder="To" />
                    <input type="text" name="subject" id="subject" placeholder="subject" />
                    <textarea name="paragraph_text" cols="50" rows="10"></textarea>                    <h1>subjuegtert</h1>
                    <p>fddsfsddfdsalorem

                    </p>
                </form>
            </div>
        </section>
    )
}