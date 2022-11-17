import {createSlice} from '@reduxjs/toolkit'


const initialState={
    currentUser:null,
    loading:true

}

const UserSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.currentUser=action.payload
        },
        setLoading:(state,action)=>{
            state.loading=action.payload
        }
    },

})

export const {setUser,setLoading}=UserSlice.actions

export default UserSlice.reducer