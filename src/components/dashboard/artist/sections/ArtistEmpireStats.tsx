
import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Calendar, Star, TrendingUp, Zap } from 'lucide-react';

const ArtistEmpireStats = () => {
  const stats = [
    {
      label: "Monthly Revenue",
      value: 2840,
      prefix: "$",
      icon: DollarSign,
      color: "text-emerald-400",
      bgGradient: "from-emerald-500/20 to-green-500/20",
      borderColor: "border-emerald-500/30",
      change: "+24%",
      changeColor: "text-emerald-400"
    },
    {
      label: "Active Clients",
      value: 127,
      icon: Users,
      color: "text-blue-400", 
      bgGradient: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      change: "+12",
      changeColor: "text-blue-400"
    },
    {
      label: "This Month",
      value: 43,
      icon: Calendar,
      color: "text-purple-400",
      bgGradient: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      change: "+8",
      changeColor: "text-purple-400"
    },
    {
      label: "Average Rating",
      value: 4.9,
      icon: Star,
      color: "text-yellow-400",
      bgGradient: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
      change: "+0.2",
      changeColor: "text-yellow-400"
    },
    {
      label: "Growth Rate",
      value: 189,
      suffix: "%",
      icon: TrendingUp,
      color: "text-pink-400",
      bgGradient: "from-pink-500/20 to-rose-500/20",
      borderColor: "border-pink-500/30",
      change: "+67%",
      changeColor: "text-pink-400"
    },
    {
      label: "Viral Score",
      value: 8.7,
      suffix: "/10",
      icon: Zap,
      color: "text-orange-400",
      bgGradient: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      change: "+1.3",
      changeColor: "text-orange-400"
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={{ scale: 1.02, y: -4 }}
          className={`bg-gradient-to-br ${stat.bgGradient} backdrop-blur-sm border ${stat.borderColor} rounded-2xl p-4 lg:p-6 shadow-xl hover:shadow-2xl transition-all duration-300`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20`}>
              <stat.icon className={`h-5 w-5 lg:h-6 lg:w-6 ${stat.color}`} />
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
            className="text-2xl lg:text-3xl font-bold text-white mb-2"
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
          
          <div className="text-xs lg:text-sm text-gray-300 font-medium">
            {stat.label}
          </div>

          {/* Animated Progress Bar */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1 + index * 0.1, duration: 1 }}
            className="mt-3 h-1 bg-gradient-to-r from-white/20 to-white/40 rounded-full"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default ArtistEmpireStats;
