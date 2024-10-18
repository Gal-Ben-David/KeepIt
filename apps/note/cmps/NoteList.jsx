import { LongTxt } from '../../../cmps/LongTxt.jsx'

const { Fragment, useState, useEffect } = React

export function NoteList({ notes, handleEditClick, onPinNote, onRemoveNote, onDuplicateNote, changeIsCheckedTodo, transferNoteToMailApp }) {
    return (
        <Fragment>
            <ul className="notes">
                {notes.map(note => {

                    return (
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

                                {note.noteTitle && <h3><LongTxt children={note.noteTitle} length={200} showButton={false} /></h3>}
                                {note.info.txt && <LongTxt children={note.info.txt} length={300} showButton={false} />}

                                {note.info.todos &&
                                    <div className="todo-list-preview">
                                        {note.info.todos.map((item, i) =>
                                            item && <label key={i} onClick={(ev) => { ev.stopPropagation() }} >
                                                <input
                                                    type="checkbox"
                                                    checked={item.isChecked || false}
                                                    onChange={() => changeIsCheckedTodo(i, note)} />
                                                <span className="todo-text">{item.txt}</span>
                                            </label>)}
                                    </div>}
                            </div>

                            <div className="toolbar">
                                <button title="Delete Note" onClick={(ev) => { ev.stopPropagation(); onRemoveNote(note.id) }}><i className="fa-solid fa-trash"></i></button>
                                <button title="Edit Note" onClick={(ev) => { ev.stopPropagation(); handleEditClick(note) }}><i className="fa-regular fa-pen-to-square"></i></button>
                                <button title="Duplicate Note" onClick={(ev) => { ev.stopPropagation(); onDuplicateNote(note) }}><i className="fa-regular fa-clone"></i></button>
                                <button title="Send by email" onClick={(ev) => { ev.stopPropagation(); transferNoteToMailApp(note) }}><i className="fa-regular fa-envelope"></i></button>
                            </div>
                        </li>
                    )
                })}
            </ul>

        </Fragment>
    )
}
