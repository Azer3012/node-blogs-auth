import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import instance from "../lib/axios";
import { setLoading, setUser } from "../redux/features/UserSlice";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  const [fetching, setFetching] = useState(true);

  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const getUser = async () => {
    setFetching(true);
    try {
      const response = await instance.get("/getUser");

      if (!response?.data) {
        navigate("/auth/login");
      } else {
        dispatch(setUser(response.data));
      }
    } catch (error) {
      console.log(error);
      navigate("/auth/login");
    } finally {
      setFetching(false);
      if (!fetching) {
        dispatch(setLoading(false));
      }
    }
  };

  useEffect(() => {
    
    getUser();
    
  }, []);

  if (loading) {
    return <h1>Authorizing...</h1>;
  }

  return children;
};

export default ProtectedRoute;
