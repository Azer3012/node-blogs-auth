import { Button, Form, Input,message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../lib/axios";

const LoginForm = () => {

  const [loader,setLoader]=useState(false)
  const navigate=useNavigate()
  const onFinish =async (values) => {
  
    setLoader(false)
    try {
      setLoader(true)
      const response=await instance.post('/login',values)
      localStorage.setItem('token',response.data.accessToken)
      setLoader(false)
      navigate('/')
    } catch (error) {
      setLoader(false)
      const errorMessage=error.response.data.message;
      message.error(errorMessage)
      
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please input your email!" }]}
      >
        <Input type="email" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item >
        <Button disabled={loader} loading={loader}  block type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
      <Form.Item >
        <Button  icon={<GoogleOutlined  />}  block  htmlType="submit">
          Sign In With Google
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
