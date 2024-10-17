import { LongTxt } from "../../../cmps/LongTxt.jsx";

export function MailPreview({ mail }) {
    let date = new Date(mail.sentAt)
    console.log();

    function formatToDate(date) {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const currMonth = months[date.getMonth()]
        const currDate = date.getDate()

        const today = new Date
        // Today
        if(today.getDate() === currDate) return `${date.getHours()}:${('0' + date.getMinutes()).slice(-2)}`
        // This year
        else if(today.getYear() === date.getYear()) return `${currMonth} ${currDate}`
        // Other
        else return `${date.getMonth()+1}/${date.getDate()}/${date.getYear()-100}`
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

