
import React from 'react';
import { useAuth } from '@/context/auth';
import Logo from '@/components/ui/Logo';
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { Badge } from "@/components/ui/badge";
import { Crown, Sparkles } from "lucide-react";
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
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Welcome back, {userDisplayData?.full_name?.split(' ')[0] || 'Beauty Enthusiast'}!
              </h1>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Badge className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border-amber-200">
                  <Crown className="h-3 w-3 mr-1" />
                  VIP Member
                </Badge>
              </motion.div>
            </div>
            <p className="text-gray-600 mt-1 flex items-center gap-2">
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
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Crown className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Premium Beauty Experience</p>
              <p className="text-white/80 text-sm">Unlimited access to top artists and exclusive perks</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold">1,250</p>
            <p className="text-white/80 text-sm">Credits Available</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomerDashboardHeader;
