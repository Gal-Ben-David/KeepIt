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
                    mails = mails.filter(mail => mail.to === loggedInUser.email)
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
            _createMail('Google', 'Add your email to your account', true, 1551136510594, 1521111410594),
            _createMail('Youtube', 'Connect to out new service Youtube Music!'),
            _createMail('Bank Leumi', 'New Leumi advice for your bank account', true),
            _createMail('Spotify', 'Add family members to your spotify account')
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