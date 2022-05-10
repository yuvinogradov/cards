import React, {useState} from 'react';
import Modal from './Modal';


type SimpleModalPropsType = {
    modalText?: string
    buttonText?: string
}

function ModalContainer(props: SimpleModalPropsType) {
    const [show, setShow] = useState(false)

    return (
        <>
            <button onClick={() => setShow(true)}>Simple modal</button>
            <Modal
                enableBackground={true}
                backgroundOnClick={() => setShow(false)}

                width={300}
                height={200}
                show={show}
            >
                {props.modalText || 'Simple Modal'}
                <div style={{marginTop: '5px'}}>
                    <button onClick={() => setShow(false)}>
                        {props.buttonText || 'Close'}
                    </button>
                </div>
            </Modal>
        </>
    );
}

export default ModalContainer;