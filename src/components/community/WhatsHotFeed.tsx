import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Flame, Star, Award, Users, Zap, Clock, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface HotItem {
  id: string;
  type: 'artist' | 'salon' | 'post' | 'job' | 'referral';
  title: string;
  description: string;
  image_url?: string;
  author?: string;
  avatar_url?: string;
  trending_score: number;
  location?: string;
  tags?: string[];
  created_at: string;
  user_id?: string;
}

const WhatsHotFeed: React.FC = () => {
  const [hotItems, setHotItems] = useState<HotItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentFilter, setCurrentFilter] = useState<'all' | 'artists' | 'salons' | 'posts' | 'jobs'>('all');

  useEffect(() => {
    fetchHotContent();
  }, [currentFilter]);

  const fetchHotContent = async () => {
    try {
      setLoading(true);
      
      // Mock trending data for demo
      const mockHotItems: HotItem[] = [
        {
          id: '1',
          type: 'artist',
          title: 'Sarah Johnson',
          description: 'Nail artist specializing in 3D designs',
          image_url: 'https://images.unsplash.com/photo-1494790108755-2616b332c2a2?w=400&h=300&fit=crop',
          trending_score: 95,
          location: 'Los Angeles, CA',
          tags: ['Nails', '3D Art'],
          created_at: new Date().toISOString(),
          user_id: '1'
        },
        {
          id: '2',
          type: 'salon',
          title: 'Glamour Studio',
          description: 'Full-service beauty salon',
          image_url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop',
          trending_score: 88,
          location: 'New York, NY',
          tags: ['Full Service'],
          created_at: new Date().toISOString()
        },
        {
          id: '3',
          type: 'post',
          title: 'Amazing transformation!',
          description: '127 likes • 23 comments',
          image_url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop',
          author: 'Maria Garcia',
          avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
          trending_score: 82,
          created_at: new Date().toISOString(),
          user_id: '3'
        },
        {
          id: '4',
          type: 'job',
          title: 'Hair Stylist Position',
          description: 'Looking for experienced hair stylist',
          image_url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&h=300&fit=crop',
          trending_score: 75,
          location: 'Miami, FL',
          tags: ['Hair'],
          created_at: new Date().toISOString(),
          user_id: '4'
        },
        {
          id: '5',
          type: 'artist',
          title: 'Alex Chen',
          description: 'Makeup artist for weddings',
          image_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=300&fit=crop',
          trending_score: 70,
          location: 'Chicago, IL',
          tags: ['Makeup', 'Weddings'],
          created_at: new Date().toISOString(),
          user_id: '5'
        },
        {
          id: '6',
          type: 'salon',
          title: 'Beauty Haven',
          description: 'Luxury spa and salon',
          image_url: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=300&fit=crop',
          trending_score: 68,
          location: 'San Francisco, CA',
          tags: ['Spa', 'Luxury'],
          created_at: new Date().toISOString()
        }
      ];

      // Filter items based on current filter
      let filteredItems = mockHotItems;
      if (currentFilter !== 'all') {
        filteredItems = mockHotItems.filter(item => item.type === currentFilter.slice(0, -1) as any);
      }

      // Sort by trending score
      filteredItems.sort((a, b) => b.trending_score - a.trending_score);

      setHotItems(filteredItems);
    } catch (error) {
      console.error('Error fetching hot content:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'artist': return <Star className="w-4 h-4" />;
      case 'salon': return <Users className="w-4 h-4" />;
      case 'post': return <Heart className="w-4 h-4" />;
      case 'job': return <Zap className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'artist': return 'text-purple-500 bg-purple-100';
      case 'salon': return 'text-blue-500 bg-blue-100';
      case 'post': return 'text-pink-500 bg-pink-100';
      case 'job': return 'text-green-500 bg-green-100';
      default: return 'text-orange-500 bg-orange-100';
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays}d ago`;
    if (diffHours > 0) return `${diffHours}h ago`;
    return 'Just now';
  };

  const filters = [
    { key: 'all', label: 'All', icon: TrendingUp },
    { key: 'artists', label: 'Artists', icon: Star },
    { key: 'salons', label: 'Salons', icon: Users },
    { key: 'posts', label: 'Posts', icon: Heart },
    { key: 'jobs', label: 'Jobs', icon: Zap }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Flame className="w-5 h-5 text-white" />
          </motion.div>
          <div>
            <h2 className="text-2xl font-bold">What's Hot</h2>
            <p className="text-sm text-muted-foreground">Trending in your community</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <Button
              key={filter.key}
              variant={currentFilter === filter.key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentFilter(filter.key as any)}
              className="whitespace-nowrap"
            >
              <Icon className="w-4 h-4 mr-2" />
              {filter.label}
            </Button>
          );
        })}
      </div>

      {/* Hot Items Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
                <div className="h-24 bg-gray-200 rounded mb-3" />
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded" />
                  <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentFilter}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {hotItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Card className="overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-0">
                    {/* Image */}
                    {item.image_url && (
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={item.image_url}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getTypeColor(item.type)}`}>
                            {getTypeIcon(item.type)}
                          </div>
                        </div>
                        <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                          <TrendingUp className="w-3 h-3" />
                          <span>{Math.round(item.trending_score)}</span>
                        </div>
                      </div>
                    )}

                    <div className="p-4">
                      {/* Author info */}
                      {item.author && (
                        <div className="flex items-center space-x-2 mb-3">
                          {item.avatar_url && (
                            <img
                              src={item.avatar_url}
                              alt={item.author}
                              className="w-6 h-6 rounded-full"
                            />
                          )}
                          <span className="text-sm font-medium">{item.author}</span>
                        </div>
                      )}

                      {/* Content */}
                      <h3 className="font-semibold text-sm mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      {/* Meta info */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{formatTimeAgo(item.created_at)}</span>
                        </div>
                        {item.location && (
                          <span className="truncate">{item.location}</span>
                        )}
                      </div>

                      {/* Tags */}
                      {item.tags && item.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.tags.slice(0, 2).map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-accent text-accent-foreground rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}

      {hotItems.length === 0 && !loading && (
        <Card>
          <CardContent className="p-8 text-center">
            <Flame className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-semibold mb-2">Nothing's trending yet</h3>
            <p className="text-muted-foreground">
              Be the first to create something amazing and start the trend!
            </p>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default WhatsHotFeed;