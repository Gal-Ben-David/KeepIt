export function CreateNoteByTodos({ handleInfoChangeForTodos, todosCounter, note, bgColor, setTodosCounter }) {
    return (
        <div>

            {[...Array(todosCounter)].map((_, i) =>
                <div key={i}>
                    <button type='button' onClick={() => setTodosCounter(prevCount => prevCount + 1)}>+</button>
                    <input
                        type="text"
                        name="todos"
                        id="todos"
                        placeholder="List item"
                        onChange={handleInfoChangeForTodos}
                        onClick={(event) => { event.stopPropagation() }}
                        style={{ backgroundColor: bgColor || '#ffffff' }} />
                </div>
            )}
        </div>
    )
}