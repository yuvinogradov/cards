import Modal from "../Modal";
import React, {CSSProperties, ReactChildren, ReactElement, ReactNode} from "react";

type ModalQuestionPropsType = {
    show: boolean;

    setTrue: () => void;
    setFalse: () => void;
    buttonStyles?: CSSProperties;
    trueStyles?: CSSProperties;
    falseStyles?: CSSProperties;
    buttonTrue?: ReactNode;
    buttonFalse?: ReactNode;

    enableBackground?: boolean;
    backgroundStyle?: CSSProperties;
    backgroundOnClick?: () => void;

    width: number;
    height: number;
    modalStyle?: CSSProperties;
    modalOnClick?: () => void;
    children?: string | ReactChildren | ReactElement;
}

const ModalQuestion = ({
                           setTrue,
                           setFalse,
                           buttonStyles,
                           trueStyles,
                           falseStyles,
                           buttonTrue = 'Yes',
                           buttonFalse = 'No',

                           enableBackground,
                           backgroundStyle,
                           backgroundOnClick = () => {
                           },

                           width,
                           height,
                           modalStyle,
                           modalOnClick = () => {
                           },

                           show,
                           children
                       }: ModalQuestionPropsType) => {

    return (
        <Modal
            enableBackground={enableBackground}
            backgroundOnClick={backgroundOnClick}
            backgroundStyle={backgroundStyle}

            width={width}
            height={height}
            modalOnClick={modalOnClick}
            modalStyle={modalStyle}

            show={show}
        >
            {children ? children : <>question Modal</>}
            <div
                style={{
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    ...buttonStyles,
                }}
            >
                <button onClick={setTrue} style={{...trueStyles}}>{buttonTrue}</button>
                <button onClick={setFalse} style={{...falseStyles}}>{buttonFalse}</button>
            </div>
        </Modal>
    )

}

export default ModalQuestion;