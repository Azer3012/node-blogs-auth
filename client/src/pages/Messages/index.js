import React from 'react'
import { useParams } from 'react-router-dom'

const Messages = () => {
    const {userId}=useParams()
    console.log(userId);
  return (
    <div>Messages</div>
  )
}

export default Messages