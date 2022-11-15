import { Button, Form, Input,message } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import instance from "../../lib/axios";


const LoginForm = () => {

  const [loader,setLoader]=useState(false)
  const navigate=useNavigate()
  const onFinish =async (values) => {
  
    setLoader(false)
    try {
      setLoader(true)
      const response=await instance.post('/login',values)
     
      setLoader(false)

      console.log(response);
      navigate('/')
    } catch (error) {
      setLoader(false)
      const errorMessage=error.response.data.error;
      message.error(errorMessage)
      
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleLoginWithGoogle=()=>{
    window.open('http://localhost:8000/api/v1/login/google','_self')
  }
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
      
      <Link to="/auth/forgot-password">Forgot password</Link>
      <Form.Item >
        <Button disabled={loader} loading={loader}  block type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
      <Form.Item >
        <Button onClick={handleLoginWithGoogle}  icon={<GoogleOutlined  />}  block  htmlType="submit">
          Sign In With Google
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
