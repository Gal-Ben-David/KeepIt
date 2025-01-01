import { Modal } from "../cmps/Modal.jsx"
import { noteService } from '../services/note.service.js'
import { CreateNoteByImg } from '../cmps/CreateNoteByImg.jsx'
import { CreateNoteByVideo } from '../cmps/CreateNoteByVideo.jsx'
import { CreateNoteByTodos } from '../cmps/CreateNoteByTodos.jsx'
import { ColorInput } from '../cmps/ColorInput.jsx'
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { CreateNoteByDrawing } from "../../note/cmps/CreateNoteByDrawing.jsx"
import { NoteTag } from "../../note/cmps/NoteTag.jsx"

const { useState, useEffect, useRef } = React

export function NoteEdit({ note, onCloseModal, setNotes, setNoteType, isOpen, transferNoteToMailApp }) {

    const [noteToEdit, setNoteToEdit] = useState(note)
    const [cmpType, setCmpType] = useState('')
    const [todosCounter, setTodosCounter] = useState((noteToEdit.info.todos) ? noteToEdit.info.todos.length : 0)
    const [isNoteStyle, setIsNoteStyle] = useState(false)
    const [isDrawingModalOpen, setIsDrawingModalOpen] = useState(false)

    // const [imgUrl, setImgUrl] = useState(note.info.imgUrl || '')
    // const [videoUrl, setVideoUrl] = useState(note.info.videoUrl || '')
    // const [drawingUrl, setDrawingUrl] = useState(note.info.drawingUrl || '')

    const titleAreaRef = useRef(null)
    const textareaRef = useRef(null)

    useEffect(() => {
        if (isOpen && textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }

        if (isOpen && titleAreaRef.current) {
            titleAreaRef.current.style.height = 'auto'
            titleAreaRef.current.style.height = `${titleAreaRef.current.scrollHeight}px`
        }
    }, [isOpen, noteToEdit])

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
        setNoteToEdit((prevNote) => {
            if (field === 'imgUrl') {
                value = value.trim()
                // setImgUrl(value)
            }
            if (field === 'videoUrl') {
                value = value.trim()
                // setVideoUrl(value)
            }
            if (field === 'noteTitle') {
                return { ...prevNote, noteTitle: value }
            }
            if (field === 'tag') {
                const tags = value.split(',')
                return { ...prevNote, labels: tags }
            }
            return { ...prevNote, info: { ...prevNote.info, [field]: value } }
        })
    }

    function handleInfoChangeForTodos({ target }, idx) {
        let { value } = target
        const todosNote = { ...noteToEdit }
        if (!todosNote.info.todos) todosNote.info.todos = []

        todosNote.info.todos[idx] = { txt: value, isChecked: false }

        console.log(noteToEdit)
        setNoteToEdit((prevNote) => ({ ...prevNote, info: { ...prevNote.info, todos: [...todosNote.info.todos].filter(todo => todo.txt) } }))
    }

    function changeIsCheckedTodo(todoIdx, note) {
        const updatedTodos = note.info.todos.map((todo, idx) => idx === todoIdx ? { ...todo, isChecked: !todo.isChecked } : todo)
        const updatedNote = { ...note, info: { ...note.info, todos: updatedTodos } }
        setNoteToEdit(updatedNote)
    }

    function onSubmit(updatedNote) {
        const updatedNoteToSubmit = { ...setNoteType(updatedNote) }

        noteService.save(updatedNoteToSubmit)
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
                <button className="delete-btn" type='button' onClick={() => onRemoveUrl(urlType)}><i className="fa-solid fa-trash"></i></button>
            </div>
        )
    }

    function onRemoveUrl(urlType) {
        const updatedInfo = { ...noteToEdit.info }
        if (urlType === 'img') {
            if (updatedInfo.imgUrl) {
                // updatedInfo.imgUrl = ''
                delete updatedInfo.imgUrl
                setNoteToEdit(prevNote => ({ ...prevNote, info: { ...updatedInfo } }))
                // setImgUrl('')
            } else if (updatedInfo.drawingUrl) {
                // updatedInfo.drawingUrl = ''
                delete updatedInfo.drawingUrl
                setNoteToEdit(prevNote => ({ ...prevNote, info: { ...updatedInfo } }))
                // setDrawingUrl('')
            }
        } else if (urlType === 'video') {
            // updatedInfo.videoUrl = ''
            delete updatedInfo.videoUrl
            setNoteToEdit(prevNote => ({ ...prevNote, info: { ...updatedInfo } }))
            // setVideoUrl('')
        }
        setNoteToEdit((prevNote) => ({ ...prevNote, info: { ...updatedInfo } }))
    }

    function renderTodoList(todoList, note) {
        return (<div className="todo-list-preview edit">
            {todoList.map((item, i) =>
                item &&
                <label className="checkbox-label-preview edit" key={i} onClick={(ev) => { ev.stopPropagation() }} >
                    <input
                        type="checkbox"
                        checked={item.isChecked || false}
                        value={todoList.txt}
                        onChange={() => changeIsCheckedTodo(i, note)} />
                    <span className="todo-text">{item.txt}</span>
                </label>)}
        </div>)
    }

    function handleChangeTextAreaDimensions(ev) {
        ev.target.style.height = 'auto'
        ev.target.style.height = ev.target.scrollHeight + 'px'
    }

    function onToggleIsPinned() {
        setNoteToEdit((prevNote) => ({ ...prevNote, isPinned: !prevNote.isPinned }))
    }

    function onSetNoteStyle(color) {
        setNoteToEdit(prevNote => ({ ...prevNote, style: { backgroundColor: color } }))
    }

    function closeDrawingModal() {
        setIsDrawingModalOpen(false)
    }

    const bgColor = noteToEdit.style.backgroundColor

    console.log(noteToEdit)

    return (
        <section className="edit-note-area">

            <div className="edit-note-form" style={{ backgroundColor: bgColor }}>

                {noteToEdit.info.imgUrl && renderImgOrVideo(<img src={noteToEdit.info.imgUrl} />, 'img')}
                {noteToEdit.info.videoUrl && renderImgOrVideo(<iframe src={noteToEdit.info.videoUrl} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                </iframe>, 'video')}
                {noteToEdit.info.drawingUrl && renderImgOrVideo(<img src={noteToEdit.info.drawingUrl} />, 'img')}

                <div className="info-area">
                    <button
                        className={`pin-btn-edit-modal ${(noteToEdit.isPinned ? 'pinned' : '')}`}
                        onClick={(ev) => { ev.stopPropagation(); onToggleIsPinned() }}>
                        {noteToEdit.isPinned ? <img src="assets/img/pin-full.png" /> : <img src="assets/img/pin-empty.png" />}
                    </button>

                    <textarea
                        ref={titleAreaRef}
                        className="textarea-input"
                        type="text"
                        name="noteTitle"
                        id="title-update"
                        placeholder="Title"
                        value={noteToEdit.noteTitle}
                        onChange={(ev) => { handleInfoChange(ev); handleChangeTextAreaDimensions(ev) }}
                        style={{ backgroundColor: bgColor }} />

                    <textarea
                        ref={textareaRef}
                        className="textarea-input"
                        type="text"
                        name="txt"
                        id="note-content"
                        placeholder="New note..."
                        value={noteToEdit.info.txt}
                        onChange={(ev) => { handleInfoChange(ev); handleChangeTextAreaDimensions(ev) }}
                        style={{ backgroundColor: bgColor }} />

                    {noteToEdit.info.todos &&
                        noteToEdit.info.todos.length !== 0 && renderTodoList(noteToEdit.info.todos, noteToEdit)}

                    <DynamicCmp
                        noteType={cmpType}
                        // handleChange={handleChange}
                        handleInfoChange={handleInfoChange}
                        note={noteToEdit}
                        bgColor={bgColor}
                        todosCounter={todosCounter}
                        handleInfoChangeForTodos={handleInfoChangeForTodos}
                        setTodosCounter={setTodosCounter}
                        isAddingNote={false}
                        isDrawingModalOpen={isDrawingModalOpen}
                        closeDrawingModal={closeDrawingModal}
                        setNoteToEdit={setNoteToEdit}
                    />

                    {note.labels && note.labels.length !== 0 &&
                        <div className="tag-list">
                            {note.labels.map((tag, i) =>
                                tag &&
                                <span className="tag" key={i}>{tag}</span>)}
                        </div>}


                    <div className="actions">
                        <div className="actions-toolbar">
                            <button
                                title="Background color"
                                onClick={() => setIsNoteStyle(isNoteStyle => !isNoteStyle)}>
                                <i className="fa-solid fa-palette"></i>
                            </button>

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

                            <button
                                type='button'
                                title="Drawing"
                                onClick={() => { setCmpType('NoteDrawing'); setIsDrawingModalOpen(true) }}>
                                <i className="fa-solid fa-paintbrush"></i>
                            </button>

                            <button title="Send by email" onClick={(ev) => { ev.stopPropagation(); transferNoteToMailApp(noteToEdit) }}>
                                <i className="fa-regular fa-envelope"></i>
                            </button>

                            <button
                                type='button'
                                title="Tag"
                                onClick={() => { setCmpType('NoteTag') }}>
                                <i className="fa-solid fa-tag"></i>
                            </button>
                        </div>
                        <button className="save-new-note-btn" onClick={() => onSubmit(noteToEdit)}>Save</button>
                    </div>
                </div>
            </div>
            {isNoteStyle && <ColorInput onSetNoteStyle={onSetNoteStyle} bgColor={bgColor} />}

        </section>
    )
}

function DynamicCmp(props) {
    switch (props.noteType) {
        case 'NoteImg':
            return <CreateNoteByImg {...props} />
        case 'NoteVideo':
            return <CreateNoteByVideo {...props} />
        case 'NoteTodos':
            return <CreateNoteByTodos {...props} />
        case 'NoteDrawing':
            return <CreateNoteByDrawing {...props} />
        case 'NoteTag':
            return <NoteTag {...props} />
        default:
            return null
    }
}