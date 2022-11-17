import { useDispatch, useSelector } from "react-redux";
import helpers from "../helpers/helpers";
import { toggleLikeDashboard } from "../redux/features/dashboardSlice";


const useLike=(blog)=>{

   
    const user= useSelector((state) => state.user.currentUser);
  
    
  
    const dispath=useDispatch()
    const isIlikedBlog=blog?.likes?.includes(user._id)
  
  
    const handleLike=async(id)=>{
      try {
        
          dispath(toggleLikeDashboard({blogId:id,userId:user._id}))
        await helpers.api().put(`/blogs/${id}/like`)
        
      } catch (error) {
        console.log(error);
      }
    }
  
    return [isIlikedBlog,handleLike]
      
  }
  
  export default useLike;