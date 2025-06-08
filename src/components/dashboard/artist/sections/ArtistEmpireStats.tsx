
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
      change: "+24%",
      color: "emerald"
    },
    {
      label: "Active Clients",
      value: 127,
      icon: Users,
      change: "+12",
      color: "blue"
    },
    {
      label: "This Month",
      value: 43,
      icon: Calendar,
      change: "+8",
      color: "purple"
    },
    {
      label: "Average Rating",
      value: 4.9,
      icon: Star,
      change: "+0.2",
      color: "yellow"
    },
    {
      label: "Growth Rate",
      value: 189,
      suffix: "%",
      icon: TrendingUp,
      change: "+67%",
      color: "pink"
    },
    {
      label: "Viral Score",
      value: 8.7,
      suffix: "/10",
      icon: Zap,
      change: "+1.3",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: "from-emerald-50 to-green-50 border-emerald-100 text-emerald-600",
      blue: "from-blue-50 to-cyan-50 border-blue-100 text-blue-600",
      purple: "from-purple-50 to-pink-50 border-purple-100 text-purple-600",
      yellow: "from-yellow-50 to-orange-50 border-yellow-100 text-yellow-600",
      pink: "from-pink-50 to-rose-50 border-pink-100 text-pink-600",
      orange: "from-orange-50 to-red-50 border-orange-100 text-orange-600"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-2">Your Empire Stats</h2>
        <p className="text-gray-600 font-inter">Track your growth and celebrate your success</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`bg-gradient-to-br ${getColorClasses(stat.color)} border rounded-2xl p-4 lg:p-6 shadow-sm hover:shadow-md transition-all duration-300`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-white/80 border border-white/40`}>
                <stat.icon className={`h-5 w-5 lg:h-6 lg:w-6 ${stat.color === 'yellow' ? 'text-yellow-600' : stat.color === 'emerald' ? 'text-emerald-600' : stat.color === 'blue' ? 'text-blue-600' : stat.color === 'purple' ? 'text-purple-600' : stat.color === 'pink' ? 'text-pink-600' : 'text-orange-600'}`} />
              </div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring", stiffness: 200 }}
                className={`text-xs font-bold px-2 py-1 rounded-full bg-white/80 border border-white/40 ${stat.color === 'yellow' ? 'text-yellow-700' : stat.color === 'emerald' ? 'text-emerald-700' : stat.color === 'blue' ? 'text-blue-700' : stat.color === 'purple' ? 'text-purple-700' : stat.color === 'pink' ? 'text-pink-700' : 'text-orange-700'}`}
              >
                {stat.change}
              </motion.div>
            </div>
            
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
              className="text-2xl lg:text-3xl font-playfair font-bold text-gray-900 mb-2"
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
            
            <div className="text-xs lg:text-sm text-gray-700 font-inter font-medium">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ArtistEmpireStats;
