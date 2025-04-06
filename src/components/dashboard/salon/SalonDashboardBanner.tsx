
import { useAuth } from "@/context/auth";

interface SalonDashboardBannerProps {
  userName?: string;
}

const SalonDashboardBanner = ({ userName }: SalonDashboardBannerProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm">
      <h1 className="text-2xl font-bold text-blue-800">
        Welcome back, {userName || "Salon Owner"}!
      </h1>
      <p className="text-blue-600 mt-2">
        Let's grow your salon today.
      </p>
      
      {/* Vietnamese welcome text for salon owners */}
      <p className="text-gray-500 text-sm italic mt-3">
        <span className="block">Cùng nhau phát triển tiệm làm đẹp của bạn.</span>
        <span className="block">Let's grow your beauty salon together.</span>
      </p>
    </div>
  );
};

export default SalonDashboardBanner;
