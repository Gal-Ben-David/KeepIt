import { NoteEdit } from '../cmps/NoteEdit.jsx'
import { Modal } from '../cmps/Modal.jsx'

const { Fragment, useState, useEffect } = React

export function NotePreview({ notes, onRemoveNote, loadNotes, onPinNote, onDuplicateNote, setNoteType }) {

    useEffect(() => {
        findPinnedNote()
    }, [])

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [noteToEdit, setNoteToEdit] = useState(null)
    const [pinnedDisplay, setPinnedDisplay] = useState('')

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

    return (

        <Fragment>
            <section className={`pinned-notes ${pinnedDisplay}`}>
                <h4>Pinned</h4>
                <ul className="notes">
                    {notes.filter(note => note.isPinned).map(note =>

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

            <section className="unPinned-notes">
                <h1 className={pinnedDisplay ? 'show' : ''}>Other notes</h1>
                <ul className="notes">
                    {notes.filter(note => !note.isPinned).map(note =>
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