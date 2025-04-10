
import React from "react";
import EmviLogo from "@/components/branding/EmviLogo";
import { motion } from "framer-motion";

interface SalonDashboardBannerProps {
  userName?: string;
  businessName?: string;
}

const SalonDashboardBanner: React.FC<SalonDashboardBannerProps> = ({ 
  userName = "Salon Owner",
  businessName
}) => {
  const displayName = businessName || userName;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-6 border border-blue-100"
    >
      <div className="flex items-center gap-4">
        <EmviLogo size="small" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Welcome back, {displayName}!
          </h1>
          <p className="text-gray-600">
            Manage your salon, track bookings, and connect with potential clients and artists.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SalonDashboardBanner;
