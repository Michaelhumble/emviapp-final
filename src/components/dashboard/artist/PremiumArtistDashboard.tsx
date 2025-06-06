
import React from 'react';
import { motion } from 'framer-motion';
import ArtistDashboardContent from './components/ArtistDashboardContent';
import { useAuth } from '@/context/auth';

const PremiumArtistDashboard = () => {
  const { userProfile } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-pink-50/20">
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.03"%3E%3Ccircle cx="30" cy="30" r="1.5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      {/* Header Section with Glass Effect */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="backdrop-blur-sm bg-white/80 border-b border-purple-100/50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                {userProfile?.avatar_url ? (
                  <img 
                    src={userProfile.avatar_url} 
                    alt={userProfile.full_name} 
                    className="h-14 w-14 rounded-full border-3 border-white shadow-lg ring-2 ring-purple-100"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xl font-bold shadow-lg ring-2 ring-purple-100">
                    {userProfile?.full_name?.charAt(0) || "A"}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-sm"></div>
              </div>
              
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-purple-900 bg-clip-text text-transparent"
                >
                  Welcome back, {userProfile?.full_name?.split(' ')[0] || 'Artist'}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600"
                >
                  Let's make today extraordinary
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        <ArtistDashboardContent />
      </motion.div>
    </div>
  );
};

export default PremiumArtistDashboard;
