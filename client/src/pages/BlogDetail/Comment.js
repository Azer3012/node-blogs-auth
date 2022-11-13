import { Avatar, Button, Comment, Form, Input, List, message } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import instance from "../../lib/axios";

const CommentList = ({ comments }) => {
  console.log({ comments });

  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
      itemLayout="horizontal"
      renderItem={(props) => <Comment
            author={props.author.firstName+''+props.author.lastName}
            avatar={props.author.image}
            content={props.body}
            datetime={moment(props.createdDate).fromNow()}
        
        
        />}
    />
  );
};

const Editor = ({ onSubmit, submitting }) => {
    const [form]=Form.useForm()
    const handleSubmit=(values)=>{

        onSubmit(values)
        form.resetFields()

    }
  return (
    <Form onFinish={handleSubmit} >
      <Form.Item
        name="comment"
        rules={[{ required: true, message: "You cannot send empty comment" }]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} type="primary">
          Add Comment
        </Button>
      </Form.Item>
    </Form>
  );
};

const CommentComponent = ({ comments, blogId,addComment }) => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [submitting, setSubmitting] = useState(false);
  const handleSubmit = async (values) => {
    try {
      setSubmitting(true);
      const response = await instance.post(`/blogs/${blogId}/comments`, {
        comment: values.comment,
      });

      addComment(response.data)
      console.log(response);
    } catch (error) {
      message.error("Something went wrong!");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {comments?.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={
          <Avatar
            src={currentUser.image}
            alt={currentUser.firstName}
          />
        }
        content={<Editor onSubmit={handleSubmit} submitting={submitting} />}
      />
    </div>
  );
};

export default CommentComponent;
