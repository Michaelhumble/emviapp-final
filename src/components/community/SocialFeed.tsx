import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Play } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface Post {
  id: string;
  content: string;
  image_urls: string[];
  video_url?: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  user_id: string;
  is_featured: boolean;
  profiles?: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
}

interface SocialFeedProps {
  onCreatePost: () => void;
}

export const SocialFeed: React.FC<SocialFeedProps> = ({ onCreatePost }) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPosts();
    setupRealtimeSubscription();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('community_posts')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setPosts((data as any) || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const setupRealtimeSubscription = () => {
    const channel = supabase
      .channel('community_posts_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'community_posts'
        },
        () => {
          fetchPosts();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleDoubleTapLike = async (postId: string) => {
    if (!user) return;

    const isLiked = likedPosts.has(postId);
    
    if (isLiked) {
      setLikedPosts(prev => {
        const next = new Set(prev);
        next.delete(postId);
        return next;
      });
      
      await supabase
        .from('community_post_likes')
        .delete()
        .match({ post_id: postId, user_id: user.id });
        
      await supabase.rpc('decrement_post_likes', { post_id: postId });
    } else {
      setLikedPosts(prev => new Set([...prev, postId]));
      
      await supabase
        .from('community_post_likes')
        .insert({ post_id: postId, user_id: user.id });
        
      await supabase.rpc('increment_post_likes', { post_id: postId });
    }

    // Update local state optimistically
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes_count: post.likes_count + (isLiked ? -1 : 1) }
        : post
    ));
  };

  const handleShare = async (post: Post) => {
    try {
      await navigator.share({
        title: `Check out this post by ${post.profiles?.full_name}`,
        text: post.content,
        url: window.location.href
      });
    } catch (error) {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const posted = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - posted.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'now';
    if (diffInHours < 24) return `${diffInHours}h`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d`;
    return posted.toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-white border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {/* Stories Section */}
      <div className="sticky top-0 z-40 bg-black border-b border-gray-800 px-4 py-3">
        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={onCreatePost}
            className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center"
          >
            <span className="text-white text-2xl">+</span>
          </motion.button>
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              whileTap={{ scale: 0.95 }}
              className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-orange-500 p-0.5"
            >
              <div className="w-full h-full rounded-full bg-gray-800" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="pb-20">
        <AnimatePresence>
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border-b border-gray-800"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center">
                      {post.profiles?.avatar_url ? (
                        <img
                          src={post.profiles.avatar_url}
                          alt="Profile"
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-white text-sm">
                          {post.profiles?.full_name?.charAt(0) || 'U'}
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">
                      {post.profiles?.full_name || 'Anonymous'}
                    </p>
                    <p className="text-gray-400 text-xs">
                      {formatTimeAgo(post.created_at)}
                    </p>
                  </div>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-white"
                >
                  <MoreHorizontal size={20} />
                </motion.button>
              </div>

              {/* Post Content */}
              {post.content && (
                <div className="px-4 pb-3">
                  <p className="text-white text-sm leading-relaxed">
                    {post.content}
                  </p>
                </div>
              )}

              {/* Media */}
              {post.image_urls && post.image_urls.length > 0 && (
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  onDoubleClick={() => handleDoubleTapLike(post.id)}
                  className="relative aspect-square bg-gray-900"
                >
                  <img
                    src={post.image_urls[0]}
                    alt="Post content"
                    className="w-full h-full object-cover"
                  />
                  <AnimatePresence>
                    {likedPosts.has(post.id) && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1.2, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                      >
                        <Heart className="w-20 h-20 text-red-500 fill-current" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {post.video_url && (
                <div className="relative aspect-video bg-gray-900">
                  <video
                    src={post.video_url}
                    className="w-full h-full object-cover"
                    controls
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-80" />
                  </div>
                </div>
              )}

              {/* Engagement Bar */}
              <div className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDoubleTapLike(post.id)}
                      className="flex items-center space-x-2"
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          likedPosts.has(post.id)
                            ? 'text-red-500 fill-current'
                            : 'text-gray-400'
                        }`}
                      />
                      <span className="text-gray-400 text-sm">
                        {post.likes_count}
                      </span>
                    </motion.button>
                    
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center space-x-2"
                    >
                      <MessageCircle className="w-6 h-6 text-gray-400" />
                      <span className="text-gray-400 text-sm">
                        {post.comments_count}
                      </span>
                    </motion.button>
                    
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare(post)}
                      className="flex items-center space-x-2"
                    >
                      <Share className="w-6 h-6 text-gray-400" />
                    </motion.button>
                  </div>
                  
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    className="text-gray-400"
                  >
                    <Bookmark className="w-6 h-6" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};