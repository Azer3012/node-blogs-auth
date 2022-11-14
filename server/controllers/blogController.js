import Blog from "../models/blog.js";
import Comment from "../models/comments.js";

const getMyBlogs = async (req, res, next) => {
  const userId = req.user._id;

  const { page = 1, limit = 3, filter = "" } = req.query;

  const offset = (page - 1) * limit;

  const titleFilter = { $regex: ".*" + filter + ".*", $options: "i" };
  try {
    const blogs = await Blog.find({ title: titleFilter })
      .select("_id title body likes tags comments createdAt")
      .where("author")
      .equals(userId)
      .populate("author", "_id firstName lastName image")
      .sort({ createdAt: "desc" })
      .skip(offset)
      .limit(limit)
      .exec();

    const total = await Blog.find({ title: titleFilter })
      .where("author")
      .equals(userId)
      .count();
    res.status(200).send({
      list: blogs,
      total: total,
    });
  } catch (error) {
    next(error);
  }
};

const getBlogs = async (req, res) => {
  const userId = req.user._id;
  const page = req.query.page ? Number(req.query.page) : 1;
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const filter = req.query.filter || "";
  const offset = (page - 1) * limit;
  const titleFilter = { $regex: ".*" + filter + ".*", $options: "i" };
  try {
    // const blogs = await Blog.find({ title: titleFilter })
    //   .select("_id title body likes tags comments createdAt")
    //   .populate("author", "_id firstName lastName image")
    //   .sort({ createdAt: "desc" })
    //   .skip(offset)
    //   .limit(limit)
    //   .exec();

    const blogs = await Blog.find({ $match: { title: titleFilter } })
      .select({
        author: 1,
        title: 1,
        body: 1,
        tags: 1,
        comments: { $size: "$comments" },
        likes: { $size: "$likes" },
        isILiked: {
          $in: [userId, "$likes"],
        },
      })
      .populate("author",{
        _id:1,
        image:1,
        fullName:{
          $concat:["$firstName"," ","$lastName"]
        }
      })
      .sort({ createdAt: "desc" })
      .skip(offset)
      .limit(limit)
      .exec();

    const total = await Blog.find({ title: titleFilter }).count();
    res.status(200).send({
      list: blogs,
      total: total,
    });
  } catch (error) {
    next(error);
  }
};

const selectedBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "_id firstName lastName image likes")
      .populate("comments")
      .exec();
    res.status(200).send(blog);
  } catch (error) {
    next(error);
  }
};
const createNewBlog = async (req, res, next) => {
  try {
    const blog = new Blog({
      ...req.body,
      author: req.user._id,
    });
    await blog.save();
    res.status(201).send();
  } catch (error) {
    next(error);
  }
};
const updateBlog = async (req, res, next) => {
  try {
    await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog.author !== req.user._id) {
      res.status(403).send({
        message: "You cannot delete others people's posts",
      });
    }
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).send();
  } catch (error) {
    next(error);
  }
};

const likeBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog.likes.includes(req.user._id)) {
      blog.likes = blog.likes.pull(req.user._id);
    } else {
      blog.likes.push(req.user._id);
    }

    await blog.save();
    res.status(200).send();
  } catch (error) {
    console.log(error);
  }
};

const addCommentToBlog = async (req, res) => {
  try {
    const comment = new Comment({
      author: req.user._id,
      body: req.body.comment,
    });

    await comment.save();

    const blog = await Blog.findById(req.params.id);

    blog.comments.push(comment);

    await blog.save();

    const result = await Comment.findById(comment._id);

    res.status(201).send(result);
  } catch (error) {
    console.log(error);
  }
};

export {
  getMyBlogs,
  selectedBlog,
  createNewBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  addCommentToBlog,
  getBlogs,
};
