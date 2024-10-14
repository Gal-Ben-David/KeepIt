import { noteService } from '../services/note.service.js'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    function loadNotes() {
        noteService.query(filterBy)
            .then(setNotes)
            .catch(err => {
                console.log('Problems getting notes:', err)
            })
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break

            case 'color':
                value = { backgroundColor: value }
                break

        }
        setNoteToAdd((prevNote) => ({ ...prevNote, [field]: value }))
    }

    function handleInfoChange({ target }) {
        let { value, name: field, type } = target
        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setNoteToAdd((prevNote) => ({ ...prevNote, info: { ...noteToAdd.book, [field]: value } }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        if (noteToAdd.noteTitle === '' && noteToAdd.info.txt === '') return console.log('empty note')
        else {
            noteService.save(noteToAdd)
                .then(note => {
                    console.log(note)
                    console.log('Note added')
                    showSuccessMsg('Note has been saved successfully')
                    loadNotes()
                    setNoteToAdd(noteService.getEmptyNote())
                })
                .catch(err => {
                    console.log('err:', err)
                    showErrorMsg(`Problems saving note`)
                })
        }
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            })
            .catch(err => console.error('Error removing book:', err))
    }

    function onPinNote(note) {
        const noteToPin = { ...note, isPinned: true }
        noteService.remove(note.id)
            .then(() => {
                noteService.save(noteToPin, true)
                    .then(() => loadNotes())
            })
            .catch(err => console.error('Error pin a book:', err))
    }

    if (!notes) return <div>Loading...</div>

    return (
        <section className="main-note">
            <NoteFilter onSetFilter={onSetFilter} filterBy={filterBy} />

            <section className="new-note">
                <form className="add-note-form" onSubmit={onSubmit}>
                    {/* <label htmlFor="txt">Vendor</label> */}
                    <input
                        type="text"
                        name="noteTitle"
                        id="title"
                        placeholder="Title"
                        onChange={handleChange} />
                    <input
                        type="text"
                        name="txt"
                        id="txt"
                        placeholder="New note..."
                        onChange={handleInfoChange} />

                    <input
                        type="color"
                        className="control-color"
                        id="color-input"
                        name="style"
                        onChange={handleChange} />

                    <button>Save</button>
                </form>

                <NotePreview notes={notes} onRemoveNote={onRemoveNote} loadNotes={loadNotes} onPinNote={onPinNote} />

            </section>
        </section>
    )
}
