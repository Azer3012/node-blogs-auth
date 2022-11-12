import express from "express";
import { createNewBlog, deleteBlog, getMyBlogs, selectedBlog, updateBlog } from "../controllers/blogController.js";
import { authMiddleware } from "./middleware/authMiddleware.js";



const router = express.Router();

router.use(authMiddleware);

//all blogs
router.get("/blogs",getMyBlogs);

//selected blog
router.get("/blogs/:id",selectedBlog);

//post new blog
router.post("/blogs",createNewBlog );

//update blog
router.put("/blogs/:id", updateBlog);

//delete blog
router.delete("/blogs/:id", deleteBlog);

export default router;
