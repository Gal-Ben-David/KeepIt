export function CreateNoteByTodos({ handleInfoChangeForTodos, todosCounter, note, bgColor, setTodosCounter }) {
    return (
        <div >

            {[...Array(todosCounter)].map((_, i) => {
                return (<div className="todo-list" key={i}>
                    {console.log(note.info.todos)}
                    <button type='button' onClick={() => setTodosCounter(prevCount => prevCount + 1)}>+</button>
                    <input
                        type="text"
                        name="todos"
                        id="todos"
                        placeholder="List item"
                        value={note.info.todos && note.info.todos[i] !== undefined ? note.info.todos[i].txt : ''}
                        onChange={(ev) => handleInfoChangeForTodos(ev, i)}
                        onClick={(event) => { event.stopPropagation() }}
                        style={{ backgroundColor: bgColor || '#ffffff' }} />
                </div>)
            })}
        </div>
    )
}