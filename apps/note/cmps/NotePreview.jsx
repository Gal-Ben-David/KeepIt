import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { Modal } from '../cmps/Modal.jsx'
import { noteService } from '../services/note.service.js'

const { Fragment, useState, useEffect } = React

export function NotePreview({ notes, onRemoveNote, loadNotes, onPinNote, onDuplicateNote, setNoteType, setNotes }) {

    const [notesPreview, setNotesPreview] = useState(notes)
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

        setNotesPreview(prevNotes => {
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
                <ul className="notes">
                    {notesPreview.filter(note => note.isPinned).map(note => {

                        return (<li key={note.id} style={{ backgroundColor: note.style.backgroundColor }} onClick={() => handleEditClick(note)}>

                            {note.info.imgUrl && <img src={note.info.imgUrl} />}
                            {note.info.videoUrl &&
                                <iframe src={note.info.videoUrl} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                                </iframe>}

                            <div className={`title-and-info-content ${(note.info.imgUrl || note.info.videoUrl) ? 'absolute' : ''}`}>
                                <button
                                    className={`pin-btn ${(note.info.imgUrl || note.info.videoUrl) ? 'absolute' : ''} ${(note.isPinned ? 'pinned' : '')}`}
                                    onClick={(ev) => { ev.stopPropagation(); onPinNote(note) }}>
                                    {note.isPinned ? <img src="assets/img/pin-full.png" /> : <img src="assets/img/pin-empty.png" />}
                                </button>

                                <h3>{note.noteTitle}</h3>
                                <p>{note.info.txt}</p>

                                {note.info.todos && note.info.todos.filter(item => item).map((item, i) =>
                                    <label key={i} onClick={(event) => { event.stopPropagation() }} >
                                        <input
                                            type="checkbox"
                                            onClick={(event) => { event.stopPropagation() }} />
                                        <span style={{ pointerEvents: 'none' }}>{item}</span>
                                    </label>
                                )}
                            </div>

                            <div className="toolbar">
                                <button title="Delete Note" onClick={(ev) => { ev.stopPropagation(); onRemoveNote(note.id) }}><i className="fa-solid fa-trash"></i></button>
                                <button title="Edit Note" onClick={(ev) => { ev.stopPropagation(); handleEditClick(note) }}><i className="fa-regular fa-pen-to-square"></i></button>
                                <button title="Duplicate Note" onClick={(ev) => { ev.stopPropagation(); onDuplicateNote(note) }}><i className="fa-regular fa-clone"></i></button>
                            </div>
                        </li>)
                    })}
                </ul>

            </section>

            <section className="unPinned-notes">
                <h1 className={pinnedDisplay ? 'show' : ''}>Other notes</h1>
                <ul className="notes">
                    {notesPreview.filter(note => !note.isPinned).map(note =>
                        <li key={note.id} style={{ backgroundColor: note.style.backgroundColor }} onClick={() => handleEditClick(note)}>

                            {note.info.imgUrl && <img src={note.info.imgUrl} />}
                            {note.info.videoUrl &&
                                <iframe src={note.info.videoUrl} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                                </iframe>}

                            <div className={`title-and-info-content ${(note.info.imgUrl || note.info.videoUrl) ? 'absolute' : ''}`}>
                                <button
                                    className={`pin-btn ${(note.info.imgUrl || note.info.videoUrl) ? 'absolute' : ''} ${(note.isPinned ? 'pinned' : '')}`}
                                    onClick={(ev) => { ev.stopPropagation(); onPinNote(note) }}>
                                    {note.isPinned ? <img src="assets/img/pin-full.png" /> : <img src="assets/img/pin-empty.png" />}
                                </button>

                                <h3>{note.noteTitle}</h3>
                                <p>{note.info.txt}</p>

                                {note.info.todos && note.info.todos.map((item, i) =>
                                    item && <label key={i} onClick={(ev) => { ev.stopPropagation() }} >
                                        <input
                                            type="checkbox"
                                            checked={item.isChecked || false}
                                            onChange={() => changeIsCheckedTodo(i, note)} />
                                        <span className="todo-text">{item.txt}</span>
                                    </label>
                                )}
                            </div>

                            <div className="toolbar">
                                <button title="Delete Note" onClick={(ev) => { ev.stopPropagation(); onRemoveNote(note.id) }}><i className="fa-solid fa-trash"></i></button>
                                <button title="Edit Note" onClick={(ev) => { ev.stopPropagation(); handleEditClick(note) }}><i className="fa-regular fa-pen-to-square"></i></button>
                                <button title="Duplicate Note" onClick={(ev) => { ev.stopPropagation(); onDuplicateNote(note) }}><i className="fa-regular fa-clone"></i></button>
                            </div>
                        </li>
                    )}
                </ul>
            </section>

            {isEditModalOpen && (
                <Modal isOpen={isEditModalOpen} onCloseModal={onCloseModal} bgColor={noteToEdit.style.backgroundColor}>
                    <NoteEdit note={noteToEdit} onCloseModal={onCloseModal} loadNotes={loadNotes} setNoteType={setNoteType} />
                </Modal>
            )}
        </Fragment>
    )
}