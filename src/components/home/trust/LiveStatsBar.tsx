import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Star, TrendingUp } from 'lucide-react';

const LiveStatsBar = () => {
  const [stats, setStats] = useState({
    artists: 50000,
    bookings: 12847,
    ratings: 4.9,
    growth: 95
  });

  // Animate numbers on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        artists: 50247,
        bookings: 12851,
        ratings: 4.9,
        growth: 96
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const statItems = [
    {
      icon: Users,
      value: stats.artists.toLocaleString(),
      suffix: '+',
      label: 'Beauty Professionals',
      color: 'text-purple-600'
    },
    {
      icon: Briefcase,
      value: stats.bookings.toLocaleString(),
      suffix: '',
      label: 'Connected Today',
      color: 'text-blue-600',
      pulse: true
    },
    {
      icon: Star,
      value: stats.ratings,
      suffix: '/5',
      label: 'Average Rating',
      color: 'text-amber-500'
    },
    {
      icon: TrendingUp,
      value: stats.growth,
      suffix: '%',
      label: 'Success Rate',
      color: 'text-green-600'
    }
  ];

  return (
    <motion.div 
      className="bg-white/95 backdrop-blur-md shadow-lg border border-white/20 rounded-2xl py-6 px-8 mx-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {statItems.map((item, index) => (
          <motion.div
            key={index}
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-center mb-2">
              <item.icon 
                className={`h-6 w-6 ${item.color} ${item.pulse ? 'animate-pulse' : ''}`} 
              />
            </div>
            <motion.div 
              className={`text-2xl md:text-3xl font-bold ${item.color} font-playfair`}
              animate={{ scale: item.pulse ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {item.value}{item.suffix}
            </motion.div>
            <div className="text-sm text-muted-foreground font-inter font-medium">
              {item.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LiveStatsBar;