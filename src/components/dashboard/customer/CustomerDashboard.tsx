
import React from 'react';
import { motion } from 'framer-motion';
import CustomerDashboardHeader from './CustomerDashboardHeader';
import CustomerPremiumMetrics from './CustomerPremiumMetrics';
import CustomerPremiumActions from './CustomerPremiumActions';
import CustomerReferralTracker from './CustomerReferralTracker';
import CustomerDashboardWidgets from './CustomerDashboardWidgets';
import RecommendedServicesSection from './services/RecommendedServicesSection';

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-indigo-200/30 to-blue-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-rose-200/20 to-amber-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* Premium Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(124, 58, 237, 0.3) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <CustomerDashboardHeader />
        </motion.div>
        
        {/* Hero Referral Section - Most Important */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mb-12"
        >
          <CustomerReferralTracker />
        </motion.div>

        {/* Premium Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mb-12"
        >
          <CustomerPremiumMetrics />
        </motion.div>

        {/* Quick Actions - Enhanced Layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-['Playfair_Display'] font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-3">
              Your Beauty Command Center
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Everything you need to discover, book, and enjoy premium beauty services in one elegant place
            </p>
          </div>
          <CustomerPremiumActions />
        </motion.div>

        {/* Recommended Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="mb-12"
        >
          <RecommendedServicesSection />
        </motion.div>

        {/* Dashboard Widgets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
        >
          <CustomerDashboardWidgets />
        </motion.div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
