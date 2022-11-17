import {configureStore} from  '@reduxjs/toolkit'

import userReducer from'./features/userSlice'
import dashboardReducer from'./features/dashboardSlice'
import myBlogReducer from'./features/blogSlice'

export const store=configureStore({
    reducer:{
        user:userReducer,
        dashboard:dashboardReducer,
        myBlogs:myBlogReducer
    }
})

