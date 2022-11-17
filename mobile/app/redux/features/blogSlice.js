import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import helpers from "../../helpers/helpers";







const initialState={
    list:[],
    loading:true,
    error:null,

}

const MyBlogSlice=createSlice({
    name:'myBlogs',
    initialState,
    reducers:{
        toggleLikeMyBlog:(state,action)=>{
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
        setMyBlogList:(state,action)=>{
            state.list=action.payload
            state.loading=false
        }
    },
   
})

export const {toggleLikeMyBlog,setMyBlogList} = MyBlogSlice.actions
export default MyBlogSlice.reducer