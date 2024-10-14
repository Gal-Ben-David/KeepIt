const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    //console.log('filterByToEdit:', filterByToEdit)

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        console.log(filterByToEdit)
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    const { noteTitle, info } = filterByToEdit

    return (
        <section className="note-filter">
            <form>
                <input
                    onChange={handleChange}
                    value={noteTitle}
                    type="text"
                    name="txt"
                    id="note-title"
                    placeholder="Search" />

                {/* <label htmlFor="book-price">Price</label>
                <input
                    onChange={handleChange}
                    value={info || ''}
                    type="number"
                    name="info"
                    id="book-price"
                    placeholder="Search by price" /> */}
            </form>
        </section>
    )
}