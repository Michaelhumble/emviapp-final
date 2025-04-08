
import { useAuth } from "@/context/auth";
import { getRoleTheme } from "./utils/themeHelpers";

const UserProfileBanner = () => {
  const { userRole } = useAuth();
  const theme = getRoleTheme(userRole);
  
  return (
    <div className={`h-64 bg-gradient-to-r ${theme.gradient} ${theme.patternClass} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40"></div>
      <div className="absolute inset-0 backdrop-blur-[1px]"></div>
      <div className="container mx-auto h-full flex items-end px-4">
        <div className="mb-16 z-10">
          <h1 className="text-white text-3xl md:text-4xl font-bold drop-shadow-md">
            Your Profile
          </h1>
          <p className="text-white/80 mt-2">
            Make a lasting impression across the beauty industry
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileBanner;
