export function CreateNoteByImg({ handleInfoChange, note }) {
    return (
        <input
            type="text"
            name="imgUrl"
            id="imgUrl"
            placeholder="Enter an image url"
            value={note.info.imgUrl || ''}
            onChange={handleInfoChange} />
    )
}