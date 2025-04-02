
// src/components/ProtectedRoute.tsx
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const { user, loading } = useAuth();
  
  useEffect(() => {
    console.log("ProtectedRoute state:", { user, loading });
  }, [user, loading]);

  if (loading) {
    console.log("Auth is loading...");
    return <div className="text-center p-10">Loading...</div>;
  }

  if (!user) {
    console.log("No user found, redirecting to signin");
    return <Navigate to="/signin" replace />;
  }

  console.log("User authenticated, rendering protected content");
  return <>{children}</>;
};

export default ProtectedRoute;
