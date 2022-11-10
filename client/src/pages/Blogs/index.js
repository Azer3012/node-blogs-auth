import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import instance from "../../lib/axios";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const getBlogs = async () => {
    try {
      const response = await instance.get("/blogs");

      setBlogs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
      getBlogs();
    }
    return () => {
      cleanUp = false;
    };
  }, []);
  return blogs.map((blog) => (
    <Link to={`/blog/${blog._id}`}>{blog.title}</Link>
  ));
};

export default Blogs;
