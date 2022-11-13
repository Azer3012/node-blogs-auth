import { useSelector,useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import instance from "../lib/axios";
import { toggleLike } from "../redux/features/blogsSlice";
import { toggleLikeDashboard } from "../redux/features/dashBoardSlice";
const useLike=(blog)=>{

  const location=useLocation()
  const user= useSelector((state) => state.user.currentUser);

  const likeAction=location.pathname==="/dashboard"?toggleLikeDashboard:toggleLike

  const dispath=useDispatch()
  const isIlikedBlog=blog?.likes?.includes(user._id)


  const handleLike=async(id)=>{
    try {
      
        dispath(likeAction({blogId:id,userId:user._id}))
      await instance.put(`/blogs/${id}/like`)
      
    } catch (error) {
      console.log(error);
    }
  }

  return [isIlikedBlog,handleLike]
    
}

export default useLike;