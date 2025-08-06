import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth';
import { Sparkles, Star, Award, TrendingUp, Users, Camera, Crown, MapPin, Briefcase, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProfileThemeConfig } from '@/utils/profileThemes';

interface ProfileAnimatedHeroProps {
  theme: ProfileThemeConfig;
}

const ProfileAnimatedHero: React.FC<ProfileAnimatedHeroProps> = ({ theme }) => {
  const { userProfile, userRole } = useAuth();
  const [animatedStats, setAnimatedStats] = useState({
    bookings: 0,
    views: 0,
    rating: 0
  });

  // Mock stats for demo - replace with real data
  const targetStats = {
    bookings: userRole === 'freelancer' ? 89 : 247,
    views: userRole === 'freelancer' ? 8340 : 15420,
    rating: 4.9
  };

  const isAvailable = userProfile?.available_for_hire || false;
  const profileCompletion = userProfile?.profile_completion_percentage || 0;

  // Animate counters on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    const counters = Object.keys(targetStats).map(key => {
      const target = targetStats[key as keyof typeof targetStats];
      let current = 0;
      const increment = target / steps;

      return setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
        }
        setAnimatedStats(prev => ({
          ...prev,
          [key]: key === 'rating' ? Number(current.toFixed(1)) : Math.floor(current)
        }));
      }, stepTime);
    });

    return () => counters.forEach(clearInterval);
  }, []);

  // Trigger confetti when profile is complete
  useEffect(() => {
    if (profileCompletion === 100) {
      const timer = setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: userRole === 'freelancer' 
            ? ['#F97316', '#F59E0B', '#EAB308', '#FB923C']
            : ['#8A53F8', '#F97316', '#10B981', '#F59E0B']
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [profileCompletion, userRole]);

  const userName = userProfile?.full_name || userProfile?.display_name || theme.roleDisplayName;
  const specialties = userProfile?.specialties || [];
  const tagline = userProfile?.bio || theme.welcomeMessage;
  const location = userProfile?.location || userProfile?.address || "Location not set";

  // Role-specific icon for action button
  const getActionIcon = () => {
    switch (userRole) {
      case 'freelancer':
        return <Briefcase className="w-5 h-5 mr-2" />;
      default:
        return <Camera className="w-5 h-5 mr-2" />;
    }
  };

  const getActionText = () => {
    switch (userRole) {
      case 'freelancer':
        return 'Update Services';
      default:
        return 'Add Masterpiece';
    }
  };

  return (
    <div className="relative overflow-hidden">
      {/* Animated Background with Theme Colors */}
      <div className={`absolute inset-0 ${theme.backgroundGradient.replace('bg-gradient-to-br', 'bg-gradient-to-br')}`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,hsl(var(--luxury-gold)/0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,hsl(var(--premium-purple)/0.1),transparent_70%)]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 ${theme.floatingOrb1.replace('bg-gradient-to-r', 'bg-gradient-to-r')} rounded-full opacity-30`}
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 20}%`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 px-6 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Avatar Section */}
            <motion.div 
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className={`relative ${isAvailable ? 'pulse-glow' : ''}`}>
                <Avatar className="w-24 h-24 md:w-32 md:h-32 ring-4 ring-white/50 shadow-2xl">
                  <AvatarImage src={userProfile?.avatar_url} alt={userName} />
                  <AvatarFallback className={`text-2xl font-bold ${theme.primaryButton} text-white`}>
                    {userName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                {/* Status Ring */}
                <div className={`absolute -inset-1 rounded-full border-4 ${
                  isAvailable 
                    ? 'border-green-400 shadow-lg shadow-green-400/25 animate-pulse' 
                    : 'border-gray-300'
                }`} />
                
                {/* Crown for verified users */}
                {profileCompletion === 100 && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 1, type: "spring", stiffness: 300 }}
                  >
                    <Crown className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>

              {/* Available Badge */}
              {isAvailable && (
                <motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Badge className="bg-green-500 text-white px-3 py-1 shadow-lg">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Available Now
                  </Badge>
                </motion.div>
              )}
            </motion.div>

            {/* Content Section */}
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h1 className="text-3xl md:text-5xl font-playfair font-bold mb-2">
                  Welcome back, <span className={`bg-gradient-to-r ${theme.primaryButton.includes('purple') ? 'from-purple-600 via-pink-600 to-blue-600' : 'from-orange-600 via-amber-600 to-yellow-600'} bg-clip-text text-transparent`}>{userName}</span>
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{location}</span>
                </div>
                
                <p className="text-lg text-gray-600 mb-4">{tagline}</p>
                
                {/* Specialties */}
                {specialties.length > 0 && (
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-6">
                    {specialties.slice(0, 3).map((specialty, index) => (
                      <motion.div
                        key={specialty}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                      >
                        <Badge variant="secondary" className="px-3 py-1">
                          {specialty}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* Quick Action Button */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <Button 
                    size="lg" 
                    className={`btn-luxury ${theme.primaryButton} text-white px-8 py-4 text-lg font-semibold`}
                    onClick={() => {
                      // Scroll to portfolio section and trigger upload
                      const portfolioSection = document.querySelector('[data-section="portfolio"]') as HTMLElement;
                      if (portfolioSection) {
                        portfolioSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        setTimeout(() => {
                          // Find and click the Add Photos button in the portfolio section
                          const addButton = portfolioSection.querySelector('button') as HTMLElement;
                          addButton?.click();
                        }, 800);
                      }
                    }}
                  >
                    {getActionIcon()}
                    {getActionText()}
                  </Button>
                </motion.div>
              </motion.div>
            </div>

            {/* Live Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-4 lg:gap-6"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className={`text-center ${theme.cardBackground} backdrop-blur-sm rounded-2xl p-4 shadow-xl border ${theme.cardBorder}`}>
                <motion.div 
                  className={`text-2xl md:text-3xl font-bold ${theme.accentText}`}
                  key={animatedStats.bookings}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {animatedStats.bookings}
                </motion.div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  {userRole === 'freelancer' ? <Briefcase className="w-3 h-3" /> : <Users className="w-3 h-3" />}
                  {userRole === 'freelancer' ? 'Projects' : 'Bookings'}
                </div>
              </div>

              <div className={`text-center ${theme.cardBackground} backdrop-blur-sm rounded-2xl p-4 shadow-xl border ${theme.cardBorder}`}>
                <motion.div 
                  className={`text-2xl md:text-3xl font-bold ${theme.primaryText}`}
                  key={animatedStats.views}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {animatedStats.views.toLocaleString()}
                </motion.div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  Views
                </div>
              </div>

              <div className={`text-center ${theme.cardBackground} backdrop-blur-sm rounded-2xl p-4 shadow-xl border ${theme.cardBorder}`}>
                <motion.div 
                  className="text-2xl md:text-3xl font-bold text-yellow-600 flex items-center justify-center gap-1"
                  key={animatedStats.rating}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Star className="w-5 h-5 fill-current" />
                  {animatedStats.rating}
                </motion.div>
                <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                  <Award className="w-3 h-3" />
                  Rating
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAnimatedHero;