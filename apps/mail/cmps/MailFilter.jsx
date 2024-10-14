export function MailFilter() {
    return (
        <React.Fragment>
            <section className="top-filter">
                <form className="search-bar-container">
                    <button className="search-btn">Search</button>
                    <input type="text" name="txt" id="txt" />
                </form>
            </section>
            <section className="side-filter">
                <button>Inbox</button>
                <button>Sent</button>
                <button>Drafts</button>
                <button>Trash</button>
            </section>
        </React.Fragment>
    )
}