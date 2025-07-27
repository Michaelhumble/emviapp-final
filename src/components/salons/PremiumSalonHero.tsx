import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Search, Star, Users, TrendingUp, Shield, Clock, Award, Sparkles, Zap, Crown, PlayCircle } from 'lucide-react';
import salonHeroLuxury from '@/assets/salon-hero-luxury.jpg';

const PremiumSalonHero = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Live statistics with realistic growth
  const [stats, setStats] = useState({ 
    verified: 4247, 
    sold: 1823, 
    featured: 289,
    viewing: 34
  });

  // Recently verified salons ticker
  const [recentVerifications] = useState([
    { name: "Luxe Nail Bar", location: "Houston, TX", type: "verified" },
    { name: "Elite Beauty Studio", location: "Miami, FL", type: "featured" },
    { name: "Glamour Salon & Spa", location: "NYC, NY", type: "sold" },
    { name: "Divine Hair Lounge", location: "Los Angeles, CA", type: "verified" },
    { name: "Bella Vista Salon", location: "Austin, TX", type: "featured" }
  ]);

  const [currentVerification, setCurrentVerification] = useState(0);

  // Media badge logos
  const mediaBadges = [
    { name: "Modern Salon", logo: "🏆" },
    { name: "Nails Magazine", logo: "💅" },
    { name: "Yahoo Beauty", logo: "💄" },
    { name: "Beauty Independent", logo: "✨" },
    { name: "Professional Beauty", logo: "👑" }
  ];

  // Animate stats and ticker
  useEffect(() => {
    const statsInterval = setInterval(() => {
      setStats(prev => ({
        verified: prev.verified + Math.floor(Math.random() * 2),
        sold: prev.sold + Math.floor(Math.random() * 1),
        featured: prev.featured + Math.floor(Math.random() * 1),
        viewing: 28 + Math.floor(Math.random() * 15)
      }));
    }, 6000);

    const tickerInterval = setInterval(() => {
      setCurrentVerification(prev => (prev + 1) % recentVerifications.length);
    }, 3500);

    return () => {
      clearInterval(statsInterval);
      clearInterval(tickerInterval);
    };
  }, [recentVerifications.length]);

  return (
    <div className="relative w-full h-[100dvh] min-h-[100svh] overflow-hidden" style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0">
        {/* New luxury salon hero image */}
        <img 
          src={salonHeroLuxury}
          alt="America's most beautiful salon interior with stylists and clients" 
          className="w-full h-full object-cover object-center"
        />
        
        {/* Rich gradient overlay - preserving color and vibrancy */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#211946]/70 via-purple-900/30 to-[#e3c2fd]/10" />
        
        {/* Subtle parallax shimmer effect */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: [-100, window.innerWidth + 100] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Luxury particles animation */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-white/30 to-purple-200/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.2, 0.5],
              }}
              transition={{
                duration: 4 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 md:px-8 max-w-6xl mx-auto">
        
        {/* Premium Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-white mb-6 leading-[0.9] tracking-tight">
            <span className="bg-gradient-to-r from-white via-purple-100 to-yellow-100 bg-clip-text text-transparent drop-shadow-2xl">
              America's Most Beautiful Salons
            </span>
            <br />
            <span className="text-white/95 drop-shadow-2xl text-4xl md:text-6xl lg:text-7xl">
              —All in One Place
            </span>
          </h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-white/90 text-xl md:text-3xl lg:text-4xl mb-8 max-w-4xl leading-relaxed font-light tracking-wide drop-shadow-lg"
          >
            Get discovered. Get booked. Get inspired.<br />
            <span className="text-purple-200 font-medium">The next era of salon success starts here.</span>
          </motion.p>
        </motion.div>

        {/* Live Statistics with FOMO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 text-white/90"
        >
          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 min-h-[48px]">
            <Crown className="w-5 h-5 text-yellow-300" />
            <span className="font-semibold text-lg">{stats.verified.toLocaleString()}+ Verified</span>
          </div>
          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 min-h-[48px]">
            <TrendingUp className="w-5 h-5 text-green-300" />
            <span className="font-semibold text-lg">{stats.sold.toLocaleString()}+ Sold</span>
          </div>
          <div className="flex items-center gap-3 bg-white/15 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 min-h-[48px]">
            <Users className="w-5 h-5 text-blue-300" />
            <span className="font-semibold text-lg">{stats.viewing}+ Viewing Now</span>
          </div>
        </motion.div>

        {/* Premium Call-to-Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 md:gap-6 mb-8"
        >
          {/* Primary CTA */}
          <Link to="/sell-salon">
            <Button 
              size="lg" 
              className="group relative bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 hover:from-purple-500 hover:via-purple-600 hover:to-purple-700 text-white font-bold px-12 py-6 text-xl rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-105 min-h-[48px] border-2 border-purple-400/30"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-purple-200/20 to-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
              
              {/* Shimmer effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-2xl"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <Sparkles className="w-7 h-7 mr-3 relative z-10" /> 
              <span className="relative z-10">Get Your Salon Featured Now</span>
            </Button>
          </Link>
          
          {/* Secondary CTA */}
          <Link to="#success-stories">
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-white/60 text-white bg-white/10 backdrop-blur-md hover:bg-white/20 hover:border-white/80 px-10 py-6 text-xl rounded-2xl transition-all duration-500 hover:scale-105 min-h-[48px] font-semibold"
            >
              <PlayCircle className="w-7 h-7 mr-3" /> See Success Stories
            </Button>
          </Link>
        </motion.div>

        {/* Live FOMO Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-green-500/20 via-emerald-500/20 to-green-500/20 backdrop-blur-md px-8 py-4 rounded-full border border-green-400/30 min-h-[48px] flex items-center gap-3">
            <motion.div 
              className="w-3 h-3 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-white/90 font-medium text-lg">
              Just Verified: <span className="text-green-200 font-semibold">{recentVerifications[currentVerification].name}</span> · {recentVerifications[currentVerification].location}
            </span>
          </div>
        </motion.div>

        {/* Media Badges - Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="flex flex-wrap justify-center items-center gap-6 mb-6"
        >
          <span className="text-white/70 text-sm font-medium mb-2 md:mb-0">Featured in:</span>
          <div className="flex flex-wrap justify-center gap-4">
            {mediaBadges.map((badge, index) => (
              <motion.div
                key={badge.name}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 min-h-[44px] min-w-[44px] transition-all duration-300 hover:bg-white/20 hover:scale-105"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1 }}
              >
                <span className="text-xl">{badge.logo}</span>
                <span className="text-white/80 font-medium text-sm hidden md:inline">{badge.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default PremiumSalonHero;