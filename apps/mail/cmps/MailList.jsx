const { Link } = ReactRouterDOM

const { useEffect, useState } = React

import { MailPreview } from "./MailPreview.jsx";
import { mailService } from "../services/mail.service.js"




export function MailList({ onStar, mails, onReadMail, onRemoveMail }) {

    return (
        <ul className={`mail-list`}>
            {mails.map(mail =>
                <li className={`mail-li ${mail.isRead ? 'read' : ''}`} key={mail.id}>
                    <button onClick={() => onStar(mail)} className="star-btn">{mail.isStarred? <img src="assets\img\mail-icons\star_24dp_F4B400_FILL1_wght400_GRAD0_opsz24.png" alt="star-yellow" /> : <img src="assets\img\mail-icons\star_24dp_B7B7B7_FILL0_wght400_GRAD0_opsz24.png" alt="star-empty" />}</button>
                    <Link to={`/mail/${mail.id}`}><MailPreview mail={mail} /></Link>
                    <div className="mail-icons">
                        <button onClick={() => onRemoveMail(mail.id)} type="button" className="trash"><img src="assets\img\mail-icons\delete_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="delete" /></button>
                        {mail.isRead ? <button onClick={() => onReadMail(mail)} type="button" className="read"><img src="assets\img\mail-icons\mail_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="read" /></button> : <button onClick={() => onReadMail(mail)} type="button" className="unread"><img src="assets\img\mail-icons\drafts_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="unread" /></button>}
                    </div>
                </li>
            )}
        </ul>
    )
}
