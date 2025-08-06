import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Heart, MessageCircle, Share2, Bookmark, Crown, 
  TrendingUp, Flame, Star, Eye, Users, Clock, Zap, Lock,
  Play, Camera, Award, Gift, Target, ChevronRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface SmartPost {
  id: string;
  type: 'showcase' | 'tip' | 'transformation' | 'trending' | 'battle' | 'collab';
  creator: {
    id: string;
    name: string;
    avatar: string;
    role: 'artist' | 'salon' | 'customer';
    verified: boolean;
    level: number;
    badges: string[];
  };
  content: {
    image: string;
    video?: string;
    title: string;
    description: string;
    tags: string[];
    category: string;
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    bookmarks: number;
    views: number;
  };
  metadata: {
    trending: boolean;
    featured: boolean;
    viral: boolean;
    timeAgo: string;
    earnings?: number;
    bookings?: number;
  };
  isLocked?: boolean;
  unlockRequirement?: string;
}

interface PersonalizedSmartFeedProps {
  userType?: 'artist' | 'salon' | 'customer' | 'guest';
  onSignUp: () => void;
  onCreatePost: () => void;
  onViewProfile: (userId: string) => void;
}

const PersonalizedSmartFeed: React.FC<PersonalizedSmartFeedProps> = ({
  userType = 'guest',
  onSignUp,
  onCreatePost,
  onViewProfile
}) => {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('for-you');
  const [posts, setPosts] = useState<SmartPost[]>([]);
  const [viewedPosts, setViewedPosts] = useState<Set<string>>(new Set());

  const feedFilters = [
    { id: 'for-you', label: '✨ For You', icon: Sparkles, premium: false },
    { id: 'trending', label: '🔥 Trending', icon: Flame, premium: false },
    { id: 'battles', label: '⚔️ Battles', icon: Award, premium: true },
    { id: 'vip', label: '👑 VIP Only', icon: Crown, premium: true },
    { id: 'live', label: '🎥 Live', icon: Play, premium: false },
  ];

  // Mock AI-powered personalized content
  const mockPosts: SmartPost[] = [
    {
      id: '1',
      type: 'showcase',
      creator: {
        id: 'sarah123',
        name: 'Sarah Nail Queen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332-3-2616b33',
        role: 'artist',
        verified: true,
        level: 12,
        badges: ['Top Creator', 'Viral Artist', 'VIP']
      },
      content: {
        image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=400&fit=crop',
        title: '✨ Holographic Sunset Nails ✨',
        description: 'Just dropped this magical sunset design! Inspired by California beaches 🌅 What do you think?',
        tags: ['nails', 'holographic', 'sunset', 'trending'],
        category: 'Nail Art'
      },
      engagement: {
        likes: 2847,
        comments: 156,
        shares: 89,
        bookmarks: 234,
        views: 12420
      },
      metadata: {
        trending: true,
        featured: true,
        viral: true,
        timeAgo: '2h',
        earnings: 1250,
        bookings: 23
      }
    },
    {
      id: '2',
      type: 'tip',
      creator: {
        id: 'mike456',
        name: 'Mike Hair Master',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
        role: 'artist',
        verified: true,
        level: 15,
        badges: ['Hair Wizard', 'Mentor']
      },
      content: {
        image: 'https://images.unsplash.com/photo-1562004760-aceed7bb0fe3?w=400&h=400&fit=crop',
        video: 'hair-tip-video.mp4',
        title: '🔥 Pro Tip: Perfect Blowout in 10 Minutes',
        description: 'The secret technique that changed my career! Save this post and try it on your next client 💯',
        tags: ['hair', 'protip', 'blowout', 'tutorial'],
        category: 'Hair Styling'
      },
      engagement: {
        likes: 1924,
        comments: 203,
        shares: 156,
        bookmarks: 567,
        views: 8930
      },
      metadata: {
        trending: true,
        featured: false,
        viral: false,
        timeAgo: '4h',
        earnings: 890
      }
    },
    {
      id: '3',
      type: 'battle',
      creator: {
        id: 'emma789',
        name: 'Emma Glow Studio',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
        role: 'salon',
        verified: true,
        level: 8,
        badges: ['Rising Star']
      },
      content: {
        image: 'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop',
        title: '⚔️ Makeup Battle: Smokey Eyes Challenge',
        description: 'Currently winning this week\'s battle! Can you beat this look? 💄',
        tags: ['makeup', 'battle', 'smokey', 'challenge'],
        category: 'Makeup'
      },
      engagement: {
        likes: 892,
        comments: 67,
        shares: 34,
        bookmarks: 123,
        views: 3456
      },
      metadata: {
        trending: false,
        featured: false,
        viral: false,
        timeAgo: '6h'
      },
      isLocked: !user,
      unlockRequirement: 'Sign up to join battles and compete for prizes!'
    }
  ];

  useEffect(() => {
    // Simulate personalized AI feed
    const personalizedPosts = mockPosts.filter(post => {
      if (selectedFilter === 'for-you') return true;
      if (selectedFilter === 'trending') return post.metadata.trending;
      if (selectedFilter === 'battles') return post.type === 'battle';
      if (selectedFilter === 'vip') return post.creator.badges.includes('VIP');
      if (selectedFilter === 'live') return post.content.video;
      return true;
    });
    
    setPosts(personalizedPosts);
  }, [selectedFilter, userType]);

  const handlePostInteraction = (postId: string, action: string) => {
    if (!user && (action === 'like' || action === 'comment' || action === 'bookmark')) {
      toast.error('Sign up to interact with posts and join the community! 🚀');
      onSignUp();
      return;
    }
    
    setViewedPosts(prev => new Set([...prev, postId]));
    
    switch (action) {
      case 'like':
        toast.success('Liked! Your support helps creators grow 💜');
        break;
      case 'share':
        toast.success('Shared! Spread the beauty inspiration 🌟');
        break;
      case 'bookmark':
        toast.success('Saved! Check your bookmarks to try this later ⭐');
        break;
    }
  };

  const getPostTypeIcon = (type: string) => {
    switch (type) {
      case 'showcase': return Camera;
      case 'tip': return Sparkles;
      case 'battle': return Award;
      case 'trending': return Flame;
      default: return Star;
    }
  };

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'showcase': return 'from-purple-500 to-pink-500';
      case 'tip': return 'from-yellow-500 to-orange-500';
      case 'battle': return 'from-red-500 to-pink-500';
      case 'trending': return 'from-orange-500 to-red-500';
      default: return 'from-blue-500 to-purple-500';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* AI Feed Header */}
      <div className="text-center space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-3"
        >
          <div className="relative">
            <Sparkles className="h-8 w-8 text-purple-600" />
            <motion.div
              className="absolute inset-0"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Star className="h-3 w-3 text-yellow-400 absolute -top-1 -right-1" />
            </motion.div>
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI-Powered Smart Feed
          </h2>
        </motion.div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Personalized content just for you. The more you engage, the smarter it gets! ✨
        </p>
      </div>

      {/* Feed Filters */}
      <div className="flex flex-wrap gap-3 justify-center">
        {feedFilters.map((filter) => {
          const Icon = filter.icon;
          const isSelected = selectedFilter === filter.id;
          const isLocked = filter.premium && !user;
          
          return (
            <motion.button
              key={filter.id}
              onClick={() => {
                if (isLocked) {
                  toast.error('Sign up to unlock premium feeds! 👑');
                  onSignUp();
                  return;
                }
                setSelectedFilter(filter.id);
              }}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300
                ${isSelected 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg scale-105' 
                  : 'bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:border-purple-300'
                }
                ${isLocked ? 'opacity-60' : ''}
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLocked && <Lock className="h-4 w-4" />}
              <Icon className="h-4 w-4" />
              <span className="font-medium">{filter.label}</span>
              {filter.premium && (
                <Badge className="bg-yellow-400 text-yellow-900 px-2 py-0 text-xs">
                  VIP
                </Badge>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Smart Feed Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence>
          {posts.map((post, index) => {
            const PostTypeIcon = getPostTypeIcon(post.type);
            const isViewed = viewedPosts.has(post.id);
            
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative"
              >
                <Card className={`
                  overflow-hidden transition-all duration-300 hover:shadow-2xl
                  ${post.isLocked ? 'opacity-75' : ''}
                  ${isViewed ? 'ring-2 ring-purple-200' : ''}
                  ${post.metadata.featured ? 'ring-2 ring-yellow-400' : ''}
                `}>
                  
                  {/* Post Header */}
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="h-12 w-12 ring-2 ring-white shadow-lg">
                          <AvatarImage src={post.creator.avatar} />
                          <AvatarFallback>{post.creator.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        {post.creator.verified && (
                          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                            <Crown className="h-3 w-3 text-white" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold text-gray-900">{post.creator.name}</h3>
                          <Badge className="bg-purple-100 text-purple-700 text-xs">
                            Level {post.creator.level}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-sm text-gray-500">{post.metadata.timeAgo}</span>
                          {post.metadata.trending && (
                            <Badge className="bg-orange-500 text-white text-xs animate-pulse">
                              🔥 Trending
                            </Badge>
                          )}
                          {post.metadata.viral && (
                            <Badge className="bg-red-500 text-white text-xs">
                              ⚡ Viral
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className={`p-2 rounded-full bg-gradient-to-r ${getPostTypeColor(post.type)}`}>
                      <PostTypeIcon className="h-4 w-4 text-white" />
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="relative">
                    <img 
                      src={post.content.image} 
                      alt={post.content.title}
                      className="w-full h-80 object-cover"
                    />
                    
                    {/* Content Overlay for Locked Posts */}
                    {post.isLocked && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <div className="text-center text-white p-6">
                          <Lock className="h-12 w-12 mx-auto mb-4" />
                          <h3 className="text-xl font-bold mb-2">Premium Content</h3>
                          <p className="mb-4">{post.unlockRequirement}</p>
                          <Button 
                            onClick={onSignUp}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                          >
                            Unlock Now ✨
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Engagement Overlay */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Badge className="bg-black/70 text-white">
                        <Eye className="h-3 w-3 mr-1" />
                        {post.engagement.views.toLocaleString()}
                      </Badge>
                      {post.metadata.earnings && (
                        <Badge className="bg-green-500 text-white">
                          💰 ${post.metadata.earnings}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Post Details */}
                  <div className="p-4">
                    <h4 className="font-bold text-lg mb-2">{post.content.title}</h4>
                    <p className="text-gray-600 mb-3">{post.content.description}</p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.content.tags.map((tag, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Engagement Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <motion.button
                          onClick={() => handlePostInteraction(post.id, 'like')}
                          className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Heart className="h-5 w-5" />
                          <span className="text-sm font-medium">{post.engagement.likes.toLocaleString()}</span>
                        </motion.button>
                        
                        <motion.button
                          onClick={() => handlePostInteraction(post.id, 'comment')}
                          className="flex items-center space-x-1 text-gray-600 hover:text-blue-500 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <MessageCircle className="h-5 w-5" />
                          <span className="text-sm font-medium">{post.engagement.comments}</span>
                        </motion.button>
                        
                        <motion.button
                          onClick={() => handlePostInteraction(post.id, 'share')}
                          className="flex items-center space-x-1 text-gray-600 hover:text-green-500 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Share2 className="h-5 w-5" />
                          <span className="text-sm font-medium">{post.engagement.shares}</span>
                        </motion.button>
                      </div>

                      <div className="flex items-center space-x-2">
                        <motion.button
                          onClick={() => handlePostInteraction(post.id, 'bookmark')}
                          className="p-2 text-gray-600 hover:text-purple-500 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Bookmark className="h-5 w-5" />
                        </motion.button>
                        
                        <Button
                          onClick={() => onViewProfile(post.creator.id)}
                          variant="outline"
                          size="sm"
                          className="hover:bg-purple-50 hover:border-purple-300"
                        >
                          View Profile
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </div>

                    {/* Success Metrics for Artists */}
                    {post.metadata.bookings && (
                      <div className="mt-3 p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-green-700 font-medium">
                            🎉 This post generated {post.metadata.bookings} bookings!
                          </span>
                          <Button 
                            size="sm" 
                            onClick={onCreatePost}
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            Create Similar Post
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Load More CTA */}
      <div className="text-center py-8">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={() => {
              if (!user) {
                onSignUp();
                return;
              }
              toast.success('Loading more personalized content... 🚀');
            }}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3"
          >
            {user ? 'Load More Magic ✨' : 'Sign Up for Unlimited Feed 🚀'}
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalizedSmartFeed;