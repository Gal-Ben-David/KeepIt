const { useEffect, useState } = React

const { Link, useSearchParams, useLocation } = ReactRouterDOM

// import { showErrorMsg } from 'services/event-bus.service.js'
import { mailService } from '../services/mail.service.js';
import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { MailCompose } from '../cmps/MailCompose.jsx';
import { getTruthyValues } from '../../../services/util.service.js'

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [isMailCompose, setIsMailCompose] = useState(false)
    const [dateCompose, setDateCompose] = useState()
    const [changeReadStatus, setChangeReadStatus] = useState(false)

    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(getTruthyValues(filterBy))
        loadMails()
    }, [isMailCompose, filterBy])

    useEffect(() => {
        document.body.style.backgroundColor = '#F6F8FC';
    }, [])

    function loadMails() {
        mailService.query(filterBy)
            .then(setMails)
            .catch(err => {
                console.log('Problems getting mails:', err)
            })

    }

    function onSetFilterBy(filterBy) {
        setFilterBy(preFilter => ({ ...preFilter, ...filterBy }))
    }

    function openMailCompose() {
        setIsMailCompose(true)
        setDateCompose(new Date())
    }

    function onReadMail(mail) {
        mail.isRead = !mail.isRead
        mailService.save(mail)
        console.log(mail);
        setChangeReadStatus(!changeReadStatus)
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
            .then(() => {
                setMails(mails => mails.filter(mail => mail.id !== mailId))
                showSuccessMsg(`Mail removed successfully!`)
            })
            .catch(err => {
                console.log('Problems removing mail:', err)
                // showErrorMsg(`Problems removing mail (${mailId})`)
            })
    }


    const toggleMailCompose = isMailCompose ? '' : 'hide'
    if (!mails) return <div className="loader"></div>

    console.log('hi', isMailCompose, toggleMailCompose);
    return (
        <section className="mail-index">
            <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} openMailCompose={openMailCompose} mails={mails} />
            <section>
                <MailList onRemoveMail={onRemoveMail} onReadMail={onReadMail} mails={mails} />
            </section>
            <section className={`mail-compose-container ${toggleMailCompose}`}>
                <MailCompose dateCompose={dateCompose} isMailCompose={isMailCompose} setIsMailCompose={setIsMailCompose} mails={mails} />
            </section>
        </section>
    )
}
