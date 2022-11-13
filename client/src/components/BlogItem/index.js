import React from "react";
import { useSelector } from "react-redux";
import { List, Space, Avatar, Tag, Button } from "antd";
import { LikeOutlined, LikeTwoTone, MessageOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import moment from 'moment'
import useLike from "../../hooks/useLike";

const BlogItem = ({ item }) => {
  const { image,firstName,lastName,_id} = useSelector((state) => state.user.currentUser);

  const blogContent=item?.body.replace(/<[^>]+>/g,'')
 
  const [isIlikedBlog,handleLike]=useLike(item)

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
    extra={<span>{moment(item.createdAt).fromNow()}</span>}
      key={item.author.title}
      actions={[
        <Button
        key="like-button"
        type="text"
        icon={isIlikedBlog?<LikeTwoTone/>:<LikeOutlined/>}
        onClick={()=>handleLike(item._id)}
        
        >
          
          <p className="like-count">{item.likes.length}</p>
        </Button>,
        
        <IconText
          icon={MessageOutlined}
          text={item.comments.length}
          key="list-vertical-message"
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={item.author.image} />}
        title={<Link to={`/blog/${item._id}`}>{item.title}</Link>}
        description={item.author.lastName+' '+item.author.firstName}
      />
      {/* {item.body.substring(0, 200)}... */}
      {blogContent}
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
