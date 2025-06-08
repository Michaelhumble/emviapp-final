
import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Calendar, Star, TrendingUp, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import AnimatedNumber from '@/components/customer/AnimatedNumber';

const ArtistQuickStats = () => {
  const stats = [
    {
      label: "This Month",
      value: 2840,
      prefix: "$",
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
      change: "+24%"
    },
    {
      label: "Happy Clients",
      value: 127,
      icon: Users,
      color: "text-blue-600", 
      bgColor: "bg-blue-50",
      change: "+12"
    },
    {
      label: "Bookings",
      value: 43,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      change: "+8"
    },
    {
      label: "Rating",
      value: 4.9,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      change: "+0.2"
    },
    {
      label: "Growth",
      value: 189,
      suffix: "%",
      icon: TrendingUp,
      color: "text-pink-600",
      bgColor: "bg-pink-50",
      change: "+67%"
    },
    {
      label: "Viral Score",
      value: 8.7,
      icon: Zap,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      change: "+1.3"
    }
  ];

  return (
    <div className="space-y-4">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold text-gray-800 px-2"
      >
        Your Empire Stats 📊
      </motion.h2>
      
      <div className="grid grid-cols-2 gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="p-4 border-0 shadow-sm bg-white/80 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              
              <div className="text-2xl font-bold text-gray-800 mb-1">
                {stat.prefix}
                <AnimatedNumber value={stat.value} />
                {stat.suffix}
              </div>
              
              <div className="text-xs text-gray-600 font-medium">
                {stat.label}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ArtistQuickStats;
