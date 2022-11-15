import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import instance from "../../lib/axios";

const ForgotForm = () => {
  const [loader, setLoader] = useState(false);
  const onFinish = async (values) => {
    setLoader(false);
    try {
      setLoader(true);
      const response = await instance.post("/password/reset-request", values);

      message.success("Control your email");

      setLoader(false);

      console.log(response);
    } catch (error) {
      setLoader(false);
      const errorMessage = error.response.data.message;
      message.error(errorMessage);
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
      <Form.Item>
        <Button
          disabled={loader}
          loading={loader}
          block
          type="primary"
          htmlType="submit"
        >
          Send Email
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ForgotForm;
