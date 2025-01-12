import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { FilterOptions } from '../cmps/FilterOptions.jsx'
import { CreateNoteByImg } from '../cmps/CreateNoteByImg.jsx'
import { CreateNoteByVideo } from '../cmps/CreateNoteByVideo.jsx'
import { CreateNoteByTodos } from '../cmps/CreateNoteByTodos.jsx'
import { ColorInput } from '../cmps/ColorInput.jsx'
import { showErrorMsg, showSuccessMsg } from "../../../services/event-bus.service.js"
import { getTruthyValues } from "../../../services/util.service.js"
import { CreateNoteByDrawing } from "../../note/cmps/CreateNoteByDrawing.jsx"
import { Menu } from "../../note/cmps/Menu.jsx"
import { NoteTag } from "../../note/cmps/NoteTag.jsx"

const { useState, useEffect, useRef } = React
const { useSearchParams } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [noteToAdd, setNoteToAdd] = useState(noteService.getEmptyNote())
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(noteService.getFilterFromSearchParams(searchParams))
    const [showFilterOption, setShowFilterOption] = useState(false)
    const [cmpType, setCmpType] = useState('NoteTxt')
    const [todosCounter, setTodosCounter] = useState(0)
    const [isNoteStyle, setIsNoteStyle] = useState(false)
    const [isExpandedForm, setIsExpandedForm] = useState(false)
    const [isDrawingModalOpen, setIsDrawingModalOpen] = useState(false)
    const [isExpandedMenu, setIsExpandedMenu] = useState(false)

    const noteToAddRef = useRef(noteToAdd)

    useEffect(() => {
        setSearchParams(getTruthyValues(filterBy))
        loadNotes()
    }, [filterBy])

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

            if (noteToAddRef.current.noteTitle || noteToAddRef.current.info.txt || noteToAddRef.current.info.drawingUrl ||
                noteToAddRef.current.info.imgUrl || noteToAddRef.current.info.videoUrl || noteToAddRef.current.info.todos) {
                onSubmit(noteToAddRef.current, true)
            }
            resetValues()
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
        const noteToCheck = { ...note }
        noteToCheck.type = []
        if (noteToCheck.info.imgUrl) noteToCheck.type.push('NoteImg')
        if (noteToCheck.info.videoUrl) noteToCheck.type.push('NoteVideo')
        if (noteToCheck.info.todos && note.info.todos.length !== 0) noteToCheck.type.push(note.type = 'NoteTodos')
        if (noteToCheck.info.drawingUrl) noteToCheck.type.push('NoteDrawing')
        if (noteToCheck.info.txt || noteToCheck.noteTitle) noteToCheck.type.push('NoteTxt')
        return noteToCheck
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

        setNoteToAdd((prevNote) => {
            if (field === 'imgUrl') {
                value = value.trim()
            }
            if (field === 'videoUrl') {
                value = value.trim()
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
        const todosNote = { ...noteToAdd }
        if (!todosNote.info.todos) todosNote.info.todos = []

        todosNote.info.todos[idx] = { txt: value, isChecked: false }

        setNoteToAdd((prevNote) => ({ ...prevNote, info: { ...prevNote.info, todos: [...todosNote.info.todos].filter(todo => todo.txt) } }))
    }

    function onSubmit(newNote, autoSubmit = false) {
        const noteToSave = (autoSubmit) ? newNote : noteToAdd
        console.log(noteToSave)

        const noteToSubmit = { ...setNoteType(noteToSave) }
        noteService.save(noteToSubmit)
            .then(note => {
                console.log(note)
                console.log('Note added')
                showSuccessMsg('Note has been saved successfully')
                onClearForm()
                loadNotes()

                setIsExpandedForm(false)
                resetValues()
                setNoteToAdd(noteService.getEmptyNote())
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg(`Problems saving note`)
            })
    }

    function resetValues() {
        setCmpType('NoteTxt')
        setIsNoteStyle(false)
        setTodosCounter(0)
        setNoteToAdd(noteService.getEmptyNote())
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

    function onToggleIsPinned() {
        setNoteToAdd((prevNote) => ({ ...prevNote, isPinned: !prevNote.isPinned }))
    }

    function renderImgOrVideo(element, urlType) {
        return (
            <div className="edit-video-or-img">
                {element}
                <button className="delete-btn" type='button' onClick={() => onRemoveUrl(urlType)}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        )
    }

    function onRemoveUrl(urlType) {
        const updatedInfo = { ...noteToAdd.info }
        if (urlType === 'img') {
            if (updatedInfo.imgUrl) {
                delete updatedInfo.imgUrl
                setNoteToAdd(prevNote => ({ ...prevNote, info: { ...updatedInfo } }))
            } else if (updatedInfo.drawingUrl) {
                delete updatedInfo.drawingUrl
                setNoteToAdd(prevNote => ({ ...prevNote, info: { ...updatedInfo } }))
            }
        } else if (urlType === 'video') {
            delete updatedInfo.videoUrl
            setNoteToAdd(prevNote => ({ ...prevNote, info: { ...updatedInfo } }))
        }
        setNoteToAdd((prevNote) => ({ ...prevNote, info: { ...updatedInfo } }))
    }

    function onSetNoteStyle(color) {
        setNoteToAdd(prevNote => ({ ...prevNote, style: { backgroundColor: color } }))
    }

    function closeDrawingModal() {
        setIsDrawingModalOpen(false)
    }

    function handleTypeChange(value) {
        setFilterBy(prevFilter => ({ ...prevFilter, type: value }))
    }

    const bgColor = noteToAdd.style.backgroundColor

    if (!notes) return <div className="loader"></div>

    return (
        <section className="main-note">
            <section className="keep-header">
                <NoteFilter onSetFilter={onSetFilter} filterBy={filterBy} handleFromClick={handleFromClick} />
            </section>

            <section className="menu-and-notes">

                <Menu
                    setShowFilterOption={setShowFilterOption}
                    isExpandedMenu={isExpandedMenu}
                    setIsExpandedMenu={setIsExpandedMenu}
                    handleTypeChange={handleTypeChange} />
                <div>
                    {showFilterOption &&
                        <section className="search">
                            <FilterOptions setFilterBy={setFilterBy} filterBy={filterBy} handleTypeChange={handleTypeChange} />
                        </section>}

                    <section className="new-note">
                        <div className="add-note-form collapsible-element" style={{ backgroundColor: bgColor }}>

                            <div className="add-video-or-img">
                                {isExpandedForm && noteToAdd.info.imgUrl && renderImgOrVideo(<img src={noteToAdd.info.imgUrl} />, 'img')}
                                {isExpandedForm && noteToAdd.info.videoUrl && renderImgOrVideo(<iframe src={noteToAdd.info.videoUrl} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
                                </iframe>, 'video')}
                                {isExpandedForm && noteToAdd.info.drawingUrl && renderImgOrVideo(<img src={noteToAdd.info.drawingUrl} />, 'img')}
                            </div>

                            <div className="info-area">
                                {isExpandedForm && <button
                                    className={`pin-btn-adding-form ${(noteToAdd.isPinned ? 'pinned' : '')}`}
                                    onClick={(ev) => { ev.stopPropagation(); onToggleIsPinned() }}>
                                    {noteToAdd.isPinned ? <img src="assets/img/pin-full.png" /> : <img src="assets/img/pin-empty.png" />}
                                </button>}

                                <textarea
                                    className="textarea-input"
                                    type="text"
                                    name="noteTitle"
                                    id="title"
                                    placeholder={`${isExpandedForm ? 'Title' : 'New note...'}`}
                                    value={noteToAdd.noteTitle}
                                    onChange={handleInfoChange}
                                    onClick={() => setIsExpandedForm(true)}
                                    style={{ backgroundColor: bgColor }} />

                                {!isExpandedForm && <div className="actions-collapsed-form">
                                    <div><img src="assets/img/check-box-icon.png"
                                        onClick={(ev) => {
                                            ev.stopPropagation()
                                            setCmpType('NoteTodos')
                                            setTodosCounter(prevCount => prevCount + 1);
                                            setIsExpandedForm(true)
                                        }} /></div>

                                    <div><img src="assets/img/image-icon.png"
                                        onClick={(ev) => {
                                            ev.stopPropagation()
                                            setCmpType('NoteImg')
                                            setIsExpandedForm(true)
                                        }} /></div>

                                    <div><img src="assets/img/brush.png"
                                        onClick={(ev) => {
                                            ev.stopPropagation()
                                            setCmpType('NoteDrawing')
                                            setIsExpandedForm(true)
                                            setIsDrawingModalOpen(true)
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
                                        handleInfoChange={handleInfoChange}
                                        handleInfoChangeForTodos={handleInfoChangeForTodos}
                                        todosCounter={todosCounter}
                                        setTodosCounter={setTodosCounter}
                                        note={noteToAdd}
                                        setNoteToAdd={setNoteToAdd}
                                        bgColor={bgColor}
                                        isDrawingModalOpen={isDrawingModalOpen}
                                        closeDrawingModal={closeDrawingModal}
                                        setIsExpandedForm={setIsExpandedForm}
                                        isAddingNote={true}
                                    />


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

                                            <button
                                                type='button'
                                                title="Drawing"
                                                onClick={() => { setCmpType('NoteDrawing'); setIsDrawingModalOpen(true) }}>
                                                <i className="fa-solid fa-paintbrush"></i>
                                            </button>

                                            <button
                                                type='button'
                                                title="Tag"
                                                onClick={() => { setCmpType('NoteTag') }}>
                                                <i className="fa-solid fa-tag"></i>
                                            </button>
                                        </div>
                                        {isNoteStyle && <ColorInput onSetNoteStyle={onSetNoteStyle} bgColor={bgColor} />}
                                        <button className="save-new-note-btn" onClick={onSubmit}>Save</button>
                                    </div>

                                </section>
                                }
                            </div>
                        </div>

                        <NoteList
                            notes={notes}
                            onRemoveNote={onRemoveNote}
                            loadNotes={loadNotes}
                            onPinNote={onPinNote}
                            onDuplicateNote={onDuplicateNote}
                            setNoteType={setNoteType}
                            setNotes={setNotes}
                        />

                    </section>
                </div>
            </section>

        </section>
    )
}

function DynamicCmp(props) {
    switch (props.cmpType) {
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


