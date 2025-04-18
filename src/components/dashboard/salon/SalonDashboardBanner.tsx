
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
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-8 text-center md:text-left"
    >
      <h1 className="text-xl md:text-2xl font-serif font-semibold text-gray-900">
        Welcome back, {displayName} {businessName && "☀️"}
      </h1>
      <p className="text-sm text-gray-600 font-medium max-w-lg mt-1">
        Your salon is live. Let's keep building something beautiful.
      </p>
    </motion.div>
  );
};

export default SalonDashboardBanner;
