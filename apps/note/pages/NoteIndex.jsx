import { noteService } from '../services/note.service.js'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { FilterOptions } from '../cmps/FilterOptions.jsx'
import { CreateNoteByImg } from '../cmps/CreateNoteByImg.jsx'
import { CreateNoteByVideo } from '../cmps/CreateNoteByVideo.jsx'
import { CreateNoteByTodos } from '../cmps/CreateNoteByTodos.jsx'
import { ColorInput } from '../cmps/ColorInput.jsx'
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect, Fragment, useRef } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [showFilterOption, setShowFilterOption] = useState(false)
    const [cmpType, setCmpType] = useState('NoteTxt')
    const [todosCounter, setTodosCounter] = useState(0)
    const [isNoteStyle, setIsNoteStyle] = useState(false)
    const [isExpandedForm, setIsExpandedForm] = useState(false)

    const noteToAddRef = useRef(noteToAdd)

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF'
    }, [])

    useEffect(() => {
        document.addEventListener('click', handleBodyClick)

        return () => {
            document.removeEventListener('click', handleBodyClick)
        }
    }, [])

    useEffect(() => {
        noteToAddRef.current = noteToAdd
    }, [noteToAdd])

    function handleBodyClick(ev) {
        if (!ev.target.closest('.collapsible-element')) {
            setIsExpandedForm(false)

            if (noteToAddRef.current.noteTitle || noteToAddRef.current.info.txt ||
                noteToAddRef.current.info.imgUrl || noteToAddRef.current.info.videoUrl || noteToAddRef.current.info.todos) {
                onSubmit(noteToAddRef.current, true)
                setCmpType('NoteTxt')
                setTodosCounter(0)
            }
            else {
                setNoteToAdd(noteService.getEmptyNote())
                setCmpType('NoteTxt')
                setTodosCounter(0)
            }
        }
    }

    function loadNotes() {
        noteService.query(filterBy)
            .then(setNotes)
            .catch(err => {
                console.log('Problems getting notes:', err)
            })
    }

    function onSetFilter(filterByToEdit) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterByToEdit }))
    }

    function handleFromClick() {
        setShowFilterOption(true)
    }

    function onClearForm() {
        setNoteToAdd(noteService.getEmptyNote())
    }

    function setNoteType(note) {
        if (note.info.imgUrl) note.type = 'NoteImg'
        else if (note.info.videoUrl) note.type = 'NoteVideo'
        else if (note.info.todos) note.type = 'NoteTodos'
        else note.type = 'NoteTxt'
    }

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
        setNoteToAdd((prevNote) => {
            if (field === 'noteTitle') {
                return { ...prevNote, noteTitle: value }
            }
            return { ...prevNote, info: { ...noteToEdit.info, [field]: value } }

        })
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
        console.log(noteToAdd)
        setNoteToAdd((prevNote) => ({ ...prevNote, info: { ...noteToAdd.info, [field]: value } }))
    }

    function handleInfoChangeForTodos({ target }, idx) {
        let { value, name: field, type } = target
        const todosNote = { ...noteToAdd }
        if (!todosNote.info.todos) todosNote.info.todos = []

        todosNote.info.todos[idx] = { txt: value, isChecked: false }

        console.log(noteToAdd)
        setNoteToAdd((prevNote) => ({ ...prevNote, info: { ...prevNote.info, todos: [...todosNote.info.todos].filter(todo => todo) } }))
    }

    function onSubmit(newNote, autoSubmit = false) {
        const noteToSave = (autoSubmit) ? newNote : noteToAdd
        // ev.preventDefault()
        // if (noteToAdd.noteTitle === '' && noteToAdd.info.txt === '') return console.log('empty note')
        setNoteType(noteToSave)
        noteService.save(noteToSave)
            .then(note => {
                console.log(note)
                console.log('Note added')
                showSuccessMsg('Note has been saved successfully')
                onClearForm()

                loadNotes()
                setNoteToAdd(noteService.getEmptyNote())
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg(`Problems saving note`)
            })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            })
            .catch(err => console.error('Error removing book:', err))
    }

    function onPinNote(note) {
        const noteToPin = { ...note, isPinned: !note.isPinned }
        noteService.save(noteToPin, noteToPin.isPinned)
            .then(() => loadNotes())
            .catch(err => console.error('Error pin a book:', err))
    }

    function onDuplicateNote(note) {
        const noteToDuplicate = { ...note, id: '', isPinned: false }
        noteService.save(noteToDuplicate)
            .then(() => {
                console.log('note duplicated')
                showSuccessMsg('Note has been duplicated successfully')
                loadNotes()
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg(`Problems duplicating note`)
            })

    }

    function handleChangeTextAreaDimensions(ev) {
        ev.target.style.height = 'auto'
        ev.target.style.height = ev.target.scrollHeight + 'px'
    }

    function onSetNoteStyle(color) {
        setNoteToAdd(prevNote => ({ ...prevNote, style: { backgroundColor: color } }))
    }

    const bgColor = noteToAdd.style.backgroundColor

    if (!notes) return <div>Loading....</div>

    return (
        <section className="main-note">
            <section className="keep-header">
                <button className="note-bars-btn"><img src="assets\img\menu.png" /></button>
                <div className="keep-logo">
                    <img src="assets\img\keeps.png" />
                    <span>Keep</span>
                </div>

                <NoteFilter onSetFilter={onSetFilter} filterBy={filterBy} handleFromClick={handleFromClick} />
            </section>

            <section className="search">
                {showFilterOption && (
                    <FilterOptions setFilterBy={setFilterBy} filterBy={filterBy} />
                )}
            </section>

            <section className="new-note">
                <div className="add-note-form collapsible-element" style={{ backgroundColor: bgColor }}>
                    <textarea
                        className="textarea-input"
                        type="text"
                        name="noteTitle"
                        id="title"
                        placeholder={`${isExpandedForm ? 'Title' : 'New note...'}`}
                        value={noteToAdd.noteTitle}
                        onChange={handleChange}
                        onClick={() => setIsExpandedForm(true)}
                        style={{ backgroundColor: bgColor }} />

                    {!isExpandedForm && <div className="actions-collapsed-form">
                        <div><img src="assets/img/check-box-icon.png"
                            onClick={(ev) => {
                                ev.stopPropagation();
                                setCmpType('NoteTodos');
                                setTodosCounter(prevCount => prevCount + 1);
                                setIsExpandedForm(true)
                            }} /></div>

                        <div><img src="assets/img/image-icon.png"
                            onClick={(ev) => {
                                ev.stopPropagation();
                                setCmpType('NoteImg');
                                setIsExpandedForm(true)
                            }} /></div>

                        <div><img src="assets/img/videocam-icon.png"
                            onClick={(ev) => {
                                ev.stopPropagation();
                                setCmpType('NoteVideo');
                                setIsExpandedForm(true)
                            }} /></div>
                    </div>}

                    {isExpandedForm && <section className="expanded-form">
                        <textarea
                            className="textarea-input"
                            type="text"
                            name="txt"
                            id="txt"
                            placeholder="New note..."
                            value={noteToAdd.info.txt || ''}
                            onChange={(ev) => { handleInfoChange(ev); handleChangeTextAreaDimensions(ev) }}
                            style={{ backgroundColor: bgColor }} />


                        <DynamicCmp
                            cmpType={cmpType}
                            handleChange={handleChange}
                            handleInfoChange={handleInfoChange}
                            handleInfoChangeForTodos={handleInfoChangeForTodos}
                            todosCounter={todosCounter}
                            setTodosCounter={setTodosCounter}
                            note={noteToAdd}
                            bgColor={bgColor} />


                        <div className="actions">
                            <div className="actions-toolbar">
                                <label
                                    title="Background color"
                                    onClick={() => setIsNoteStyle(isNoteStyle => !isNoteStyle)}>
                                    <i className="fa-solid fa-palette"></i>
                                </label>

                                <button
                                    type='button'
                                    title="Add image"
                                    onClick={() => { setCmpType('NoteImg'); setTodosCounter(0) }}>
                                    <i className="fa-solid fa-image"></i>
                                </button>

                                <button
                                    type='button'
                                    title="Add video"
                                    onClick={() => { setCmpType('NoteVideo'); setTodosCounter(0) }}>
                                    <i className="fa-solid fa-video">
                                    </i></button>

                                <button
                                    type='button'
                                    title="Todo list"
                                    onClick={() => { setCmpType('NoteTodos'); setTodosCounter(prevCount => prevCount + 1) }}>
                                    <i className="fa-regular fa-square-check"></i>
                                </button>
                            </div>
                            {isNoteStyle && <ColorInput onSetNoteStyle={onSetNoteStyle} bgColor={bgColor} />}
                            <button className="save-new-note-btn" onClick={onSubmit}>Save</button>
                        </div>
                    </section>
                    }
                </div>

                <NotePreview
                    notes={notes}
                    onRemoveNote={onRemoveNote}
                    loadNotes={loadNotes}
                    onPinNote={onPinNote}
                    onDuplicateNote={onDuplicateNote}
                    setNoteType={setNoteType}
                    setNotes={setNotes} />

            </section>
        </section>
    )
}

function DynamicCmp(props) {
    switch (props.cmpType) {
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

function CreateNoteByTextbox({ handleChange, handleInfoChange }) {
    return (
        <Fragment>

        </Fragment>
    )
}



