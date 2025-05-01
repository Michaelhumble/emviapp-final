import { useAuth } from "@/context/auth";
import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import UserProfileBanner from "./UserProfileBanner";
import ProfileSidebar from "./ProfileSidebar";
import ProfileTabs from "./ProfileTabs";
import ProfileLoadingManager from "./ProfileLoadingManager";
import ProfileAISupport from "./ProfileAISupport";
import { getRoleTheme } from "./utils/themeHelpers";
import { UserProfile as UserProfileType } from "@/context/auth/types";
import PremiumArtistProfile from "@/components/artist-profile/PremiumArtistProfile";

// Reduced cache timeout to prevent stale data issues
const CACHE_TIMEOUT = 5 * 60 * 1000; // 5 minutes
let lastLoadedTime = 0;
let cachedProfileData: UserProfileType | null = null;

import PremiumFeatureGate from '@/components/upgrade/PremiumFeatureGate';
import { useSubscription } from '@/context/subscription';

const UserProfile = () => {
  const { userProfile, userRole, loading, refreshUserProfile, isError } = useAuth();
  const theme = useMemo(() => getRoleTheme(userRole), [userRole]);
  const [refreshing, setRefreshing] = useState(false);
  const [showCachedData, setShowCachedData] = useState(false);
  const [localProfile, setLocalProfile] = useState<UserProfileType | null>(null);
  const [loadTimeout, setLoadTimeout] = useState(false);
  const [loadAttempts, setLoadAttempts] = useState(0);
  
  // Determine if we should show the premium artist profile
  const isArtistRole = userRole === 'artist' || userRole === 'nail technician/artist';
  
  // Set a loading timeout to prevent infinite loading
  useEffect(() => {
    // Only set timeout if we're in loading state
    if (loading) {
      const timeoutId = setTimeout(() => {
        setLoadTimeout(true);
        console.log("Profile loading timeout reached after 10 seconds");
      }, 10000); // 10 second timeout (reduced from 15)
      
      return () => clearTimeout(timeoutId);
    } else {
      // Reset timeout when loading completes
      setLoadTimeout(false);
    }
  }, [loading]);
  
  // Break infinite loading cycles after multiple attempts
  useEffect(() => {
    if (loading) {
      setLoadAttempts(prev => prev + 1);
      
      // After 3 loading attempts with no success, force timeout
      if (loadAttempts > 3) {
        setLoadTimeout(true);
        console.log("Forcing timeout after multiple loading attempts");
      }
    }
  }, [loading]);
  
  // Enhanced caching logic with safeguards against infinite loops
  useEffect(() => {
    console.log("UserProfile component - Cache/profile effect triggered");
    const now = Date.now();
    const timeSinceLastLoad = now - lastLoadedTime;
    
    // Use cache more conservatively - only while fresh
    if (cachedProfileData && timeSinceLastLoad < CACHE_TIMEOUT) {
      console.log("Using cached profile data, age:", timeSinceLastLoad/1000, "seconds");
      setLocalProfile(cachedProfileData);
      setShowCachedData(loading); // Only show cached data indicator when actively loading
    }
    
    if (userProfile) {
      // Update cache with new data
      console.log("User profile data available, updating cache");
      cachedProfileData = userProfile as UserProfileType;
      lastLoadedTime = Date.now();
      setLocalProfile(userProfile as UserProfileType);
      setShowCachedData(false);
      setLoadTimeout(false); // Reset timeout if profile loaded successfully
      setLoadAttempts(0); // Reset attempts counter
    } else if (!loading && !userProfile && !isError) {
      // No profile but not loading or error - something went wrong
      console.log("No profile data available but not in loading/error state");
      setLoadTimeout(true);
    }
  }, [userProfile, loading, isError]);
  
  // Optimized refresh function with better error handling
  const handleRefresh = useCallback(async () => {
    if (!refreshUserProfile) return;
    
    setRefreshing(true);
    try {
      console.log("Manually refreshing profile data");
      await refreshUserProfile();
      toast.success("Profile refreshed successfully");
      setLoadTimeout(false); // Reset timeout on successful refresh
      setLoadAttempts(0); // Reset attempts counter
    } catch (error) {
      console.error("Profile refresh error:", error);
      toast.error("Couldn't refresh profile. Please try again.");
    } finally {
      setRefreshing(false);
    }
  }, [refreshUserProfile]);

  // Show cached data with loading indicator
  if (showCachedData && localProfile) {
    console.log("Rendering cached profile data with loading indicator");
    return (
      <div className="min-h-screen bg-[#FDFDFD] relative">
        <ProfileLoadingManager 
          cachedProfile={localProfile}
          showFullPageLoader={false}
          onRefresh={handleRefresh}
          loadingType="profile"
          duration={2000}
        />
        
        {isArtistRole ? (
          <PremiumArtistProfile userProfile={localProfile} />
        ) : (
          <>
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
          </>
        )}
      </div>
    );
  }
  
  // If loading timeout occurred, show error state with retry button
  if (loadTimeout) {
    console.log("Rendering profile timeout error state");
    return (
      <div className="min-h-screen bg-[#FDFDFD] p-8">
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-sm text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Loading Timeout</h2>
          <p className="text-gray-600 mb-4">
            Your profile is taking longer than expected to load. This might be due to connection issues.
          </p>
          <button 
            onClick={handleRefresh}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
            disabled={refreshing}
          >
            {refreshing ? "Refreshing..." : "Retry Loading"}
          </button>
          <div className="mt-4 text-xs text-gray-500">
            You can also try refreshing the page or returning to dashboard.
          </div>
        </div>
      </div>
    );
  }
  
  // Loading state with improved visual feedback and guaranteed timeout
  if (loading) {
    console.log("Rendering profile loading state");
    return <ProfileLoadingManager 
      message="Loading your profile..."
      duration={3000}
      onRefresh={handleRefresh}
      loadingType="profile"
      maxLoadingTime={10000} // 10 second max loading time (reduced from 15)
    />;
  }
  
  // Error state with clear feedback
  if ((isError || !userProfile) && !loading) {
    console.log("Rendering profile error state");
    return <ProfileLoadingManager 
      isError={true}
      onRefresh={handleRefresh}
    />;
  }

  const { hasActiveSubscription } = useSubscription();

  // Normal display when everything is loaded - select the appropriate profile view based on user role
  console.log("Rendering normal profile view with data");
  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      {isArtistRole ? (
        hasActiveSubscription ? (
          <PremiumArtistProfile userProfile={userProfile as UserProfileType} />
        ) : (
          <PremiumFeatureGate feature="profile-promotion">
            <PremiumArtistProfile userProfile={userProfile as UserProfileType} />
          </PremiumFeatureGate>
        )
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default UserProfile;
