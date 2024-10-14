import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { Modal } from '../cmps/Modal.jsx'

const { Fragment, useState } = React

export function NotePreview({ notes, onRemoveNote, loadNotes }) {

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState(null)

    function onCloseModal() {
        setIsEditModalOpen(false)
        setNoteToEdit(null)
    }

    function handleEditClick(note) {
        setNoteToEdit(note)
        setIsEditModalOpen(true)
    }

    return (

        <Fragment>
            <ul className="notes">
                {notes.map(note =>
                    <li key={note.id}>
                        <h2>{note.noteTitle}</h2>
                        <p>{note.info.txt}</p>
                        <button onClick={() => onRemoveNote(note.id)}>Delete</button>
                        <button onClick={() => handleEditClick(note)}>Edit</button>
                    </li>
                )}
            </ul>

            {isEditModalOpen && (
                <Modal isOpen={isEditModalOpen} onCloseModal={onCloseModal}>
                    <NoteEdit note={noteToEdit} onCloseModal={onCloseModal} loadNotes={loadNotes} />
                </Modal>
            )}
        </Fragment>
    )
}