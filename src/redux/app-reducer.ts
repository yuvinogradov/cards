
export type InitialStateType = {
    status: AppStatusType
    isInitialized: boolean
}

const initialState: InitialStateType = {
    status: 'loading',
    isInitialized: false
}
export type AppStatusType = 'idle' | 'loading' | 'sending' | 'failed'


type ActionTypes =
    | ReturnType<typeof setAppStatusAC>

export const appReducer = (state: InitialStateType = initialState, action: ActionTypes): InitialStateType => {

    switch (action.type) {

        case SET_APP_STATUS:
            return {
                ...state,
                status: action.status
            }

        default:
            return state
    }
}

const SET_APP_STATUS = 'SET-APP-STATUS'

export const setAppStatusAC = (status: AppStatusType) => ({
        type: SET_APP_STATUS,
        status
    }
)