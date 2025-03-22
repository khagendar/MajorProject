import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContex"; // Adjust path if needed

const UserRoutes = () => {
    const { token, user } = useAuth();

    if (!token) {
        return <Navigate to="/register" replace={true} />;
    }

    if (user?.role === "admin") {
        return <Navigate to="/AdminHome" replace={true} />; // Redirect admins
    }

    return <Outlet />; // Render user routes if a regular user
};

export default UserRoutes;
