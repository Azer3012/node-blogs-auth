import { useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import helpers from "../helpers/helpers";
import { toggleLikeMyBlog } from "../redux/features/blogSlice";
import { toggleLikeDashboard } from "../redux/features/dashboardSlice";


const useLike=(blog,routeName)=>{
  const route=useRoute()
  console.log(route.name);
   
    const user= useSelector((state) => state.user.currentUser);
  
    const likeActions=routeName=="dashboard"?toggleLikeDashboard:toggleLikeMyBlog
   
  
    const dispath=useDispatch()
    const isIlikedBlog=blog?.likes?.includes(user?._id)
  
  
    const handleLike=async(id)=>{
      try {
        
          dispath(likeActions({blogId:id,userId:user._id}))
        await helpers.api().put(`/blogs/${id}/like`)
        
      } catch (error) {
        console.log(error);
      }
    }
  
    return [isIlikedBlog,handleLike]
      
  }
  
  export default useLike;