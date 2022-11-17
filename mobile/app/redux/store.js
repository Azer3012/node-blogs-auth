import {configureStore} from  '@reduxjs/toolkit'

import userReducer from'./features/userSlice'
import dashboardReducer from'./features/dashboardSlice'

export const store=configureStore({
    reducer:{
        user:userReducer,
        dashboard:dashboardReducer
    }
})

