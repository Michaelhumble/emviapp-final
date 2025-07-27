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
    <section className="relative py-20 bg-gradient-to-br from-purple-50/80 via-white to-pink-50/60 w-full max-w-full overflow-hidden">
      <div className="container mx-auto px-4 max-w-full">
        {/* Floating background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-tl from-blue-300/20 to-purple-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-playfair font-bold text-gray-900 mb-6"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Live from the Beauty Industry
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Real numbers, real impact, real professionals — Every stat represents someone's career transformation on EmviApp
          </motion.p>
        </motion.div>

        {/* Enhanced Stats Grid with Floating Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
          {statItems.map((item, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Floating card with luxury styling */}
              <div className={`${item.bgColor} rounded-3xl p-8 text-center border border-white/60 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 relative overflow-hidden group`}>
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <motion.div 
                    className="flex items-center justify-center mb-6"
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${item.color} shadow-xl`}>
                      <item.icon 
                        className={`h-8 w-8 text-white ${item.pulse ? 'animate-pulse' : ''}`} 
                      />
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent font-playfair mb-4 min-w-[120px] flex justify-center`}
                    animate={{ 
                      scale: item.pulse ? [1, 1.05, 1] : 1,
                      textShadow: item.pulse ? ['0 0 0px rgba(147, 51, 234, 0)', '0 0 20px rgba(147, 51, 234, 0.3)', '0 0 0px rgba(147, 51, 234, 0)'] : '0 0 0px rgba(147, 51, 234, 0)'
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {item.animated ? (
                      <AnimatedNumber value={parseInt(item.value.replace(/[^\d]/g, ''))} />
                    ) : (
                      item.value
                    )}
                  </motion.div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 font-inter">
                    {item.label}
                  </h3>
                  <p className="text-gray-600 font-inter">
                    {item.subLabel}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA Section with Premium Styling */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link to="/auth/signup">
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 hover:from-purple-700 hover:via-purple-800 hover:to-pink-700 text-white font-bold px-12 py-8 rounded-2xl text-xl shadow-2xl hover:shadow-purple-500/40 transition-all duration-500 group relative overflow-hidden min-h-[64px]"
                style={{
                  boxShadow: '0 20px 40px -12px rgba(147, 51, 234, 0.4), 0 8px 16px -8px rgba(147, 51, 234, 0.3)',
                }}
              >
                <span className="relative z-10 flex items-center">
                  <span className="text-xl">💎 Join The Elite Network — Start Free Today</span>
                </span>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:animate-shimmer" />
              </Button>
            </motion.div>
          </Link>
          <motion.p 
            className="text-gray-600 mt-4 max-w-md mx-auto font-inter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Join 50,000+ beauty professionals who've transformed their careers with EmviApp
          </motion.p>
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