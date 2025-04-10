
import { useAuth } from "@/context/auth";
import UserProfileBanner from "./UserProfileBanner";
import ProfileSidebar from "./ProfileSidebar";
import ProfileTabs from "./ProfileTabs";
import ProfileLoading from "./ProfileLoading";
import ProfileAISupport from "./ProfileAISupport";
import { getRoleTheme } from "./utils/themeHelpers";
import { UserProfile as UserProfileType } from "@/types/profile";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

const UserProfile = () => {
  const { userProfile, userRole, loading, refreshUserProfile } = useAuth();
  const theme = getRoleTheme(userRole);
  const [longLoading, setLongLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Handle extended loading states
  useEffect(() => {
    let timeoutId: number | undefined;
    
    if (loading) {
      timeoutId = window.setTimeout(() => {
        setLongLoading(true);
      }, 3000); // Show extended loading message after 3 seconds
    } else {
      setLongLoading(false);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loading]);
  
  // Handle refresh action
  const handleRefresh = async () => {
    if (!refreshUserProfile) return;
    
    setRefreshing(true);
    try {
      await refreshUserProfile();
      toast.success("Profile refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh profile");
      console.error("Profile refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  // Render loading state
  if (loading) {
    return <ProfileLoading 
      message={longLoading ? "Still loading your profile..." : "Loading your profile"}
      duration={5000} 
    />;
  }
  
  // Render error state if no user profile after loading complete
  if (!userProfile && !loading) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h2 className="text-xl font-semibold mb-2">Profile not available</h2>
          <p className="text-gray-600 mb-4">
            We couldn't retrieve your profile information. This might be due to a connection issue or your profile may not be fully set up yet.
          </p>
          <Button 
            onClick={handleRefresh}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            disabled={refreshing}
          >
            {refreshing ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                Refreshing...
              </>
            ) : (
              "Refresh Profile"
            )}
          </Button>
        </div>
      </div>
    );
  }

  // Render profile content
  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <UserProfileBanner />
      
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Sidebar */}
          <ProfileSidebar userProfile={userProfile as UserProfileType} />
          
          {/* Right Column - Profile Tabs */}
          <ProfileTabs userProfile={userProfile as UserProfileType} />
        </div>
        
        <div className={`mt-10 text-center text-sm ${theme.textColor}`}>
          <p>The more you complete, the more EmviApp works for you.</p>
        </div>
        
        {/* AI Support Card */}
        <div className="mt-6">
          <ProfileAISupport />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
