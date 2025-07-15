import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Heart, MessageCircle, Share, Play, Sparkles, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FeaturedPost {
  id: number;
  user: {
    name: string;
    avatar: string;
    location: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  featuredUntil: Date;
}

interface FeaturedSpotlightProps {
  className?: string;
}

const FeaturedSpotlight: React.FC<FeaturedSpotlightProps> = ({ className }) => {
  const [currentPost, setCurrentPost] = useState<FeaturedPost | null>(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [nextFeatureIn, setNextFeatureIn] = useState('');

  // Mock featured posts rotation
  const featuredPosts: FeaturedPost[] = [
    {
      id: 1,
      user: {
        name: 'Sofia Bella',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2a2?w=150&h=150&fit=crop&crop=face',
        location: 'Los Angeles, CA'
      },
      content: 'Just opened my dream salon! Thanks to EmviApp for connecting me with the most amazing team. Every day feels like magic! ✨🎉',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop',
      likes: 2847,
      comments: 156,
      shares: 89,
      featuredUntil: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now
    },
    {
      id: 2,
      user: {
        name: 'Maya Chen',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        location: 'San Francisco, CA'
      },
      content: 'Landed my first international client through EmviApp! Flying to Paris next month for a wedding. Dreams do come true! 💎✈️',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
      likes: 1923,
      comments: 98,
      shares: 156,
      featuredUntil: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes from now
    }
  ];

  useEffect(() => {
    // Set initial featured post
    setCurrentPost(featuredPosts[0]);

    // Update timer every second
    const timer = setInterval(() => {
      if (currentPost) {
        const now = new Date();
        const timeLeft = currentPost.featuredUntil.getTime() - now.getTime();
        
        if (timeLeft > 0) {
          const minutes = Math.floor(timeLeft / (1000 * 60));
          const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
          setTimeRemaining(`${minutes}:${seconds.toString().padStart(2, '0')}`);
        } else {
          // Rotate to next post
          const currentIndex = featuredPosts.findIndex(p => p.id === currentPost.id);
          const nextIndex = (currentIndex + 1) % featuredPosts.length;
          setCurrentPost(featuredPosts[nextIndex]);
        }
      }

      // Next feature countdown (demo: every 20 minutes)
      const nextFeature = new Date();
      nextFeature.setMinutes(nextFeature.getMinutes() + 20);
      const nextTimeLeft = nextFeature.getTime() - new Date().getTime();
      const nextMinutes = Math.floor(nextTimeLeft / (1000 * 60));
      setNextFeatureIn(`${nextMinutes} min`);
    }, 1000);

    return () => clearInterval(timer);
  }, [currentPost]);

  if (!currentPost) return null;

  return (
    <motion.div
      layout
      className={`${className}`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPost.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-2 border-purple-200/50 dark:border-purple-800/50">
            {/* Animated Border */}
            <motion.div
              className="absolute inset-0 rounded-lg border-2 border-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-border"
              animate={{
                background: [
                  'linear-gradient(90deg, #a855f7, #ec4899, #a855f7)',
                  'linear-gradient(180deg, #ec4899, #a855f7, #ec4899)',
                  'linear-gradient(270deg, #a855f7, #ec4899, #a855f7)',
                  'linear-gradient(360deg, #ec4899, #a855f7, #ec4899)',
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            
            <div className="relative bg-background m-0.5 rounded-lg">
              {/* Header */}
              <div className="p-4 pb-2">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center"
                    >
                      <Star className="w-4 h-4 text-white" />
                    </motion.div>
                    <div>
                      <h3 className="font-bold text-foreground text-sm">Featured Now</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{timeRemaining} left</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-muted-foreground">Next feature in</div>
                    <div className="text-xs font-medium text-primary">{nextFeatureIn}</div>
                  </div>
                </div>

                {/* User Info */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <img
                      src={currentPost.user.avatar}
                      alt={currentPost.user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center"
                    >
                      <Star className="w-2 h-2 text-white" />
                    </motion.div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">{currentPost.user.name}</h4>
                    <p className="text-xs text-muted-foreground">{currentPost.user.location}</p>
                  </div>
                </div>

                {/* Content */}
                <p className="text-sm text-foreground mb-3 leading-relaxed">
                  {currentPost.content}
                </p>
              </div>

              {/* Image */}
              {currentPost.image && (
                <div className="px-4 mb-3">
                  <div className="relative rounded-xl overflow-hidden aspect-video">
                    <img
                      src={currentPost.image}
                      alt="Featured post"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    
                    {/* Play Button Overlay */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Play className="w-5 h-5 text-primary ml-0.5" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="px-4 py-3 border-t border-border bg-muted/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-500" />
                      <span>{currentPost.likes.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3 text-blue-500" />
                      <span>{currentPost.comments}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Share className="w-3 h-3 text-green-500" />
                      <span>{currentPost.shares}</span>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xs px-3 py-1"
                  >
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Be Featured Next
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-3 text-center"
      >
        <p className="text-xs text-muted-foreground mb-2">
          Share your wins to get featured in the spotlight!
        </p>
        <div className="flex items-center justify-center gap-1 text-xs text-primary">
          <Sparkles className="w-3 h-3" />
          <span>Next rotation in {nextFeatureIn}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeaturedSpotlight;