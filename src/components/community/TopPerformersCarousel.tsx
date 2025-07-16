import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crown, Star, TrendingUp, Award, Heart, MessageCircle, Users, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface TopPerformer {
  id: string;
  name: string;
  avatar: string;
  category: 'artist' | 'salon' | 'customer';
  specialty: string;
  stats: {
    likes: number;
    posts: number;
    followers: number;
    rating?: number;
  };
  badge: string;
  trending: boolean;
  achievement: string;
}

const TopPerformersCarousel: React.FC = () => {
  const [currentCategory, setCurrentCategory] = useState<'all' | 'artist' | 'salon' | 'customer'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const topPerformers: TopPerformer[] = [
    {
      id: '1',
      name: 'Sarah Nail Queen',
      avatar: '/placeholder-avatar.jpg',
      category: 'artist',
      specialty: 'Nail Art',
      stats: { likes: 1247, posts: 89, followers: 2341, rating: 4.9 },
      badge: 'Viral Artist',
      trending: true,
      achievement: 'Most liked post this week'
    },
    {
      id: '2',
      name: 'Luxe Beauty Salon',
      avatar: '/placeholder-avatar.jpg',
      category: 'salon',
      specialty: 'Full Service',
      stats: { likes: 967, posts: 156, followers: 1876 },
      badge: 'Trending Salon',
      trending: true,
      achievement: 'Highest bookings this month'
    },
    {
      id: '3',
      name: 'Emma Style Lover',
      avatar: '/placeholder-avatar.jpg',
      category: 'customer',
      specialty: 'Beauty Enthusiast',
      stats: { likes: 543, posts: 234, followers: 892 },
      badge: 'Top Supporter',
      trending: false,
      achievement: 'Most active community member'
    },
    {
      id: '4',
      name: 'Mike Hair Master',
      avatar: '/placeholder-avatar.jpg',
      category: 'artist',
      specialty: 'Hair Styling',
      stats: { likes: 2156, posts: 67, followers: 3421, rating: 5.0 },
      badge: 'Hair Wizard',
      trending: true,
      achievement: 'Perfect 5-star rating'
    },
    {
      id: '5',
      name: 'Glow Beauty Studio',
      avatar: '/placeholder-avatar.jpg',
      category: 'salon',
      specialty: 'Skincare & Facial',
      stats: { likes: 1432, posts: 98, followers: 2167 },
      badge: 'Glow Expert',
      trending: false,
      achievement: 'Best customer reviews'
    }
  ];

  const categories = [
    { key: 'all', label: 'All Stars', icon: Crown },
    { key: 'artist', label: 'Top Artists', icon: Star },
    { key: 'salon', label: 'Hot Salons', icon: Award },
    { key: 'customer', label: 'Super Fans', icon: Heart }
  ];

  const filteredPerformers = currentCategory === 'all' 
    ? topPerformers 
    : topPerformers.filter(p => p.category === currentCategory);

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % Math.min(filteredPerformers.length, 3));
    }, 4000);
    return () => clearInterval(interval);
  }, [filteredPerformers.length]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'artist':
        return <Star className="text-purple-500" size={16} />;
      case 'salon':
        return <Award className="text-blue-500" size={16} />;
      case 'customer':
        return <Heart className="text-pink-500" size={16} />;
      default:
        return <Sparkles className="text-yellow-500" size={16} />;
    }
  };

  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'artist':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'salon':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'customer':
        return 'bg-pink-100 text-pink-700 border-pink-200';
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  const visiblePerformers = filteredPerformers.slice(currentIndex, currentIndex + 3);
  if (visiblePerformers.length < 3) {
    visiblePerformers.push(...filteredPerformers.slice(0, 3 - visiblePerformers.length));
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-full">
            <TrendingUp className="text-yellow-600" size={20} />
          </div>
          <div>
            <h2 className="text-xl font-bold">Top Performers</h2>
            <p className="text-sm text-muted-foreground">This week's community stars</p>
          </div>
        </div>
        <motion.div
          className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 rounded-full text-sm font-medium border border-yellow-200"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🔥 Live Rankings
        </motion.div>
      </div>

      {/* Category Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.key}
              variant={currentCategory === category.key ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setCurrentCategory(category.key as any);
                setCurrentIndex(0);
              }}
              className="flex items-center space-x-2 whitespace-nowrap"
            >
              <IconComponent size={16} />
              <span>{category.label}</span>
            </Button>
          );
        })}
      </div>

      {/* Performers Carousel */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentCategory}-${currentIndex}`}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            {visiblePerformers.map((performer, index) => (
              <motion.div
                key={`${performer.id}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-lg transition-shadow relative overflow-hidden">
                  {performer.trending && (
                    <div className="absolute top-2 right-2">
                      <motion.div
                        className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        🔥 HOT
                      </motion.div>
                    </div>
                  )}

                  <div className="flex items-center space-x-3 mb-3">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full flex items-center justify-center">
                        <span className="font-bold text-primary">
                          {performer.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      {index === 0 && (
                        <Crown className="absolute -top-1 -right-1 text-yellow-500" size={16} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold flex items-center space-x-2">
                        <span>{performer.name}</span>
                        {getCategoryIcon(performer.category)}
                      </div>
                      <div className="text-sm text-muted-foreground">{performer.specialty}</div>
                    </div>
                  </div>

                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium border mb-3 ${getBadgeColor(performer.category)}`}>
                    {performer.badge}
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center mb-3">
                    <div>
                      <div className="font-bold text-red-500">{performer.stats.likes}</div>
                      <div className="text-xs text-muted-foreground">Likes</div>
                    </div>
                    <div>
                      <div className="font-bold text-blue-500">{performer.stats.posts}</div>
                      <div className="text-xs text-muted-foreground">Posts</div>
                    </div>
                    <div>
                      <div className="font-bold text-green-500">{performer.stats.followers}</div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                  </div>

                  {performer.stats.rating && (
                    <div className="flex items-center justify-center mb-3">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={i < Math.floor(performer.stats.rating!) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                          />
                        ))}
                        <span className="text-sm font-medium ml-1">{performer.stats.rating}</span>
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-center text-muted-foreground bg-muted/50 p-2 rounded-lg">
                    🏆 {performer.achievement}
                  </div>

                  <Button variant="outline" size="sm" className="w-full mt-3">
                    View Profile
                  </Button>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pagination Dots */}
      {filteredPerformers.length > 3 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(filteredPerformers.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * 3)}
              className={`w-2 h-2 rounded-full transition-colors ${
                Math.floor(currentIndex / 3) === index ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      )}

      {/* Call to Action */}
      <Card className="p-4 bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20 text-center">
        <div className="font-medium mb-2">🌟 Want to be featured?</div>
        <div className="text-sm text-muted-foreground mb-3">
          Keep posting, engaging, and growing your community presence!
        </div>
        <Button size="sm" variant="outline">
          Learn How to Rank Higher
        </Button>
      </Card>
    </div>
  );
};

export default TopPerformersCarousel;