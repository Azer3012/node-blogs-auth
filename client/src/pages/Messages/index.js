import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import socket from "../../lib/io";
import {
  fetchMessages,
  incrementUnreadMesages,
  newMessage,
  readMessages,
} from "../../redux/features/chatSlice";
import "./styles.css";

const Messages = () => {
  const { userId } = useParams();
  console.log(userId);

  const messagesRef = useRef();
  const [form] = Form.useForm();

  const messages = useSelector((state) => state.chat.messages[userId]);
  const chatUsers = useSelector((state) => state.chat.users.list);
  const dispatch = useDispatch();

  const mineStyle = {
    background: "#0081FF",

    borderLeftRadius: "0",
  };
  const otherStyle = {
    background: "#F8FAFB",
    borderBottomRadius: "0",
  };

  const scrollToEnd = () => {
    setTimeout(() => {
      messagesRef.current.scrollTo({
        top: messagesRef.current.scrollHeight,
      });
    });
  };
  useEffect(()=>{
    socket.emit("join room", userId);
    dispatch(fetchMessages(userId));

  },[userId])

  useEffect(() => {
    

    const chatUser = chatUsers.find((user) => user._id === userId);
    
    if (chatUser && chatUser.unreadMessages > 0) {
      dispatch(readMessages(userId));
    }
  }, [userId, chatUsers]);

  useEffect(() => {
    scrollToEnd();
  }, [messages]);

  const onSubmit = (values) => {
    socket.emit("send message", { userId, content: values.content });

    const messageData = {
      _id: Math.random(),
      content: values.content,
      createdAt: new Date().toISOString(),
      fromMySelf: true,
    };

    dispatch(newMessage({ message: messageData, userId }));

    form.resetFields();
  };
  return (
    <div className="messages-container">
      <ul ref={messagesRef} className="messages">
        {messages?.map((message) => (
          <li
            style={
              message.fromMySelf
                ? { justifyContent: "flex-start" }
                : { justifyContent: "flex-end" }
            }
            className="message"
            key={message._id}
          >
            <p
              style={message.fromMySelf ? mineStyle : otherStyle}
              className="message-box"
            >
              {message.content}
            </p>
          </li>
        ))}
      </ul>

      <Form form={form} layout="inline" onFinish={onSubmit}>
        <Form.Item
          style={{ flexGrow: 1 }}
          name="content"
          rules={[{ required: true, message: "Please type something!" }]}
        >
          <Input.TextArea placeholder="Send Message" />
        </Form.Item>
        <Form.Item>
          <Button icon={<SendOutlined />} type="primary" htmlType="submit">
            Send
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Messages;
