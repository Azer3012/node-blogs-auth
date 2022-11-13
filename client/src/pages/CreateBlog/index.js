import React, { useState } from "react";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Button, Form, Input, message, Radio, Select } from "antd";
import instance from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateBlog = () => {
  
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
 

  const onSubmit=async(values)=>{
    try {
        setLoading(true)
        await instance.post('/blogs',values);
        message.success("Blog succesfully created")
        navigate('/blogs')

    } catch (error) {
        message.error(error.response.data.message)
    }
    finally{
        setLoading(false)
    }
  }
  
  return (
    <ProtectedRoute>
      <Form
        layout="vertical"
        onFinish={onSubmit}
        
      >
        <Form.Item label="Title" name="title" rules={[{required:true,message:"Please enter title"}]}>
          <Input placeholder="title" />
        </Form.Item>
        <Form.Item label="Content" name="body" rules={[{required:true,message:"Please write something"}]}>
        <ReactQuill theme="snow"  />
          {/* <Input.TextArea placeholder="write something" /> */}
        </Form.Item>
        <Form.Item label="Tags" name="tags">
         <Select
         mode="tags"
         style={{width:"100%"}}
         placeholder="Add Tags"
         
         />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" type="primary">Submit</Button>
        </Form.Item>
      </Form>
    </ProtectedRoute>
  );
};

export default CreateBlog;
