const { Link } = ReactRouterDOM

import { MailPreview } from "./MailPreview.jsx";



export function MailList({ mails }) {


    return (
        <ul className="mail-list">
            {mails.map(mail =>
                <li className="mail-li" key={mail.id}>
                    <Link to={`/mail/${mail.id}`}><MailPreview mail={mail} /></Link>

                </li>
            )}
        </ul>
    )
}
