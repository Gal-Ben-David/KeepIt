const { Link } = ReactRouterDOM

const { useEffect, useState } = React

import { MailPreview } from "./MailPreview.jsx";
import { mailService } from "../services/mail.service.js"



export function MailList({ mails, onReadMail }) {

    return (
        <ul className={`mail-list`}>
            {mails.map(mail =>
                <li className={`mail-li ${mail.isRead ? 'read' : ''}`} key={mail.id}>
                    <Link to={`/mail/${mail.id}`}><MailPreview mail={mail} /></Link>
                    <div className="mail-icons">
                        <button type="button" className="trash"><img src="assets\img\mail-icons\delete_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="delete" /></button>
                        {mail.isRead ? <button onClick={()=> onReadMail(mail)} type="button" className="read"><img src="assets\img\mail-icons\mail_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="read" /></button> : <button onClick={()=> onReadMail(mail)} type="button" className="unread"><img src="assets\img\mail-icons\drafts_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="unread" /></button>}
                    </div>
                </li>
            )}
        </ul>
    )
}
