import React from 'react'
import { List, Space,Avatar } from 'antd';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';

const BlogItem = ({item}) => {


    const IconText = ({ icon, text }) => (
        <div className="like-comments">
        <Space>
          {React.createElement(icon)}
          {text}
        </Space>
        </div>
      );
  return (
    <List.Item
    key={item.title}
    actions={[
      <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
      <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
    ]}
    extra={
      <img
        width={272}
        alt="logo"
        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
      />
    }
  >
    <List.Item.Meta
      avatar={<Avatar src={item.avatar} />}
      title={<a href={item.href}>{item.title}</a>}
    />
    {item.content}
  </List.Item>

  )
}

export default BlogItem