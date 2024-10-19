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
                            {note.info.drawingUrl && <img src={note.info.drawingUrl} />}

                            <div className={`title-and-info-content ${(note.info.imgUrl || note.info.videoUrl || note.info.drawingUrl) ? 'absolute' : ''}`}>
                                <button
                                    className={`pin-btn ${(note.info.imgUrl || note.info.videoUrl || note.info.drawingUrl) ? 'absolute' : ''} ${(note.isPinned ? 'pinned' : '')}`}
                                    onClick={(ev) => { ev.stopPropagation(); onPinNote(note) }}>
                                    {note.isPinned ? <img src="assets/img/pin-full.png" /> : <img src="assets/img/pin-empty.png" />}
                                </button>

                                {note.noteTitle && <h3 className="preview-title"><LongTxt children={note.noteTitle} length={200} showButton={false} /></h3>}
                                {note.info.txt && <section className={`${!note.noteTitle ? 'padding' : ''}`}><LongTxt children={note.info.txt} length={300} showButton={false} /></section>}

                                {note.info.todos &&
                                    <div className="todo-list-preview">
                                        {note.info.todos.map((item, i) =>
                                            item &&
                                            <label className="checkbox-label-preview" key={i} onClick={(ev) => { ev.stopPropagation() }} >
                                                <input
                                                    type="checkbox"
                                                    checked={item.isChecked || false}
                                                    onChange={() => changeIsCheckedTodo(i, note)} />
                                                <span className="todo-text">{item.txt}</span>
                                            </label>)}
                                    </div>}
                            </div>
                            {note.labels && note.labels.length !== 0 &&
                                <div className="tag-list">
                                    {note.labels.map((tag, i) =>
                                        tag &&
                                        <span className="tag" key={i}>{tag}</span>)}
                                </div>}

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
