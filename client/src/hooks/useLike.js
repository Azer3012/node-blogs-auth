import { useSelector,useDispatch } from "react-redux";
import instance from "../lib/axios";
import { toggleLike } from "../redux/features/blogsSlice";
const useLike=(blog)=>{

  const user= useSelector((state) => state.user.currentUser);


  const dispath=useDispatch()
  const isIlikedBlog=blog?.likes?.includes(user._id)


  const handleLike=async(id)=>{
    try {
        dispath(toggleLike({blogId:id,userId:user._id}))
      await instance.put(`/blogs/${id}/like`)
      
    } catch (error) {
      console.log(error);
    }
  }

  return [isIlikedBlog,handleLike]
    
}

export default useLike;