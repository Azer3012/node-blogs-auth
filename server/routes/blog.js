import express from "express";
import jwt from "jsonwebtoken";
import { createNewBlog, deleteBlog, getAllBlogs, selectedBlog, updateBlog } from "../controllers/blogController.js";


const router = express.Router();

// router.use(async (req, res, next) => {
//   const token = req.headers['authorization'];

  
//   if (token) {
//     jwt.verify(token,process.env.JWT_SECRET_KEY, (error, decoded) => {
//       if (error) {
//         res.status(401).send({
//           message: error,
//         });
//         return;
//       }

//       if (decoded.exp.expiresAt < (Date.now()/1000)) {
//         res.status(401).send("Your session has expired!");
//       } else {
//         req.user = decoded.data;
//         next();
//       }
//     });
//   } else {
//     res.status(401).send({
//       message: "UnAuthorized request",
//     });
//   }
// });

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
