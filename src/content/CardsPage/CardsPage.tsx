import React from 'react';
import style from '../styles/CardsPage.module.css'
import {CardType} from '../../api/API';
import CardItem from './CardItem';
import SearchContainer from '../../common/Search/SearchContainer';
import PaginationContainer from '../../common/Pagination/PaginationContainer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../../redux/store';
import {getCardsTC, setSortCardsAC} from '../../redux/cards-reducer';
import ModalInputContainer2 from '../../common/modals/input2/ModalInputContainer2';
import {AnswersType} from '../../common/modals/input2/ModalInput2';

type PacksPagePropsType = {
    title: string
    cards: Array<CardType>
    packId: string
    totalCardsCount: number
    createCard(packId: string, question: string, answer: string): void // fix args
    deleteCard(packId: string, cardId: string): void
    updateCard(packId: string, cardId: string, question: string, answer: string): void
}

export type AddCardFormStateType = {
    value: string
    error: string
    hide: boolean
    touched: boolean
}

function CardsPage(props: PacksPagePropsType) {

    const dispatch = useDispatch()
    const filter = useSelector((state: RootStateType): string => state.filterState.nameFilter)
    const sort = useSelector((state: RootStateType): string => state.cardsPage.params.sortCards)

    const setSort = () => {
        dispatch(setSortCardsAC())
        dispatch(getCardsTC(props.packId))
    }

    const cards = props.cards.filter(c => filter ? c.question.includes(filter) : true)
        .map(c => {
            return <CardItem {...c}
                             key={c._id}
                             deleteCallback={() => props.deleteCard(props.packId, c._id)}
                             updateCallback={(question, answer) =>
                                 props.updateCard(props.packId, c._id, question, answer)}
            />
        })

    const onModalSubmitHandler = (value: AnswersType) => {
        props.createCard(props.packId, value.field1.value || '', value.field2?.value || '')
    }

    return (
        <div className={style.cardsPageWrapper}>
            <h1 className={style.pageTitle}>{props.title}</h1>
            <div className={style.controlsContainer}>
                <div style={{alignSelf: 'flex-start', marginBottom: '5px'}}>
                    <SearchContainer
                        placeholder={'Search cards'}
                        showOnlyMyPacksCheckbox={false}
                    />
                </div>
                <div style={{alignSelf: 'flex-end', marginBottom: '5px'}}>
                    <PaginationContainer totalItems={props.totalCardsCount}/>
                </div>
            </div>
            <div className={style.table}>
                <div className={style.tableHeader}>
                    <div style={{width: '230px'}}>Description</div>
                    <div>
                        <span className={`${style.sortSettings} ${style.activeSetting}`}
                              onClick={setSort}>
                            {`Grade ${sort === '1grade' ? '↑' : '↓'}`}
                        </span></div>
                    <div className={style.sortSettings}
                    style={{marginLeft: '36px'}}>Updated</div>
                    <div className={style.sortSettings}
                    style={{marginLeft: '36px'}}>Created</div>
                    <div style={{marginLeft: 'auto'}}>
                        <ModalInputContainer2 buttonTitle={'Add Card'}
                                              modalText={'New card'}
                                              isMine={true}
                                              defaultAnswers={{
                                                  field1: {title: 'Question'},
                                                  field2: {title: 'Answer'},
                                              }}
                                              answerCallback={onModalSubmitHandler}
                        />
                    </div>
                </div>
                <ul>
                    {cards}
                </ul>
            </div>
        </div>
    )
}

export default CardsPage;
