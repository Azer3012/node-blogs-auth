import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { List, Space, Avatar, Tag, Button } from "antd";
import { LikeOutlined, LikeTwoTone, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import instance from "../../lib/axios";
import { toggleLike } from "../../redux/features/blogsSlice";

const BlogItem = ({ item }) => {
  const { image,firstName,lastName,_id} = useSelector((state) => state.user.currentUser);
  const dispath=useDispatch()

  const isIlikedBlog=item.likes.includes(_id)

  const handleLike=async(id)=>{
    try {
      await instance.put(`/blogs/${id}/like`)
      dispath(toggleLike({blogId:id,userId:_id}))
    } catch (error) {
      console.log(error);
    }
  }

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
