const { useEffect, useState } = React

import { mailService } from '../services/mail.service.js';
import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { MailCompose } from '../cmps/MailCompose.jsx';

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [isMailCompose, setIsMailCompose] = useState(false)

    useEffect(() => {
        loadMails()
    }, [])

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

    }

    const toggleMailCompose = isMailCompose ? '' : 'hide'
    if (!mails) return <h1>Loading...</h1>

    console.log('hi', isMailCompose, toggleMailCompose);
    return (
        <section className="mail-index">
            <section className="mail-compose-btn-container">
                <button onClick={openMailCompose} className="mail-compose-btn">Compose</button>
            </section>
            <MailFilter mails={mails} />
            <section>
                <MailList mails={mails} />
            </section>
            <section className={`mail-compose-container ${toggleMailCompose}`}>
                <MailCompose setIsMailCompose={setIsMailCompose} mails={mails} />
            </section>
        </section>
    )
}

