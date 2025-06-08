
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, Star, Calendar } from 'lucide-react';

const statsData = [
  {
    icon: Users,
    value: "47",
    label: "Happy Clients",
    change: "+12 this month",
    color: "from-blue-500 to-purple-500",
    bgColor: "bg-blue-50"
  },
  {
    icon: Star,
    value: "4.9",
    label: "Average Rating",
    change: "Trending up!",
    color: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-50"
  },
  {
    icon: Calendar,
    value: "23",
    label: "Bookings",
    change: "+8 this week",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50"
  },
  {
    icon: TrendingUp,
    value: "$2,847",
    label: "This Month",
    change: "+24% vs last month",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50"
  }
];

const ArtistPremiumStats = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Card className={`border-0 shadow-lg ${stat.bgColor} overflow-hidden relative`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-5 w-5 text-white" />
                </div>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
              
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: (index * 0.1) + 0.3, type: "spring" }}
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              </motion.div>
              
              <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
              <p className="text-xs text-green-600 font-medium">{stat.change}</p>
              
              {/* Animated background decoration */}
              <div className={`absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r ${stat.color} opacity-10 rounded-full`}></div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ArtistPremiumStats;
