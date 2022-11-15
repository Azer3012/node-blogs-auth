
import {createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../lib/axios'

export const fetchBlogsDashboard=createAsyncThunk(
    'dashboard/fetchBlogsDashboard',
     (params)=>{
        
        return instance.get('/blogs',{params}).then(response=>response.data)
    }
)

const initialState={
    list:[],
    loading:true,
    error:null,
    currentPage:1,
    total:0

}
const dashboardSlice=createSlice({
    name:'dashboard',
    initialState,
    reducers:{
        setCurrentPageDashboard:(state,action)=>{
            state.currentPage=action.payload
        },
        toggleLikeDashboard:(state,action)=>{
            const {userId,blogId}=action.payload;
            const blog=state.list.find(blog=>blog._id===blogId)
            if(blog?.likes?.includes(userId)){
                blog.likes=blog.likes.filter(likeId=>likeId!==userId)
                blog.likesCount--;
            }
            else{
                blog.likes.push(userId)
                blog.likesCount++
            }
          
        },
        
    },
    extraReducers:{
        [fetchBlogsDashboard.pending]:(state)=>{
            state.loading=true
        },
        [fetchBlogsDashboard.fulfilled]:(state,action)=>{
            state.loading=false
            state.list=action.payload.list
            state.total=action.payload.total

            

        },
        [fetchBlogsDashboard.rejected]:(state,action)=>{
            state.loading=false;
            state.list=[];
            state.error=action.error
        },
    }
})
export const {setCurrentPageDashboard,toggleLikeDashboard} =dashboardSlice.actions;
export default dashboardSlice.reducer