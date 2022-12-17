import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../lib/axios";
export const fetchUsers=createAsyncThunk('chat/fetchUsers',()=>{
    return instance.get('/users').then(response=>response.data)
})




const initialState={
    users:{
        list:[],
        total:0,
        error:null,
        loading:true

    },
    
    
}

const chatSlice=createSlice({
    name:'chat',
    initialState,
    reducers:{},
    extraReducers:builder=>{
        builder.addCase(fetchUsers.pending, state => {
            
        });
        builder.addCase(fetchUsers.fulfilled, (state,action) => {
            state.users.list=action.payload.users;
            state.users.total=action.payload.total;
            state.users.loading=false;
            state.users.error=null
        });
        builder.addCase(fetchUsers.rejected, (state,action) => {
            state.users.loading=false;
            state.users.error=action.error
        });
        
        
    }
})

export default chatSlice.reducer;