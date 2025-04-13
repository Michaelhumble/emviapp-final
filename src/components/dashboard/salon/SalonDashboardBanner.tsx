
import React from "react";
import EmviLogo from "@/components/branding/EmviLogo";
import { motion } from "framer-motion";

interface SalonDashboardBannerProps {
  userName?: string;
  businessName?: string;
}

const SalonDashboardBanner: React.FC<SalonDashboardBannerProps> = ({ 
  userName = "Beauty Professional",
  businessName
}) => {
  const displayName = businessName || userName;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-4 border border-blue-100"
    >
      <div className="flex items-center gap-3">
        <EmviLogo size="small" className="h-8 w-8" />
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            Hello, {displayName}
          </h1>
          <p className="text-sm text-gray-600">
            Manage bookings, clients, and grow your business
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SalonDashboardBanner;
