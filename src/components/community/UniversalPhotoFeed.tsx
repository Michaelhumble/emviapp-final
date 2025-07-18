import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, UserPlus, UserCheck, Camera, Send, MoreHorizontal, Sparkles, Flame, Award, Star, Gift, Users, Palette, Scissors, Droplet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { useImageUpload } from '@/hooks/useImageUpload';
import { useArtistFollow } from '@/hooks/artist-interactions/useArtistFollow';

interface PhotoPost {
  id: string;
  content: string;
  image_url?: string;
  likes: number;
  created_at: string;
  user_id: string;
  tags?: string[];
  category?: string;
  profiles?: {
    full_name?: string;
    avatar_url?: string;
    role?: string;
    specialties?: string[];
  };
  likes_count?: number;
  comments_count?: number;
  is_liked?: boolean;
  is_bookmarked?: boolean;
}

interface UniversalPhotoFeedProps {
  onProfileClick: (userId: string) => void;
  onMessageClick?: (userId: string, userName: string, userAvatar?: string, userRole?: string) => void;
}

const UniversalPhotoFeed: React.FC<UniversalPhotoFeedProps> = ({ onProfileClick, onMessageClick }) => {
  const { user } = useAuth();
  const { uploadImage } = useImageUpload();
  
  const [posts, setPosts] = useState<PhotoPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, artists, salons, customers, nails, hair, makeup, etc.
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPost, setNewPost] = useState({ content: '', tags: '', category: 'general' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [commentText, setCommentText] = useState<{[key: string]: string}>({});
  const [showComments, setShowComments] = useState<{[key: string]: boolean}>({});
  const [followingUsers, setFollowingUsers] = useState<{[key: string]: boolean}>({});

  // Emotional reactions and CTAs
  const emotionalReactions = [
    { icon: Heart, label: 'Love', action: 'love', color: 'text-red-500 hover:text-red-600' },
    { icon: Sparkles, label: 'Inspired', action: 'inspired', color: 'text-purple-500 hover:text-purple-600' },
    { icon: Flame, label: 'Fire', action: 'fire', color: 'text-orange-500 hover:text-orange-600' },
    { icon: Award, label: 'Amazing', action: 'amazing', color: 'text-yellow-500 hover:text-yellow-600' }
  ];

  const categoryFilters = [
    { value: 'all', label: 'All Posts', icon: Star },
    { value: 'artists', label: 'Artists', icon: Users },
    { value: 'salons', label: 'Salons', icon: Gift },
    { value: 'customers', label: 'Customers', icon: Heart },
    { value: 'nails', label: 'Nails', icon: Sparkles },
    { value: 'hair', label: 'Hair', icon: Scissors },
    { value: 'makeup', label: 'Makeup', icon: Palette },
    { value: 'massage', label: 'Massage', icon: Heart },
    { value: 'skincare', label: 'Skincare', icon: Droplet }
  ];

  // Fetch posts with smart feed logic
  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      let query = supabase
        .from('community_stories')
        .select(`
          *,
          profiles(full_name, avatar_url)
        `)
        .order('created_at', { ascending: false });

      const { data, error } = await query.limit(50);
      
      if (error) throw error;
      
      // Add engagement data for each post
      const postsWithEngagement = await Promise.all(
        (data || []).map(async (post) => {
          const [likesRes, commentsRes] = await Promise.all([
            supabaseBypass.from('community_post_likes').select('id').eq('post_id', post.id),
            supabaseBypass.from('community_post_comments').select('id').eq('post_id', post.id)
          ]);

          return {
            ...post,
            likes_count: likesRes.data?.length || 0,
            comments_count: commentsRes.data?.length || 0,
            is_liked: false, // Simplified for now
            is_bookmarked: false // Simplified for now
          };
        })
      );

      setPosts(postsWithEngagement as PhotoPost[]);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load posts');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // Create new post
  const handleCreatePost = async () => {
    if (!user) {
      toast.error('Please sign in to post');
      return;
    }

    if (!newPost.content.trim() && !imageFile) {
      toast.error('Please add some content or an image');
      return;
    }

    try {
      let imageUrl = null;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const tags = newPost.tags.split(',').map(tag => tag.trim()).filter(Boolean);

      const { error } = await supabase
        .from('community_stories')
        .insert({
          user_id: user.id,
          content: newPost.content,
          image_url: imageUrl,
          tags,
          category: newPost.category
        });

      if (error) throw error;

      toast.success('Your post is live! ✨', {
        description: 'Your amazing work is now inspiring the community!'
      });

      setNewPost({ content: '', tags: '', category: 'general' });
      setImageFile(null);
      setImagePreview(null);
      setShowCreatePost(false);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post');
    }
  };

  // Toggle like
  const toggleLike = async (postId: string) => {
    if (!user) {
      toast.error('Please sign in to like posts');
      return;
    }

    try {
      const post = posts.find(p => p.id === postId);
      if (!post) return;

      if (post.is_liked) {
        await supabase
          .from('community_post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('community_post_likes')
          .insert({ post_id: postId, user_id: user.id });
      }

      // Update local state
      setPosts(prev => prev.map(p => 
        p.id === postId 
          ? { 
              ...p, 
              is_liked: !p.is_liked,
              likes_count: p.is_liked ? (p.likes_count || 0) - 1 : (p.likes_count || 0) + 1
            }
          : p
      ));
    } catch (error) {
      console.error('Error toggling like:', error);
      toast.error('Failed to update like');
    }
  };

  // Toggle bookmark (simplified for now)
  const toggleBookmark = async (postId: string) => {
    if (!user) {
      toast.error('Please sign in to bookmark posts');
      return;
    }

    // Update local state only for now
    setPosts(prev => prev.map(p => 
      p.id === postId 
        ? { ...p, is_bookmarked: !p.is_bookmarked }
        : p
    ));

    toast.success('Bookmark toggled!');
  };

  // Add comment
  const addComment = async (postId: string) => {
    if (!user) {
      toast.error('Please sign in to comment');
      return;
    }

    const content = commentText[postId]?.trim();
    if (!content) return;

    try {
      await supabase
        .from('community_post_comments')
        .insert({
          post_id: postId,
          user_id: user.id,
          content
        });

      setCommentText(prev => ({ ...prev, [postId]: '' }));
      toast.success('Comment added! 💬');
      fetchPosts();
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  // Toggle follow
  const toggleFollow = async (userId: string) => {
    if (!user) {
      toast.error('Please sign in to follow people');
      return;
    }

    try {
      const isCurrentlyFollowing = followingUsers[userId];
      
      if (isCurrentlyFollowing) {
        // Unfollow user
        const { error } = await supabase
          .from("followers")
          .delete()
          .eq("viewer_id", user.id)
          .eq("artist_id", userId);
          
        if (error) throw error;
        
        setFollowingUsers(prev => ({ ...prev, [userId]: false }));
        toast.success("Unfollowed successfully");
      } else {
        // Follow user
        const { error } = await supabase
          .from("followers")
          .insert({
            viewer_id: user.id,
            artist_id: userId
          });
          
        if (error) throw error;
        
        setFollowingUsers(prev => ({ ...prev, [userId]: true }));
        toast.success("You're now following! (+5 credits)", {
          description: 'Stay connected and inspired!'
        });
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
      toast.error("Failed to update follow status");
    }
  };

  // Share post
  const sharePost = async (post: PhotoPost) => {
    const shareUrl = `${window.location.origin}/community/post/${post.id}`;
    const shareText = `Check out this amazing post by ${post.profiles?.full_name || 'someone'} on EmviApp! ✨`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'EmviApp Community Post',
          text: shareText,
          url: shareUrl,
        });
        toast.success('Shared successfully! 🚀');
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      toast.success('Link copied to clipboard! 📋');
    }
  };

  // Load follow states for posts
  const loadFollowStates = async () => {
    if (!user || posts.length === 0) return;

    try {
      const userIds = posts.map(post => post.user_id);
      const { data: followData } = await supabase
        .from("followers")
        .select("artist_id")
        .eq("viewer_id", user.id)
        .in("artist_id", userIds);

      const followStates: {[key: string]: boolean} = {};
      followData?.forEach(follow => {
        followStates[follow.artist_id] = true;
      });

      setFollowingUsers(followStates);
    } catch (error) {
      console.error('Error loading follow states:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [filter]);

  useEffect(() => {
    loadFollowStates();
  }, [user, posts]);

  return (
    <div className="space-y-16">
      {/* Minimalist Header */}
      <div className="text-center">
        <h2 className="text-4xl font-playfair font-bold mb-6 text-foreground">Community Feed</h2>
        <p className="text-xl font-inter text-muted-foreground">Discover inspiring work from our community</p>
      </div>

      {/* Luxury Filter Bar */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide justify-center">
        {categoryFilters.slice(0, 6).map(({ value, label, icon: Icon }) => (
          <motion.div key={value} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant={filter === value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(value)}
              className="whitespace-nowrap rounded-full px-6 py-3 font-inter font-medium transition-all duration-300 hover:shadow-lg border-border/50"
            >
              <Icon size={16} className="mr-2" />
              {label}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Create Post Modal */}
      <AnimatePresence>
        {showCreatePost && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCreatePost(false)}
          >
            <motion.div
              className="bg-card rounded-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-playfair font-bold mb-6 text-foreground">Share Your Story</h3>
              
              <Textarea
                placeholder="What's inspiring you today? Share your beautiful work and creative journey..."
                value={newPost.content}
                onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                className="mb-6 font-inter text-lg leading-relaxed"
                rows={4}
              />

              <Input
                placeholder="Add tags (e.g., nails, hair, makeup, skincare)"
                value={newPost.tags}
                onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                className="mb-6 font-inter"
              />

              {imagePreview && (
                <div className="mb-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              )}

              <div className="flex justify-between items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload">
                  <Button variant="outline" size="sm" asChild>
                    <span className="cursor-pointer">
                      <Camera className="h-4 w-4 mr-2" />
                      Add Photo
                    </span>
                  </Button>
                </label>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleCreatePost}>
                    <Send className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Posts Feed */}
      <div className="grid gap-12">
        {isLoading ? (
          <div className="text-center py-32">
            <motion.div
              className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full mx-auto"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <p className="mt-6 text-muted-foreground font-inter text-lg">Loading beautiful content...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-32">
            <Sparkles className="h-24 w-24 mx-auto mb-8 text-muted-foreground opacity-50" />
            <h3 className="text-3xl font-playfair font-bold mb-6 text-foreground">No posts yet</h3>
            <p className="text-muted-foreground font-inter text-xl">Be the first to share something beautiful</p>
          </div>
        ) : (
          posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
              className="group"
            >
              {/* Minimalist Post Card */}
              <div className="bg-background border border-border/20 rounded-3xl overflow-hidden hover:shadow-xl transition-all duration-500 hover:border-primary/20">
                {/* Clean Header */}
                <div className="p-8 pb-4">
                  <div className="flex items-center justify-between">
                    <div 
                      className="flex items-center gap-4 cursor-pointer"
                      onClick={() => onProfileClick(post.user_id)}
                    >
                      <Avatar className="h-14 w-14 ring-2 ring-background shadow-lg">
                        <AvatarImage src={post.profiles?.avatar_url} />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {post.profiles?.full_name?.[0] || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className="font-playfair font-bold text-xl hover:text-primary transition-colors">
                          {post.profiles?.full_name || 'Community Member'}
                        </h3>
                        <p className="text-muted-foreground font-inter">
                          {post.profiles?.role} • {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {user?.id !== post.user_id && (
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button 
                          variant={followingUsers[post.user_id] ? "default" : "outline"} 
                          size="sm" 
                          onClick={() => toggleFollow(post.user_id)}
                          className="rounded-full transition-all duration-300 hover:bg-primary/10 hover:text-primary focus:ring-2 focus:ring-primary/20 border-border/50 font-inter font-medium"
                          aria-label={`${followingUsers[post.user_id] ? 'Unfollow' : 'Follow'} ${post.profiles?.full_name}`}
                        >
                          {followingUsers[post.user_id] ? (
                            <>
                              <UserCheck className="h-4 w-4 mr-2" />
                              Following
                            </>
                          ) : (
                            <>
                              <UserPlus className="h-4 w-4 mr-2" />
                              Follow
                            </>
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="px-8 pb-6">
                  {post.content && (
                    <p className="text-lg font-inter leading-relaxed mb-6 text-foreground">{post.content}</p>
                  )}
                  
                  {post.image_url && (
                    <div className="mb-6">
                      <img
                        src={post.image_url}
                        alt="Post content"
                        className="w-full h-auto rounded-2xl shadow-lg"
                      />
                    </div>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-4 py-2 bg-primary/5 text-primary rounded-full text-sm font-inter font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Luxury Actions */}
                <div className="px-8 py-6 border-t border-border/10 bg-background/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            toggleLike(post.id);
                            if (!post.is_liked) {
                              toast.success('💖 You just made someone\'s day!', {
                                description: 'Your love is spreading the beauty!'
                              });
                            }
                          }}
                          className={`rounded-full transition-all duration-300 ${
                            post.is_liked 
                              ? "text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100" 
                              : "hover:text-red-500 hover:bg-red-50"
                          }`}
                          aria-label={`${post.is_liked ? 'Unlike' : 'Like'} this post`}
                        >
                          <Heart className={`h-5 w-5 mr-2 transition-all duration-300 ${post.is_liked ? 'fill-current scale-110' : ''}`} />
                          {post.likes_count || 0}
                        </Button>
                      </motion.div>

                      {/* Message/DM Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onMessageClick?.(
                          post.user_id, 
                          post.profiles?.full_name || 'Community Member',
                          post.profiles?.avatar_url,
                          post.profiles?.role
                        )}
                        className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-all duration-300 focus:ring-2 focus:ring-primary/20 rounded-lg p-2"
                        aria-label="Send message"
                      >
                        <MessageCircle className="h-5 w-5" />
                        <span className="text-sm font-inter font-medium">Message</span>
                      </motion.button>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                          className="rounded-full transition-all duration-300 hover:text-blue-500 hover:bg-blue-50 focus:ring-2 focus:ring-blue-200"
                          aria-label={`${showComments[post.id] ? 'Hide' : 'Show'} comments`}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {post.comments_count || 0}
                        </Button>
                      </motion.div>

                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            sharePost(post);
                            toast.success('🚀 Spreading the beauty!', {
                              description: 'Thanks for sharing amazing content!'
                            });
                          }}
                          className="rounded-full transition-all duration-300 hover:text-green-500 hover:bg-green-50 focus:ring-2 focus:ring-green-200"
                          aria-label="Share this post"
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Share
                        </Button>
                      </motion.div>
                    </div>

                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          toggleBookmark(post.id);
                          toast.success(post.is_bookmarked ? 'Bookmark removed' : '📌 Saved to your collection!');
                        }}
                        className={`rounded-full transition-all duration-300 ${
                          post.is_bookmarked 
                            ? "text-primary hover:text-primary/80 bg-primary/10 hover:bg-primary/20" 
                            : "hover:text-primary hover:bg-primary/10"
                        }`}
                        aria-label={`${post.is_bookmarked ? 'Remove bookmark' : 'Bookmark'} this post`}
                      >
                        <Bookmark className={`h-4 w-4 transition-all duration-300 ${post.is_bookmarked ? 'fill-current scale-110' : ''}`} />
                      </Button>
                    </motion.div>
                  </div>

                  {/* Emotional Reactions */}
                  <div className="flex items-center gap-2 mb-3">
                    {emotionalReactions.map((reaction) => {
                      const IconComponent = reaction.icon;
                      return (
                        <motion.div 
                          key={reaction.action}
                          whileHover={{ scale: 1.1, y: -2 }} 
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className={`text-xs h-8 rounded-full border-0 bg-background/80 backdrop-blur-sm transition-all duration-300 ${reaction.color} hover:shadow-lg hover:bg-background`}
                            onClick={() => {
                              toast.success(`${reaction.label} reaction added! ✨`, {
                                description: 'Your reaction helps creators feel appreciated!'
                              });
                            }}
                            aria-label={`React with ${reaction.label}`}
                          >
                            <IconComponent size={14} className="mr-1" />
                            {reaction.label}
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Comment Section */}
                  <AnimatePresence>
                    {showComments[post.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-border/50 pt-3"
                      >
                        <div className="flex gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.user_metadata?.avatar_url} />
                            <AvatarFallback>{user?.email?.[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 flex gap-2">
                            <Input
                              placeholder="Add a comment..."
                              value={commentText[post.id] || ''}
                              onChange={(e) => setCommentText(prev => ({ ...prev, [post.id]: e.target.value }))}
                              className="text-sm"
                            />
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                size="sm"
                                onClick={() => {
                                  addComment(post.id);
                                  toast.success('💬 Comment shared!', {
                                    description: 'Your voice adds to the conversation!'
                                  });
                                }}
                                disabled={!commentText[post.id]?.trim()}
                                className="rounded-full transition-all duration-300 hover:shadow-md focus:ring-2 focus:ring-primary/20"
                                aria-label="Post comment"
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default UniversalPhotoFeed;