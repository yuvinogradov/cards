import React, {useEffect, useState} from 'react';
import {CardType} from '../../api/API';
import style from '../styles/LearnPage.module.css'
import {useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import {Redirect} from 'react-router-dom';
import AnswerButton from './AnswerButton';

type LearnPagePropsType = {
    title: string
    card: CardType
    amount: number
    index: number
    smartMode: boolean
    isMine: boolean
    toggleMode(): void
    getNextCard(): void
    deleteCard(cardId: string): void
    setGrade(card_id: string, grade: number): void
}

function LearnPage({title, card, isMine, amount, index, smartMode, toggleMode, getNextCard, deleteCard, setGrade}: LearnPagePropsType) {

    const appStatus = useSelector((state: RootStateType): string => state.appState.status)
    const isLoggedIn = useSelector((state: RootStateType): boolean => state.auth.isLoggedIn)

    let [show, setShow] = useState(false)
    let [answer, setAnswer] = useState(0)

    useEffect(() => {
        setShow(false)
        setAnswer(0)
    }, [index])

    const answerHandler = (buttonId: number) => {
        setAnswer(buttonId)
        setGrade(card._id, buttonId)
    }

    const refreshCard = () => {
        setAnswer(0)
        setShow(s => !s)
    }

    const nextButtonStyle = `${style.nextButton} ${amount === 1 && !answer? style.nextButtonDisabled: ''}`
    const titleStyle = `${card ? style.cardsCount : style.packEmpty} ${!smartMode && index === amount ? style.lastCard : ''}`
    const cardsCountDisplay = card || appStatus !== 'idle' ? `${index}/${amount}` : 'Pack is empty'
    const smartModeStyle = {color: smartMode ? 'CadetBlue' : 'Salmon'}

    return (
        appStatus === 'idle' && !isLoggedIn
            ? <Redirect to={'/login'}/>
            : <div className={style.pageContainer}>
                <h1>{title}</h1>

                {!card
                    ? <h2 className={titleStyle}>{cardsCountDisplay}</h2>
                    :
                <div className={style.cardContainer}>
                <h2 className={style.modeTitle}
                             onClick={toggleMode}>
                    <span style={{marginRight: '5px'}}>Smart random</span>
                    <span style={smartModeStyle}>{smartMode ? 'ON' : 'OFF'}</span>
                </h2>
                <h2 className={titleStyle}>{cardsCountDisplay}</h2>
                    <div className={style.card}>
                        <span className={style.question}>{card.question}</span>
                        {isMine && <span className={style.delete}
                              onClick={() => deleteCard(card._id)}>Delete card
                        </span>}
                        {show
                            ? <div className={style.answerContainer}>
                                <span className={style.answer}>{card.answer}</span>
                                <div className={style.buttonsBlock}>
                                    <AnswerButton buttonId={1}
                                                  color={'Maroon'}
                                                  answerId={answer}
                                                  answerHandler={answerHandler}/>
                                    <AnswerButton buttonId={2}
                                                  color={'Salmon'}
                                                  answerId={answer}
                                                  answerHandler={answerHandler}/>
                                    <AnswerButton buttonId={3}
                                                  color={'Orange'}
                                                  answerId={answer}
                                                  answerHandler={answerHandler}/>
                                    <AnswerButton buttonId={4}
                                                  color={'CadetBlue'}
                                                  answerId={answer}
                                                  answerHandler={answerHandler}/>
                                    <AnswerButton buttonId={5}
                                                  color={'LimeGreen'}
                                                  answerId={answer}
                                                  answerHandler={answerHandler}/>
                                </div>
                            </div>
                            : <button className={style.checkButton} onClick={() => setShow(!show)}>
                                Check
                            </button>
                        }
                    </div>
                    <button className={nextButtonStyle}
                            disabled={amount === 1 && !answer}
                            onClick={amount > 1 ? getNextCard : refreshCard}>
                        <span>{amount > 1 ? 'Next' : 'Again?'}</span>
                    </button>
                </div>
                }
            </div>
    )
}

export default LearnPage;
