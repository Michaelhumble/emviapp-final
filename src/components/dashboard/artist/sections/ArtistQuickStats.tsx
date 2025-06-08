
import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Calendar, Star, TrendingUp, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const ArtistQuickStats = () => {
  const stats = [
    {
      label: "This Month",
      value: 2840,
      prefix: "$",
      icon: DollarSign,
      color: "text-emerald-400",
      bgColor: "bg-gradient-to-br from-emerald-500/20 to-green-500/20",
      change: "+24%",
      changeColor: "text-emerald-400"
    },
    {
      label: "Happy Clients",
      value: 127,
      icon: Users,
      color: "text-blue-400", 
      bgColor: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      change: "+12",
      changeColor: "text-blue-400"
    },
    {
      label: "Bookings",
      value: 43,
      icon: Calendar,
      color: "text-purple-400",
      bgColor: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      change: "+8",
      changeColor: "text-purple-400"
    },
    {
      label: "Rating",
      value: 4.9,
      icon: Star,
      color: "text-yellow-400",
      bgColor: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20",
      change: "+0.2",
      changeColor: "text-yellow-400"
    },
    {
      label: "Growth",
      value: 189,
      suffix: "%",
      icon: TrendingUp,
      color: "text-pink-400",
      bgColor: "bg-gradient-to-br from-pink-500/20 to-rose-500/20",
      change: "+67%",
      changeColor: "text-pink-400"
    },
    {
      label: "Viral Score",
      value: 8.7,
      icon: Zap,
      color: "text-orange-400",
      bgColor: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      change: "+1.3",
      changeColor: "text-orange-400"
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-2xl"
        >
          📊
        </motion.div>
        <h2 className="text-xl font-bold text-white">Your Empire Stats</h2>
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="px-2 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full border border-green-500/30"
        >
          LIVE
        </motion.div>
      </motion.div>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className={`p-4 border-0 shadow-xl backdrop-blur-sm ${stat.bgColor} border border-white/10`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                  className={`text-xs font-bold ${stat.changeColor} bg-white/10 px-2 py-1 rounded-full border border-white/20`}
                >
                  {stat.change}
                </motion.div>
              </div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                className="text-2xl font-bold text-white mb-1"
              >
                {stat.prefix}
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                >
                  {stat.value}
                </motion.span>
                {stat.suffix}
              </motion.div>
              
              <div className="text-xs text-gray-300 font-medium">
                {stat.label}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* FOMO Message */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4 text-center"
      >
        <div className="text-sm text-purple-200 mb-1">
          🚀 <span className="font-semibold text-white">Artists who share grow 10x faster!</span>
        </div>
        <div className="text-xs text-purple-300">
          Don't get left behind—your empire awaits! ✨
        </div>
      </motion.div>
    </div>
  );
};

export default ArtistQuickStats;
