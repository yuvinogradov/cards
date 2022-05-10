import {cardsAPI, CardType} from '../api/API';
import {setAppStatusAC} from './app-reducer';
import {ThunkAction} from 'redux-thunk';
import {RootStateType} from './store';
import {Action} from 'redux';
import {setAuthTC} from './auth-reducer';

type PageStateType = {
    packTitle: string
    cards: Array<CardType>
    totalCardsCount: number
    itemsPerPage: number
    currentPage: number
    params: GetCardsParamsType
}

export type GetCardsParamsType = {
    cardName?: string
    min?: number
    max?: number
    page?: number
    pageCount: number
    sortCards: '1grade' | '0grade'
}

const initialState: PageStateType = {
    packTitle: 'Pack',
    cards: [],
    totalCardsCount: 0,
    itemsPerPage: 5,
    currentPage: 1,
    params: {
        page: 1,
        pageCount: 10,
        sortCards: '1grade',
    }
}

type ActionTypes =
    | ReturnType<typeof setCardsAC>
    | ReturnType<typeof setSortCardsAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setItemsPerPageAC>
    | ReturnType<typeof setTotalCardsCountAC>
    | ReturnType<typeof setPackTitleAC>


export const cardsReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'SET-CARDS':
            return {...state, cards: action.cards}

        case 'SET-SORT-CARDS':
            return {
                ...state, params: {
                    ...state.params, sortCards: state.params.sortCards === '1grade' ? '0grade' : '1grade'
                }
            }

        case 'SET-PACK-TITLE':
            return {...state, packTitle: action.title}

        case 'SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}

        case 'SET-ITEMS-PER-PAGE':
            return {...state, itemsPerPage: action.itemsPerPage}

        case 'SET-TOTAL-CARDS-COUNT':
            return {...state, totalCardsCount: action.totalCardsCount}

        default:
            return state
    }
}

const SET_CARDS = 'SET-CARDS'
const SET_SORT_CARDS = 'SET-SORT-CARDS'
const SET_PACK_TITLE = 'SET-PACK-TITLE'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_ITEMS_PER_PAGE = 'SET-ITEMS-PER-PAGE'
const SET_TOTAL_CARDS_COUNT = 'SET-TOTAL-CARDS-COUNT'

export const setCardsAC = (cards: Array<CardType>) => (
    {type: SET_CARDS, cards} as const
)
export const setPackTitleAC = (title: string) => (
    {type: SET_PACK_TITLE, title} as const
)
export const setCurrentPageAC = (currentPage: number) => (
    {type: SET_CURRENT_PAGE, currentPage} as const
)
export const setItemsPerPageAC = (itemsPerPage: number) => (
    {type: SET_ITEMS_PER_PAGE, itemsPerPage} as const
)
export const setTotalCardsCountAC = (totalCardsCount: number) => (
    {type: SET_TOTAL_CARDS_COUNT, totalCardsCount} as const
)
export const setSortCardsAC = () => (
    {type: SET_SORT_CARDS} as const
)

// Thunks

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootStateType,
    unknown,
    Action<string>>

export const getCardsTC = (packId: string, pagination = true): AppThunk =>
    (dispatch, getState) => {
        dispatch(setAppStatusAC('loading'))
        const params = pagination ? getState().pagination : {pageCount: 1000}
        const sortCards = getState().cardsPage.params.sortCards
        cardsAPI.getCards(packId, {...params, sortCards})
            .then((response) => {
                dispatch(setCardsAC(response.cards))
                dispatch(setTotalCardsCountAC(response.cardsTotalCount))
            })
            .catch(e => {
                console.log(e)
                dispatch(setAuthTC())
            })
            .finally(() => dispatch(setAppStatusAC('idle')))
    }

export const createCardTC = (packId: string, question: string, answer: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    console.log("sgdfgsfg: ", packId, question, answer)
    cardsAPI.createCard({question: question || 'New Card', answer, cardsPack_id: packId})
        .then(() => dispatch(getCardsTC(packId)))
        .catch(e => {
            console.log(e)
            dispatch(setAuthTC())
        })
        .finally(() => {
            dispatch(setAppStatusAC('idle'))
        })
}

export const deleteCardTC = (packId: string, cardId: string, pagination = true): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    cardsAPI.deleteCard(cardId)
        .then(() => dispatch(getCardsTC(packId, pagination)))
        .catch(e => {
            console.log(e)
            dispatch(setAuthTC())
        })
        .finally(() => dispatch(setAppStatusAC('idle')))
}

export const updateCardTC = (packId: string, cardId: string, question: string = 'updated', answer: string): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        cardsAPI.updateCard(cardId, question, answer)
            .then(() => dispatch(getCardsTC(packId)))
            .catch(e => {
                console.log(e)
                dispatch(setAuthTC())
            })
            .finally(() => dispatch(setAppStatusAC('idle')))
    }