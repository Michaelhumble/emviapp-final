
import React from "react";
import { motion } from "framer-motion";
import { Crown, Star, Bell, Settings } from "lucide-react";
import { useAuth } from "@/context/auth";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const CustomerDashboardHeader = () => {
  const { userProfile } = useAuth();
  const firstName = userProfile?.full_name?.split(' ')[0] || 'Beauty Lover';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden bg-white/10 backdrop-blur-xl rounded-3xl p-8 mb-8 border border-white/20"
    >
      {/* Premium Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-orange-500/10" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-400/20 to-pink-400/20 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="p-2 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg"
            >
              <Crown className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold text-white font-playfair">
                Welcome back, {firstName}! ✨
              </h1>
              <p className="text-white/80 font-medium">
                Your personalized luxury beauty experience awaits
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 mt-3">
            <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 border-0 font-semibold">
              <Crown className="h-3 w-3 mr-1" />
              VIP Diamond Member
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-400 to-pink-400 text-white border-0">
              <Star className="h-3 w-3 mr-1" />
              Level 7 Beauty Explorer
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
          >
            <Bell className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/10 hover:bg-white/20 text-white border border-white/20"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CustomerDashboardHeader;
