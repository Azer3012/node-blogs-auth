import React from 'react'
import ProtectedRoute from '../../components/ProtectedRoute'
import Layout from '../../Layout'

const Dashboard = () => {
    
  return (
    <ProtectedRoute>

         <Layout>
         <div>Dashboard</div>

         </Layout>
    </ProtectedRoute>
   
  )
}

export default Dashboard