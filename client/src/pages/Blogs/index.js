import React from "react";
import { Button, Input, List } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ProtectedRoute from "../../components/ProtectedRoute";

import BlogItem from "./BlogItem";
import { fetchBlogs } from "../../redux/features/blogsSlice";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import "./styles.css";
import { Link } from "react-router-dom";
const Blogs = () => {
  const { list, error, loading } = useSelector((state) => state.blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    let cleanup = true;
    if (cleanup) {
      dispatch(fetchBlogs());
    }

    return () => {
      cleanup = false;
    };
  }, []);

  return (
    <ProtectedRoute>
      <div className="create-blog">
        <Input
          className="input"
          placeholder="search"
          prefix={<SearchOutlined />}
        />

        <Link to='/create-blog'>
          <Button icon={<PlusCircleFilled />}>Create Blog</Button>
        </Link>
      </div>
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
