
import { useAuth } from "@/context/auth";

interface SalonDashboardBannerProps {
  userName?: string;
}

const SalonDashboardBanner = ({ userName }: SalonDashboardBannerProps) => {
  const { userProfile } = useAuth();
  const displayName = userName || userProfile?.salon_name || userProfile?.full_name || "Salon Owner";
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm">
      <h1 className="text-2xl font-bold text-blue-800">
        Welcome back, {displayName}!
      </h1>
      <p className="text-blue-600 mt-2">
        Let's grow your salon today.
      </p>
      
      {/* Vietnamese welcome text for salon owners - making it more prominent */}
      <p className="text-blue-700 text-sm font-medium mt-3 bg-blue-50 px-3 py-2 inline-block rounded-md border border-blue-100">
        Cùng nhau phát triển tiệm làm đẹp của bạn. <span className="text-blue-500 ml-1">Let's grow your beauty business together.</span>
      </p>
    </div>
  );
};

export default SalonDashboardBanner;
