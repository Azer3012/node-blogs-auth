import React from 'react'
import { Navigate } from 'react-router-dom'

const Dashboard = () => {
    const token=localStorage.getItem('token')
    if(!token){
        return <Navigate to='/auth/login'/>
    }
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard