
import { useAuth } from "@/context/auth";
import UserProfileBanner from "./UserProfileBanner";
import ProfileSidebar from "./ProfileSidebar";
import ProfileTabs from "./ProfileTabs";
import ProfileLoadingManager from "./ProfileLoadingManager";
import ProfileAISupport from "./ProfileAISupport";
import { getRoleTheme } from "./utils/themeHelpers";
import { UserProfile as UserProfileType } from "@/types/profile";
import { useEffect, useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";

// Global cache with extended timeout (10 minutes instead of 5)
const CACHE_TIMEOUT = 10 * 60 * 1000; // 10 minutes
let lastLoadedTime = 0;
let cachedProfileData: UserProfileType | null = null;

const UserProfile = () => {
  const { userProfile, userRole, loading, refreshUserProfile, isError } = useAuth();
  const theme = useMemo(() => getRoleTheme(userRole), [userRole]);
  const [refreshing, setRefreshing] = useState(false);
  const [showCachedData, setShowCachedData] = useState(false);
  const [localProfile, setLocalProfile] = useState<UserProfileType | null>(null);
  
  // Enhanced caching logic
  useEffect(() => {
    const now = Date.now();
    const timeSinceLastLoad = now - lastLoadedTime;
    
    // Use cache more aggressively - show immediately while fresh data loads
    if (cachedProfileData && timeSinceLastLoad < CACHE_TIMEOUT) {
      setLocalProfile(cachedProfileData);
      setShowCachedData(loading); // Only show cached data indicator when actively loading
    }
    
    if (userProfile) {
      // Update cache with new data
      cachedProfileData = userProfile;
      lastLoadedTime = Date.now();
      setLocalProfile(userProfile);
      setShowCachedData(false);
    }
  }, [userProfile, loading]);
  
  // Optimized refresh function with better error handling
  const handleRefresh = useCallback(async () => {
    if (!refreshUserProfile) return;
    
    setRefreshing(true);
    try {
      await refreshUserProfile();
      toast.success("Profile refreshed successfully");
    } catch (error) {
      console.error("Profile refresh error:", error);
      toast.error("Couldn't refresh profile. Please try again.");
    } finally {
      setRefreshing(false);
    }
  }, [refreshUserProfile]);

  // Show cached data with loading indicator
  if (showCachedData && localProfile) {
    return (
      <div className="min-h-screen bg-[#FDFDFD] relative">
        <ProfileLoadingManager 
          cachedProfile={localProfile}
          showFullPageLoader={false}
          onRefresh={handleRefresh}
          loadingType="profile"
          duration={2000}
        />
        
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
  
  // Loading state with improved visual feedback
  if (loading) {
    return <ProfileLoadingManager 
      message="Loading your profile..."
      duration={3000}
      onRefresh={handleRefresh}
      loadingType="profile"
    />;
  }
  
  // Error state with clear feedback
  if ((isError || !userProfile) && !loading) {
    return <ProfileLoadingManager 
      isError={true}
      onRefresh={handleRefresh}
    />;
  }

  // Normal display when everything is loaded
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
