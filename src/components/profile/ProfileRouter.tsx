
import React from "react";
import { useAuth } from "@/context/auth";
import { Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ProfileRouter = () => {
  const { userRole, loading, isSignedIn } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/auth/signin" replace />;
  }

  // Route users to their role-specific profile
  switch (userRole) {
    case 'customer':
      return <Navigate to="/profile/customer" replace />;
    
    case 'artist':
    case 'nail technician/artist':
    case 'freelancer':
      return <Navigate to="/profile/artist" replace />;
    
    case 'salon':
    case 'owner':
      return <Navigate to="/profile/salon" replace />;
    
    default:
      // For other roles, redirect to profile edit
      return <Navigate to="/profile/edit" replace />;
  }
};

export default ProfileRouter;
