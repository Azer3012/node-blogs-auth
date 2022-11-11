import React from 'react'
import {  Breadcrumb, Layout } from 'antd';
import {useSelector} from 'react-redux'
import './styles.css'
import AppHeader from '../components/AppHeader';


const {  Content, Footer } = Layout;

const MyLayout = ({children}) => {

   

    const {firstName,lastName,image}=useSelector(state=>state?.user?.currentUser || {})
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
     <Breadcrumb.Item>Home</Breadcrumb.Item>
     <Breadcrumb.Item>List</Breadcrumb.Item>
     <Breadcrumb.Item>App</Breadcrumb.Item>
   </Breadcrumb>
   <div className="main">{children}</div>
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