import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";
import { Loader2 } from "lucide-react";

const ProfileRedirect = () => {
  const { userRole, isSignedIn, loading, userProfile } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (loading) return;
    
    if (!isSignedIn) {
      navigate("/auth/signin");
      return;
    }
    
    // If the user has completed their profile, redirect to the profile page
    if (userProfile?.full_name) {
      navigate("/profile");
      return;
    }
    
    // Otherwise, redirect to the appropriate profile editor
    navigate("/profile/edit");
  }, [userRole, isSignedIn, loading, navigate, userProfile]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="h-8 w-8 animate-spin" />
      <span className="ml-2">Loading profile...</span>
    </div>
  );
};

export default ProfileRedirect;
