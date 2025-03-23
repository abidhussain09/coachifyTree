import React from "react";
import { Navigate } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

export const ProtectedRoute = ({ children }) => {
    const isAuthenticated = isTokenValid();
    if (!isAuthenticated) {
        return <Navigate to="/signin" replace />;
    }
    return children;
}
