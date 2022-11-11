import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import instance from '../lib/axios'

const TokenRoute = ({children}) => {
   const navigate=useNavigate()

   const [user, setUser] = useState(null);
   const [fetching, setFetching] = useState(true);

   const getUser=async()=>{
    setFetching(true)
    try {
      const response=await instance.get('/getUser')
      

      console.log(response);
      if (!response?.data) {
        navigate('/auth/login');
      } else {
        setUser(response.data);
      }

    } catch (error) {
      console.log(error);
      navigate('/auth/login');
    }
    finally{
      setFetching(false)
    }
   }

   useEffect(()=>{
    getUser()
   },[])

   if (fetching) {
    return <h1>Authorizing...</h1>;
  }

    
  return children;
}

export default TokenRoute