import React from "react";
import ProtectedRoute from "../../components/ProtectedRoute";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div>Dashboard</div>
    </ProtectedRoute>
  );
};

export default Dashboard;
