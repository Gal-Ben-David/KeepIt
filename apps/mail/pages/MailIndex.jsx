const { useEffect, useState } = React

// import { showErrorMsg } from 'services/event-bus.service.js'
import { mailService } from '../services/mail.service.js';
import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { MailCompose } from '../cmps/MailCompose.jsx';

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [isMailCompose, setIsMailCompose] = useState(false)
    const [dateCompose, setDateCompose] = useState()
    const [changeReadStatus, setChangeReadStatus] = useState(false)

    useEffect(() => {
        loadMails()
    }, [isMailCompose])

    useEffect(() => {
        document.body.style.backgroundColor = '#F6F8FC';
    }, [])

    function loadMails() {
        mailService.query()
            .then(setMails)
            .catch(err => {
                console.log('Problems getting mails:', err)
            })
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
    if (!mails) return <div class="loader"></div>

    console.log('hi', isMailCompose, toggleMailCompose);
    return (
        <section className="mail-index">
            <MailFilter openMailCompose={openMailCompose} mails={mails} />
            <section>
                <MailList onRemoveMail={onRemoveMail} onReadMail={onReadMail} mails={mails} />
            </section>
            <section className={`mail-compose-container ${toggleMailCompose}`}>
                <MailCompose dateCompose={dateCompose} isMailCompose={isMailCompose} setIsMailCompose={setIsMailCompose} mails={mails} />
            </section>
        </section>
    )
}
