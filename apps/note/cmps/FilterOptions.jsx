export function FilterOptions({ setFilterBy, filterBy }) {

    function handleTypeChange(value) {
        console.log(filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, type: value }))
    }

    return (
        <section className="filter-options">
            <span>Types</span>
            <div className="option-types">
                <div className="images-option" onClick={() => handleTypeChange('NoteImg')}>
                    <i className="fa-regular fa-image"></i>
                    <span>Images</span>
                </div>
                <div className="videos-option" onClick={() => handleTypeChange('NoteVideo')}>
                    <i className="fa-brands fa-youtube"></i>
                    <span> Videos</span>
                </div>
            </div>
        </section>
    )
}