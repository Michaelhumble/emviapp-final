import { useAuth } from "@/context/auth";
import UserProfileBanner from "./UserProfileBanner";
import ProfileSidebar from "./ProfileSidebar";
import ProfileTabs from "./ProfileTabs";
import ProfileLoading from "./ProfileLoading";
import ProfileAISupport from "./ProfileAISupport";
import { getRoleTheme } from "./utils/themeHelpers";
import { UserProfile as UserProfileType } from "@/types/profile";
import { useEffect, useState, useCallback } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { RefreshCw, AlertCircle } from "lucide-react";

let lastLoadedTime = 0;
let cachedProfileData: UserProfileType | null = null;

const UserProfile = () => {
  const { userProfile, userRole, loading, refreshUserProfile } = useAuth();
  const theme = getRoleTheme(userRole);
  const [longLoading, setLongLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showCachedData, setShowCachedData] = useState(false);
  const [localProfile, setLocalProfile] = useState<UserProfileType | null>(null);
  
  useEffect(() => {
    const now = Date.now();
    const timeSinceLastLoad = now - lastLoadedTime;
    
    if (cachedProfileData && timeSinceLastLoad < 300000 && loading) {
      setLocalProfile(cachedProfileData);
      setShowCachedData(true);
    } else if (userProfile) {
      cachedProfileData = userProfile;
      lastLoadedTime = Date.now();
      setLocalProfile(userProfile);
      setShowCachedData(false);
    }
  }, [userProfile, loading]);
  
  useEffect(() => {
    let timeoutId: number | undefined;
    
    if (loading) {
      timeoutId = window.setTimeout(() => {
        setLongLoading(true);
      }, 3000);
    } else {
      setLongLoading(false);
    }
    
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [loading]);
  
  const handleRefresh = useCallback(async () => {
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
  }, [refreshUserProfile]);

  if (showCachedData && localProfile) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] relative">
        <div className="bg-amber-50 border-amber-200 border-b py-2 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <RefreshCw className="h-4 w-4 text-amber-500 animate-spin mr-2" />
            <p className="text-amber-700 text-sm">Loading latest profile data...</p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleRefresh} disabled={refreshing}>
            Refresh
          </Button>
        </div>
        
        <UserProfileBanner />
        
        <div className="container mx-auto px-4 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ProfileSidebar userProfile={localProfile} />
            <ProfileTabs userProfile={localProfile} />
          </div>
          
          <div className={`mt-10 text-center text-sm ${theme.textColor}`}>
            <p>The more you complete, the more EmviApp works for you.</p>
          </div>
          
          <div className="mt-6">
            <ProfileAISupport />
          </div>
        </div>
      </div>
    );
  }
  
  if (loading) {
    return <ProfileLoading 
      message={longLoading ? "Still loading your profile..." : "Loading your profile"}
      duration={5000}
      onRefresh={handleRefresh}
    />;
  }
  
  if (!userProfile && !loading) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Profile not available</h2>
          <p className="text-gray-600 mb-4">
            We couldn't retrieve your profile information. This might be due to a connection issue or your profile may not be fully set up yet.
          </p>
          <div className="space-y-3">
            <Button 
              onClick={handleRefresh}
              className="w-full"
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
            <p className="text-xs text-gray-500">
              If problems persist, try signing out and back in, or contact support.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <UserProfileBanner />
      
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <ProfileSidebar userProfile={userProfile as UserProfileType} />
          <ProfileTabs userProfile={userProfile as UserProfileType} />
        </div>
        
        <div className={`mt-10 text-center text-sm ${theme.textColor}`}>
          <p>The more you complete, the more EmviApp works for you.</p>
        </div>
        
        <div className="mt-6">
          <ProfileAISupport />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
