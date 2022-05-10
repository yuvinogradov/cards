import React, {useEffect, useState} from 'react';
import LearnPage from './LearnPage';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import {useParams} from 'react-router-dom';
import {deleteCardTC, getCardsTC} from '../../redux/cards-reducer';
import {sendGradeTC} from '../../redux/learn-reducer';

type ParamsType = {
    id: string | undefined
    title: string | undefined
    isMine: string | undefined
}

function LearnPageContainer() {

    const dispatch = useDispatch()
    const params: ParamsType = useParams()
    const title = params.title ? params.title : 'Pack'
    const packId = params.id ? params.id : ''
    const isMine = params.isMine? params.isMine === '1' : false

    const cards = useSelector((state: RootStateType) => state.cardsPage.cards)
    let [index, setIndex] = useState(0)
    let [smartMode, setMode] = useState(false)
    let card = cards[index]

    useEffect(() => {
        dispatch(getCardsTC(packId, false))
        window.history.replaceState(null, '', `/#/learn/${title}`)
    }, [dispatch, packId, title])

    const setGrade = (card_id: string, grade: number) => {
        dispatch(sendGradeTC(card_id, grade))
    }

    const getNextSimple = () => setIndex(i => index + 1 >= cards.length? 0 : i + 1)

    const getNextSmart = () => {
        const sum = cards.reduce((acc, card) => acc + (6 - card.grade)**2, 0)
        const rand = Math.random() * sum
        const res = cards.reduce((acc: {sum: number, id: number}, card, i) => {
            const newSum = acc.sum + (6 - card.grade) ** 2
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }, {sum: 0, id: -1})
        setIndex( res.id + 1)
    }

    const deleteCard = (cardId: string) => {
        dispatch(deleteCardTC(packId, cardId,false))
    }

    return (
        <LearnPage title={title}
                   card={card}
                   index={index + 1}
                   isMine={isMine}
                   amount={cards.length}
                   smartMode={smartMode}
                   toggleMode={() => setMode(m => !m)}
                   getNextCard={smartMode? getNextSmart : getNextSimple}
                   deleteCard={deleteCard}
                   setGrade={setGrade}
        />
    )
}

export default LearnPageContainer;
