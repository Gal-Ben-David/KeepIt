import { noteService } from '../services/note.service.js'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { FilterOptions } from '../cmps/FilterOptions.jsx'
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"

const { useState, useEffect, Fragment, Link } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [showFilterOption, setShowFilterOption] = useState(false)
    const [cmpType, setCmpType] = useState('NoteTxt')
    const [todosCounter, setTodosCounter] = useState(0)

    useEffect(() => {
        loadNotes()
    }, [filterBy])

    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF';
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

    function onSetNoteType(type) {
        noteToAdd.type = type
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

    function onSubmit(ev) {
        ev.preventDefault()
        if (noteToAdd.noteTitle === '' && noteToAdd.info.txt === '') return console.log('empty note')
        else {
            noteService.save(noteToAdd)
                .then(note => {
                    console.log(note)
                    console.log('Note added')
                    showSuccessMsg('Note has been saved successfully')
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
                <form className="add-note-form" onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="noteTitle"
                        id="title"
                        placeholder="Title"
                        onChange={handleChange} />
                    <input
                        type="text"
                        name="txt"
                        id="txt"
                        placeholder="New note..."
                        onChange={handleInfoChange} />

                    <DynamicCmp cmpType={cmpType} handleChange={handleChange} handleInfoChange={handleInfoChange} todosCounter={todosCounter} />

                    <div className="actions">
                        <div className="actions-toolbar">
                            <label htmlFor="color-input"><i className="fa-solid fa-palette"></i></label>
                            <input
                                type="color"
                                className="control-color"
                                id="color-input"
                                name="style"
                                onChange={handleChange} />

                            <button
                                type='button'
                                title="Add image"
                                onClick={() => { setCmpType('NoteImg'); onSetNoteType('NoteImg') }}>
                                <i className="fa-solid fa-image"></i>
                            </button>

                            <button
                                type='button'
                                onClick={() => { setCmpType('NoteVideo'); onSetNoteType('NoteVideo') }}>
                                <i className="fa-solid fa-video">
                                </i></button>

                            <button
                                type='button'
                                onClick={() => { setCmpType('NoteTodos'); onSetNoteType('NoteTodos'); setTodosCounter(prevCount => prevCount + 1) }}>
                                <i className="fa-regular fa-square-check"></i>
                            </button>
                        </div>
                        <button className="save-new-note-btn">Save</button>
                    </div>


                </form>

                <NotePreview
                    notes={notes}
                    onRemoveNote={onRemoveNote}
                    loadNotes={loadNotes}
                    onPinNote={onPinNote}
                    onDuplicateNote={onDuplicateNote} />

            </section>
        </section>
    )
}

function DynamicCmp(props) {
    switch (props.cmpType) {
        case 'NoteTxt':
            return <CreateNoteByTextbox {...props} />
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

function CreateNoteByImg({ handleInfoChange }) {
    return (
        <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            placeholder="Enter an image url"
            onChange={handleInfoChange} />
    )
}

function CreateNoteByVideo({ handleInfoChange }) {
    return (
        <input
            type="text"
            name="videoUrl"
            id="videoUrl"
            placeholder="Enter a video url"
            onChange={handleInfoChange} />
    )
}

function CreateNoteByTodos({ handleInfoChange, todosCounter }) {
    return (
        <div>
            {console.log([...Array(todosCounter)])}
            {[...Array(todosCounter)].map((_, i) =>
                <div key={i}>
                    <button type='button' onClick={() => setTodosCounter(prevCount => prevCount++)}>+</button>
                    <input
                        type="text"
                        name="dotos"
                        id="todos"
                        placeholder="List item"
                        onChange={handleInfoChange} />
                </div>
            )}
        </div>
    )
}
