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

            case 'color':
                value = { backgroundColor: value }
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

            <form className="edit-note-form" onSubmit={onSubmit} style={{ backgroundColor: noteToEdit.style.backgroundColor }}>
                <input
                    type="text"
                    name="noteTitle"
                    id="title-update"
                    placeholder="Title"
                    value={noteToEdit.noteTitle}
                    onChange={handleChange}
                    style={{ backgroundColor: noteToEdit.style.backgroundColor }} />

                <input
                    type="text"
                    name="txt"
                    id="note-content"
                    placeholder="New note..."
                    value={noteToEdit.info.txt}
                    onChange={handleInfoChange}
                    style={{ backgroundColor: noteToEdit.style.backgroundColor }} />

                <input
                    type="color"
                    className="control-color-edit"
                    id="color-input"
                    name="style"
                    value={noteToEdit.style.backgroundColor}
                    onChange={handleChange} />

                <button>Save</button>
            </form>


        </section>
    )
}