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
        },
        changePhoto:(state,action)=>{
            state.currentUser={...state.currentUser,image:action.payload}
        }
    },
})

export const {setUser,setLoading,changePhoto}=UserSlice.actions

export default UserSlice.reducer