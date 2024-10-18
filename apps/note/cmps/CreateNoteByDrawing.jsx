import { Modal } from '../cmps/Modal.jsx'
import { Canvas } from '../cmps/Canvas.jsx'

export function CreateNoteByDrawing({ note, setIsExpandedForm, setNoteToAdd, isDrawingModalOpen, closeDrawingModal, setDrawingUrl, isAddingNote, setNoteToEdit }) {

    return (

        <Modal isOpen={isDrawingModalOpen} onCloseModal={closeDrawingModal}>
            <Canvas
                setNoteToAdd={setNoteToAdd}
                closeDrawingModal={closeDrawingModal}
                setIsExpandedForm={setIsExpandedForm}
                setDrawingUrl={setDrawingUrl}
                isAddingNote={isAddingNote}
                setNoteToEdit={setNoteToEdit}
                note={note} />
        </Modal>
    )
}

{/* <div className="url-input">
<input
    type="text"
    name="drawingUrl"
    id="imgUrl"
    placeholder="Enter an image url"
    value={note.info.drawingUrl || ''}
    onChange={handleInfoChange}
    style={{ backgroundColor: bgColor || '#ffffff' }} />
</div> */}