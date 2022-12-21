import {io} from 'socket.io-client'

const socket=io('ws://localhost:8000/chat',{
    autoConnect:false,
    withCredentials:true
})

export default socket;