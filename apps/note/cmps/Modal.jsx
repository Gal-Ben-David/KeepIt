const { Fragment } = React


export function Modal({ children, isOpen = false, onCloseModal = () => { }, bgColor }) {

    if (!isOpen) return null
    return (
        <Fragment>
            <section onClick={onCloseModal} className='modal-backdrop'></section>
            <section className='modal-content'>
                {children}
                {/* <button className='close-btn' onClick={onCloseModal}>X</button> */}
            </section>
        </Fragment>
    )
}