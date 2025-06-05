
import React from 'react';
import { useAuth } from '@/context/auth';
import Logo from '@/components/ui/Logo';
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { Badge } from "@/components/ui/badge";
import { Crown, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";

export interface CustomerDashboardHeaderProps {
  profile?: any;
}

const CustomerDashboardHeader = ({ profile }: CustomerDashboardHeaderProps) => {
  const { userProfile } = useAuth();
  const userDisplayData = profile || userProfile;
  
  return (
    <motion.div 
      className="mb-8 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Logo size="small" />
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-['Playfair_Display'] font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                Welcome back, {userDisplayData?.full_name?.split(' ')[0] || 'Beauty Enthusiast'}!
              </h1>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative"
              >
                <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300">
                  <Crown className="h-3 w-3 mr-1" />
                  VIP Member
                </Badge>
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-full opacity-30 blur-sm animate-pulse" />
              </motion.div>
            </div>
            <p className="text-gray-600 font-['Inter'] flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-500" />
              Your personalized beauty dashboard is ready for you
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <NotificationCenter className="relative" />
        </div>
      </div>
      
      {/* Premium Status Bar */}
      <motion.div 
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 p-6 text-white shadow-2xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {/* Glassmorphism overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
        
        {/* Animated border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/20 via-transparent to-white/20 animate-pulse" />
        
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Crown className="h-6 w-6" />
            </motion.div>
            <div>
              <p className="font-['Playfair_Display'] text-lg font-semibold mb-1">Premium Beauty Experience</p>
              <p className="text-white/90 text-sm font-['Inter']">Unlimited access to top artists and exclusive perks</p>
            </div>
          </div>
          <div className="text-right">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring" }}
              className="flex items-center gap-2 mb-1"
            >
              <Star className="h-5 w-5 text-yellow-300" />
              <p className="text-3xl font-['Playfair_Display'] font-bold">1,250</p>
            </motion.div>
            <p className="text-white/90 text-sm font-['Inter']">Credits Available</p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/5 rounded-full blur-xl" />
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/5 rounded-full blur-lg" />
      </motion.div>
    </motion.div>
  );
};

export default CustomerDashboardHeader;
