import { Modal } from '../cmps/Modal.jsx'
import { Canvas } from '../cmps/Canvas.jsx'

export function CreateNoteByDrawing({ setIsExpandedForm, setNoteToAdd, isDrawingModalOpen, closeDrawingModal, setDrawingUrl }) {

    return (

        <Modal isOpen={isDrawingModalOpen} onCloseModal={closeDrawingModal}>
            <Canvas
                setNoteToAdd={setNoteToAdd}
                closeDrawingModal={closeDrawingModal}
                setIsExpandedForm={setIsExpandedForm}
                setDrawingUrl={setDrawingUrl} />
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