import { noteService } from '../services/note.service.js'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(setNotes)
            .catch(err => {
                console.log('Problems getting notes:', err)
            })
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

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            })
            .catch(err => console.error('Error removing book:', err))
    }

    if (!notes) return <div>Loading...</div>

    return (

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

            <NotePreview notes={notes} onRemoveNote={onRemoveNote} loadNotes={loadNotes} />

        </section>

    )
}
