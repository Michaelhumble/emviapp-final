import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Search, TrendingUp, Plus, MapPin, Clock, Users, Hash, Sparkles, Zap, BarChart3, Pin, Camera, Video, Smile, X, Check, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCommunityPosts } from '@/hooks/useCommunityPosts';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import PostReactions from '@/components/community/PostReactions';
import CommunitySearch from '@/components/community/CommunitySearch';
import ChallengeOfTheWeek from '@/components/community/ChallengeOfTheWeek';
import TopCreators from '@/components/community/TopCreators';
import PhotoUploader from '@/components/posting/PhotoUploader';
import CommunityPostComposer from '@/components/community/CommunityPostComposer';
import AiAssistantModal from '@/components/community/AiAssistantModal';
import LeaderboardWidget from '@/components/community/LeaderboardWidget';
import OnboardingModal from '@/components/community/OnboardingModal';
import VideoPlayer from '@/components/community/VideoPlayer';

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
  const { posts, isLoading, fetchPosts, createPost, toggleLike } = useCommunityPosts();
  const { user, isSignedIn } = useAuth();

  const quickFilters = [
    { id: 'all', label: 'For You', count: 2345 },
    { id: 'nails', label: 'Nails', count: 892 },
    { id: 'hair', label: 'Hair', count: 756 },
    { id: 'makeup', label: 'Makeup', count: 543 },
    { id: 'skincare', label: 'Skincare', count: 432 },
    { id: 'lashes', label: 'Lashes', count: 321 },
  ];

  const postTypes = [
    { value: 'story', label: '📸 Story', description: 'Share your work' },
    { value: 'tip', label: '💡 Pro Tip', description: 'Share expertise' },
    { value: 'showcase', label: '✨ Showcase', description: 'Highlight best work' },
    { value: 'question', label: '❓ Question', description: 'Ask community' },
    { value: 'poll', label: '📊 Poll', description: 'Get opinions' },
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

  const handleCreatePost = async () => {
    if (!isSignedIn) {
      toast.error('Please sign in to post');
      return;
    }

    if (!postContent.trim()) {
      toast.error('Please add some content to your post');
      return;
    }

    try {
      const postData = {
        content: postContent,
        post_type: postType,
        category: category || 'general',
        tags: extractHashtags(postContent),
        image_urls: [], // Will be handled by image upload
      };

      await createPost(postData);
      setPostContent('');
      setImageFiles([]);
      setVideoFile(null);
      setVideoCaptions('');
      setShowPostComposer(false);
      toast.success('Post shared successfully!');
    } catch (error) {
      toast.error('Failed to create post');
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

  // Check for new users and show onboarding
  useEffect(() => {
    if (isSignedIn && user) {
      const hasSeenOnboarding = localStorage.getItem(`onboarding_seen_${user.id}`);
      const userCreatedAt = new Date(user.created_at);
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      // Show onboarding for users created in the last 24 hours who haven't seen it
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

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
        {/* Mobile-First Header - No Sticky Elements */}
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

        {/* Content Container */}
        <div className="max-w-2xl mx-auto px-4 py-4 space-y-4">
          {/* Challenge of the Week */}
          <ChallengeOfTheWeek />

          {/* Quick Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {quickFilters.map((filter) => (
              <Badge
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap px-3 py-2 ${
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

          {/* Always-Visible Post Composer with AI */}
          <Card className="border-2 border-purple-100 bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user?.user_metadata?.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {user?.user_metadata?.full_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="outline"
                  className="flex-1 justify-start text-gray-500 bg-gray-50/80 hover:bg-gray-100"
                  onClick={() => setShowPostComposer(true)}
                >
                  What's inspiring you today? Try @AI for expert tips!
                </Button>
                <Button
                  size="icon"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  onClick={() => setShowPostComposer(true)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <CommunityPostComposer
                content={postContent}
                onContentChange={setPostContent}
                onSubmit={handleCreatePost}
                placeholder="Share your beauty journey... Type @AI for instant expert advice!"
                showActions={false}
                videoFile={videoFile}
                onVideoChange={setVideoFile}
                videoCaptions={videoCaptions}
                onVideoCaptionsChange={setVideoCaptions}
              />
            </CardContent>
          </Card>

          {/* Trending Topics - Non-Sticky */}
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

          {/* Top Creators */}
          <TopCreators />
          
          {/* Leaderboard Widget */}
          <LeaderboardWidget />

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
                <CardContent className="p-0">
                  {/* Post Header */}
                  <div className="p-4 pb-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={post.profiles?.avatar_url} />
                          <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                            {post.profiles?.full_name?.charAt(0) || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-gray-900">
                              {post.profiles?.full_name || 'Community Member'}
                            </h4>
                            {post.is_featured && (
                              <Badge className="bg-yellow-100 text-yellow-800 text-xs">
                                <Pin className="h-3 w-3 mr-1" />
                                Pinned
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{post.category}</span>
                            <span>•</span>
                            <span>{formatTimeAgo(post.created_at)}</span>
                            {location && (
                              <>
                                <span>•</span>
                                <MapPin className="h-3 w-3" />
                                <span>{location}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-400">
                        <span className="text-lg">⋯</span>
                      </Button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="px-4 py-2">
                    <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
                    {post.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {post.tags.map((tag) => (
                          <span key={tag} className="text-purple-600 text-sm">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Post Videos */}
                  {post.video_url && (
                    <div className="px-4 py-2">
                      <div className="aspect-[9/16] max-w-xs mx-auto">
                        <VideoPlayer
                          src={post.video_url}
                          autoPlay={true}
                          muted={true}
                          loop={true}
                          captions={(post as any).video_captions}
                          className="w-full h-full"
                        />
                      </div>
                    </div>
                  )}

                  {/* Post Images */}
                  {post.image_urls?.length > 0 && (
                    <div className="px-4 py-2">
                      <div className="grid grid-cols-1 gap-2 rounded-lg overflow-hidden">
                        {post.image_urls.map((url, index) => (
                          <img
                            key={index}
                            src={url}
                            alt={`Post image ${index + 1}`}
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Post Actions */}
                  <div className="px-4 py-3 border-t border-gray-100">
                    <PostReactions 
                      post={post} 
                      onLike={() => toggleLike(post.id)}
                      onComment={() => {/* Handle comment */}}
                      onShare={() => {/* Handle share */}}
                      onBookmark={() => {/* Handle bookmark */}}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom Spacing for Tab Bar */}
          <div className="h-20" />
        </div>

        {/* Post Composer Modal */}
        <Dialog open={showPostComposer} onOpenChange={setShowPostComposer}>
          <DialogContent className="max-w-lg mx-4 max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create Post</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Post Type Selector */}
              <div className="grid grid-cols-2 gap-2">
                {postTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={postType === type.value ? "default" : "outline"}
                    onClick={() => setPostType(type.value)}
                    className="text-left flex-col h-auto p-3"
                  >
                    <span className="font-medium">{type.label}</span>
                    <span className="text-xs opacity-70">{type.description}</span>
                  </Button>
                ))}
              </div>

              {/* Category Selector */}
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

              {/* Post Content with AI */}
              <CommunityPostComposer
                content={postContent}
                onContentChange={setPostContent}
                onSubmit={() => {}} // Handled by modal submit
                placeholder="Share what's inspiring you today... Type @AI for expert beauty advice!"
                showActions={true}
                videoFile={videoFile}
                onVideoChange={setVideoFile}
                videoCaptions={videoCaptions}
                onVideoCaptionsChange={setVideoCaptions}
              />

              {/* Poll Options (if poll type) */}
              {postType === 'poll' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Poll Options:</label>
                  {pollOptions.map((option, index) => (
                    <Input
                      key={index}
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => {
                        const newOptions = [...pollOptions];
                        newOptions[index] = e.target.value;
                        setPollOptions(newOptions);
                      }}
                    />
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPollOptions([...pollOptions, ''])}
                  >
                    Add Option
                  </Button>
                </div>
              )}

              {/* Image Upload */}
              <PhotoUploader
                files={imageFiles}
                onChange={setImageFiles}
                maxFiles={5}
                className="border-2 border-dashed border-purple-200 rounded-lg p-4"
              />

              {/* Location */}
              <Input
                placeholder="Add location (optional)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1"
              />

              {/* AI Polish Features */}
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-purple-600">
                  <Sparkles className="h-4 w-4 mr-1" />
                  AI Polish
                </Button>
                <Button variant="outline" size="sm" className="text-blue-600">
                  <Globe className="h-4 w-4 mr-1" />
                  Translate
                </Button>
              </div>

              {/* Submit */}
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowPostComposer(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleCreatePost}
                  disabled={!postContent.trim() || isLoading}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500"
                >
                  {isLoading ? 'Posting...' : 'Share Post'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Search Modal */}
        <CommunitySearch 
          isOpen={showSearch}
          onClose={() => setShowSearch(false)}
          onSearch={(query) => {
            setSearchQuery(query);
            setShowSearch(false);
          }}
        />

        {/* AI Assistant Modal */}
        <AiAssistantModal 
          open={showAiAssistant} 
          onOpenChange={setShowAiAssistant} 
        />

        {/* Onboarding Modal */}
        <OnboardingModal 
          isOpen={showOnboarding} 
          onClose={handleOnboardingClose}
          onTryAI={handleTryAI}
        />
      </div>
    </Layout>
  );
};

export default Community;