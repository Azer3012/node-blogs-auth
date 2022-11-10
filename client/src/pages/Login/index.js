import { Typography} from 'antd';
import { Link } from 'react-router-dom';
import LoginForm from "./LoginForm";
import "./styles.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form-container">
        <Typography.Title level={2}>Login</Typography.Title>
        <LoginForm />
       
        <Link to={'/auth/registration'}>Create Account</Link>
      </div>
    </div>
  );
};

export default Login;
