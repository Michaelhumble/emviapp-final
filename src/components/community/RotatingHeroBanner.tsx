import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, Award, Users, TrendingUp, Sparkles, Crown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaAction: () => void;
  gradient: string;
  icon: React.ComponentType<any>;
  stats?: {
    label: string;
    value: string;
  }[];
}

const RotatingHeroBanner: React.FC = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const banners: HeroBanner[] = [
    {
      id: 'success-stories',
      title: '✨ Real Success Stories',
      subtitle: 'From our community',
      description: '"EmviApp helped me grow from 0 to 10K followers in 3 months! I found my dream salon job through the community." - Sarah M.',
      image: 'https://images.unsplash.com/photo-1560869713-bf5b5e4d7e9b?w=400&h=200&fit=crop',
      cta: 'Share Your Story',
      ctaAction: () => console.log('Share story clicked'),
      gradient: 'from-purple-500/20 to-pink-500/20',
      icon: Star,
      stats: [
        { label: 'Success Stories', value: '2,400+' },
        { label: 'Dream Jobs Found', value: '156' },
        { label: 'Lives Changed', value: '5,000+' }
      ]
    },
    {
      id: 'community-growth',
      title: '🚀 Growing Together',
      subtitle: 'Fastest growing beauty community',
      description: 'Join 15,000+ beauty professionals sharing their passion, growing their careers, and building lasting connections.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=200&fit=crop',
      cta: 'Join the Movement',
      ctaAction: () => console.log('Join community clicked'),
      gradient: 'from-blue-500/20 to-purple-500/20',
      icon: Users,
      stats: [
        { label: 'Active Members', value: '15K+' },
        { label: 'Daily Posts', value: '500+' },
        { label: 'Countries', value: '45' }
      ]
    },
    {
      id: 'achievements',
      title: '🏆 Celebrate Wins',
      subtitle: 'Every achievement matters',
      description: 'From first nail art to opening your salon - we celebrate every milestone in your beauty journey.',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=200&fit=crop',
      cta: 'Share Your Win',
      ctaAction: () => console.log('Share achievement clicked'),
      gradient: 'from-yellow-500/20 to-orange-500/20',
      icon: Award,
      stats: [
        { label: 'Wins Celebrated', value: '8,200+' },
        { label: 'Badges Earned', value: '45K+' },
        { label: 'Viral Posts', value: '1,200+' }
      ]
    },
    {
      id: 'inspiration',
      title: '💡 Daily Inspiration',
      subtitle: 'Fuel your creativity',
      description: 'Discover trending techniques, get inspired by viral content, and push the boundaries of beauty art.',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=200&fit=crop',
      cta: 'Get Inspired',
      ctaAction: () => console.log('Get inspired clicked'),
      gradient: 'from-green-500/20 to-blue-500/20',
      icon: Sparkles,
      stats: [
        { label: 'Inspiration Posts', value: '12K+' },
        { label: 'Techniques Shared', value: '2,800+' },
        { label: 'Tutorials', value: '900+' }
      ]
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex(prev => (prev + 1) % banners.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  const currentBanner = banners[currentBannerIndex];
  const IconComponent = currentBanner.icon;

  return (
    <div className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentBanner.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className={`bg-gradient-to-br ${currentBanner.gradient} border border-border/50 rounded-2xl overflow-hidden`}
        >
          <div className="relative p-8">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500 rounded-full translate-x-12 translate-y-12"></div>
              <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-pink-500 rounded-full"></div>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="p-3 bg-white/20 backdrop-blur-sm rounded-full"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <IconComponent size={32} className="text-primary" />
                  </motion.div>
                  <div>
                    <motion.h1 
                      className="text-3xl font-bold"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {currentBanner.title}
                    </motion.h1>
                    <motion.p 
                      className="text-lg text-muted-foreground"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {currentBanner.subtitle}
                    </motion.p>
                  </div>
                </div>

                {/* Banner indicator dots */}
                <div className="flex space-x-2">
                  {banners.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentBannerIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentBannerIndex ? 'bg-primary' : 'bg-primary/30'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <motion.p 
                    className="text-lg mb-6 leading-relaxed"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {currentBanner.description}
                  </motion.p>

                  {currentBanner.stats && (
                    <motion.div 
                      className="grid grid-cols-3 gap-4 mb-6"
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {currentBanner.stats.map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className="text-2xl font-bold text-primary">{stat.value}</div>
                          <div className="text-sm text-muted-foreground">{stat.label}</div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button 
                      onClick={currentBanner.ctaAction}
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      {currentBanner.cta}
                      <motion.div
                        className="ml-2"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  className="relative"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="aspect-video rounded-xl overflow-hidden border border-border/20 shadow-xl">
                    <img
                      src={currentBanner.image}
                      alt={currentBanner.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay with sparkle effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent">
                      <motion.div
                        className="absolute top-4 right-4 text-white/80"
                        animate={{ 
                          rotate: [0, 360],
                          scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity }
                        }}
                      >
                        <Sparkles size={24} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute top-16 right-16 text-primary/40"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Heart size={20} />
              </motion.div>
              
              <motion.div
                className="absolute bottom-16 left-16 text-purple-500/40"
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              >
                <Star size={16} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="mt-4 w-full bg-muted rounded-full h-1">
        <motion.div
          className="bg-primary h-1 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 6, ease: "linear" }}
          key={currentBannerIndex}
        />
      </div>
    </div>
  );
};

export default RotatingHeroBanner;