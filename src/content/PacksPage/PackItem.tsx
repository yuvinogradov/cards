import React, {useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import style from '../styles/PackItem.module.css'
import {GetPacksResponseType} from '../../api/API';
import {useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import ModalQuestionContainer from '../../common/modals/question/ModalQuestionContainer';
import ModalInputContainer2 from '../../common/modals/input2/ModalInputContainer2';
import {AnswersType} from '../../common/modals/input2/ModalInput2';
import cardsIcon from '../../common/images/cardsIcon.png'
import learnIcon from '../../common/images/learnIcon.png'

type PackItemPropsType = {
    deleteCallback(): void
    updateCallback(name: string): void
}

function PackItem(props: GetPacksResponseType & PackItemPropsType) {

    const myId = useSelector((state: RootStateType) => state.auth.profile?._id)
    const itemIsMine = props.user_id === myId

    let [delay, setDelay] = useState(true)

    useEffect(() => {
        const timerId = setTimeout(() => setDelay(false), 100)
        return () => clearTimeout(timerId)
    }, [delay])

    const updated = new Date(props.updated)
        .toLocaleDateString('en-UE', {hour12: false, hour: 'numeric', minute: 'numeric'})
        .split(',').join('')

    const created = new Date(props.updated)
        .toLocaleDateString('en-UE', {hour12: false, hour: 'numeric', minute: 'numeric'})
        .split(',').join('')

    const deleteHandler = (answer: boolean) => {
        if (answer) {
            props.deleteCallback()
        }
    }

    const inputHandler = (value: AnswersType) => {
        props.updateCallback(value.field1.value || 'Updated pack')
    }

    return (
        <li style={delay ? {} : {opacity: '1.0'}}>
            <div className={style.packItem}>
                <div className={style.nameBlock}>
                    <span className={`${style.packName} ${itemIsMine || style.itemIsNotMine}`}>
                        {props.name}
                    </span>
                    <span className={style.userName}>{props.user_name}</span>
                </div>
                <div className={`${style.count} ${props.cardsCount === 0 && style.emptyPack}`}>
                    {props.cardsCount}
                </div>
                <div className={style.updated}>{updated}</div>
                <div className={style.created}>{created}</div>
                <div className={style.buttonsBlock}>
                    <ModalQuestionContainer buttonTitle={'Delete'}
                                            modalText={'Delete pack?'}
                                            isMine={itemIsMine}
                                            answerCallback={deleteHandler}/>
                    <ModalInputContainer2 buttonTitle={'Update'}
                                          modalText={'Enter new name'}
                                          isMine={itemIsMine}
                                          defaultAnswers={{
                                              field1: {title: 'Pack Name', value: props.name},
                                          }}
                                          answerCallback={inputHandler}
                    />
                </div>
                <div className={style.cardsLink}>
                    <NavLink to={`/cards/${props._id}/${encodeURI(props.name)}`}>
                        <img src={cardsIcon} alt="Cards"/>
                        <span className={style.tooltip}>Cards</span>
                    </NavLink>
                </div>
                <div className={style.learnLink}>
                    <NavLink to={`/learn/${props._id}/${props.name}/${itemIsMine ? 1 : 0}`}>
                        <img src={learnIcon} alt="Learn"/>
                        <span className={style.tooltip}>Study</span>
                    </NavLink>
                </div>
            </div>
        </li>
    )
}

export default PackItem;