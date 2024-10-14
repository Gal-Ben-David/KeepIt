

export function MailList({mails}) {
    
    
    return (
        <ul className="mail-list">
        {mails.map(mail =>
            <li key={mail.id}>
                <span>{mail.subject}</span>
                {/* <mailPreview mail={mail} /> */}
            </li>
        )}
    </ul>
    )

    
}
