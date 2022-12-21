import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import socket from '../../lib/io'

const Messages = () => {
    const {userId}=useParams()
    console.log(userId);

    useEffect(()=>{
      socket.emit('join room',userId)
    },[])
  return (
    <div>Messages</div>
  )
}

export default Messages