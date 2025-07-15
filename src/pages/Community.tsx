import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Search, TrendingUp, Plus, MapPin, Clock, Users, Hash, Sparkles, Zap, BarChart3, Pin, Camera, Video, Smile, X, Check, Globe, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCommunityPosts, CommunityPost } from '@/hooks/useCommunityPosts';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import PostReactions from '@/components/community/PostReactions';
import CommunitySearch from '@/components/community/CommunitySearch';
import ChallengeOfTheWeek from '@/components/community/ChallengeOfTheWeek';
import { useChallenges } from '@/hooks/useChallenges';
import TopCreators from '@/components/community/TopCreators';
import PhotoUploader from '@/components/posting/PhotoUploader';
import CommunityPostComposer from '@/components/community/CommunityPostComposer';
import AiAssistantModal from '@/components/community/AiAssistantModal';
import LeaderboardWidget from '@/components/community/LeaderboardWidget';
import OnboardingModal from '@/components/community/OnboardingModal';
import VideoPlayer from '@/components/community/VideoPlayer';
import SharerLeaderboard from '@/components/community/SharerLeaderboard';
import SEOMetaTags from '@/components/community/SEOMetaTags';
import FloatingInspirationCTA from '@/components/community/FloatingInspirationCTA';
import { formatPostTimestamp } from '@/utils/timeUtils';
import { supabase } from '@/integrations/supabase/client';

const Community = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [showPostComposer, setShowPostComposer] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [postContent, setPostContent] = useState('');
  const [postType, setPostType] = useState('story');
  const [category, setCategory] = useState('');
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoCaptions, setVideoCaptions] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [location, setLocation] = useState('');
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // Edit mode state
  const [editingPost, setEditingPost] = useState<CommunityPost | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSubmittingToChallenge, setIsSubmittingToChallenge] = useState(false);
  
  const { posts, isLoading, fetchPosts, createPost, updatePost, toggleLike } = useCommunityPosts();
  const { user, isSignedIn } = useAuth();
  const { submitEntry } = useChallenges();

  const quickFilters = [
    { id: 'all', label: 'For You', count: 2345 },
    { id: 'nails', label: 'Nails', count: 892 },
    { id: 'hair', label: 'Hair', count: 756 },
    { id: 'makeup', label: 'Makeup', count: 543 },
    { id: 'skincare', label: 'Skincare', count: 432 },
    { id: 'lashes', label: 'Lashes', count: 321 },
  ];

  const postTypes = [
    { value: 'story', icon: Camera, label: 'Story', description: 'Share your work', color: 'from-blue-500 to-cyan-500' },
    { value: 'tip', icon: Sparkles, label: 'Pro Tip', description: 'Share expertise', color: 'from-purple-500 to-pink-500' },
    { value: 'showcase', icon: Star, label: 'Showcase', description: 'Highlight best work', color: 'from-yellow-500 to-orange-500' },
    { value: 'question', icon: Hash, label: 'Question', description: 'Ask community', color: 'from-green-500 to-emerald-500' },
    { value: 'poll', icon: BarChart3, label: 'Poll', description: 'Get opinions', color: 'from-indigo-500 to-purple-500' },
  ];

  const categories = [
    'Nails', 'Hair', 'Makeup', 'Skincare', 'Lashes', 'Brows', 'Massage', 'Tattoo', 'Barber'
  ];

  const trendingTopics = [
    { tag: 'nail-art-2024', posts: 234, emoji: '💅', trending: true },
    { tag: 'lash-extensions', posts: 189, emoji: '👁️', trending: true },
    { tag: 'hair-color-trends', posts: 156, emoji: '🌈', trending: false },
    { tag: 'skincare-routine', posts: 143, emoji: '✨', trending: false },
    { tag: 'makeup-transformation', posts: 98, emoji: '💄', trending: true },
  ];

  const resetForm = () => {
    setPostContent('');
    setPostType('story');
    setCategory('');
    setImageFiles([]);
    setVideoFile(null);
    setVideoCaptions('');
    setPollOptions(['', '']);
    setLocation('');
    setEditingPost(null);
    setIsEditMode(false);
  };

  const handleEditPost = (post: CommunityPost) => {
    setEditingPost(post);
    setIsEditMode(true);
    setPostContent(post.content);
    setPostType(post.post_type);
    setCategory(post.category);
    setImageFiles([]);
    setVideoFile(null);
    setVideoCaptions('');
    setPollOptions(['', '']);
    setLocation('');
    setShowPostComposer(true);
  };

  const handleCreatePost = async () => {
    if (!isSignedIn || !user) {
      toast.error('Please sign in to post');
      return;
    }

    if (!postContent.trim()) {
      toast.error('Please add some content to your post');
      return;
    }

    try {
      let videoUrl = null;
      if (videoFile) {
        const fileExt = videoFile.name.split('.').pop();
        const fileName = `${Date.now()}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('community-images')
          .upload(fileName, videoFile);
        
        if (error) throw error;
        
        const { data: { publicUrl } } = supabase.storage
          .from('community-images')
          .getPublicUrl(data.path);
        
        videoUrl = publicUrl;
      }

      const postData = {
        content: postContent,
        post_type: postType,
        category: category || 'general',
        video_url: videoUrl,
        tags: extractHashtags(postContent),
        image_urls: [],
      };

      if (isEditMode && editingPost) {
        const success = await updatePost(editingPost.id, postData);
        if (success) {
          toast.success('Post updated successfully!');
          resetForm();
          setShowPostComposer(false);
        }
      } else {
        const success = await createPost(postData);
        if (success) {
          toast.success('Post created successfully!');
          
          if (isSubmittingToChallenge && success && typeof success === 'object' && success.id) {
            await submitEntry(success.id);
            setIsSubmittingToChallenge(false);
          }
          
          resetForm();
          setShowPostComposer(false);
        }
      }
    } catch (error) {
      console.error('Error with post:', error);
      toast.error('Failed to save post. Please try again.');
    }
  };

  const extractHashtags = (text: string) => {
    const hashtags = text.match(/#[\w]+/g);
    return hashtags ? hashtags.map(tag => tag.substring(1)) : [];
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  useEffect(() => {
    if (isSignedIn && user) {
      const hasSeenOnboarding = localStorage.getItem(`onboarding_seen_${user.id}`);
      const userCreatedAt = new Date(user.created_at);
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      if (!hasSeenOnboarding && userCreatedAt > oneDayAgo) {
        setShowOnboarding(true);
      }
    }
  }, [isSignedIn, user]);

  useEffect(() => {
    fetchPosts(activeFilter === 'all' ? undefined : activeFilter, searchQuery);
  }, [activeFilter, searchQuery]);

  const handleOnboardingClose = () => {
    setShowOnboarding(false);
    if (user) {
      localStorage.setItem(`onboarding_seen_${user.id}`, 'true');
    }
  };

  const handleTryAI = () => {
    setShowPostComposer(true);
    setPostContent("@AI ");
  };

  const handleJoinChallenge = () => {
    if (!isSignedIn) {
      toast.error('Please sign in to join the challenge');
      return;
    }
    setIsSubmittingToChallenge(true);
    setShowPostComposer(true);
    setPostContent('');
    toast.info('Create a post to enter the challenge!');
  };

  return (
    <Layout>
      <SEOMetaTags
        title="Beauty Community - Share, Learn & Grow"
        description="Join the most exclusive beauty community. Share your nail art, hair styling, makeup looks, and skincare tips. Connect with beauty professionals worldwide."
        url="https://emviapp.com/community"
        type="website"
        tags={['beauty community', 'nail art', 'hair styling', 'makeup', 'skincare', 'beauty professionals']}
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Mobile-First Header */}
        <div className="bg-white/80 backdrop-blur-md border-b border-purple-100">
          <div className="px-4 py-3">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Community
              </h1>
              <div className="flex-1" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSearch(true)}
                className="text-gray-600"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Content Container - Mobile/Desktop/iPad Responsive */}
        <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
          <div className="lg:grid lg:grid-cols-3 lg:gap-6 space-y-4 lg:space-y-0">
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-4">
              <ChallengeOfTheWeek onJoinChallenge={handleJoinChallenge} />

              {/* Quick Filters - Touch-friendly */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {quickFilters.map((filter) => (
                  <Badge
                    key={filter.id}
                    variant={activeFilter === filter.id ? "default" : "outline"}
                    className={`cursor-pointer whitespace-nowrap px-3 py-2 min-h-[44px] flex items-center touch-manipulation ${
                      activeFilter === filter.id 
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' 
                        : 'hover:bg-purple-50'
                    }`}
                    onClick={() => setActiveFilter(filter.id)}
                  >
                    {filter.label} {filter.count > 99 ? '99+' : filter.count}
                  </Badge>
                ))}
              </div>

              {/* Posts Feed */}
              <div className="space-y-4">
                {posts.map((post) => (
                  <Card key={post.id} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.profiles?.avatar_url} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            {post.profiles?.full_name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {post.profiles?.full_name || 'Community Member'}
                          </h4>
                          <p className="text-gray-800 mt-2">{post.content}</p>
                        </div>
                      </div>
                      <PostReactions 
                        post={post} 
                        onLike={() => toggleLike(post.id)}
                        onComment={() => {}}
                        onShare={() => {}}
                        onBookmark={() => {}}
                        onEdit={() => handleEditPost(post)}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Sidebar - Hidden on mobile */}
            <div className="hidden lg:block lg:col-span-1 space-y-4">
              <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="h-4 w-4 text-orange-600" />
                    <span className="font-semibold text-orange-800">Trending Now</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {trendingTopics.map((topic) => (
                      <Badge
                        key={topic.tag}
                        variant="outline"
                        className={`cursor-pointer ${
                          topic.trending 
                            ? 'bg-orange-100 border-orange-300 text-orange-700' 
                            : 'bg-white border-gray-200'
                        }`}
                      >
                        {topic.emoji} #{topic.tag} ({topic.posts})
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <TopCreators />
              <LeaderboardWidget />
              <SharerLeaderboard />
            </div>
          </div>
        </div>

        {/* Post Composer Modal */}
        {isSignedIn && (
          <Dialog open={showPostComposer} onOpenChange={(open) => {
            setShowPostComposer(open);
            if (!open) resetForm();
          }}>
            <DialogContent className="max-w-lg mx-4 max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{isEditMode ? 'Edit Post' : 'Create Post'}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {postTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <Button
                        key={type.value}
                        variant={postType === type.value ? "default" : "outline"}
                        onClick={() => setPostType(type.value)}
                        className={`text-left flex-col h-auto p-3 min-h-[44px] touch-manipulation ${
                          postType === type.value 
                            ? `bg-gradient-to-r ${type.color} text-white` 
                            : 'hover:bg-purple-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span className="font-medium">{type.label}</span>
                        </div>
                        <span className="text-xs opacity-70">{type.description}</span>
                      </Button>
                    );
                  })}
                </div>

                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <CommunityPostComposer
                  content={postContent}
                  onContentChange={setPostContent}
                  onSubmit={() => {}}
                  placeholder="Share what's inspiring you today... Type @AI for expert beauty advice!"
                  showActions={true}
                  videoFile={videoFile}
                  onVideoChange={setVideoFile}
                  videoCaptions={videoCaptions}
                  onVideoCaptionsChange={setVideoCaptions}
                />

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      resetForm();
                      setShowPostComposer(false);
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreatePost}
                    disabled={!postContent.trim() || isLoading}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    {isLoading ? 'Saving...' : (isEditMode ? 'Update Post' : 'Share Post')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        <CommunitySearch 
          isOpen={showSearch}
          onClose={() => setShowSearch(false)}
          onSearch={(query) => {
            setSearchQuery(query);
            setShowSearch(false);
          }}
        />

        <AiAssistantModal 
          open={showAiAssistant} 
          onOpenChange={setShowAiAssistant} 
        />

        <OnboardingModal 
          isOpen={showOnboarding} 
          onClose={handleOnboardingClose}
          onTryAI={handleTryAI}
        />

        <FloatingInspirationCTA 
          onTriggerAI={() => setShowAiAssistant(true)}
          onOpenPostComposer={() => setShowPostComposer(true)}
        />
      </div>
    </Layout>
  );
};

export default Community;
