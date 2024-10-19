export function NoteTag({ bgColor, handleChange }) {
    return (
        <div className="tag-input">
            <input
                type="text"
                name="tag"
                id="tag"
                placeholder="Enter tags separated by commas"
                onChange={handleChange}
                style={{ backgroundColor: bgColor || '#ffffff' }} />
        </div>
    )
}