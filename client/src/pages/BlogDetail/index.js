import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import instance from "../../lib/axios";
import { Button, PageHeader, Tag } from "antd";
import moment from "moment";
import { LikeOutlined, LikeTwoTone } from "@ant-design/icons";
import useLike from "../../hooks/useLike";
import CommentComponent from "./Comment";

const Blog = () => {
  const [blog, setBlog] = useState();
  const params = useParams();
  const [isIlikedBlog, handleLike] = useLike(blog);

  const getBlog = async () => {
    try {
      const response = await instance.get(`/blogs/${params.id}`);

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
  }, [isIlikedBlog]);

  const addComment = useCallback((comment) => {
    setBlog((prev) => {
      return {
        ...prev,
        comments: [...prev.comments, comment],
      };
    });
  }, []);

  return (
    <ProtectedRoute>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={isIlikedBlog}
          onBack={() => window.history.back()}
          title={blog?.title}
          subTitle={blog?.author?.firstName + " " + blog?.author?.lastName}
          extra={[
            <Button type="text" key="created">
              {moment(blog?.createdAt).fromNow()}
            </Button>,
            <Button
              key="like-button"
              type="text"
              icon={isIlikedBlog ? <LikeTwoTone /> : <LikeOutlined />}
              onClick={() => handleLike(blog?._id)}
            >
              <p className="like-count">{blog?.likesCount}</p>
            </Button>,
          ]}
        >
          <p dangerouslySetInnerHTML={{ __html: blog?.body }}></p>
          <div className="tags">
            {blog?.tags?.map((item, index) => (
              <Tag key={index}>{item}</Tag>
            ))}
          </div>
        </PageHeader>
        <CommentComponent
          addComment={addComment}
          comments={blog?.comments}
          blogId={blog?._id}
        />
      </div>
    </ProtectedRoute>
  );
};

export default Blog;
