import React from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Layout, Menu, Space, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import instance from "../lib/axios";
import {useDispatch} from 'react-redux'
import { setUser } from "../redux/features/UserSlice";

const { Header } = Layout;
const AppHeader = ({ firstName, lastName, image }) => {
  const dispatch=useDispatch()
  const navigate = useNavigate();
  const handleDropdown = async (event) => {
    if (event.key === "logout") {
      try {
        await instance.post("/logout");
        dispatch(setUser(null))
        navigate("/auth/login");

      } catch (error) {
        console.log(error);
      }
    }
  };
  const navMenu = [
    {
      key: 1,
      label: "Dashboard",
      to: "/dashboard",
    },
    {
      key: 2,
      label: "Blogs",
      to: "/blogs",
    },
    {
      key: 3,
      label: "Chat",
      to: "/chat",
    },
  ];

  const dropdownList = (
    <Menu
      onClick={handleDropdown}
      items={[
        {
          key: "profile",
          label: "Profile",
        },
        {
          key: "settings",
          label: "Settings",
        },
        {
          key: "logout",
          label: "Log out",
        },
      ]}
    />
  );

  const handleMenu = (e) => {
    const to = e.item.props.to;
    navigate(to);
  };

  return (
    <Header>
      <div className="logo" />
      <Menu
        className="layout-menu"
        theme="dark"
        mode="horizontal"
        items={navMenu}
        onClick={handleMenu}
      ></Menu>

      <Dropdown trigger={"click"} overlay={dropdownList}>
        <Typography.Text>
          <Space>
            <Avatar icon="user" src={image} />
            {firstName}
            {lastName}
            <DownOutlined />
          </Space>
        </Typography.Text>
      </Dropdown>
    </Header>
  );
};

export default AppHeader;
