import {cardsAPI, CardType} from '../api/API';
import {ThunkAction} from 'redux-thunk';
import {RootStateType} from './store';
import {Action} from 'redux';
import {setAppStatusAC} from './app-reducer';
import {setAuthTC} from './auth-reducer';

type PageStateType = {
    packTitle: string
    cards: Array<CardType>
    cardId: string
    grade: number
    cardIndex: number
}

const initialState: PageStateType = {
    packTitle: 'Pack',
    cards: [],
    cardId: '',
    grade: 0,
    cardIndex: 0
}

type ActionTypes =
    | ReturnType<typeof updateCardGradeAC>


export const learnReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'UPDATE-CARD-GRADE':
            return {
                ...state, cards: state.cards.map(
                    c => c._id === action.cardId ? {...c, grade: action.grade} : c
                )
            }

        default:
            return state
    }
}

const UPDATE_CARD_GRADE = 'UPDATE-CARD-GRADE'

export const updateCardGradeAC = (cardId: string, grade: number) => (
    {type: UPDATE_CARD_GRADE, cardId, grade} as const
)

// Thunks

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootStateType,
    unknown,
    Action<string>>

export const sendGradeTC = (card_id: string, grade: number): AppThunk =>
    (dispatch) => {
        dispatch(setAppStatusAC('sending'))
        cardsAPI.sendGrade(card_id, grade)
            .then((response) => {
                dispatch(updateCardGradeAC(card_id, response.grade))
            })
            .catch(e => {
                console.log(e)
                dispatch(setAuthTC())
            })
            .finally(() => dispatch(setAppStatusAC('idle')))
    }