import React, { useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import ProtectedRoute from "../../components/ProtectedRoute";
import { Avatar, List, Skeleton } from "antd";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../redux/features/chatSlice";
const Chat = () => {
  const { list, total, error, loading } = useSelector(
    (state) => state.chat.users
  );
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(fetchUsers())
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
                      avatar={<Avatar src={item.image} />}
                      title={
                        <a href="https://ant.design">
                          {item.firstName} {item.lastName}
                        </a>
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
