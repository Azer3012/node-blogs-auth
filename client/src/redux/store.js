import {configureStore} from '@reduxjs/toolkit'
import userReducer from './features/UserSlice'
import blogsReducer from './features/blogsSlice'
import dashboardReducer from './features/dashBoardSlice'
export const store=configureStore({
    reducer:{
        user:userReducer,
        blogs:blogsReducer,
        dashboard:dashboardReducer
    }
})