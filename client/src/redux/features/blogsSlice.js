import {createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../lib/axios'

export const fetchBlogs=createAsyncThunk(
    'blogs/fetchBlogs',
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
const blogsSlice=createSlice({
    name:'blogs',
    initialState,
    reducers:{
        setCurrentPage:(state,action)=>{
            state.currentPage=action.payload
        }
    },
    extraReducers:{
        [fetchBlogs.pending]:(state)=>{
            state.loading=true
        },
        [fetchBlogs.fulfilled]:(state,action)=>{
            state.loading=false
            state.list=action.payload.list
            state.total=action.payload.total

            

        },
        [fetchBlogs.rejected]:(state,action)=>{
            state.loading=false;
            state.list=[];
            state.error=action.error
        },
    }
})
export const {setCurrentPage} =blogsSlice.actions;
export default blogsSlice.reducer