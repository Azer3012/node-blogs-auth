const express =require("express") 
const { addCommentToBlog, createNewBlog, deleteBlog, getBlogs, getMyBlogs, likeBlog, selectedBlog, updateBlog } =require("../controllers/blogController.js") ;
const passport =require('passport')


const router = express.Router();

router.use(passport.authenticate('jwt',{session:false}));

//my blogs
router.get("/blogs/my",getMyBlogs);
//
router.get("/blogs",getBlogs)

//selected blog
router.get("/blogs/:id",selectedBlog);

//post new blog
router.post("/blogs",createNewBlog );

//update blog
router.put("/blogs/:id", updateBlog);

//like
router.put("/blogs/:id/like", likeBlog);

//comment 
router.post("/blogs/:id/comments",addCommentToBlog)

//delete blog
router.delete("/blogs/:id", deleteBlog);

module.exports= router;
