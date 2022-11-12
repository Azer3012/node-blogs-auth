import React from "react";
import { useSelector } from "react-redux";
import { List, Space, Avatar, Tag } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const BlogItem = ({ item }) => {
  const { image,firstName,lastName } = useSelector((state) => state.user.currentUser);

  const IconText = ({ icon, text }) => (
    <div className="like-comments">
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    </div>
  );
  return (
    <div className="container">
    <List.Item
      key={item.title}
      actions={[
        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
        <IconText
          icon={MessageOutlined}
          text="2"
          key="list-vertical-message"
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={image} />}
        title={<Link to={`/blog/${item._id}`}>{item.title}</Link>}
        description={lastName+' '+firstName}
      />
      {item.body.substring(0, 200)}...
      <div className="tags">
        {item.tags.map((item, index) => (
          <Tag key={index}>{item}</Tag>
        ))}
      </div>
    </List.Item>
    </div>
  );
};

export default BlogItem;
