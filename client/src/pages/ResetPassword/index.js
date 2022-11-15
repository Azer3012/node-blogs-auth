import React from "react";
import { Typography } from "antd";
import ResetForm from "./ResetForm";
import "./styles.css";

const ResetPassword = () => {
  return (
    <div className="login-container">
      <div className="login-form-container">
        <Typography.Title level={2}>Reset Password</Typography.Title>
        <ResetForm />
      </div>
    </div>
  );
};

export default ResetPassword;
