import { FilterOptions } from './FilterOptions.jsx'

const { useState, useEffect, Link } = React

export function NoteFilter({ filterBy, onSetFilter, handleFromClick }) {

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
            <form className="form-filter" onClick={handleFromClick}>
                <button className="search-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
                <input
                    onChange={handleChange}
                    value={noteTitle}
                    type="search"
                    name="txt"
                    id="note-title"
                    placeholder="Search" />
            </form>
        </section>
    )
}