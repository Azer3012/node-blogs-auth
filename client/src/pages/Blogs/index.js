import React, { useState } from "react";
import { Button, Input, List } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import ProtectedRoute from "../../components/ProtectedRoute";

import BlogItem from "./BlogItem";
import { fetchBlogs, setCurrentPage } from "../../redux/features/blogsSlice";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import "./styles.css";
import { Link,useSearchParams } from "react-router-dom";
import debounce from 'lodash.debounce'
const Blogs = () => {
  const { list, error, loading,currentPage,total } = useSelector((state) => state.blogs);
  const [filter,setFilter]=useState('')

  const [searchParams,setSearchParams]=useSearchParams()

  const dispatch = useDispatch();

  useEffect(() => {
    let cleanup = true;
    if (cleanup) {
      const pageNumber=searchParams.has('page')?Number(searchParams.get('page')):1
      dispatch(setCurrentPage(pageNumber))

      dispatch(fetchBlogs({page:currentPage,limit:3,filter}));
    }

    return () => {
      cleanup = false;
    };
  }, [currentPage,filter]);

  const handlePageChange=(page)=>{
    dispatch(setCurrentPage(page))
    setSearchParams({page})
  }

  const handleFilter=debounce((e)=>{
    setFilter(e.target.value)
  },500)
  return (
    <ProtectedRoute>
      <div className="create-blog">
        <Input
          className="input"
          placeholder="search"
          prefix={<SearchOutlined />}
          onChange={handleFilter}
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
          onChange:(page)=> handlePageChange(page),
          pageSize: 3,
          total,
          current:currentPage
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
