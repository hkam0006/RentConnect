import {configureStore} from '@reduxjs/toolkit'
import userReducer from './UserSlice'

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: true // MAKE THIS TRUE IN PROD !!!
})

export default store;