
const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { showErrorMsg } from "../../../services/event-bus.service.js"
import { MailFilter } from "../cmps/MailFilter.jsx"


export function MailDetails() {

    const [mail, setMail] = useState(null)
    const params = useParams()

    useEffect(() => {
        loadMail()
    }, [params.mailId])

    function loadMail() {
        mailService.get(params.mailId)
            .then(setMail)
            .catch(err => {
                console.log('Problem getting mail', err)
                showErrorMsg('Problem getting car')
                navigate('/mail')
            })
    }


    function onBack() {
        navigate('/mail')
    }

    if (!mail) return <div>Loading...</div>

    return (
        <section className="mail-details-container">
            <MailFilter />
            <section className="mail-details">
                <h1>Mail subject: {mail.subject}</h1>
                <h1>mail body: {mail.body}</h1>

                <button onClick={onBack}>Back</button>
                <section>
                    <button ><Link to={`/mail/${mail.prevMailId}`}>Prev Mail</Link></button>
                    <button ><Link to={`/mail/${mail.nextMailId}`}>Next Mail</Link></button>
                </section>
            </section>
        </section>
    )
}