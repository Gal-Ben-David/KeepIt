import { Modal } from "../cmps/Modal.jsx"
import { noteService } from '../services/note.service.js'
import { CreateNoteByImg } from '../cmps/CreateNoteByImg.jsx'
import { CreateNoteByVideo } from '../cmps/CreateNoteByVideo.jsx'
import { CreateNoteByTodos } from '../cmps/CreateNoteByTodos.jsx'
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect } = React

export function NoteEdit({ note, onCloseModal, setNotes, setNoteType }) {

    const [noteToEdit, setNoteToEdit] = useState(note)
    const [cmpType, setCmpType] = useState('')
    const [todosCounter, setTodosCounter] = useState((noteToEdit.info.todos) ? noteToEdit.info.todos.length : 1)

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
        setNoteToEdit((prevNote) => ({ ...prevNote, info: { ...noteToEdit.info, [field]: value } }))
    }

    function handleInfoChangeForTodos({ target }, idx) {
        let { value, name: field, type } = target
        const todosNote = { ...noteToEdit }
        if (!todosNote.info.todos) todosNote.info.todos = []

        todosNote.info.todos[idx] = { txt: value, isChecked: false }

        console.log(noteToEdit)
        setNoteToEdit((prevNote) => ({ ...prevNote, info: { ...prevNote.info, todos: [...todosNote.info.todos].filter(todo => todo) } }))
    }

    function changeIsCheckedTodo(todoIdx, note) {
        const updatedTodos = note.info.todos.map((todo, idx) => idx === todoIdx ? { ...todo, isChecked: !todo.isChecked } : todo)
        const updatedNote = { ...note, info: { ...note.info, todos: updatedTodos } }
        setNoteToEdit(updatedNote)
    }

    function onSubmit(updatedNote) {
        // ev.preventDefault()
        setNoteType(updatedNote)
        noteService.save(updatedNote)
            .then(note => {
                console.log(note)
                console.log('Note updated')
                showSuccessMsg('Note has been saved successfully')

                setNotes(prevNotes => {
                    const noteIndex = prevNotes.findIndex(n => n.id === updatedNote.id)
                    if (noteIndex !== -1) {
                        const updatedNotes = [...prevNotes]
                        updatedNotes[noteIndex] = updatedNote
                        return updatedNotes
                    }
                    return prevNotes
                })
                onCloseModal()
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg(`Problems saving note`)
            })
    }

    function renderImgOrVideo(element, urlType) {
        return (
            <div className="edit-video-or-img">
                {element}
                <button type='button' onClick={() => onRemoveUrl(urlType)}><i className="fa-solid fa-trash"></i></button>
            </div>
        )
    }

    function onRemoveUrl(urlType) {
        const updatedInfo = { ...noteToEdit.info }
        if (urlType === 'img') {
            updatedInfo.imgUrl = ''
            delete updatedInfo.imgUrl
        } else if (urlType === 'video') {
            updatedInfo.videoUrl = ''
            delete updatedInfo.videoUrl
        }
        setNoteToEdit((prevNote) => ({ ...prevNote, info: { ...updatedInfo } }))
    }

    function renderTodoList(todoList, note) {
        return (todoList.map((item, i) =>
            item && <label key={i} onClick={(ev) => { ev.stopPropagation() }} >
                <input
                    type="checkbox"
                    checked={item.isChecked || false}
                    value={todoList.txt}
                    onChange={() => changeIsCheckedTodo(i, note)} />
                <span className="todo-text">{item.txt}</span>
            </label>
        ))
    }

    const bgColor = noteToEdit.style.backgroundColor

    return (
        <section>

            <div className="edit-note-form" style={{ backgroundColor: bgColor }}>
                {noteToEdit.info.imgUrl && renderImgOrVideo(<img src={note.info.imgUrl} />, 'img')}
                {noteToEdit.info.videoUrl && renderImgOrVideo(<iframe src={note.info.videoUrl} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                </iframe>, 'video')}


                <input
                    type="text"
                    name="noteTitle"
                    id="title-update"
                    placeholder="Title"
                    value={noteToEdit.noteTitle}
                    onChange={handleChange}
                    style={{ backgroundColor: bgColor }} />

                <input
                    type="text"
                    name="txt"
                    id="note-content"
                    placeholder="New note..."
                    value={noteToEdit.info.txt}
                    onChange={handleInfoChange}
                    style={{ backgroundColor: bgColor }} />

                {noteToEdit.info.todos && renderTodoList(noteToEdit.info.todos, noteToEdit)}

                <DynamicCmp
                    noteType={cmpType}
                    handleChange={handleChange}
                    handleInfoChange={handleInfoChange}
                    note={noteToEdit}
                    bgColor={bgColor}
                    todosCounter={todosCounter}
                    handleInfoChangeForTodos={handleInfoChangeForTodos}
                    setTodosCounter={setTodosCounter} />


                <div className="actions">
                    <div className="actions-toolbar">
                        <label htmlFor="color-input-edit"><i className="fa-solid fa-palette"></i></label>
                        <input
                            type="color"
                            className="control-color"
                            id="color-input-edit"
                            name="style"
                            value={bgColor}
                            onChange={handleChange} />

                        <button
                            type='button'
                            title="Add image"
                            onClick={() => setCmpType('NoteImg')}>
                            <i className="fa-solid fa-image"></i>
                        </button>

                        <button
                            type='button'
                            onClick={() => setCmpType('NoteVideo')}>
                            <i className="fa-solid fa-video"></i>
                        </button>

                        <button
                            type='button'
                            onClick={() => { setCmpType('NoteTodos'); setTodosCounter(prevCount => prevCount + 1) }}>
                            <i className="fa-regular fa-square-check"></i>
                        </button>
                    </div>
                    <button className="save-new-note-btn" onClick={() => onSubmit(noteToEdit)}>Save</button>
                </div>
            </div>


        </section>
    )
}

function DynamicCmp(props) {
    switch (props.noteType) {
        // case 'NoteTxt':
        //     return <CreateNoteByTextbox {...props} />
        case 'NoteImg':
            return <CreateNoteByImg {...props} />
        case 'NoteVideo':
            return <CreateNoteByVideo {...props} />
        case 'NoteTodos':
            return <CreateNoteByTodos {...props} />
        default:
            return null
    }
}