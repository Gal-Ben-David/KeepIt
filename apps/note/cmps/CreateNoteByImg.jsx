export function CreateNoteByImg({ handleInfoChange, note, bgColor }) {
    return (
        <div className="url-input">
            <input
                type="text"
                name="imgUrl"
                id="imgUrl"
                placeholder="Enter an image url"
                value={note.info.imgUrl || ''}
                onChange={handleInfoChange}
                style={{ backgroundColor: bgColor || '#ffffff' }} />
        </div>
    )
}