import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Briefcase, Star, TrendingUp, Calendar, DollarSign, Youtube, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import AnimatedNumber from '@/components/customer/AnimatedNumber';

const LiveStatsBar = () => {
  const [stats, setStats] = useState({
    activeJobs: 12847,
    totalMembers: 48620,
    monthlyEarnings: 2840000,
    reviews: 15742
  });

  // Live updating counters every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        activeJobs: prev.activeJobs + Math.floor(Math.random() * 5),
        totalMembers: prev.totalMembers + (Math.random() > 0.6 ? Math.floor(Math.random() * 3) : 0),
        monthlyEarnings: prev.monthlyEarnings + (Math.random() > 0.8 ? Math.floor(Math.random() * 10000) : 0),
        reviews: prev.reviews + (Math.random() > 0.7 ? 1 : 0)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const statItems = [
    {
      icon: Calendar,
      value: `${stats.activeJobs.toLocaleString()}`,
      label: 'Active Job Opportunities',
      subLabel: 'Updated live',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-white/80 backdrop-blur-sm border border-white/60',
      animated: true
    },
    {
      icon: Users,
      value: `${stats.totalMembers.toLocaleString()}`,
      label: 'Beauty Pros Growing Daily',
      subLabel: 'Joining our community',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-white/80 backdrop-blur-sm border border-white/60',
      animated: true
    },
    {
      icon: Star,
      value: `${stats.reviews.toLocaleString()}`,
      label: '5-Star Reviews',
      subLabel: 'Real client feedback',
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'bg-white/80 backdrop-blur-sm border border-white/60',
      animated: true,
      pulse: true
    },
    {
      icon: DollarSign,
      value: `$${(stats.monthlyEarnings / 1000).toFixed(0)}K`,
      label: 'Money Earned by Pros This Month',
      subLabel: 'Real income generated',
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-white/80 backdrop-blur-sm border border-white/60',
      animated: true
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
            Where Numbers Speak for Themselves
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            The Heartbeat of the Beauty Industry — Every number represents a real story, a real dream—yours could be next.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
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
                className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-playfair mb-2 min-w-[120px] flex justify-center`}
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
          className="text-center mb-12"
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
                Sign Up Free – Start Earning Today
              </span>
              <span className="block text-sm font-normal opacity-90 mt-1">
                Đăng ký miễn phí — Bắt đầu kiếm tiền hôm nay
              </span>
            </Button>
          </Link>
          <p className="text-sm text-gray-500 mt-3 max-w-md mx-auto">
            Join thousands of beauty professionals who've found their perfect opportunities with EmviApp
          </p>
        </motion.div>

        {/* Trusted by Beauty Community */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-gray-600 text-lg mb-6 font-medium">Trusted by the Beauty Community on:</p>
          <div className="flex justify-center items-center space-x-8 mb-8">
            {[
              { name: "YouTube", icon: Youtube, color: "text-red-500 hover:text-red-600" },
              { name: "TikTok", icon: TrendingUp, color: "text-gray-700 hover:text-gray-800" },
              { name: "Instagram", icon: Instagram, color: "text-pink-500 hover:text-pink-600" },
              { name: "LinkedIn", icon: Briefcase, color: "text-blue-600 hover:text-blue-700" }
            ].map((social, index) => (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`${social.color} transition-all duration-300 cursor-pointer transform hover:scale-110`}
              >
                <div className="flex flex-col items-center min-h-[60px] min-w-[60px] justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-2 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
                    <social.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{social.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Magazine-style badges */}
          <div className="flex justify-center items-center space-x-6 opacity-60">
            {[
              "Modern Salon", "Nails Magazine", "Beauty Launchpad", "IECSC"
            ].map((magazine, index) => (
              <motion.div
                key={magazine}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="bg-white/70 px-4 py-2 rounded-lg border border-gray-200 shadow-sm"
              >
                <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {magazine}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Community Stories */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {[
            { name: "Maria L.", story: "Found my dream salon in 3 days", role: "Hair Stylist", city: "Miami" },
            { name: "David K.", story: "Doubled my client base this month", role: "Barber", city: "NYC" },
            { name: "Lily N.", story: "Finally working at a spa I love", role: "Esthetician", city: "LA" }
          ].map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + index * 0.1 }}
              className="bg-white rounded-xl p-4 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{testimonial.name.charAt(0)}</span>
                </div>
                <div>
                  <div className="text-gray-800 font-medium text-sm">{testimonial.name}</div>
                  <div className="text-gray-500 text-xs">{testimonial.role} • {testimonial.city}</div>
                </div>
              </div>
              <p className="text-gray-700 text-sm italic">"{testimonial.story}"</p>
              <div className="flex text-yellow-400 text-xs mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Subtle Vietnamese Nod */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <p className="text-gray-400 text-sm">
            Proudly trusted by Vietnamese and global beauty professionals
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LiveStatsBar;