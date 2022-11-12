import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/UserSlice'
import blogsReducer from './features/blogsSlice'
export const store=configureStore({
    reducer:{
        user:userReducer,
        blogs:blogsReducer
    }
})