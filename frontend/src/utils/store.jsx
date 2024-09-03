import {configureStore, combineReducers} from '@reduxjs/toolkit'
import userReducer from './UserSlice'
import storage from 'redux-persist/lib/storage'
import {persistReducer} from 'redux-persist'

const persistConfig = {
  key: "root",
  version: 1,
  storage
}

const reducer =  combineReducers({
  user: userReducer
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  devTools: true // MAKE THIS TRUE IN PROD !!!
})

export default store;