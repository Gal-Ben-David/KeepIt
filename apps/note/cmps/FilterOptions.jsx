export function FilterOptions({ setFilterBy, filterBy }) {

    function handleTypeChange(value) {
        console.log(filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, type: value }))
    }

    return (
        <section className="filter-options">
            <div className="filter-options-header">
                <span>Types</span>
                <button className="clear-filter-btn" onClick={() => handleTypeChange('')}>Clear</button>
            </div>

            <div className="option-types">
                <div className="images-option" onClick={() => handleTypeChange('NoteImg')}>
                    <i className="fa-regular fa-image"></i>
                    <span>Images</span>
                </div>

                <div className="videos-option" onClick={() => handleTypeChange('NoteVideo')}>
                    <i className="fa-brands fa-youtube"></i>
                    <span> Videos</span>
                </div>

                <div className="videos-option" onClick={() => handleTypeChange('NoteTodos')}>
                    <i className="fa-regular fa-square-check"></i>
                    <span> Todos</span>
                </div>

                <div className="videos-option" onClick={() => handleTypeChange('NoteDrawing')}>
                    <i className="fa-solid fa-pencil"></i>
                    <span> Drawings</span>
                </div>
            </div>
        </section>
    )
}