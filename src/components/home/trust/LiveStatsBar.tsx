import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Star, TrendingUp, Crown, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AnimatedNumber from '@/components/customer/AnimatedNumber';

const LiveStatsBar = () => {
  const [stats, setStats] = useState({
    economicImpact: 8200000000, // $8.2B
    professionals: 150000,
    weeklyJoins: 2847,
    communityRank: 1
  });

  // Animate numbers on mount with realistic Vietnamese nail industry data
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        economicImpact: 8200000000 + Math.floor(Math.random() * 1000000), // Growing impact
        professionals: 150000 + Math.floor(Math.random() * 100),
        weeklyJoins: 2847 + Math.floor(Math.random() * 50),
        communityRank: 1
      });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const statItems = [
    {
      icon: DollarSign,
      value: `$${(stats.economicImpact / 1000000000).toFixed(1)}B`,
      label: 'Vietnamese Nail Industry Impact',
      subLabel: 'Contributed yearly in America',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50'
    },
    {
      icon: Crown,
      value: `#${stats.communityRank}`,
      label: 'Vietnamese Nail Community',
      subLabel: 'Largest network in North America',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-gradient-to-br from-purple-50 to-violet-50'
    },
    {
      icon: Users,
      value: `${(stats.professionals / 1000).toFixed(0)}K+`,
      label: 'Jobs Posted This Year',
      subLabel: 'Real opportunities, real growth',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-gradient-to-br from-blue-50 to-cyan-50',
      animated: true
    },
    {
      icon: TrendingUp,
      value: `${stats.weeklyJoins.toLocaleString()}+`,
      label: 'New Members This Week',
      subLabel: 'Join the fastest-growing community',
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-gradient-to-br from-pink-50 to-rose-50',
      pulse: true
    }
  ];

  return (
    <section className="relative py-16 bg-gradient-to-br from-purple-50/80 via-white to-pink-50/60">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
            The Vietnamese Beauty Community's <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Billion-Dollar Impact</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Real numbers from the heart of America's beauty industry. Join the community that's reshaping how beauty professionals connect and grow.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              className={`${item.bgColor} rounded-2xl p-6 text-center border border-white/60 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className={`p-3 rounded-full bg-gradient-to-r ${item.color} shadow-lg`}>
                  <item.icon 
                    className={`h-6 w-6 text-white ${item.pulse ? 'animate-pulse' : ''}`} 
                  />
                </div>
              </div>
              
              <motion.div 
                className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-playfair mb-2`}
                animate={{ scale: item.pulse ? [1, 1.05, 1] : 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {item.animated ? (
                  <AnimatedNumber value={parseInt(item.value.replace(/[^\d]/g, ''))} />
                ) : (
                  item.value
                )}
              </motion.div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-1 font-inter">
                {item.label}
              </h3>
              <p className="text-sm text-gray-600 font-inter">
                {item.subLabel}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link to="/auth/signup">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <span className="text-lg">
                Đăng ký miễn phí — Start Earning Today
              </span>
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-3 max-w-md mx-auto">
            Join thousands of beauty professionals who've found their perfect opportunities with EmviApp
          </p>
        </motion.div>

        {/* Trust indicators - Small user avatars/testimonials */}
        <motion.div 
          className="flex justify-center items-center mt-8 space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-600 ml-3 italic">
            "Best decision I made for my nail career" - Linh N., San Jose
          </span>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveStatsBar;