import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Avatar, List, Skeleton,Badge } from "antd";
import { UserOutlined } from '@ant-design/icons';
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, setUserOnline } from "../../redux/features/chatSlice";
import socket from "../../lib/io";
const Chat = () => {
  const { list, total, error, loading } = useSelector(
    (state) => state.chat.users
  );
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(fetchUsers())
    socket.connect()

    socket.on('user online',(userId)=>{
      console.log(userId+' became online');
      dispatch(setUserOnline({
        userId,
        isOnline:true
      }))
    })
    socket.on('user offline',(userId)=>{
      console.log(userId+' became offline');
      dispatch(setUserOnline({
        userId,
        isOnline:false
      }))
    })

    return ()=>{
      socket.off("user online");
      socket.off("user offline")
      socket.close()
    }
  },[])
  return (
    <ProtectedRoute>
      <div className="container">
        <div className="users">
          <h1>List of users</h1>
          <List
            
            itemLayout="horizontal"
            dataSource={list}
            renderItem={(item) => (
             
                <NavLink to={`/chat/${item._id}`}>
                  <List.Item>
                  <Skeleton loading={loading} active avatar>
                    <List.Item.Meta
                      avatar={<Badge color="green" dot={item.online} ><Avatar src={item.image} /></Badge>}
                      title={
                          <p>
                            {item.firstName} {item.lastName}
                          </p>
                          
                       
                      }
                      // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                     </Skeleton>
                  </List.Item>
                </NavLink>
             
            )}
          />
        </div>

        <div className="inbox">
          <Outlet />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Chat;
