
import { useAuth } from "@/context/auth";
import UserProfileBanner from "./UserProfileBanner";
import ProfileSidebar from "./ProfileSidebar";
import ProfileTabs from "./ProfileTabs";
import ProfileLoading from "./ProfileLoading";
import { getRoleTheme } from "./utils/themeHelpers";

const UserProfile = () => {
  const { userProfile, userRole } = useAuth();
  const theme = getRoleTheme(userRole);

  if (!userProfile) {
    return <ProfileLoading />;
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <UserProfileBanner />
      
      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Profile Sidebar */}
          <ProfileSidebar userProfile={userProfile} />
          
          {/* Right Column - Profile Tabs */}
          <ProfileTabs userProfile={userProfile} />
        </div>
        
        <div className={`mt-10 text-center text-sm ${theme.textColor}`}>
          <p>The more you complete, the more EmviApp works for you.</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
