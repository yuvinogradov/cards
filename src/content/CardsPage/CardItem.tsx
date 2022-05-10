import React, {useEffect, useState} from 'react';
import style from '../styles/CardItem.module.css'
import {CardType} from '../../api/API';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import ModalQuestionContainer from "../../common/modals/question/ModalQuestionContainer";
import ModalInputContainer2 from "../../common/modals/input2/ModalInputContainer2";
import {AnswersType} from "../../common/modals/input2/ModalInput2";

type CardItemPropsType = {
    deleteCallback(): void
    updateCallback(question: string, answer: string): void
}

function CardItem(props: CardType & CardItemPropsType) {

    const myId = useSelector((state: RootStateType) => state.auth.profile?._id)
    const itemIsMine = props.user_id === myId

    let [delay, setDelay] = useState(true)

    useEffect(() => {
        const timerId = setTimeout(() => setDelay(false), 100)
        return () => clearTimeout(timerId)
    }, [delay])

    const updated = new Date(props.updated)
        .toLocaleDateString("en-UE", {hour12: false, hour: 'numeric', minute: 'numeric'});

    const created = new Date(props.created)
        .toLocaleDateString("en-UE", {hour12: false, hour: 'numeric', minute: 'numeric'});

    const deleteHandler = (answer: boolean) => {
        if (answer) {
            props.deleteCallback()
        }
    }

    const inputHandler = (value: AnswersType) => {
        props.updateCallback(value.field1.value || 'Updated card', value.field2?.value || 'Empty answer')
    }

    return (
        <li style={delay ? {} : {opacity: '1.0'}}>
            <div className={`${style.cardItem} ${itemIsMine || style.itemIsNotMine}`}>
                <div className={style.descriptionBlock}>
                    <div className={style.cardDescription}>{props.question}</div>
                </div>
                <div className={style.count}>
                    {Math.round((props.grade + Number.EPSILON) * 100) / 100}</div>
                <div className={style.updated}>{updated}</div>
                <div className={style.created}>{created}</div>
                <div className={style.buttonsBlock}>
                    <ModalQuestionContainer buttonTitle={'Delete'}
                                            isMine={itemIsMine}
                                            answerCallback={deleteHandler}>
                        <>
                            <div style={{fontSize: '2em'}}>{props.question}</div>
                            <div>Delete card?</div>
                        </>
                    </ModalQuestionContainer>
                    <ModalInputContainer2 buttonTitle={'Update'}
                                          modalText={'Enter new name'}
                                          isMine={itemIsMine}
                                          defaultAnswers={{
                                              field1: {title: 'Question', value: props.question},
                                              field2: {title: 'Answer', value: props.answer},
                                          }}
                                          answerCallback={inputHandler}
                    />
                </div>
            </div>
        </li>
    )
}

export default CardItem;
