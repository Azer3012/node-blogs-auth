import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import socket from '../../lib/io'
import { fetchMessages } from '../../redux/features/chatSlice'
import './styles.css'

const Messages = () => {
    const {userId}=useParams()
    console.log(userId);

    const messages=useSelector(state=>state.chat.messages[userId])
    const dispatch=useDispatch()

    const mineStyle={
      
      background: "#0081FF",
      
      borderLeftRadius:"0",

    }
    const otherStyle={
      
      background: "#F8FAFB",
      borderBottomRadius:"0",
      

    }




    
   

    useEffect(()=>{
      socket.emit('join room',userId)

      dispatch(fetchMessages(userId))
      
    },[userId])

    const onSubmit=(event)=>{
      event.preventDefault()

      const {message}=event.target.elements;

      console.log(message);

      socket.emit("send message",{userId,content:message.value})



    }
  return (
    <div className='messages-container'>
      <ul className='messages'>
        {messages?.map(message=>(
          <li style={message.fromMySelf?{justifyContent:"flex-start"}:{justifyContent:"flex-end"}} className="message" key={message._id}>
            <p style={message.fromMySelf?mineStyle:otherStyle} className='message-box'>{message.content}</p>
          </li>
        ))}
      </ul>
      <form onSubmit={onSubmit}>
        <textarea style={{borderBottomRadius:"none"}}  className='textarea' name='message' rows={5} placeholder="Send Message"/>
        <button className='submitBtn'>Send</button>
      </form>
    </div>
  )
}

export default Messages