import React, { useState } from "react";
import { Button, Input, List } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProtectedRoute from "../../components/ProtectedRoute";
import BlogItem from "../../components/BlogItem";
import { PlusCircleFilled, SearchOutlined } from "@ant-design/icons";
import "./styles.css";
import { Link,useSearchParams } from "react-router-dom";
import debounce from 'lodash.debounce'
import { fetchBlogsDashboard, setCurrentPageDashboard } from "../../redux/features/dashBoardSlice";

const Dashboard = () => {
  const { list, error, loading,currentPage,total } = useSelector((state) => state.dashboard);
  const [filter,setFilter]=useState('')

  console.log(list);
  const [searchParams,setSearchParams]=useSearchParams()

  const dispatch = useDispatch();

  useEffect(() => {
    let cleanup = true;
    if (cleanup) {
      const pageNumber=searchParams.has('page')?Number(searchParams.get('page')):1
      dispatch(setCurrentPageDashboard(pageNumber))

      dispatch(fetchBlogsDashboard({page:currentPage,limit:3,filter}));
    }

    return () => {
      cleanup = false;
    };
  }, [currentPage,filter]);

  const handlePageChange=(page)=>{
    dispatch(setCurrentPageDashboard(page))
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
        
        renderItem={(item) => <BlogItem item={item} />}
      />
    </ProtectedRoute>
  );
};

export default Dashboard;
