
const { useState, useEffect, useRef } = React
const { useNavigate } = ReactRouterDOM


export function MailFilter({ setSortBy, setMails, isIndex, backToIndex, mails, openMailCompose, filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    const [isDateClicked, setIsDateClicked] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit, isDateClicked])

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
        if (filterByToEdit.isRead === true) return ''
        const unreadMails = mails.filter(mail => !mail.isRead)
        console.log(unreadMails);
        return unreadMails.length
    }

    function onClickDateBtn() {
        setSortBy('')
        setIsDateClicked(isDateClicked => !isDateClicked)
        filterByToEdit.date = ""
        console.log(filterByToEdit)
    }

    function onReadMails(bool) {
        setSortBy('')
        setFilterByToEdit(prevFilter => ({ ...prevFilter, isRead: bool }))
    }

    const {
        status,
        isRead,
        isStared,
        labels,
        txt,
        date } = filterByToEdit




    const isValid = !!status || !!isRead || !!isStared || !!labels || !!txt || !!date

    const dateSearch = isDateClicked ? <input className="date-input" onClick={backToIndex ? () => backToIndex() : () => { return }} value={date} onChange={handleChange} type="date" name="date" id="date" /> : ''

    console.log(isIndex);

    // const input = isIndex ?
    //     <input onClick={backToIndex ? () => backToIndex() : () => { return }} value={txt} onChange={handleChange} placeholder="Search mail" type="text" name="txt" id="txt" /> :
    //     <input autoFocus onClick={backToIndex ? () => backToIndex() : () => { return }} value={txt} onChange={handleChange} placeholder="Search mail" type="text" name="txt" id="txt" />
    function checkIsIndex() {
        if (isIndex === false) {
            return 'hide'
        }
    }

    return (
        <React.Fragment>
            <section className="top-filter">
                <form onSubmit={onSubmit} className="search-bar-container">
                    <div className="search-bar">
                        <button disabled={!isValid} className="search-btn"><img src="assets\img\mail-icons\search_24dp_202124_FILL1_wght400_GRAD0_opsz24.png" alt="search" /></button>
                        <button onClick={backToIndex ? () => backToIndex() : () => onClickDateBtn()} type="button" className="date-btn"><img src="assets\img\mail-icons\event_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="date-search" /></button>
                        {/* {input} */}
                        <input className="text-input" onClick={backToIndex ? () => backToIndex() : () => setSortBy('')} value={txt} onChange={handleChange} placeholder="Search mail" type="text" name="txt" id="txt" />
                        {dateSearch}
                        {/* <input onClick={backToIndex ? () => backToIndex() : () => { return }} value={date} onChange={handleChange} type="date" name="date" id="date" /> */}
                    </div>
                </form>
                <div className={`top-filters ${checkIsIndex()}`}>
                    <button onClick={() => { setFilterByToEdit({ ...filterBy, isRead: undefined }) }} className="top-filter-first"><img src="assets\img\mail-icons\inbox_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="inbox" /><span>Primary</span></button>
                    <button onClick={() => onReadMails(false)}><img src="assets\img\mail-icons\mail_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="unread" /><span>Unread</span></button>
                    <button onClick={() => onReadMails(true)}><img src="assets\img\mail-icons\drafts_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="read" /><span>Read</span></button>
                    <button className="sort-btn">
                        <img src="assets\img\mail-icons\sort_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="" />
                        <div className="sort-list">
                            <button onClick={() => setSortBy('title')}><img src="assets\img\mail-icons\match_case_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="" /></button>
                            <button onClick={() => setSortBy('date')}><img src="assets\img\mail-icons\schedule_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="" /></button>
                        </div>
                    </button>
                </div>
            </section>
            <section className="side-filter">
                <button onClick={backToIndex ? () => backToIndex() : openMailCompose} className="mail-compose-btn">
                    <section className="mail-compose-btn-container">
                        <img src="assets\img\mail-icons\edit_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="pencil" />
                        <span>Compose</span>
                    </section>
                </button>
                <button  onClick={backToIndex ? () => backToIndex() : ()=>setFilterByToEdit({ ...filterBy, isRead: undefined }) }>
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