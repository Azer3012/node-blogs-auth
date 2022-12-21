import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import socket from '../../lib/io'

const Messages = () => {
    const {userId}=useParams()
    console.log(userId);

    useEffect(()=>{
      socket.emit('join room',userId)
    },[])

    const onSubmit=(event)=>{
      event.preventDefault()

      const {message}=event.target.elements;

      console.log(message);

      socket.emit("send message",{userId,content:message.value})



    }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <textarea name='message' rows={5} placeholder="Send Message"/>
        <button>Send</button>
      </form>
    </div>
  )
}

export default Messages