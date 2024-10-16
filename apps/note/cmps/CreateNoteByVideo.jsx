export function CreateNoteByVideo({ handleInfoChange, note, bgColor }) {
    return (
        <input
            type="text"
            name="videoUrl"
            id="videoUrl"
            placeholder="Enter a video url"
            value={note.info.videoUrl || ''}
            onChange={handleInfoChange}
            style={{ backgroundColor: bgColor || '#ffffff' }} />
    )
}
