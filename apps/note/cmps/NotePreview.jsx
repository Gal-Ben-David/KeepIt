import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { Modal } from '../cmps/Modal.jsx'
import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { Fragment, useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NotePreview({ notes, onRemoveNote, loadNotes, onPinNote, onDuplicateNote, setNoteType, setNotes }) {

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState(null)
    const [pinnedDisplay, setPinnedDisplay] = useState('')

    useEffect(() => {
        findPinnedNote()
    }, [notes])

    function onCloseModal() {
        setIsEditModalOpen(false)
        setNoteToEdit(null)
    }

    function handleEditClick(note) {
        setNoteToEdit(note)
        setIsEditModalOpen(true)
    }

    function findPinnedNote() {
        const isPinnedNote = notes.find(note => note.isPinned)
        setPinnedDisplay((isPinnedNote) ? 'show' : '')
    }

    function changeIsCheckedTodo(todoIdx, note) {
        const updatedTodos = note.info.todos.map((todo, idx) => idx === todoIdx ? { ...todo, isChecked: !todo.isChecked } : todo)
        const updatedNote = { ...note, info: { ...note.info, todos: updatedTodos } }
        setNoteToEdit(updatedNote)

        setNotes(prevNotes => {
            const noteIndex = prevNotes.findIndex(n => n.id === updatedNote.id)
            if (noteIndex !== -1) {
                const updatedNotes = [...prevNotes]
                updatedNotes[noteIndex] = updatedNote
                return updatedNotes
            }
            return prevNotes
        })
        onSubmit(updatedNote)
    }

    function onSubmit(updatedNote) {
        console.log(updatedNote)
        noteService.save(updatedNote)
            .then(savedNote => {
                console.log(savedNote)
                console.log('Note updated')
                showSuccessMsg('Note has been saved successfully')
                setNoteToEdit(noteService.getEmptyNote())
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg(`Problems saving note`)
            })
    }

    return (

        <Fragment>
            <section className={`pinned-notes ${pinnedDisplay}`}>
                <h4>Pinned</h4>
                <NoteList notes={notes.filter(note => note.isPinned)}
                    handleEditClick={handleEditClick}
                    onPinNote={onPinNote}
                    onRemoveNote={onRemoveNote}
                    onDuplicateNote={onDuplicateNote}
                    changeIsCheckedTodo={changeIsCheckedTodo} />
            </section>

            <section className="unPinned-notes">
                {(pinnedDisplay === 'show') && <h1>Other notes</h1>}

                <NoteList notes={notes.filter(note => !note.isPinned)}
                    handleEditClick={handleEditClick}
                    onPinNote={onPinNote}
                    onRemoveNote={onRemoveNote}
                    onDuplicateNote={onDuplicateNote}
                    changeIsCheckedTodo={changeIsCheckedTodo} />
            </section>

            {isEditModalOpen && (
                <Modal isOpen={isEditModalOpen} onCloseModal={onCloseModal} bgColor={noteToEdit.style.backgroundColor}>
                    <NoteEdit
                        note={noteToEdit}
                        onCloseModal={onCloseModal}
                        loadNotes={loadNotes}
                        setNoteType={setNoteType}
                        setNotes={setNotes}
                        isOpen={isEditModalOpen}
                    />
                </Modal>
            )}
        </Fragment >
    )
}