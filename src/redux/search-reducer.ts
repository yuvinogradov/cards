import {SearchStateType} from "../common/Search/SearchContainer";

const SET_SEARCH_FILTERS_VALUE = 'SET_SEARCH_FILTERS_VALUE';

export type InitialStateType = {
    nameFilter: string
    onlyMyPacks: boolean
}

const initialState: InitialStateType = {
    nameFilter: "",
    onlyMyPacks: false
}

type ActionTypes =
    | ReturnType<typeof setFiltersAC>

export const searchReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {

        case SET_SEARCH_FILTERS_VALUE:
            return {
                ...state,
                nameFilter: action.payload.searchObject.nameFilter,
                onlyMyPacks: action.payload.searchObject.onlyMyPacks
            }

        default:
            return state
    }
}

export const setFiltersAC = (searchObject: SearchStateType) => ({
        type: SET_SEARCH_FILTERS_VALUE,
        payload: {
            searchObject,
        }
    }
)

