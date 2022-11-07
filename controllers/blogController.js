
import Blog from '../models/blog.js'

const getAllBlogs=async (req, res) => {
    const blogs = await Blog.find().populate("author").exec();
    res.status(200).send(blogs);
}

const selectedBlog= async (req, res,next) => {
    try {
      const blog = await Blog.findById(req.params.id).populate("author").exec();
      res.status(200).send(blog);
    } catch (error) {
      next(new Error("shit happens"))
    }
  }
const createNewBlog=async (req, res) => {
    const blog = new Blog({
      ...req.body,
      author: req.user._id,
    });
    await blog.save();
    res.status(201).send();
  }
const updateBlog=async (req, res) => {
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send();
  }

const deleteBlog=async (req, res) => {
    const blog = await Blog.findById(req.params.id);
  
    if (blog.author !== req.user._id) {
      res.status(403).send({
        message: "You cannot delete others people's posts",
      });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).send();
  }


export  {getAllBlogs,selectedBlog,createNewBlog,updateBlog,deleteBlog}