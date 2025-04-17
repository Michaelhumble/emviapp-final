
import React from "react";
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
  const trimmedName = displayName.split(' ')[0]; // Get first word for greeting
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-6 border border-blue-100"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h1 className="text-xl md:text-2xl font-serif font-semibold text-gray-900">
            Welcome back, {trimmedName} {businessName && "☀️"}
          </h1>
          <p className="text-sm text-gray-600 font-medium max-w-lg">
            Let's grow your bookings, team, and reach — one beautiful step at a time.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SalonDashboardBanner;
