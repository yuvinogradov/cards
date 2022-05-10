import {ReactNode, useState} from "react";
import ModalQuestion from "./ModalQuestion";

export type ModalQuestionContainerPropsType = {
    buttonTitle?: string
    modalText?: string
    isMine: boolean
    answerCallback?: (answer: boolean) => void;
    children?: ReactNode
}

const ModalQuestionContainer = (
    {
        buttonTitle = 'ModalQuestion',
        modalText,
        answerCallback = () => {
        },
        isMine,
        children
    }: ModalQuestionContainerPropsType) => {

    const [show, setShow] = useState(false);
    const [answer, setAnswer] = useState(false);

    const setTrue = () => {
        setAnswer(true);
        setShow(false);
        answerCallback(true)

    };
    const setFalse = () => {
        setAnswer(false);
        setShow(false);
        answerCallback(false)
    };


    return (
        <>
            <div>
                <button onClick={() => setShow(true)}
                        disabled={!isMine}>{buttonTitle}</button>
            </div>

            <ModalQuestion
                show={show}

                setTrue={setTrue}
                setFalse={setFalse}

                enableBackground={true}
                backgroundOnClick={() => setShow(false)}

                width={300}
                height={200}
            >
                <>
                    {modalText}
                    {children ? children : ''}
                </>
            </ModalQuestion>
        </>
    );
};

export default ModalQuestionContainer;