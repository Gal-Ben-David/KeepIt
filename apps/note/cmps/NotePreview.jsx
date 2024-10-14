export function NotePreview({ notes, onRemoveNote }) {

    return (
        <ul className="notes">
            {notes.map(note =>
                <li key={note.id}>
                    <h2>{note.noteTitle}</h2>
                    <p>{note.info.txt}</p>
                    <button onClick={() => onRemoveNote(note.id)}>Delete</button>
                </li>
            )}

        </ul>
    )
}