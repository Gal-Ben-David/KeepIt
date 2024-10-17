export function ColorInput({ onSetNoteStyle, bgColor }) {

    const colors = [
        '#FAAFA8',
        '#F39F76',
        '#FFF8B8',
        '#E2F6D3',
        '#B4DDD3',
        '#AECCDC',
        '#D3BFDB',
        '#F6E2DD',
        '#E9E3D4',
        '#EFEFF1'
    ]

    return (
        <section className="color-input">
            <div className="items-container">
                <div
                    className={`item no-color ${bgColor === '#ffffff' ? 'chosen' : ''}`}
                    key='#ffffff'
                    style={{ backgroundColor: '#ffffff' }}
                    onClick={() => onSetNoteStyle('#ffffff')}>
                    <i className="fa-solid fa-droplet-slash"></i>
                </div>

                {colors.map(color => (
                    <div
                        key={color}
                        className={`item ${bgColor === color ? 'chosen' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onSetNoteStyle(color)}
                    ></div>
                ))}
            </div>
        </section >
    )
}