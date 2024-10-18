const { useNavigate, useParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

const { useState, useEffect, useRef } = React


export function MailCompose({ intervalRef, mailToEdit, setMailToEdit, setSortBy, dateCompose, setIsMailCompose, isMailCompose, mails }) {

    const navigate = useNavigate()


    useEffect(() => {
        setMailToEdit(mailService.getEmptyMail())
        console.log(mailToEdit);
        mailToEdit.createdAt = Date.now()

        console.log(mailToEdit);

    }, [isMailCompose])

    // useEffect(() => {
    //     // clearInterval(intervalRef.current)
    //     // intervalRef.current = setInterval(() => {
    //     //     onSaveDraftsMail()
    //     // }, 3000)
    // }, [handleChange])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setMailToEdit(prevMail => ({ ...prevMail, [field]: value }))
        onSaveDraftsMail()
        // onSaveDraftsMail()

    }

    function onSaveMail(ev) {
        mailToEdit.sentAt = Date.now()
        ev.preventDefault()
        mailService.save(mailToEdit)
            .then(mail => {
            })
            .catch(err => {
                console.log('err:', err)
            })
            .finally(() => {
                setIsMailCompose(false)
                setSortBy('')
                navigate('/mail')
            })
    }


    function onSaveDraftsMail() {
        mailService.debounce(mailService.save(mailToEdit)
            .then(mail => setMailToEdit(prevMail=> {
                prevMail.id = mail.id
                prevMail.createdAt = Date.now()
                return prevMail
            }))
            .catch(err => {
                console.log('err:', err)
            }), 2000)

    }


    const { body, subject, to } = mailToEdit

    return (
        <section className="mail-compose-container">
            <div className="compose-header">
                <span>New Message</span>
                <div className="top-buttons">
                    <button><img src="assets\img\mail-icons\minimize_24dp_666666_FILL1_wght400_GRAD0_opsz24.png" alt="minimize" /></button>
                    <button onClick={() => setIsMailCompose(false)}><img src="assets\img\mail-icons\close_24dp_666666_FILL1_wght400_GRAD0_opsz24.png" alt="close" /></button>
                </div>
            </div>
            <div>
                <form className="compose-main" onSubmit={onSaveMail}>
                    {/* <form className="compose-main"> */}
                    <input value={to} onChange={handleChange} type="text" name="to" id="to" placeholder="To" />
                    <input value={subject} onChange={handleChange} type="text" name="subject" id="subject" placeholder="Subject" />
                    <textarea value={body} onChange={handleChange} type="text" name="body" cols="50" rows="14"></textarea>

                    <div className="bottom-buttons">
                        <button type="submit" className="send-btn">Send</button>
                        <button type="button" className="trash"><img src="assets\img\mail-icons\delete_24dp_202124_FILL0_wght400_GRAD0_opsz24.png" alt="delete" /></button>
                    </div>
                </form>
            </div>
        </section>
    )
}