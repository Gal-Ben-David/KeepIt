const { useState } = React

export function LongTxt({ children, length = 100 }) {
    const [isShowLong, setIsShowLong] = useState(false)

    function onToggleIsShowLong() {
        setIsShowLong(isShowLong => !isShowLong)
    }

    const isLongText = children.length > length
    const textToShow = (isShowLong || !isLongText) ? children : (children.substring(0, length)) + '...'
    return (
        <section className="long-txt">
            <p className="txt">{textToShow}</p>
            {isLongText &&
                <div>
                    <button className="show-txt-btn" onClick={onToggleIsShowLong}>
                        {isShowLong ? 'Show Less' : 'Read More'}
                    </button>
                </div>
            }
        </section>
    );
}