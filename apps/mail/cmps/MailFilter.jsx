
const { useState, useEffect } = React

export function MailFilter({ mails, openMailCompose, filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    function countUnreadMails() {
        const unreadMails = mails.filter(mail => !mail.isRead)
        console.log(unreadMails);
        return unreadMails.length
    }
    
    const {
        status,
        isRead,
        isStared,
        labels,
        txt,
        date } = filterByToEdit

    const isValid = !!status || !!isRead || !!isStared || !!labels || !!txt || !!date


    return (
        <React.Fragment>
            <section className="top-filter">
                <form onSubmit={onSubmit} className="search-bar-container">
                    <div className="search-bar">
                        <button disabled={!isValid} className="search-btn"><img src="assets\img\mail-icons\search_24dp_202124_FILL1_wght400_GRAD0_opsz24.png" alt="search" /></button>
                        <input value={txt} onChange={handleChange} placeholder="Search mail" type="text" name="txt" id="txt" />
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