import express from "express";
import { createNewBlog, deleteBlog, getAllBlogs, selectedBlog, updateBlog } from "../controllers/blogController.js";
import { authMiddleware } from "./middleware/authMiddleware.js";



const router = express.Router();

router.use(authMiddleware);

//all blogs
router.get("/blogs",getAllBlogs);

//selected blog
router.get("/blogs/:id",selectedBlog);

//post new blog
router.post("/blogs",createNewBlog );

//update blog
router.put("/blogs/:id", updateBlog);

//delete blog
router.delete("/blogs/:id", deleteBlog);

export default router;
