import React from "react";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import instance from "../../lib/axios";
const ResetForm = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { resetToken } = useParams();
  console.log(resetToken);
  const onFinish = async (values) => {
    setLoader(false);
    try {
      setLoader(true);
      const response = await instance.patch("/password", {
        newPassword: values.password,
        resetToken,
      });

      message.success("Your password reset");

      setLoader(false);

      console.log(response);
      navigate("/auth/login");
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
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("The two passwords that you entered do not match!")
              );
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button
          disabled={loader}
          loading={loader}
          block
          type="primary"
          htmlType="submit"
        >
          Reset Password
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ResetForm;
