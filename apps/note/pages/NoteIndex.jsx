import { noteService } from '../services/note.service.js'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { FilterOptions } from '../cmps/FilterOptions.jsx'
import { CreateNoteByImg } from '../cmps/CreateNoteByImg.jsx'
import { CreateNoteByVideo } from '../cmps/CreateNoteByVideo.jsx'
import { CreateNoteByTodos } from '../cmps/CreateNoteByTodos.jsx'
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect, Fragment, Link } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [showFilterOption, setShowFilterOption] = useState(false)
    const [cmpType, setCmpType] = useState('NoteTxt')
    const [todosCounter, setTodosCounter] = useState(0)
    // const [noteAddingFormStyle, setNoteAddingFormStyle] = useState({
    //     backgroundColor: '#000000'
    // })

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF'
    }, [])

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

            case 'color':
                value = { backgroundColor: value }
                break

        }
        setNoteToAdd((prevNote) => ({ ...prevNote, [field]: value }))
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

    function handleInfoChangeForTodos({ target }) {
        let { value, name: field, type } = target
        const todosNote = { ...noteToAdd }
        if (!todosNote.info.todos) todosNote.info.todos = []

        todosNote.info.todos[todosCounter] = { txt: value, isChecked: false }

        console.log(noteToAdd)
        setNoteToAdd((prevNote) => ({ ...prevNote, info: { ...prevNote.info, todos: [...todosNote.info.todos] } }))
    }

    function onSubmit() {
        // ev.preventDefault()
        if (noteToAdd.noteTitle === '' && noteToAdd.info.txt === '') return console.log('empty note')
        else {
            setNoteType(noteToAdd)
            noteService.save(noteToAdd)
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
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            })
            .catch(err => console.error('Error removing book:', err))
    }

    function onPinNote(note) {
        const noteToPin = { ...note, isPinned: true }
        noteService.remove(note.id)
            .then(() => {
                noteService.save(noteToPin, true)
                    .then(() => loadNotes())
            })
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
                <div className="add-note-form" style={{ backgroundColor: bgColor }}>
                    <input
                        type="text"
                        name="noteTitle"
                        id="title"
                        placeholder="Title"
                        value={noteToAdd.noteTitle}
                        onChange={handleChange}
                        style={{ backgroundColor: bgColor }} />
                    <input
                        type="text"
                        name="txt"
                        id="txt"
                        placeholder="New note..."
                        value={noteToAdd.info.txt || ''}
                        onChange={handleInfoChange}
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
                            <label title="Background color" htmlFor="color-input"><i className="fa-solid fa-palette"></i></label>
                            <input
                                type="color"
                                className="control-color"
                                id="color-input"
                                name="style"
                                onChange={handleChange} />

                            <button
                                type='button'
                                title="Add image"
                                onClick={() => { setCmpType('NoteImg') }}>
                                <i className="fa-solid fa-image"></i>
                            </button>

                            <button
                                type='button'
                                title="Add video"
                                onClick={() => { setCmpType('NoteVideo') }}>
                                <i className="fa-solid fa-video">
                                </i></button>

                            <button
                                type='button'
                                title="Todo list"
                                onClick={() => { setCmpType('NoteTodos'); setTodosCounter(prevCount => prevCount + 1) }}>
                                <i className="fa-regular fa-square-check"></i>
                            </button>
                        </div>
                        <button className="save-new-note-btn" onClick={onSubmit}>Save</button>
                    </div>


                </div>

                <NotePreview
                    notes={notes}
                    onRemoveNote={onRemoveNote}
                    loadNotes={loadNotes}
                    onPinNote={onPinNote}
                    onDuplicateNote={onDuplicateNote}
                    setNoteType={setNoteType} />

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



