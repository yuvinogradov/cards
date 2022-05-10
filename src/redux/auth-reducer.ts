import store from './store';
import {authAPI} from '../api/API';
import {setAppStatusAC} from './app-reducer';

const SET_IS_LOGGED_IN = 'SET-IS-LOGGED-IN'
const SET_PROFILE = 'SET-PROFILE'

type PageStateType = {
    isLoggedIn: boolean
    profile: AuthProfileType | null
}

const initialState: PageStateType = {
    isLoggedIn: false,
    profile: null
}

export type AuthProfileType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;

    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;

    error?: string;
}

export type DispatchType = typeof store.dispatch

type ActionTypes =
    | ReturnType<typeof setIsLoggedInAC>
    | ReturnType<typeof setProfileAC>

export const authReducer = (state: PageStateType = initialState, action: ActionTypes): PageStateType => {

    switch (action.type) {

        case SET_IS_LOGGED_IN:
            return {...state, isLoggedIn: action.isLoggedIn}

        case SET_PROFILE:
            return {...state, profile: action.profile}

        default:
            return state
    }
}


const setIsLoggedInAC = (isLoggedIn: boolean) => ({
        type: SET_IS_LOGGED_IN,
        isLoggedIn
    } as const
)

const setProfileAC = (profile: AuthProfileType) => ({
    type: SET_PROFILE,
    profile
}) as const

// Thunks

export const setAuthTC = () => (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.me()
        .then((response) => {
            dispatch(setProfileAC(response))
            dispatch(setIsLoggedInAC(true))
        })
        .catch(e => {
            console.log('Error: ', {...e})
            dispatch(setIsLoggedInAC(false))
        })
        .finally(() => dispatch(setAppStatusAC('idle')))
}

export const logInTC = (login: string, password: string, rememberMe: boolean) => (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(login, password, rememberMe)
        .then((response) => {
            dispatch(setProfileAC(response))
            dispatch(setIsLoggedInAC(true))
        })
        .catch(e => console.log('Error: ', {...e}))
        .finally(() => dispatch(setAppStatusAC('idle')))
}

export const logOutTC = () => (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then(response => {
            dispatch(setIsLoggedInAC(false))
        })
        .catch(e => console.log(e))
        .finally(() => dispatch(setAppStatusAC('idle')))
}

export const setNewPasswordTC = (password: string, resetPasswordToken: string) => (dispatch: DispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.setNewPassword(password, resetPasswordToken)
        .then(response => {
            dispatch(setIsLoggedInAC(false))
        })
        .catch(e => console.log(e))
        .finally(() => dispatch(setAppStatusAC('idle')))
}
