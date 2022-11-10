import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../lib/axios";

const Blog = () => {
  const [blog, setBlog] = useState([]);
  const params = useParams();

  const getBlog = async () => {
    try {
      const response = await instance.get(`/blog/${params.id}`);

      setBlog(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let cleanUp = true;
    if (cleanUp) {
      getBlog();
    }
    return () => {
      cleanUp = false;
    };
  }, []);
  return <div>{blog.body}</div>;
};

export default Blog;
