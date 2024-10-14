const { useEffect, useState } = React

import { mailService } from '../services/mail.service.js';
import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { MailCompose } from '../cmps/MailCompose.jsx';

export function MailIndex() {

    const [mails, setMails] = useState(null)

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        mailService.query()
            .then(setMails)
            .catch(err => {
                console.log('Problems getting mails:', err)
            })
    }


    if (!mails) return <h1>Loading...</h1>

    return (
        <section className="mail-index">
            <MailCompose mails={mails} />
            <MailFilter mails={mails} />
            <section>
                <MailList mails={mails} />
            </section>
        </section>
    )
}

