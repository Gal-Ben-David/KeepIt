export function NoteTag({ bgColor, handleInfoChange, note }) {
    return (
        <div className="tag-input">
            <input
                type="text"
                name="tag"
                id="tag"
                placeholder="Enter tags separated by commas"
                value={note.labels.length !== 0 ? note.labels.join(',') : ''}
                onChange={handleInfoChange}
                style={{ backgroundColor: bgColor || '#ffffff' }} />
        </div>
    )
}