import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { motion, AnimatePresence } from 'framer-motion';
import QuickInteractions from './QuickInteractions';
import ViralSharingSystem from './ViralSharingSystem';
import { formatPostTimestamp } from '@/utils/timeUtils';
import OptimizedImage from './OptimizedImage';

interface CommunityPost {
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
  is_featured: boolean;
  is_trending: boolean;
  category: string;
  created_at: string;
  updated_at: string;
  profiles?: {
    full_name?: string;
    avatar_url?: string;
  };
  user_has_liked?: boolean;
}

interface EnhancedCommunityFeedProps {
  posts: CommunityPost[];
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  onLike: (postId: string) => void;
  onEdit: (post: CommunityPost) => void;
  onShare: (postId: string, platform: string) => void;
}

const EnhancedCommunityFeed: React.FC<EnhancedCommunityFeedProps> = ({
  posts,
  onLoadMore,
  hasMore,
  isLoading,
  onLike,
  onEdit,
  onShare
}) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const [expandedComments, setExpandedComments] = useState<Set<string>>(new Set());
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const lastInteractionRef = useRef<number>(0);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading && !loadingMore) {
          const now = Date.now();
          // Throttle load more calls
          if (now - lastInteractionRef.current > 1000) {
            lastInteractionRef.current = now;
            setLoadingMore(true);
            onLoadMore();
            setTimeout(() => setLoadingMore(false), 1000);
          }
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadingMore, onLoadMore]);

  const handleLike = useCallback((postId: string) => {
    onLike(postId);
  }, [onLike]);

  const handleDoubleTabLike = useCallback((postId: string) => {
    // Add double-tap like effect
    onLike(postId);
  }, [onLike]);

  const handleComment = useCallback((postId: string) => {
    setExpandedComments(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  }, []);

  const handleShare = useCallback((postId: string, platform: string) => {
    onShare(postId, platform);
  }, [onShare]);

  const optimizeImageUrl = useCallback((url: string, size: 'thumbnail' | 'medium' | 'large' = 'medium') => {
    const sizes = {
      thumbnail: '150x150',
      medium: '400x400',
      large: '800x600'
    };
    
    if (url.includes('supabase')) {
      return `${url}?width=${sizes[size].split('x')[0]}&height=${sizes[size].split('x')[1]}&resize=cover&quality=80`;
    }
    
    return url;
  }, []);

  const renderPostImages = useCallback((imageUrls: string[]) => {
    if (!imageUrls || imageUrls.length === 0) return null;

    return (
      <div className={`mt-3 grid gap-2 ${
        imageUrls.length === 1 
          ? 'grid-cols-1' 
          : imageUrls.length === 2 
          ? 'grid-cols-2' 
          : 'grid-cols-2'
      }`}>
        {imageUrls.slice(0, 4).map((url, index) => (
          <motion.div 
            key={`image-${url.slice(-10)}-${index}`}
            className="relative overflow-hidden rounded-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <OptimizedImage
              src={optimizeImageUrl(url, 'medium')}
              alt={`Post image ${index + 1}`}
              className="w-full h-48 object-cover"
              aspectRatio="square"
            />
            {imageUrls.length > 4 && index === 3 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  +{imageUrls.length - 4} more
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    );
  }, [optimizeImageUrl]);

  const getPostTypeIcon = (postType: string) => {
    const icons = {
      story: '📖',
      tip: '💡',
      showcase: '⭐',
      question: '❓',
      poll: '📊'
    };
    return icons[postType as keyof typeof icons] || '📖';
  };

  const PostSkeleton = () => (
    <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-32 w-full rounded-lg" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const CommentThread = ({ postId }: { postId: string }) => (
    <AnimatePresence>
      {expandedComments.has(postId) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="mt-3 border-t pt-3 overflow-hidden"
        >
          <div className="space-y-3">
            {/* Sample comments - in real app, these would come from API */}
            <div className="flex gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">JD</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg px-3 py-2">
                  <p className="text-sm text-gray-800">Love this look! What products did you use?</p>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span>2h ago</span>
                  <button className="hover:text-red-500">Like</button>
                  <button className="hover:text-blue-500">Reply</button>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-xs">SM</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="bg-gray-100 rounded-lg px-3 py-2">
                  <p className="text-sm text-gray-800">Tutorial please! 🙏</p>
                </div>
                <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                  <span>1h ago</span>
                  <button className="hover:text-red-500">Like</button>
                  <button className="hover:text-blue-500">Reply</button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage 
                    src={post.profiles?.avatar_url ? optimizeImageUrl(post.profiles.avatar_url, 'thumbnail') : undefined}
                    loading="lazy"
                  />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {post.profiles?.full_name?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {post.profiles?.full_name || 'Community Member'}
                      </h4>
                      {post.is_trending && (
                        <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs animate-pulse">
                          🔥 Trending
                        </Badge>
                      )}
                      {post.is_featured && (
                        <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                          ⭐ Featured
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{getPostTypeIcon(post.post_type)}</span>
                      {post.category && (
                        <Badge variant="outline" className="text-xs">
                          {post.category}
                        </Badge>
                      )}
                      <span className="text-xs text-gray-500">
                        {formatPostTimestamp(post.created_at)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-800 mt-2 whitespace-pre-wrap break-words leading-relaxed">
                    {post.content}
                  </p>
                  
                  {/* Hashtags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="text-xs text-purple-600 border-purple-200 hover:bg-purple-50 cursor-pointer"
                        >
                          #{tag}
                        </Badge>
                      ))}
                      {post.tags.length > 3 && (
                        <Badge variant="outline" className="text-xs text-gray-500">
                          +{post.tags.length - 3} more
                        </Badge>
                      )}
                    </div>
                  )}
                  
                  {renderPostImages(post.image_urls || [])}
                  
                  {post.video_url && (
                    <div className="mt-3">
                      <video 
                        controls 
                        className="w-full max-h-96 rounded-lg"
                        preload="metadata"
                        poster={post.image_urls?.[0]}
                      >
                        <source src={post.video_url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Enhanced Interactions */}
              <div className="mt-4 flex items-center justify-between">
                <QuickInteractions
                  post={post}
                  onLike={() => handleLike(post.id)}
                  onComment={() => handleComment(post.id)}
                  onShare={() => {}}
                  onBookmark={() => {}}
                  onDoubleTabLike={() => handleDoubleTabLike(post.id)}
                />
                
                <ViralSharingSystem
                  post={post}
                  onShare={(platform) => handleShare(post.id, platform)}
                />
              </div>
              
              {/* Comment Thread */}
              <CommentThread postId={post.id} />
            </CardContent>
          </Card>
        </motion.div>
      ))}
      
      {/* Loading skeletons */}
      {isLoading && !loadingMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-4"
        >
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </motion.div>
      )}
      
      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="py-4">
        {loadingMore && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center"
          >
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-gray-600 font-medium">Loading more amazing posts...</span>
          </motion.div>
        )}
      </div>
      
      {!hasMore && posts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
            <span className="text-2xl">🎉</span>
            <p className="text-gray-700 font-medium">You've seen all the latest posts!</p>
          </div>
          <p className="text-gray-500 text-sm mt-2">Check back later for fresh content</p>
        </motion.div>
      )}
    </div>
  );
};

export default EnhancedCommunityFeed;