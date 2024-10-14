export function NotePreview({ notes }) {

    return (
        <ul className="notes">
            {notes.map(note =>
                <li key={note.id}>
                    <h2>{note.noteTitle}</h2>
                    <p>{note.info.txt}</p>
                </li>
            )}

        </ul>
    )
}