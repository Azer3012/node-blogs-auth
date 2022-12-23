import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../lib/axios";
export const fetchUsers=createAsyncThunk('chat/fetchUsers',()=>{
    return instance.get('/users').then(response=>response.data)
})


export const fetchMessages=createAsyncThunk('chat/fetchMessages',(userId)=>{
    return instance.get(`messages/${userId}`).then(response=>response.data)
})

export const readMessages=createAsyncThunk('chat/readMessages',(userId)=>{
    return instance.put(`messages/${userId}/read`)
})




const initialState={
    users:{
        list:[],
        total:0,
        error:null,
        loading:true

    },
    messages:{}
    
    
}

const chatSlice=createSlice({
    name:'chat',
    initialState,
    reducers:{
        setUserOnline:(state,action)=>{
            const {userId,isOnline}=action.payload;
            const user=state.users.list.find(u=>u._id===userId)
            user.online=isOnline
        },
        incrementUnreadMesages:(state,action)=>{
            const userId=action.payload;
            const user=state.users.list.find(u=>u._id===userId)
            user.unreadMessages++;
        },
        resetUnreadMesages:(state,action)=>{
            const userId=action.payload;
            const user=state.users.list.find(u=>u._id===userId)
            user.unreadMessages=0;
        },
        newMessage:(state,action)=>{
            const {userId,message}=action.payload;
            const messages=state.messages[userId] || []
            messages.push(message)
            state.messages[userId]=messages
        }
    },
    extraReducers:builder=>{

        //fecthusers
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


        //fetch messages
        builder.addCase(fetchMessages.pending, state => {
            
        });
        builder.addCase(fetchMessages.fulfilled, (state,action) => {
            // state.messages[action.payload]

            const userId=action.meta.arg

           const messages=action.payload;
           state.messages[userId]=messages
        });
        builder.addCase(fetchMessages.rejected, (state,action) => {
           
        });

        //read messages
        builder.addCase(readMessages.pending, state => {
            
        });
        builder.addCase(readMessages.fulfilled, (state,action) => {
            const userId=action.meta.arg;
            const user=state.users.list.find(u=>u._id===userId)
            user.unreadMessages=0;
        });
        builder.addCase(readMessages.rejected, (state,action) => {
           
        });

        
        
    }
})

export const {setUserOnline,newMessage,incrementUnreadMesages,resetUnreadMesages}=chatSlice.actions;
export default chatSlice.reducer;