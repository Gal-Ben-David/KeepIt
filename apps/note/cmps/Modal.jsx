const { Fragment } = React


export function Modal({ children, isOpen = false, onCloseModal = () => { } }) {

    if (!isOpen) return null
    return (
        <Fragment>
            <section onClick={onCloseModal} className='modal-backdrop'></section>
            <section className='modal-content'>
                <h1>Hi Modal</h1>
                {children}
                <button className='close-btn' onClick={onCloseModal}>X</button>
            </section>
        </Fragment>
    )
}