import React, {CSSProperties, ReactChildren, ReactElement, ReactNode, useState} from 'react';
import Modal from '../Modal';

export type FieldType = {
    title?: string,
    value?: string
}
export type AnswersType = {
    field1: FieldType
    field2?: FieldType
    field3?: FieldType
}

export type ModalInputPropsType = {
    show: boolean;
    close: () => void;

    modalText?: string
    buttonTitle?: string
    answers: AnswersType;
    setAnswer?: (answers: AnswersType) => void;

    inputContainerStyles?: CSSProperties;
    inputStyles?: CSSProperties;
    buttonStyles?: CSSProperties;
    button?: ReactNode;

    enableBackground?: boolean;
    backgroundStyle?: CSSProperties;
    backgroundOnClick?: () => void;

    width: number;
    height: number;
    modalStyle?: CSSProperties;
    modalOnClick?: () => void;
    children?: string | ReactChildren | ReactElement | (string | ReactChildren | ReactElement)[];
}

function ModalInput2({
                         modalText,
                         answers,
                         setAnswer = (answers) => {
                         },

                         inputContainerStyles,
                         inputStyles,
                         buttonStyles,
                         button = 'OK',

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
                         close,
                         children,
                     }: ModalInputPropsType) {
    const [answerData, setAnswerData] = useState(answers);

    const successCloseModal = () => {
        setAnswer(answerData);
        setAnswerData({field1: {}, field2: {}, field3: {}});
        close();
    };

    return (
        <div>
            <Modal
                enableBackground={enableBackground}
                backgroundOnClick={() => {
                    setAnswerData(answers);
                    backgroundOnClick()
                }}
                backgroundStyle={backgroundStyle}

                width={width}
                height={height}
                modalOnClick={modalOnClick}
                modalStyle={modalStyle}

                show={show}
            >
                {modalText || 'question modal'}
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        flexFlow: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        ...inputContainerStyles,
                    }}
                >
                    <input
                        value={answerData.field1.value}
                        placeholder={answers.field1.title}
                        style={{...inputStyles}}
                        onChange={e => setAnswerData({
                            ...answerData,
                            field1: {...answerData.field1, value: e.currentTarget.value}
                        })}
                    />
                    {answers?.field2 && (
                        <input
                            value={answerData.field2?.value}
                            placeholder={answers.field2.title}
                            style={{...inputStyles}}
                            onChange={e => setAnswerData({
                                ...answerData,
                                field2: {...answerData.field2, value: e.currentTarget.value}
                            })}
                        />
                    )}

                    {answers?.field3 && (
                        <input
                            value={answerData.field3?.value}
                            placeholder={answers.field3.title}
                            style={{...inputStyles}}
                            onChange={e => setAnswerData({
                                ...answerData,
                                field3: {...answerData.field3, value: e.currentTarget.value}
                            })}
                        />
                    )}

                </div>
                <button onClick={successCloseModal}
                        style={{padding: '8px 25px', ...buttonStyles}}>{button}</button>
            </Modal>
        </div>
    );
}

export default ModalInput2;