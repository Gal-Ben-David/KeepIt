import { LongTxt } from "../../../cmps/LongTxt.jsx";

export function MailPreview({ mail }) {
    let date = new Date(mail.sentAt)
    console.log();

    function formatToDate(date) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const currMonth = months[date.getMonth()]
        const currDate = date.getDate()
        return `${currDate} ${currMonth}`
    }

    const read = mail.isRead ? 'read' : ''

    // const date = new Date(mail.sentAt)
    return (
        <div className={`mail-preview ${read}`}>

            <div className="mail-from">{mail.from}</div>
            {/* <div><span className="mail-subject">{mail.subject}</span> - <span>{mail.body}</span></div> */}
            <div className="mail-data">
                <span className="mail-subject">{mail.subject}</span>
                - <LongTxt length={80}>{mail.body}</LongTxt>
            </div>

            <div className="mail-date">{formatToDate(date)}</div>
        </div>
    )
}