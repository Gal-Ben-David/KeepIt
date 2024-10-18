import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'
import { localStorageService } from '../../../services/storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()
const loggedInUser = {
    email: 'user@appsus.com',
    fullName: 'Mahatma Appsus'
}


export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromSearchParams,
    animateCSS,
    debounce,
    getUser
}

function getUser() {
    return loggedInUser
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.status) {
                if (filterBy.status === 'inbox')
                    mails = mails.filter(mail => {
                        return mail.to === loggedInUser.email && (!mail.removedAt)
                    })
                else if (filterBy.status === 'sent')
                    mails = mails.filter(mail => mail.from === loggedInUser.email)
                else if (filterBy.status === 'starred')
                    mails = mails.filter(mail => mail.isStarred)
                else if (filterBy.status === 'trash')
                    mails = mails.filter(mail => !!mail.removedAt)
                else mails = mails.filter(mail => !mail.sentAt)
            }
            if (filterBy.isRead === true || filterBy.isRead === false) {
                mails = mails.filter(mail => mail.isRead === filterBy.isRead)
            }
            if (filterBy.isStarred) {
                mails = mails.filter(mail => {
                    if (mail.stared) mail.isStarred === filterBy.isStarred
                })
            }
            if (filterBy.labels) {
                mails = mails.filter(mail => {
                    if (mail.labels) {
                        mail.labels.every(label => filterBy.labels.includes(label))
                    }
                })
            }
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.body) || regExp.test(mail.subject) || regExp.test(mail.from))
            }
            if (filterBy.date) {
                mails = mails.filter(mail => {
                    const mailDate = new Date(mail.sentAt)
                    const filterDate = new Date(filterBy.date)
                    console.log(mailDate.getDate(), filterDate.getDate());

                    return mailDate.getDate() === filterDate.getDate() && mailDate.getMonth() === filterDate.getMonth() && mailDate.getYear() === filterDate.getYear()
                })
            }
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => _setNextPrevMailId(mail))
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function getEmptyMail(subject = '', body = '', isRead = false, sentAt = '', createdAt = '', from = `${loggedInUser.email}`, to = '') {
    return { subject, body, isRead, sentAt, createdAt, from, to }
}

function getDefaultFilter() {
    return {
        txt: '',
        date: '',
    }
}

function _createMails() {
    let mails = localStorageService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            _createMail('LinkedIn - Get a job today!', 'I just developed a versatile API query builder in NodeJs. This tool efficiently manages filtering, sorting, field limiting, and pagination. What features do you prioritize in your query builders? hashtag#JavaScript hashtag#WebDevelopment hashtag#APIDesign hashtag#Nodejs', true, new Date(), new Date(), 'LinkedIn'),
            _createMail('Youtube', 'Connect to out new service Youtube Music!', false, new Date() - 30000, new Date() - 30000, 'Youtube'),
            _createMail('GitHub - Your API is not safe! click for information', 'Possible valid secrets found in commits, Action needed: Secrets detected in recent commits to aa-11, Please resolve these alerts Anyone with read access can view exposed secrets. Consider rotating and revoking each valid secret to avoid any irreversible damage.', true, new Date() - 50000, new Date() - 50000, 'GitHub'),
            _createMail('Apple Music - The bet music for you!', 'Add family members to your Apple music account, The greatest music of the year 2024 is waiting on you playlist!', false, new Date() - 2400000, new Date() - 2400000, 'Apple Music'),
            _createMail('College - Come learn with us', 'Check our latest updates on the website! see who is your teacher next year. Accept message please.  ', false, new Date() - 50000000, new Date() - 50000000, 'College'),
            _createMail('Tel Aviv Port - Best weather and best view', 'DO NOT REPLY TO THIS MESSAGE. Check out our new shows and events this year!', false, new Date() - 1000000000, new Date() - 1000000000, 'Tel Aviv Port'),
            _createMail('Apple - The new iPhone is out', 'Check your Apple  account and see the new updates we made! The greatest smartphone of the year 2024 is waiting on you tech stores!', false, new Date() - 5000000000, new Date() - 5000000000, 'Apple'),
            _createMail('LinkedIn - Get a job today!', 'I just developed a versatile API query builder in NodeJs. This tool efficiently manages filtering, sorting, field limiting, and pagination. What features do you prioritize in your query builders? hashtag#JavaScript hashtag#WebDevelopment hashtag#APIDesign hashtag#Nodejs', true, new Date() - 10000000000, new Date() - 10000000000, 'LinkedIn'),
            _createMail('Google - New Updates', 'Add your email to your account', false, 1551136510594, 1521111410594, 'Google'),
            _createMail('Norton - Anti-Virus', 'DO NOT REPLY TO THIS MESSAGE. If you require Member Services and Support, please go to www.norton.com, Your continuous protection – Information regarding your automatic renewal', true, 1551136510594, 1521111410594, 'Norton'),
            _createMail('LinkedIn - New jobs for you!', 'I just developed a versatile API query builder in NodeJs. This tool efficiently manages filtering, sorting, field limiting, and pagination. What features do you prioritize in your query builders? hashtag#JavaScript hashtag#WebDevelopment hashtag#APIDesign hashtag#Nodejs', false, 1559996510594, 1529991410594, 'LinkedIn'),
            _createMail('Youtube - Check out new videos today', 'Connect to out new service Youtube Music!', false, 1550136384594, 1521112830594, 'Youtube'),
            _createMail('GitHub - Update your page', 'Possible valid secrets found in commits, Action needed: Secrets detected in recent commits to aa-11, Please resolve these alerts Anyone with read access can view exposed secrets. Consider rotating and revoking each valid secret to avoid any irreversible damage.', true, 1550999224594, 1529990830594, 'GitHub'),
            _createMail('Bank Leumi - New discounts', 'New Leumi advice for your bank account', false, 1550136000594, 1521112000594, 'Bank Leumi'),
            _createMail('Apple Music - The best music for you!', 'Add family members to your Apple music account, The greatest music of the year 2024 is waiting on you playlist!', false, 1521000000594, 1521000410594, 'Apple Music'),
            _createMail('College - Come learn with us', 'Check our latest updates on the website! see who is your teacher next year. Accept message please.  ', true, 1551136510594, 1521111410594, 'College'),
            _createMail('Tel Aviv Port - Best weather and best view', 'DO NOT REPLY TO THIS MESSAGE. Check out our new shows and events this year!', true, 1551136510594, 1521111410594, 'Tel Aviv Port'),
            _createMail('Apple - The new iPhone is out', 'Check your Apple  account and see the new updates we made! The greatest smartphone of the year 2024 is waiting on you tech stores!', false, 1521000000594, 1521000410594, 'Apple'),
            _createMail('LinkedIn - Get a job today!', 'I just developed a versatile API query builder in NodeJs. This tool efficiently manages filtering, sorting, field limiting, and pagination. What features do you prioritize in your query builders? hashtag#JavaScript hashtag#WebDevelopment hashtag#APIDesign hashtag#Nodejs', true, 1551136510594, 1521111410594, 'LinkedIn'),
            _createMail('Youtube', 'Connect to out new service Youtube Music!', false, 1550136384594, 1521112830594, 'Youtube'),
            _createMail('GitHub - Your API is not safe! click for information', 'Possible valid secrets found in commits, Action needed: Secrets detected in recent commits to aa-11, Please resolve these alerts Anyone with read access can view exposed secrets. Consider rotating and revoking each valid secret to avoid any irreversible damage.', true, 1550133224594, 1521000830594, 'GitHub'),
            _createMail('Bank Leumi', 'New Leumi advice for your bank account', false, 1550136000594, 1521112000594, 'Bank Leumi'),
            _createMail('Spotify', 'Add family members to your spotify account, The greatest music of the year 2024 is waiting on you playlist!', false, 1521000000594, 1521000410594, 'Spotify'),
            _createMail('Me', 'Dont forget to add members to your spotify account', true, new Date() - 50000, new Date() - 50000, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'Don\'t forget send mail to friends about the movies! and bring pizza for dinner!!', true, new Date() - 60000, new Date() - 60000, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'How are you my frienddd?? all good?', true, new Date() - 70000, new Date() - 70000, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'check my gmail account for updates', true, new Date() - 1000000, new Date() - 1000000, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'About the reservation today, we want to change the date, thank you!', true, new Date() - 5000000, new Date() - 5000000, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'How are you man? check out the new phone apple just came up with!', true, new Date() - 9990000, new Date() - 9990000, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'Don\'t forget send mail to friends about the movies! and bring pizza for dinner!!', true, new Date() - 7567560000, new Date() - 7657650000, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'How are you my frienddd?? all good?', true, 1550000010594, 1524200010594, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'Add family members to your spotify account', true, 1550000000594, 1524210000594, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'About the reservation today, we want to change the date, thank you!', true, 1550000010594, 1524000410594, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'Hiii!!! how you doing?? Add family members to your spotify account', true, 1550006510594, 1524211410594, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'The best show ever! you must go! Don\'t forget send mail to friends about the movies! and bring pizza for dinner!!', true, 1550006510594, 1524211410594, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'How are you my frienddd?? all good?', true, 1550006510594, 1524211410594, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'Call me back ! check my gmail account for updates', true, 1550006510594, 1524211410594, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'Good music , you have to listen! About the reservation today, we want to change the date, thank you!', true, 1550000010594, 1500011410594, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'How are you? check out the new phone apple just came up with!', true, 1550000010594, 1000211410594, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'Don\'t forget send mail to friends about the movies! and bring pizza for dinner!!', true, 1550000510594, 1524000410594, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'How are you ?? all good?', true, 1550000010594, 1524200010594, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'Add account to the new page you sign into', true, 1550000000594, 1524210000594, 'user@appsus.com', 'momo@momo.com'),
            _createMail('Me', 'About the reservation today, we want to change the date, thank you!', true, 1550000010594, 1524000410594, 'user@appsus.com', 'momo@momo.com'),
        ]
        localStorageService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, body, isRead = false, setAt = 1551133930594, createdAt = 1551112410594, from = 'momo@momo.com', to = 'user@appsus.com') {
    const mail = getEmptyMail(subject, body, isRead, setAt, createdAt, from, to)
    mail.id = utilService.makeId()
    mail.removedAt = null
    return mail
}

function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const date = searchParams.get('date') || ''
    return {
        txt,
        date
    }
}

function _setNextPrevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}

function animateCSS(el, animation = 'bounce') {
    const prefix = 'animate__'
    return new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`
        el.classList.add(`${prefix}animated`, animationName)

        function handleAnimationEnd(event) {
            event.stopPropagation()
            el.classList.remove(`${prefix}animated`, animationName)
            resolve('Animation ended')
        }

        el.addEventListener('animationend', handleAnimationEnd, { once: true })
    })
}

function debounce(func, delay) {
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            func(...args)
        }, delay)
    }
}