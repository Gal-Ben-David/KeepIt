// note service

import { utilService } from "../../../services/util.service.js"
import { loadFromStorage, saveToStorage } from "../../../services/storage.service.js"
import { storageService } from "../../../services/async-storage.service.js"

const NOTE_KEY = 'noteDB'
_createNotes()

export const noteService = {
    query,
    get,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getFilterFromSearchParams,
    animateCSS,
    debounce
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => {
                    const matchesTitle = regExp.test(note.noteTitle)
                    const matchesTxt = regExp.test(note.info.txt)

                    return matchesTitle || matchesTxt
                })
            }

            if (filterBy.type) {
                notes = notes.filter(note => note.type.includes(filterBy.type))
            }
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note, isPinned = false) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note, isPinned)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function getEmptyNote(createdAt = Date.now(), type = ['NoteTxt'], noteTitle = '', isPinned = false, style = { backgroundColor: '#ffffff' }, info = { txt: '' }, labels = []) {
    return { createdAt, type, noteTitle, isPinned, style, info, labels }
}

function getDefaultFilter() {
    return {
        txt: '',
        type: '',
    }
}

function _createNotes() {
    let notes = loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        notes = [


            _createNote(1112223,
                ['NoteImg'],
                'Talent is nothing without persistence',
                false,
                { backgroundColor: '#FFDFD3' },
                {
                    imgUrl: 'https://media.4-paws.org/5/4/4/c/544c2b2fd37541596134734c42bf77186f0df0ae/VIER%20PFOTEN_2017-10-20_164-3854x2667-1920x1329.jpg',
                    txt: ''
                },
                []),

            _createNote(1112225,
                ['NoteImg'],
                'Success is a journey, not a destination - keep moving forward',
                true,
                { backgroundColor: '#FFDFD3' },
                {
                    imgUrl: 'https://www.worldanimalprotection.ca/cdn-cgi/image/width=1280,format=auto/siteassets/shutterstock_2461984615.jpg',
                    txt: ''
                },
                []),

            _createNote(1112224,
                ['NoteVideo'],
                'Cool Motivating Background Music',
                true,
                { backgroundColor: '#fcf4dd' },
                {
                    videoUrl: 'https://www.youtube.com/embed/wt8nzHv9Gn8?si=xYcgEo-Cbw0mNReD',
                    txt: '🎵 Remember to explore MorningLightMusic for background music. '
                },
                ['music', 'motivation']),

            _createNote(1112230,
                ['NoteTxt'],
                '',
                true,
                { backgroundColor: '#ffffff' },
                {
                    txt: 'Investigate methods to enhance project efficiency'
                },
                ['work']),

            _createNote(1112226,
                ['NoteTodos'],
                'Daily Work Tasks',
                true,
                { backgroundColor: '#E9E3D4' },
                {
                    todos: [{ txt: 'Respond to client emails', isChecked: false }, { txt: 'Review the code for the new feature', isChecked: false }],
                    txt: ''
                },
                []),

            _createNote(1112227,
                ['NoteTodos'],
                '🛒 Buy groceries',
                true,
                { backgroundColor: '#EFEFF1' },
                {
                    todos: [{ txt: 'milk', isChecked: false }, { txt: 'eggs', isChecked: true }, { txt: 'vegetables', isChecked: true }, { txt: 'bread', isChecked: false }],
                    txt: ''
                },
                []),

            _createNote(1112260,
                ['NoteImg'],
                '',
                true,
                { backgroundColor: '#ffffff' },
                {
                    imgUrl: 'assets/img/budapest.png',
                    txt: ''
                },
                ['myGallery', 'Budapest']),

            _createNote(1112228,
                ['NoteImg'],
                '',
                true,
                { backgroundColor: '#ffffff' },
                {
                    imgUrl: 'https://cdn-fkmoj.nitrocdn.com/xvpOGZRTxJUhXKufpOYIruQcRqtvAAQX/assets/images/optimized/rev-4e1f421/media.briantracy.com/blog/wp-content/uploads/2024/01/23111850/Quote-22-800x800.png',
                    txt: ''
                },
                ['motivation']),

            _createNote(1112229,
                ['NoteImg'],
                '',
                true,
                { backgroundColor: '#ffffff' },
                {
                    imgUrl: 'assets/img/sunset.png',
                    txt: ''
                },
                ['myGallery']),

            _createNote(1112230,
                ['NoteTxt'],
                'Reminder',
                true,
                { backgroundColor: '#FCF4DD' },
                {
                    txt: 'Meeting with the project team at 3 PM on Tuesday'
                },
                ['work']),

            _createNote(1112230,
                ['NoteTxt'],
                '',
                true,
                { backgroundColor: '#ffffff' },
                {
                    txt: 'Explore ways to improve team communication'
                },
                ['work']),

            _createNote(1112240,
                ['NoteVideo'],
                'YOGA WORKOUT',
                true,
                { backgroundColor: '#e8dff5' },
                {
                    videoUrl: 'https://www.youtube.com/embed/NJU8dcCacRY?si=9114dn5XiMn8c7q4',
                    txt: ''
                },
                ['yoga', 'workout']),

            _createNote(1112231,
                ['NoteTxt'],
                'Birthday message 🎉',
                true,
                { backgroundColor: '#E2F6D3' },
                {
                    txt: "Today is all about you, and I just want to take a moment to celebrate the incredible person you are!" +
                        " On this special day, I wish you a year filled with joy, laughter, and unforgettable memories." +
                        " May every moment be a reminder of how loved and cherished you are." +
                        " May this year bring you closer to your goals and dreams. I hope you find success in everything you" +
                        " do and the courage to pursue your passions. Remember that I’m always here cheering you on," +
                        " supporting you every step of the way. " +
                        "  Enjoy your day to the fullest—surrounded by the people you love, with all the things that make you happy. " +
                        " Happy Birthday! 🎂✨"
                },
                []),

            _createNote(1112232,
                ['NoteTxt'],
                'Pasta recipe 🍝',
                true,
                { backgroundColor: '#FFF8B8' },
                {
                    txt: "Ingredients:\n" +
                        "• 200g pasta (spaghetti, penne, or your favorite type) \n" +
                        "• 2 tablespoons olive oil \n" +
                        "• 2 cloves garlic, minced \n" +
                        "• 1 small onion, chopped \n" +
                        "• 1 can (400g) crushed tomatoes or tomato sauce\n " +
                        "• Salt and pepper, to taste \n" +
                        "• 1 teaspoon dried basil or oregano (or a mix)\n" +
                        '\n' +
                        "Instructions:\n" +
                        "Cook the Pasta:\n" +
                        "• In a large pot of boiling salted water, cook the pasta according to the package instructions until al dente. Drain and set aside.\n" +
                        '\n' +
                        "Make the Sauce:\n" +
                        "• While the pasta cooks, heat olive oil in a pan over medium heat.\n" +
                        "• Add the chopped onion and cook until it becomes translucent (about 5 minutes). Then, add the minced garlic and cook for another 1-2 minutes.\n" +
                        "• Add the crushed tomatoes, sugar, salt, pepper, and dried basil or oregano. Stir well and bring the sauce to a simmer.\n" +
                        "• Let it cook for 10-15 minutes, stirring occasionally. Taste and adjust seasoning if needed.\n" +
                        '\n' +
                        "Combine Pasta and Sauce:\n" +
                        "• Add the cooked pasta to the sauce, tossing to coat evenly.\n" +
                        "• If desired, sprinkle some grated Parmesan cheese on top and garnish with fresh basil leaves.\n"

                },
                ['food']),

            _createNote(1112229,
                ['NoteImg'],
                'Batumi, Georgia',
                true,
                { backgroundColor: '#ffffff' },
                {
                    imgUrl: 'assets/img/cow.png',
                    txt: ''
                },
                ['myGallery', 'Batumi']),

            _createNote(1112222,
                ['NoteTxt'],
                'Meeting summery',
                false,
                { backgroundColor: '#eaece5' },
                {
                    txt:
                        "Marketing campaign is on track, \n" +
                        "Need to reduce expenses by 10%, \n" +
                        "Final presentation is due next week"
                },
                ['work']),


            _createNote(1112222,
                ['NoteTxt'],
                'Action items from weekly meeting',
                false,
                { backgroundColor: '#E2F6D3' },
                {
                    todos: [
                        { txt: 'Finalize the budget by Friday', isChecked: false },
                        { txt: 'Prepare the presentation slides', isChecked: true },
                        { txt: 'contact the client for feedback', isChecked: true },],
                    txt: ''
                },
                ['work']),


            _createNote(1112245,
                ['NoteImg'],
                '',
                false,
                { backgroundColor: '#ffffff' },
                {
                    imgUrl: 'assets/img/natureview.png',
                    txt: ''
                },
                ['myGallery']),


            _createNote(1112233,
                ['NoteTxt'],
                'Fresh Mediterranean Salad 🥗',
                false,
                { backgroundColor: '#e8dff5' },
                {
                    txt: "Ingredients:\n" +
                        "• 2 cups cherry tomatoes, halved \n" +
                        "• 1 cucumber, diced \n" +
                        "• 1/2 red onion, thinly sliced \n" +
                        "• 1/2 cup Kalamata olives, pitted and halved \n" +
                        "• 1/4 cup feta cheese, crumbled\n " +
                        "• 1/4 cup fresh parsley, chopped \n" +
                        "• 1/4 cup extra-virgin olive oil\n" +
                        "• 2 tablespoons red wine vinegar\n" +
                        "• 1 clove garlic, minced\n" +
                        "• Salt and pepper to taste\n" +
                        '\n' +
                        "Instructions:\n" +
                        "• In a large bowl, combine the cherry tomatoes, cucumber, red onion, olives, feta cheese, and parsley.\n" +
                        "• In a small bowl, whisk together the olive oil, red wine vinegar, garlic, salt, and pepper.\n" +
                        "• Drizzle the dressing over the salad and toss well to combine.\n" +
                        "• Serve immediately or refrigerate for 15-20 minutes to let the flavors blend.\n"
                },
                ['food']),

            _createNote(1112260,
                ['NoteImg'],
                '',
                false,
                { backgroundColor: '#ffffff' },
                {
                    imgUrl: 'assets/img/sunset2.png',
                    txt: ''
                },
                ['myGallery']),

            _createNote(1112260,
                ['NoteImg'],
                '',
                false,
                { backgroundColor: '#ffffff' },
                {
                    imgUrl: 'assets/img/house.png',
                    txt: 'Restaurant Senate'
                },
                ['myGallery']),

            _createNote(1112241,
                ['NoteTodos'],
                'Travel Preparation',
                false,
                { backgroundColor: '#EFEFF1' },
                {
                    todos: [{ txt: 'Book flights', isChecked: false },
                    { txt: 'Check passport expiration', isChecked: true },
                    { txt: 'Arrange transportation to/from the airport', isChecked: false },
                    { txt: 'Exchange currency', isChecked: false },
                    { txt: 'Set up an out-of-office email reply', isChecked: false },],
                    txt: ''
                },
                []),
            _createNote(1112250,
                ['NoteImg'],
                '',
                false,
                { backgroundColor: '#ffffff' },
                {
                    imgUrl: 'assets/img/icecream.png',
                    txt: 'Gelarto rosa, Budapest 🍦'
                },
                ['myGallery', 'Budapest', 'food']),

            _createNote(1112252,
                ['NoteImg'],
                '',
                false,
                { backgroundColor: '#ffffff' },
                {
                    imgUrl: 'assets/img/austria.png',
                    txt: 'Vienna, Austria'
                },
                ['myGallery', 'Austria']),


            _createNote(1112260,
                ['NoteImg', 'NoteTxt'],
                'Homemade bread',
                false,
                { backgroundColor: '#fcf4dd' },
                {
                    imgUrl: 'assets/img/bread.png',
                    txt: "Ingredients:\n" +
                        "• 3 1/2 cups (420g) all-purpose flour \n" +
                        "• 1 packet (2 1/4 teaspoons) active dry yeast \n" +
                        "• 1 1/4 cups (300ml) warm water (110°F/45°C) \n" +
                        "• 1 tablespoon (15g) sugar \n" +
                        "• 1 teaspoon (5g) salt\n " +
                        "• 2 tablespoons (30ml) olive oil (optional, for a softer texture)\n" +
                        '\n' +
                        "Instructions:\n" +
                        "• In a small bowl, combine the warm water, sugar, and yeast. Let it sit for 5-10 minutes until it becomes frothy.\n" +
                        "• Place the dough on a floured surface and knead for about 8-10 minutes until smooth and elastic.\n" +
                        "• Place the dough in a lightly greased bowl, cover with a damp cloth, and let it rise for about 1-2 hours or until it has doubled in size.\n" +
                        "• Punch down the dough to release the air, then shape it into a loaf or divide it into smaller rolls.\n" +
                        "• Place the shaped dough on a greased baking sheet or in a loaf pan. Cover and let it rise for another 30-45 minutes.\n" +
                        "• Preheat the oven to 375°F (190°C). Bake for 25-30 minutes or until the bread is golden brown and sounds hollow when tapped on the bottom.\n"

                },
                ['myGallery', 'food']),

            _createNote(1112260,
                ['NoteImg'],
                'Golden horse',
                false,
                { backgroundColor: '#ffffff' },
                {
                    imgUrl: 'assets/img/golden-horse.png',
                    txt: 'Udim, Israel'
                },
                ['myGallery']),

            _createNote(1112260,
                ['NoteImg'],
                '',
                false,
                { backgroundColor: '#ffffff' },
                {
                    imgUrl: 'assets/img/jump.png',
                    txt: ''
                },
                ['myGallery']),

        ]
        console.log(notes)
        saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote(createdAt, type, noteTitle, isPinned, style, info, labels) {
    const note = getEmptyNote(createdAt, type, noteTitle, isPinned, style, info, labels)
    note.id = utilService.makeId()
    return note
}

function getFilterFromSearchParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const type = searchParams.get('type') || ''
    return {
        txt,
        type
    }
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