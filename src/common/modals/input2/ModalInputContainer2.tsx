import React, {useState} from 'react';
import ModalInput2, {AnswersType} from './ModalInput2';

export type ModalInputContainerPropsType = {
    buttonTitle?: string
    modalText?: string
    isMine: boolean
    defaultAnswers: AnswersType
    answerCallback?: (answers: AnswersType) => void;
}

function ModalInputContainer2(props: ModalInputContainerPropsType) {

    const [show, setShow] = useState(false);

    const setAnswerHandler = ({field1, field2, field3}: AnswersType) => {
        props.answerCallback && props.answerCallback({
            field1: field1,
            field2: field2,
            field3: field3
        })
    }

    const modalInputProps: any = {
        show: show,
        close: () => setShow(false),
        modalText: props.modalText,
        answers: props.defaultAnswers,
        setAnswer: setAnswerHandler,
        enableBackground: true,
        backgroundOnClick: () => setShow(false),
        width: 300,
        height: 200,
    }

    return (
        <>
            <div>
                <button onClick={() => setShow(true)}
                        disabled={!props.isMine}
                >{props.buttonTitle || 'Modal Input'}
                </button>
            </div>
            <ModalInput2 {...modalInputProps}>
            </ModalInput2>
        </>
    );
}

export default ModalInputContainer2;