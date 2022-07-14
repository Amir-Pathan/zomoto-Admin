import {createStore,combineReducers,applyMiddleware} from 'redux'
import Logger from 'redux-logger'
import thunk from 'redux-thunk'
import userReducer from './user/reducer'

const reducers =combineReducers({
    user:userReducer
})

const store = createStore(reducers,applyMiddleware(Logger,thunk))

export default store

