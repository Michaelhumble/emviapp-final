
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
      
      {/* Vietnamese welcome text for salon owners - explicitly styled */}
      <p className="text-gray-600 text-sm italic mt-3 block">
        Cùng nhau phát triển tiệm làm đẹp của bạn.
      </p>
    </div>
  );
};

export default SalonDashboardBanner;
