

export function MailPreview({ mail }) {
    let date = new Date(mail.sentAt)
    console.log();

    function formatToDate(date) {
        const months = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];
        const currMonth = months[date.getMonth()]
        const currDate = date.getDate()

        return `${currDate} ${currMonth}`

    }

    // const date = new Date(mail.sentAt)
    return (
        <article className="mail-preview">

            <div className="mail-from">{mail.from}</div>
            <div><span className="mail-subject">{mail.subject}</span> - <span>{mail.body}</span></div>
            <div className="mail-date">{formatToDate(date)}</div>
        </article>
    )
}