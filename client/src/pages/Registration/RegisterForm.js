import { Button, Form, Input, message, Upload } from "antd";
import { GoogleOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../lib/axios";

const RegisterForm = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.onbeforeunload = () => {
      return "Are you sure?";
    };
  }, []);
  const onFinish = async (values) => {
    try {
      setLoader(true);
      const formData = new FormData();

      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("email", values.email);
      formData.append("password", values.password);
      if(values.image){
        formData.append("image", values.image.originFileObj);
      }
      

      if (formData) {
        await instance.post("/register", formData);
      }

      message.success("Reguistration successfull");
      setLoader(false);
      navigate("/auth/login");
    } catch (error) {
      console.log(error);
      setLoader(false);
      const errorMessage = error?.response?.data?.message;
      message.error(errorMessage);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  //file upload

  const getPhoto = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList[0];
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
        label="Name"
        name="firstName"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        label="Surname"
        name="lastName"
        rules={[{ required: true, message: "Please input your surname!" }]}
      >
        <Input type="text" />
      </Form.Item>

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

      <Form.Item
        label="Profile photo"
        name="image"
        getValueFromEvent={getPhoto}
      >
        <Upload>
          <Button icon={<UploadOutlined />}>Select Image</Button>
        </Upload>
      </Form.Item>
      <Form.Item>
        <Button
          disabled={loader}
          loading={loader}
          block
          type="primary"
          htmlType="submit"
        >
          Sign Up
        </Button>
      </Form.Item>
      <Form.Item>
        <Button icon={<GoogleOutlined />} block htmlType="submit">
          Sign Up With Google
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterForm;
