import React, { useEffect } from 'react'
import {  Breadcrumb, Layout } from 'antd';
import {useSelector} from 'react-redux'
import './styles.css'
import AppHeader from '../components/AppHeader';
import { Outlet, useLocation } from 'react-router-dom';


const {  Content, Footer } = Layout;

const MyLayout = ({children}) => {

   

    const {firstName,lastName,image}=useSelector(state=>state?.user?.currentUser || {})
    const location=useLocation()

    const breadcrumb={
      '/dashboard':['Home','Dashboard'],
      '/blogs':['Home','Blogs'],
      '/chat':['Home','Chat'],
      '/create-blog':['Home','Create'],
      '/blog':['Home','Blog'],
    }
    const breadcrumbs=breadcrumb[location.pathname]

    useEffect(()=>{

    },[location.pathname])
  return (
    


 <Layout className="layout">
 <AppHeader {...{firstName,lastName,image}}/>
 <Content
   style={{
     padding: '0 50px',
     height:'100vh'
   }}
 >
   <Breadcrumb
     style={{
       margin: '16px 0',
     }}
   >
    {
      breadcrumbs?.map((item,index)=>(
      <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>

      ))
    }
    
   </Breadcrumb>
   <div className="main">
    <Outlet/>
   </div>
 </Content>
 <Footer
   style={{
     textAlign: 'center',
   }}
 >
   Blog ©2022 Created by Abishov
 </Footer>
</Layout>

  )
}

export default MyLayout