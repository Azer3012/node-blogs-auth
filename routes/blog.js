import express from "express";
import Blog from "../models/blog.js";
import jwt from "jsonwebtoken";
const router = express.Router();

router.use(async (req, res, next) => {
  const token = req.headers['authorization'];

  
  if (token) {
    jwt.verify(token,process.env.JWT_SECRET_KEY, (error, decoded) => {
      if (error) {
        res.status(401).send({
          message: error,
        });
        return;
      }

      if (decoded.exp.expiresAt < (Date.now()/1000)) {
        res.status(401).send("Your session has expired!");
      } else {
        req.user = decoded.data;
        next();
      }
    });
  } else {
    res.status(401).send({
      message: "UnAuthorized request",
    });
  }
});

//all blogs
router.get("/blogs", async (req, res) => {
  const blogs = await Blog.find().populate("author").exec();
  res.status(200).send(blogs);
});

//selected blog
router.get("/blogs/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("author").exec();
  res.status(200).send(blog);
});

//post
router.post("/blogs", async (req, res) => {
  const blog = new Blog({
    ...req.body,
    author: req.user._id,
  });
  await blog.save();
  res.status(201).send();
});

//update blog
router.put("/blogs/:id", async (req, res) => {
  await Blog.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).send();
});
//delete blog
router.delete("/blogs/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (blog.author !== req.user._id) {
    res.status(403).send({
      message: "You cannot delete others people's posts",
    });
  }
  await Blog.findByIdAndDelete(req.params.id);
  res.status(200).send();
});

export default router;
