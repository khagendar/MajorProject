import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContex"; // Adjust path if needed

const AuthRoutes = () => {
    const { token, user } = useAuth();

    if (token) {
        return <Navigate to={user?.role === "admin" ? "/AdminHome" : "/Home"} replace />;
    }

    return <Outlet />;
};

export default AuthRoutes;
