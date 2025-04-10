
import React from "react";
import EmviLogo from "@/components/branding/EmviLogo";

interface SalonDashboardBannerProps {
  userName?: string;
}

const SalonDashboardBanner: React.FC<SalonDashboardBannerProps> = ({ 
  userName = "Salon Owner"
}) => {
  return (
    <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-6 border border-blue-100">
      <div className="flex items-center gap-4">
        <EmviLogo size="small" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {userName}!
          </h1>
          <p className="text-gray-600">
            Manage your salon, track bookings, and connect with potential clients and artists.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalonDashboardBanner;
