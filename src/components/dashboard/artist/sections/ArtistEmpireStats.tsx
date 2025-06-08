
import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Users, Calendar, Star, TrendingUp, Zap } from 'lucide-react';

const ArtistEmpireStats = () => {
  const stats = [
    {
      label: "Monthly Revenue",
      value: 3240,
      prefix: "$",
      icon: DollarSign,
      change: "+32%",
      color: "from-emerald-400 to-green-500",
      bgColor: "from-emerald-50 to-green-50",
      borderColor: "border-emerald-200/50"
    },
    {
      label: "Happy Clients", 
      value: 156,
      icon: Users,
      change: "+18",
      color: "from-blue-400 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-200/50"
    },
    {
      label: "This Month",
      value: 47,
      icon: Calendar,
      change: "+12",
      color: "from-purple-400 to-pink-500",
      bgColor: "from-purple-50 to-pink-50",
      borderColor: "border-purple-200/50"
    },
    {
      label: "Average Rating",
      value: 4.9,
      icon: Star,
      change: "+0.3",
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
      borderColor: "border-yellow-200/50"
    },
    {
      label: "Growth Rate",
      value: 247,
      suffix: "%",
      icon: TrendingUp,
      change: "+89%",
      color: "from-rose-400 to-pink-500",
      bgColor: "from-rose-50 to-pink-50",
      borderColor: "border-rose-200/50"
    },
    {
      label: "Viral Score",
      value: 9.2,
      suffix: "/10",
      icon: Zap,
      change: "+1.8",
      color: "from-indigo-400 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50",
      borderColor: "border-indigo-200/50"
    }
  ];

  return (
    <div className="mb-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-2">Your Empire Stats ✨</h2>
        <p className="text-lg text-gray-600 font-inter">Watch your beauty business thrive</p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`relative overflow-hidden bg-gradient-to-br ${stat.bgColor} border ${stat.borderColor} rounded-2xl p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500`}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <motion.div 
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring", stiffness: 200 }}
                  className={`p-4 rounded-2xl bg-gradient-to-r ${stat.color} shadow-lg`}
                >
                  <stat.icon className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
                </motion.div>
                
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 300 }}
                  className={`px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r ${stat.color} text-white shadow-md`}
                >
                  {stat.change}
                </motion.div>
              </div>
              
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
                className="mb-4"
              >
                <div className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-1">
                  {stat.prefix}
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 1 }}
                  >
                    {stat.value.toLocaleString()}
                  </motion.span>
                  {stat.suffix}
                </div>
                
                <div className="text-sm lg:text-base text-gray-700 font-inter font-medium">
                  {stat.label}
                </div>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1 + index * 0.1, duration: 1.5 }}
                className="h-1 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full overflow-hidden"
              >
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(95, 60 + index * 8)}%` }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 1.5, ease: "easeOut" }}
                  className={`h-full bg-gradient-to-r ${stat.color} rounded-full`}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ArtistEmpireStats;
