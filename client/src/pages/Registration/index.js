import { Typography } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from './RegisterForm'
import './styles.css'

const Registration = () => {
  return (
    <div className="register-container">
    <div className="register-form-container">
      <Typography.Title level={2}>Sign Up</Typography.Title>
      <RegisterForm />
     
      <Link to={'/auth/login'}>Login</Link>
    </div>
  </div>
  )
}

export default Registration