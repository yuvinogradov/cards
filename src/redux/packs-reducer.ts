import {GetPacksResponseType, packsAPI} from '../api/API';
import {setAppStatusAC} from './app-reducer';
import {ThunkAction} from 'redux-thunk';
import {RootStateType} from './store';
import {Action} from 'redux';
import {setAuthTC} from './auth-reducer';

type PageStateType = {
    packs: Array<GetPacksResponseType>
    totalPacksCount: number
    currentPage: number
    params: GetPacksParamsType
}

export type GetPacksParamsType = {
    packName?: string
    min?: number
    max?: number
    page: number
    user_id?: string
    pageCount: number
    sortPacks: '1created' | '0created' | '1updated' | '0updated'
}

const initialState: PageStateType = {
    packs: [],
    totalPacksCount: 0,
    currentPage: 1,
    params: {
        page: 1,
        pageCount: 10,
        sortPacks: '0updated',
    }
}

type ActionTypes =
    | ReturnType<typeof setPacksAC>
    | ReturnType<typeof setSortPacksAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalPacksCountAC>


export const packsReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case 'SET-PACKS':
            return {...state, packs: action.packs}

        case 'SET-CURRENT-PAGE':
            return {...state, currentPage: action.currentPage}

        case 'SET-TOTAL-PACKS-COUNT':
            return {...state, totalPacksCount: action.totalPacksCount}

        case 'SET-SORT-PACKS':
            return {
                ...state,
                params: {
                    ...state.params,
                    sortPacks: action.sort === 'created'
                        ? state.params.sortPacks === '1created'
                            ? '0created' : '1created'
                        : state.params.sortPacks === '1updated'
                            ? '0updated' : '1updated'
                }
            }

        default:
            return state
    }
}

const SET_PACKS = 'SET-PACKS'
const SET_SORT_PACKS = 'SET-SORT-PACKS'
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE'
const SET_TOTAL_PACKS_COUNT = 'SET-TOTAL-PACKS-COUNT'

export const setPacksAC = (packs: Array<GetPacksResponseType>) => (
    {type: SET_PACKS, packs} as const
)
export const setCurrentPageAC = (currentPage: number) => (
    {type: SET_CURRENT_PAGE, currentPage} as const
)
export const setTotalPacksCountAC = (totalPacksCount: number) => (
    {type: SET_TOTAL_PACKS_COUNT, totalPacksCount} as const
)
export const setSortPacksAC = (sort: 'updated' | 'created') => (
    {type: SET_SORT_PACKS, sort} as const
)

// Thunks

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootStateType,
    unknown,
    Action<string>>

export const getPacksTC = (): AppThunk =>
    (dispatch, getState) => {
        dispatch(setAppStatusAC('loading'))
        const params = getState().pagination
        const sortPacks = getState().packsPage.params.sortPacks
        const packName = getState().filterState.nameFilter
        let user_id = undefined
        if (getState().filterState.onlyMyPacks) {
            user_id = getState().auth.profile?._id
        }
        packsAPI.getPacks({...params, sortPacks, packName, user_id})
            .then((response) => {
                dispatch(setPacksAC(response.cardPacks))
                dispatch(setTotalPacksCountAC(response.cardPacksTotalCount))
            })
            .catch(e => {
                console.log(e)
                dispatch(setAuthTC())
            })
            .finally(() => dispatch(setAppStatusAC('idle')))
    }

export const createPackTC = (name: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.createPack(name)
        .then(() => dispatch(getPacksTC()))
        .catch(e => {
            console.log(e)
            dispatch(setAuthTC())
        })
        .finally(() => dispatch(setAppStatusAC('idle')))
}

export const deletePackTC = (id: string): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.deletePack(id)
        .then(() => dispatch(getPacksTC()))
        .catch(e => {
            console.log(e)
            dispatch(setAuthTC())
        })
        .finally(() => dispatch(setAppStatusAC('idle')))
}

export const updatePackTC = (id: string, newName: string = 'UPDATED Pack'): AppThunk => (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    packsAPI.updatePack(id, newName)
        .then(() => dispatch(getPacksTC()))
        .catch(e => {
            console.log(e)
            dispatch(setAuthTC())
        })
        .finally(() => dispatch(setAppStatusAC('idle')))
}