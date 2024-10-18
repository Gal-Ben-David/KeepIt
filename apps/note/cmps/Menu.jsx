const { useState } = React

export function Menu({ handleTypeChange, setShowFilterOption, isExpandedMenu, setIsExpandedMenu }) {

    return (

        <div className="menu" onClick={() => { setIsExpandedMenu(prevValue => !prevValue) }}>
            <i className="fa-regular fa-lightbulb"></i>
            {isExpandedMenu &&
                <ul className="menu-notes">
                    <li onClick={() => { handleTypeChange(''); setShowFilterOption(false) }}>Notes</li>
                </ul>}
        </div>
    )
}