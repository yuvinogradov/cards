import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk';
import {authReducer} from './auth-reducer';
import {recoverReducer} from './recover-reducer';
import {registrationReducer} from './registration-reducer';
import {appReducer} from './app-reducer';
import {searchReducer} from './search-reducer';
import {paginationReducer} from './pagination-reducer';
import {packsReducer} from './packs-reducer';
import {cardsReducer} from './cards-reducer';
import {learnReducer} from './learn-reducer';

export const rootReducer = combineReducers({
    appState: appReducer,
    auth: authReducer,
    pageRecover: recoverReducer,
    pageRegistration: registrationReducer,
    filterState: searchReducer,
    pagination: paginationReducer,
    packsPage: packsReducer,
    cardsPage: cardsReducer,
    learnPage: learnReducer
})

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export type RootStateType = ReturnType<typeof rootReducer>

export default store