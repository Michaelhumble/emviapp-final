
import React from "react";
import { motion } from "framer-motion";

/*
🚀 BILLION $$$ SALON DASHBOARD FEATURES CHECKLIST
=================================================
Premium features to implement for world-class salon dashboard:

□ Real-time Analytics Dashboard - Live charts and metrics
□ AI-Powered Insights - Business optimization recommendations  
□ Revenue Forecasting - Predictive analytics and projections
□ Customer Journey Mapping - Retention and lifecycle metrics
□ Smart Booking Intelligence - Demand prediction algorithms
□ Staff Performance Leaderboards - Gamified team management
□ Automated Marketing Center - Campaign management system
□ Financial Health Score - Profit optimization metrics
□ Competitive Analysis Tools - Market positioning insights
□ Premium Client Experience - VIP management system

Status: Ready for implementation phase
Owner: Salon Dashboard Premium Upgrade
*/

interface RoleDashboardLayoutProps {
  children: React.ReactNode;
  role: "salon" | "artist" | "customer" | "freelancer" | "supplier" | "manager";
  headerContent?: React.ReactNode;
}

const RoleDashboardLayout: React.FC<RoleDashboardLayoutProps> = ({
  children,
  role,
  headerContent
}) => {
  // Animation variants for smooth page transitions
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30"
    >
      {/* Header Section */}
      {headerContent && (
        <div className="bg-white/90 backdrop-blur-sm border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {headerContent}
          </div>
        </div>
      )}

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Role-specific styling */}
        <div className={`
          ${role === "salon" ? "salon-dashboard-container" : ""}
          ${role === "artist" ? "artist-dashboard-container" : ""}
          ${role === "customer" ? "customer-dashboard-container" : ""}
          space-y-8
        `}>
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default RoleDashboardLayout;
