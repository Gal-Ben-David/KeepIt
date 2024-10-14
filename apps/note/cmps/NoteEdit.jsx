import { Modal } from "../cmps/Modal.jsx"
import { noteService } from '../services/note.service.js'
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React

export function NoteEdit({ note, onCloseModal, loadNotes }) {

    const [noteToEdit, setNoteToEdit] = useState(note)

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
        }
        setNoteToEdit((prevNote) => ({ ...prevNote, [field]: value }))
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
        setNoteToEdit((prevNote) => ({ ...prevNote, info: { ...noteToEdit.book, [field]: value } }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(note => {
                console.log(note)
                console.log('Note updated')
                showSuccessMsg('Note has been saved successfully')
                loadNotes()
                onCloseModal()
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg(`Problems saving note`)
            })
    }

    return (
        <section>
            <h1>Edit Note</h1>

            <form className="edit-note-form" onSubmit={onSubmit}>
                <label htmlFor="title-update">Title</label>
                <input
                    type="text"
                    name="noteTitle"
                    id="title-update"
                    placeholder="Title"
                    value={noteToEdit.noteTitle}
                    onChange={handleChange} />

                <label htmlFor="note-content">Note content</label>
                <input
                    type="text"
                    name="txt"
                    id="note-content"
                    placeholder="New note..."
                    value={noteToEdit.info.txt}
                    onChange={handleInfoChange} />

                <button>Save</button>
            </form>


        </section>
    )
}