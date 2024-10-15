export function MailFilter({ mails, openMailCompose }) {

    function countUnreadMails() {
        const unreadMails = mails.filter(mail => !mail.isRead)
        console.log(unreadMails);
        return unreadMails.length
    }

    return (
        <React.Fragment>
            <section className="top-filter">
                <form className="search-bar-container">
                    <div className="search-bar">
                        <button className="search-btn"><img src="assets\img\mail-icons\search_24dp_202124_FILL1_wght400_GRAD0_opsz24.png" alt="search" /></button>
                        <input placeholder="Search mail" type="text" name="txt" id="txt" />
                    </div>
                </form>
            </section>
            <section className="side-filter">
                <button onClick={openMailCompose} className="mail-compose-btn">
                    <section className="mail-compose-btn-container">
                        <img src="assets\img\mail-icons\edit_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="pencil" />
                        <span>Compose</span>
                    </section>
                </button>
                <button>
                    <section>
                        <img src="assets\img\mail-icons\inbox_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="inbox" />
                        <span>Inbox</span>
                    </section>
                    <span>{mails ? countUnreadMails() : ''}</span>
                </button>

                <button>
                    <section>
                        <img src="assets\img\mail-icons\send_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="sent" />
                        <span>Sent</span>
                    </section>
                </button>
                <button>
                    <section>
                        <img src="assets\img\mail-icons\draft_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="drafts" />
                        <span>Drafts</span>
                    </section>
                </button>
                <button>
                    <section>
                        <img src="assets\img\mail-icons\delete_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="trash" />
                        <span>Trash</span>
                    </section>
                </button>
            </section>
        </React.Fragment>
    )
}