
import { useAuth } from "@/context/auth";

interface SalonDashboardBannerProps {
  userName?: string;
}

const SalonDashboardBanner = ({ userName }: SalonDashboardBannerProps) => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm">
      <h1 className="text-2xl font-bold text-blue-800">
        Welcome to your Salon Dashboard, {userName || "Owner"}!
      </h1>
      <p className="text-blue-600 mt-2">
        Manage your salon, team, and grow your business all in one place.
      </p>
      
      {/* Vietnamese welcome text for salon owners */}
      <p className="text-gray-500 text-sm italic mt-3">
        <span className="block">Chúng tôi ở đây để giúp bạn phát triển tiệm salon của bạn.</span>
        <span className="block">We're here to help you grow your salon business.</span>
      </p>
    </div>
  );
};

export default SalonDashboardBanner;
