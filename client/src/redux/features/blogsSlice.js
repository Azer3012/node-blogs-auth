import {createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import instance from '../../lib/axios'

export const fetchBlogs=createAsyncThunk(
    'blogs/fetchBlogs',
     ()=>{
        
        return instance.get('/blogs').then(response=>response.data)
    }
)

const initialState={
    list:[],
    loading:true,
    error:null
}
const blogsSlice=createSlice({
    name:'blogs',
    initialState,
    reducers:{

    },
    extraReducers:{
        [fetchBlogs.pending]:()=>{},
        [fetchBlogs.fulfilled]:(state,action)=>{
            state.loading=false
            state.list=action.payload
            

        },
        [fetchBlogs.rejected]:(state,action)=>{
            state.loading=false;
            state.list=[];
            state.error=action.error
        },
    }
})

export default blogsSlice.reducer