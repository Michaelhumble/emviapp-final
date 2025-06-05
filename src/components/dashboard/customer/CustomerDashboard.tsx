
import React from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import CustomerDashboardHeader from './CustomerDashboardHeader';
import CustomerPremiumMetrics from './CustomerPremiumMetrics';
import CustomerPremiumActions from './CustomerPremiumActions';
import CustomerReferralTracker from './CustomerReferralTracker';
import CustomerDashboardWidgets from './CustomerDashboardWidgets';
import RecommendedServicesSection from './services/RecommendedServicesSection';

const CustomerDashboard = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 relative overflow-hidden">
        {/* Luxury Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-indigo-200/20 to-blue-200/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
          <CustomerDashboardHeader />
          
          {/* Hero Referral Section - Most Important */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <CustomerReferralTracker />
          </motion.div>

          {/* Premium Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-8"
          >
            <CustomerPremiumMetrics />
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-8"
          >
            <CustomerPremiumActions />
          </motion.div>

          {/* Recommended Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-8"
          >
            <RecommendedServicesSection />
          </motion.div>

          {/* Dashboard Widgets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <CustomerDashboardWidgets />
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomerDashboard;
