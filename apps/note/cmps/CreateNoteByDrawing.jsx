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