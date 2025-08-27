import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Share, Bookmark, MoreHorizontal, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { formatTimeAgo } from '@/utils/timeUtils';

interface Post {
  id: string;
  user_id: string;
  content: string;
  image_urls: string[];
  video_url?: string;
  post_type: string;
  tags: string[];
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  profiles?: {
    full_name?: string;
    avatar_url?: string;
  };
  user_has_liked?: boolean;
}

interface ImmersiveFeedProps {
  posts: Post[];
  onLike: (postId: string) => void;
  onComment: (post: Post) => void;
  onShare: (post: Post) => void;
  onSave: (postId: string) => void;
  onLoadMore: () => void;
  hasMore: boolean;
}

const ImmersiveFeed: React.FC<ImmersiveFeedProps> = ({
  posts,
  onLike,
  onComment,
  onShare,
  onSave,
  onLoadMore,
  hasMore
}) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [mutedVideos, setMutedVideos] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  const handleVideoPlay = (postId: string) => {
    setActiveVideo(postId);
  };

  const handleVideoToggle = (postId: string, videoElement: HTMLVideoElement) => {
    if (videoElement.paused) {
      videoElement.play();
      setActiveVideo(postId);
    } else {
      videoElement.pause();
      setActiveVideo(null);
    }
  };

  const handleMuteToggle = (postId: string, videoElement: HTMLVideoElement) => {
    const newMutedVideos = new Set(mutedVideos);
    if (mutedVideos.has(postId)) {
      newMutedVideos.delete(postId);
      videoElement.muted = false;
    } else {
      newMutedVideos.add(postId);
      videoElement.muted = true;
    }
    setMutedVideos(newMutedVideos);
  };

  const handleSave = (postId: string) => {
    const newSavedPosts = new Set(savedPosts);
    if (savedPosts.has(postId)) {
      newSavedPosts.delete(postId);
    } else {
      newSavedPosts.add(postId);
    }
    setSavedPosts(newSavedPosts);
    onSave(postId);
  };

  // Intersection observer for infinite scroll
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore) {
            onLoadMore();
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [hasMore, onLoadMore]);

  const postVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -50, scale: 0.95 }
  };

  const interactionVariants = {
    tap: { scale: 0.95 },
    hover: { scale: 1.05 }
  };

  return (
    <div className="w-full min-h-screen bg-black">
      <AnimatePresence>
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            variants={postVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full h-screen snap-start overflow-hidden"
            ref={index === posts.length - 3 ? observerRef.current?.observe : undefined}
          >
            {/* Background Content */}
            <div className="absolute inset-0">
              {post.video_url ? (
                <video
                  className="w-full h-full object-cover"
                  loop
                  muted={mutedVideos.has(post.id)}
                  playsInline
                  onClick={(e) => handleVideoToggle(post.id, e.currentTarget)}
                  onPlay={() => handleVideoPlay(post.id)}
                >
                  <source src={post.video_url} type="video/mp4" />
                </video>
              ) : post.image_urls.length > 0 ? (
                <div className="relative w-full h-full">
                  <img 
                    src={post.image_urls[0]} 
                    alt="Post content"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 flex items-center justify-center">
                  <p className="text-white text-4xl font-bold text-center px-8 leading-relaxed">
                    {post.content}
                  </p>
                </div>
              )}
            </div>

            {/* Video Controls */}
            {post.video_url && (
              <div className="absolute top-4 right-4 z-10 flex gap-2">
                <motion.button
                  variants={interactionVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={(e) => {
                    e.stopPropagation();
                    const video = e.currentTarget.closest('.relative')?.querySelector('video');
                    if (video) handleMuteToggle(post.id, video);
                  }}
                  className="w-10 h-10 bg-black/50 rounded-full flex items-center justify-center"
                >
                  {mutedVideos.has(post.id) ? 
                    <VolumeX className="w-5 h-5 text-white" /> : 
                    <Volume2 className="w-5 h-5 text-white" />
                  }
                </motion.button>
              </div>
            )}

            {/* User Info & Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
              <div className="flex items-start justify-between">
                <div className="flex-1 pr-4">
                  {/* User Info */}
                  <motion.div 
                    className="flex items-center mb-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Avatar className="w-12 h-12 ring-2 ring-white/30">
                      <AvatarImage src={post.profiles?.avatar_url} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                        {post.profiles?.full_name?.[0] || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="ml-3">
                      <p className="text-white font-semibold text-lg">
                        {post.profiles?.full_name || 'Anonymous'}
                      </p>
                      <p className="text-white/70 text-sm">
                        {formatTimeAgo(post.created_at)}
                      </p>
                    </div>
                    <Button
                      size="sm"
                      className="ml-auto bg-white/20 hover:bg-white/30 border border-white/30 text-white"
                    >
                      Follow
                    </Button>
                  </motion.div>

                  {/* Content */}
                  {!post.video_url && post.image_urls.length === 0 && (
                    <motion.p 
                      className="text-white text-lg mb-3 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {post.content}
                    </motion.p>
                  )}

                  {(post.video_url || post.image_urls.length > 0) && post.content && (
                    <motion.p 
                      className="text-white text-base mb-3 leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {post.content}
                    </motion.p>
                  )}

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <motion.div 
                      className="flex flex-wrap gap-2 mb-3"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-white/20 rounded-full text-white text-sm font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Action Buttons */}
                <motion.div 
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, staggerChildren: 0.1 }}
                >
                  {/* Like */}
                  <motion.button
                    variants={interactionVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => onLike(post.id)}
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center mb-1">
                      <Heart 
                        className={`w-7 h-7 ${post.user_has_liked ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                      />
                    </div>
                    <span className="text-white text-xs font-semibold">
                      {post.likes_count > 999 ? `${(post.likes_count / 1000).toFixed(1)}K` : post.likes_count}
                    </span>
                  </motion.button>

                  {/* Comment */}
                  <motion.button
                    variants={interactionVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => onComment(post)}
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center mb-1">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white text-xs font-semibold">
                      {post.comments_count > 999 ? `${(post.comments_count / 1000).toFixed(1)}K` : post.comments_count}
                    </span>
                  </motion.button>

                  {/* Share */}
                  <motion.button
                    variants={interactionVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => onShare(post)}
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center mb-1">
                      <Share className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white text-xs font-semibold">
                      {post.shares_count > 999 ? `${(post.shares_count / 1000).toFixed(1)}K` : post.shares_count}
                    </span>
                  </motion.button>

                  {/* Save */}
                  <motion.button
                    variants={interactionVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => handleSave(post.id)}
                    className="flex flex-col items-center"
                  >
                    <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center mb-1">
                      <Bookmark 
                        className={`w-6 h-6 ${savedPosts.has(post.id) ? 'text-yellow-400 fill-yellow-400' : 'text-white'}`} 
                      />
                    </div>
                  </motion.button>

                  {/* More Options */}
                  <motion.button
                    variants={interactionVariants}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center"
                  >
                    <MoreHorizontal className="w-6 h-6 text-white" />
                  </motion.button>
                </motion.div>
              </div>
            </div>

            {/* Engagement Ring Animation */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {post.user_has_liked && (
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.2, 1] }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <Heart className="w-20 h-20 text-red-500 fill-red-500 drop-shadow-lg" />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Loading indicator */}
      {hasMore && (
        <div className="h-20 flex items-center justify-center bg-black">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default ImmersiveFeed;