import { Typography } from "antd";
import ForgotForm from "./ForgotForm";
import "./styles.css";

const ForgotPassword = () => {
  return (
    <div className="login-container">
      <div className="login-form-container">
        <Typography.Title level={2}>Forget Password</Typography.Title>
        <ForgotForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
