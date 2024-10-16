export function CreateNoteByTodos({ handleInfoChange, todosCounter, note }) {
    return (
        <div>
            {console.log([...Array(todosCounter)])}
            {[...Array(todosCounter)].map((_, i) =>
                <div key={i}>
                    <button type='button' onClick={() => setTodosCounter(prevCount => prevCount++)}>+</button>
                    <input
                        type="text"
                        name="dotos"
                        id="todos"
                        placeholder="List item"
                        onChange={handleInfoChange} />
                </div>
            )}
        </div>
    )
}