
import React from 'react';
import { useAuth } from '@/context/auth';
import Logo from '@/components/ui/Logo';
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { Badge } from "@/components/ui/badge";
import { Crown, Sparkles, Star, Trophy, Gem } from "lucide-react";
import { motion } from "framer-motion";

export interface CustomerDashboardHeaderProps {
  profile?: any;
}

const CustomerDashboardHeader = ({ profile }: CustomerDashboardHeaderProps) => {
  const { userProfile } = useAuth();
  const userDisplayData = profile || userProfile;
  
  return (
    <motion.div 
      className="mb-12 relative"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-6">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Logo size="small" />
          </motion.div>
          <div>
            <div className="flex items-center gap-4 mb-3">
              <motion.h1 
                className="text-4xl font-['Playfair_Display'] font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Welcome back, {userDisplayData?.full_name?.split(' ')[0] || 'Beauty Enthusiast'}!
              </motion.h1>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="relative"
              >
                <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-2">
                  <Crown className="h-4 w-4 mr-2" />
                  VIP Diamond Member
                </Badge>
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-amber-300 to-yellow-300 rounded-full opacity-30 blur-sm"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>
            <motion.p 
              className="text-gray-600 font-['Inter'] flex items-center gap-3 text-lg"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Sparkles className="h-5 w-5 text-purple-500" />
              Your personalized luxury beauty experience awaits
              <Gem className="h-4 w-4 text-pink-500" />
            </motion.p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <NotificationCenter className="relative" />
          </motion.div>
        </div>
      </div>
      
      {/* Luxury Premium Status Card */}
      <motion.div 
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 p-8 text-white shadow-2xl"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-white/10 backdrop-blur-sm" />
          <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/20 via-transparent to-white/20"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <motion.div 
              className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/30 shadow-xl"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Crown className="h-8 w-8" />
            </motion.div>
            <div>
              <motion.p 
                className="font-['Playfair_Display'] text-2xl font-bold mb-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                Premium Beauty Experience
              </motion.p>
              <motion.p 
                className="text-white/90 text-base font-['Inter']"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                Unlimited access to top artists and exclusive luxury perks
              </motion.p>
            </div>
          </div>
          
          <div className="text-right">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.0, type: "spring" }}
              className="flex items-center gap-3 mb-2"
            >
              <Trophy className="h-6 w-6 text-yellow-300" />
              <motion.p 
                className="text-4xl font-['Playfair_Display'] font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                1,250
              </motion.p>
            </motion.div>
            <p className="text-white/90 text-base font-['Inter']">Premium Credits Available</p>
          </div>
        </div>
        
        {/* Decorative floating elements */}
        <motion.div 
          className="absolute top-6 right-6 w-24 h-24 bg-white/10 rounded-full blur-xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-6 left-6 w-20 h-20 bg-white/10 rounded-full blur-lg"
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        
        {/* Sparkle effects */}
        <motion.div
          className="absolute top-1/2 left-1/4"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Star className="h-4 w-4 text-yellow-300" />
        </motion.div>
        <motion.div
          className="absolute top-1/4 right-1/3"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
        >
          <Sparkles className="h-3 w-3 text-pink-200" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default CustomerDashboardHeader;
