const { useState } = React

export function Menu({ handleTypeChange, setShowFilterOption, isExpandedMenu, setIsExpandedMenu }) {

    return (

        <div className="menu" onClick={() => { setIsExpandedMenu(prevValue => !prevValue); handleTypeChange(); setShowFilterOption(false) }}>
            <i className="fa-regular fa-note-sticky"></i>
            {isExpandedMenu &&
                <ul className="menu-notes">
                    <li>Notes</li>
                </ul>}
        </div>
    )
}