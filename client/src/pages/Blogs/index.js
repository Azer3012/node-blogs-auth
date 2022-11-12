import React from "react";
import { List } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ProtectedRoute from "../../components/ProtectedRoute";

import BlogItem from "./BlogItem";
import { fetchBlogs } from "../../redux/features/blogsSlice";
const Blogs = () => {
  const { list, error, loading } = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    let cleanup=true
    if(cleanup){
      dispatch(fetchBlogs());
    }
    
    return ()=>{
      cleanup=false
    }
  }, []);

  return (
    <ProtectedRoute>
      <List
        itemLayout="vertical"
        size="large"
        loading={loading}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={list}
        footer={
          <div>
            <b>ant design</b> footer part
          </div>
        }
        renderItem={(item) => <BlogItem item={item} />}
      />
    </ProtectedRoute>
  );
};

export default Blogs;
