import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContex"; // Adjust path if needed

const AdminRoutes = () => {
    const { token, user } = useAuth(); // Get token & user details

    if (!token) {
        return <Navigate to="/register" replace={true} />; // Redirect if not logged in
    }

    if (user?.role !== "admin") {
        return <Navigate to="/Home" replace={true} />; // Redirect non-admins to home
    }

    return <Outlet />; // Render admin routes if the user is an admin
};

export default AdminRoutes;
