
const { useEffect, useState } = React
const { useParams, useNavigate, Link, useSearchParams } = ReactRouterDOM


import { mailService } from "../services/mail.service.js"
import { showErrorMsg } from "../../../services/event-bus.service.js"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { noteService } from '../../note/services/note.service.js';

export function MailDetails() {

    const [mail, setMail] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [isIndex, setIsIndex] = useState(false)


    useEffect(() => {
        loadMail()

    }, [params.mailId])

    function loadMail() {
        mailService.get(params.mailId)
            .then(mail => {
                mail.isRead = true
                setMail(mail)
                mailService.save(mail)
            })
            .catch(err => {
                console.log('Problem getting mail', err)
                // showErrorMsg('Problem getting mail')
                navigate('/mail')
            })
    }

    function backToIndex() {
        // navigate('/mail', {state:{id:1}})
        navigate(`/mail`);
        setIsIndex(true)
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(preFilter => ({ ...preFilter, ...filterBy }))
    }

    function transferMailToNoteApp(mail) {
        // noteService.getEmptyNote()
        const newNote = {...noteService.getEmptyNote(), noteTitle: mail.subject, info: {txt:mail.body}}
        noteService.save(newNote)
        navigate(`/note`)
    }

    if (!mail) return <div className="loader"></div>

    return (
        <section className="mail-details-container">
            <MailFilter isIndex={isIndex} backToIndex={backToIndex} filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <section className="mail-details">
                <section className="tools-bar">
                    <button><Link to={`/mail`}><img src="assets\img\mail-icons\arrow_back_24dp_666666_FILL1_wght400_GRAD0_opsz24.png" alt="arrow-back" /></Link></button>
                    <button onClick={() => transferMailToNoteApp(mail)}>note</button>
                    <section className="paging-btn-container">
                        <button ><Link to={`/mail/${mail.prevMailId}`}><img src="assets\img\mail-icons\chevron_right_24dp_666666_FILL1_wght400_GRAD0_opsz24.png" alt="arrow-right" /></Link></button>
                        <button ><Link to={`/mail/${mail.nextMailId}`}><img src="assets\img\mail-icons\chevron_left_24dp_666666_FILL1_wght400_GRAD0_opsz24.png" alt="arrow-left" /></Link></button>
                    </section>
                </section>
                <section className="mail-main">
                    <h1>{mail.subject}</h1>
                    <div className="from-info">
                        <img src="assets\img\mail-icons\profile-img.png" alt="user-img" />
                        <h4>{mail.from}</h4>
                    </div>
                    <p>{mail.body}</p>
                </section>

            </section>
        </section>
    )
}