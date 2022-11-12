import Blog from "../models/blog.js";

const getMyBlogs = async (req, res, next) => {

  const userId=req.user._id

  const {page=1,limit=3,filter=''}=req.query;

  const offset=(page-1)*limit

  const titleFilter={$regex: '.*' + filter + '.*',$options:'i'}
  try {

    const blogs = await Blog.find({title:titleFilter})
    .select('_id title body likes tags')
    .where('author')
    .equals(userId)
    .populate('author','_id firstName lastName image')
    .sort({createdAt:'desc'})
    .skip(offset)
    .limit(limit)
    .exec();

    const total=await Blog.find({title:titleFilter}).where('author')
    .equals(userId).count()
    res.status(200).send({
      list:blogs,
      total:total
    });
  } catch (error) {
    next(error);
  }
};

const selectedBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author").exec();
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

export { getMyBlogs, selectedBlog, createNewBlog, updateBlog, deleteBlog };
