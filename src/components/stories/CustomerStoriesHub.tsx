import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { 
  Heart, Eye, MessageSquare, Share2, Star, TrendingUp, 
  Users, Award, Camera, Video, Plus, Filter, 
  Calendar, MapPin, Sparkles, Crown, Gift
} from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { supabaseBypass } from '@/types/supabase-bypass';

interface CustomerStory {
  id: string;
  user_id: string;
  user_name: string;
  user_avatar: string;
  title: string;
  content: string;
  images: string[];
  videos: string[];
  likes_count: number;
  comments_count: number;
  shares_count: number;
  tags: string[];
  is_featured: boolean;
  created_at: string;
  provider_name?: string;
  service_type?: string;
  rating?: number;
  is_liked: boolean;
}

interface CustomerStoriesHubProps {
  onStoryCreate?: () => void;
}

const CustomerStoriesHub: React.FC<CustomerStoriesHubProps> = ({ onStoryCreate }) => {
  const { user } = useAuth();
  const [stories, setStories] = useState<CustomerStory[]>([]);
  const [featuredStories, setFeaturedStories] = useState<CustomerStory[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'featured' | 'following' | 'trending'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadStories();
    loadFeaturedStories();
  }, [activeFilter]);

  const loadStories = async () => {
    setLoading(true);
    try {
      // Mock stories data for now
      const mockStories: CustomerStory[] = [
        {
          id: '1',
          user_id: 'user1',
          user_name: 'Sarah Chen',
          user_avatar: '',
          title: 'Amazing Nail Art Transformation! 💅✨',
          content: 'Just got the most incredible nail art at Maya\'s studio! The attention to detail is absolutely stunning. From concept to execution, every step was perfect. The chrome finish and hand-painted flowers are exactly what I envisioned! 🌸',
          images: ['/placeholder.svg'],
          videos: [],
          likes_count: 124,
          comments_count: 18,
          shares_count: 12,
          tags: ['nail-art', 'chrome-nails', 'flower-design'],
          is_featured: true,
          created_at: '2024-01-14T10:30:00Z',
          provider_name: 'Maya Chen',
          service_type: 'Nail Art',
          rating: 5,
          is_liked: false
        },
        {
          id: '2',
          user_id: 'user2',
          user_name: 'Jessica Rodriguez',
          user_avatar: '',
          title: 'Glow Up Complete! ✨',
          content: 'Three months into my beauty journey with EmviApp and I\'m feeling more confident than ever! This platform connected me with amazing artists who understand my vision. Swipe to see my transformation!',
          images: ['/placeholder.svg', '/placeholder.svg'],
          videos: [],
          likes_count: 89,
          comments_count: 24,
          shares_count: 8,
          tags: ['transformation', 'self-care', 'confidence'],
          is_featured: false,
          created_at: '2024-01-13T16:45:00Z',
          is_liked: true
        },
        {
          id: '3',
          user_id: 'user3',
          user_name: 'Amanda Kim',
          user_avatar: '',
          title: 'Wedding Ready! 👰✨',
          content: 'Found my dream wedding look through EmviApp! The trial session was perfect and now I feel ready for my big day. Thank you to my amazing makeup artist!',
          images: ['/placeholder.svg'],
          videos: [],
          likes_count: 203,
          comments_count: 45,
          shares_count: 32,
          tags: ['wedding', 'bridal-makeup', 'special-occasion'],
          is_featured: true,
          created_at: '2024-01-12T14:20:00Z',
          provider_name: 'Sophia Rodriguez',
          service_type: 'Bridal Makeup',
          rating: 5,
          is_liked: false
        }
      ];
      
      setStories(mockStories);
    } catch (error) {
      console.error('Error loading stories:', error);
      toast.error('Failed to load stories');
    } finally {
      setLoading(false);
    }
  };

  const loadFeaturedStories = () => {
    const featured = stories.filter(story => story.is_featured);
    setFeaturedStories(featured);
  };

  const handleLikeStory = async (storyId: string) => {
    try {
      setStories(prev => prev.map(story => 
        story.id === storyId 
          ? { 
              ...story, 
              is_liked: !story.is_liked,
              likes_count: story.is_liked ? story.likes_count - 1 : story.likes_count + 1
            }
          : story
      ));
      
      // Record like in database
      if (user?.id) {
        await supabaseBypass
          .from('customer_stories')
          .upsert({
            user_id: user.id,
            story_id: storyId,
            action: 'like'
          });
      }
    } catch (error) {
      console.error('Error liking story:', error);
    }
  };

  const handleShareStory = async (story: CustomerStory) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: story.title,
          text: story.content,
          url: window.location.href
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success('Story link copied to clipboard!');
      }
      
      // Update share count
      setStories(prev => prev.map(s => 
        s.id === story.id 
          ? { ...s, shares_count: s.shares_count + 1 }
          : s
      ));
    } catch (error) {
      console.error('Error sharing story:', error);
      toast.error('Failed to share story');
    }
  };

  const filteredStories = stories.filter(story => {
    switch (activeFilter) {
      case 'featured':
        return story.is_featured;
      case 'trending':
        return story.likes_count > 100;
      default:
        return true;
    }
  });

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  return (
    <div className="space-y-6">
      {/* Stories Header */}
      <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-200/30">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center text-white">
                <Heart className="h-5 w-5 mr-2" />
                Customer Stories Hub
              </CardTitle>
              <p className="text-purple-200 text-sm mt-1">
                Share your beauty journey and inspire others
              </p>
            </div>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Share Story
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Story Filters */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {[
          { key: 'all', label: 'All Stories', icon: Heart },
          { key: 'featured', label: 'Featured', icon: Star },
          { key: 'trending', label: 'Trending', icon: TrendingUp },
          { key: 'following', label: 'Following', icon: Users }
        ].map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            variant={activeFilter === key ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveFilter(key as typeof activeFilter)}
            className={`flex items-center space-x-1 whitespace-nowrap ${
              activeFilter === key
                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                : 'bg-white/10 hover:bg-white/20 border-white/20'
            } text-white`}
          >
            <Icon className="h-3 w-3" />
            <span className="text-xs">{label}</span>
          </Button>
        ))}
      </div>

      {/* Featured Stories Carousel */}
      {featuredStories.length > 0 && activeFilter === 'all' && (
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Crown className="h-5 w-5 mr-2" />
              Featured Stories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4 overflow-x-auto pb-4">
              {featuredStories.map((story) => (
                <motion.div
                  key={story.id}
                  className="flex-shrink-0 w-64 bg-white/5 rounded-lg border border-white/10 overflow-hidden cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="h-32 bg-gradient-to-br from-purple-400 to-pink-400 relative">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="font-medium text-white text-sm">{story.title}</h3>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={story.user_avatar} />
                        <AvatarFallback className="bg-purple-400 text-white text-xs">
                          {story.user_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-white text-xs">{story.user_name}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-300">
                      <span className="flex items-center">
                        <Heart className="h-3 w-3 mr-1" />
                        {story.likes_count}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {story.comments_count}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stories Feed */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                <CardContent className="p-6">
                  {/* Story Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={story.user_avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                          {story.user_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-white">{story.user_name}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-300">
                          <span>{getTimeAgo(story.created_at)}</span>
                          {story.provider_name && (
                            <>
                              <span>•</span>
                              <span>with {story.provider_name}</span>
                            </>
                          )}
                          {story.is_featured && (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                              <Crown className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Story Content */}
                  <div className="mb-4">
                    <h2 className="text-lg font-medium text-white mb-2">{story.title}</h2>
                    <p className="text-gray-300 leading-relaxed">{story.content}</p>
                  </div>

                  {/* Service Info */}
                  {story.service_type && (
                    <div className="flex items-center space-x-3 mb-4">
                      <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                        {story.service_type}
                      </Badge>
                      {story.rating && (
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < story.rating! ? 'text-yellow-400 fill-current' : 'text-gray-500'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tags */}
                  {story.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {story.tags.map((tag) => (
                        <Badge key={tag} className="bg-white/10 text-white border-white/20 text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Story Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleLikeStory(story.id)}
                        className={`flex items-center space-x-2 hover:bg-white/10 ${
                          story.is_liked ? 'text-red-400' : 'text-gray-300'
                        }`}
                      >
                        <Heart className={`h-4 w-4 ${story.is_liked ? 'fill-current' : ''}`} />
                        <span>{story.likes_count}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-2 text-gray-300 hover:bg-white/10"
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>{story.comments_count}</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleShareStory(story)}
                        className="flex items-center space-x-2 text-gray-300 hover:bg-white/10"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>{story.shares_count}</span>
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-300 hover:bg-white/10"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          <p className="text-white mt-2">Loading amazing stories...</p>
        </div>
      )}

      {filteredStories.length === 0 && !loading && (
        <Card className="bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="text-center py-12">
            <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Stories Yet</h3>
            <p className="text-gray-400 mb-4">
              Be the first to share your beauty journey!
            </p>
            <Button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Share Your Story
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CustomerStoriesHub;