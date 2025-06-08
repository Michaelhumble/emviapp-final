
import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Calendar, Star, TrendingUp, Zap, Crown, Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';

const ArtistEmpireStats = () => {
  const stats = [
    {
      label: "Monthly Revenue",
      value: 2840,
      prefix: "$",
      icon: DollarSign,
      color: "text-emerald-400",
      bgGradient: "bg-gradient-to-br from-emerald-500/20 to-green-500/20",
      change: "+24%",
      changeColor: "text-emerald-400",
      description: "vs last month"
    },
    {
      label: "Happy Clients",
      value: 127,
      icon: Users,
      color: "text-blue-400", 
      bgGradient: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
      change: "+12",
      changeColor: "text-blue-400",
      description: "new this week"
    },
    {
      label: "Bookings",
      value: 43,
      icon: Calendar,
      color: "text-purple-400",
      bgGradient: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
      change: "+8",
      changeColor: "text-purple-400",
      description: "this week"
    },
    {
      label: "Rating",
      value: 4.9,
      icon: Star,
      color: "text-yellow-400",
      bgGradient: "bg-gradient-to-br from-yellow-500/20 to-orange-500/20",
      change: "+0.2",
      changeColor: "text-yellow-400",
      description: "all time high"
    },
    {
      label: "Growth Rate",
      value: 189,
      suffix: "%",
      icon: TrendingUp,
      color: "text-pink-400",
      bgGradient: "bg-gradient-to-br from-pink-500/20 to-rose-500/20",
      change: "+67%",
      changeColor: "text-pink-400",
      description: "year over year"
    },
    {
      label: "Viral Score",
      value: 8.7,
      icon: Zap,
      color: "text-orange-400",
      bgGradient: "bg-gradient-to-br from-orange-500/20 to-red-500/20",
      change: "+1.3",
      changeColor: "text-orange-400",
      description: "trending up"
    },
    {
      label: "Elite Rank",
      value: 3,
      prefix: "#",
      icon: Crown,
      color: "text-yellow-300",
      bgGradient: "bg-gradient-to-br from-yellow-400/20 to-amber-500/20",
      change: "↑2",
      changeColor: "text-yellow-300",
      description: "in your city"
    },
    {
      label: "Love Score",
      value: 94,
      suffix: "%",
      icon: Heart,
      color: "text-red-400",
      bgGradient: "bg-gradient-to-br from-red-500/20 to-pink-500/20",
      change: "+5%",
      changeColor: "text-red-400",
      description: "client satisfaction"
    }
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl"
          >
            👑
          </motion.div>
          <h2 className="text-2xl lg:text-3xl font-bold text-white">Your Empire Analytics</h2>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="px-3 py-1 bg-green-500/20 text-green-400 text-sm font-medium rounded-full border border-green-500/30"
          >
            LIVE
          </motion.div>
        </div>
      </motion.div>
      
      {/* Desktop Grid */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className={`p-6 border-0 shadow-2xl backdrop-blur-sm ${stat.bgGradient} border border-white/10 hover:border-white/20 transition-all duration-300`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                  className={`text-sm font-bold ${stat.changeColor} bg-white/10 px-3 py-1 rounded-full border border-white/20`}
                >
                  {stat.change}
                </motion.div>
              </div>
              
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                className="text-3xl font-bold text-white mb-2"
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
              
              <div className="text-sm text-gray-300 font-medium mb-1">
                {stat.label}
              </div>
              <div className="text-xs text-gray-400">
                {stat.description}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Mobile Grid */}
      <div className="lg:hidden grid grid-cols-2 gap-4">
        {stats.slice(0, 6).map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className={`p-4 border-0 shadow-xl backdrop-blur-sm ${stat.bgGradient} border border-white/10`}>
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
        className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6 text-center"
      >
        <div className="text-lg text-purple-200 mb-2">
          🚀 <span className="font-bold text-white">You're in the top 3% of artists in your city!</span>
        </div>
        <div className="text-sm text-purple-300">
          Artists who share their success grow 10x faster—don't get left behind! ✨
        </div>
      </motion.div>
    </div>
  );
};

export default ArtistEmpireStats;
