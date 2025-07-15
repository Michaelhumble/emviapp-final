import React, { useState, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import PostReactions from './PostReactions';
import { formatPostTimestamp } from '@/utils/timeUtils';

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

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  onLoad?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  return (
    <div ref={imgRef} className={className}>
      {!isLoaded && (
        <Skeleton className="w-full h-full rounded-lg bg-gray-200" />
      )}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          loading="lazy"
        />
      )}
    </div>
  );
};

interface OptimizedCommunityFeedProps {
  posts: CommunityPost[];
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  onLike: (postId: string) => void;
  onEdit: (post: CommunityPost) => void;
}

const OptimizedCommunityFeed: React.FC<OptimizedCommunityFeedProps> = ({
  posts,
  onLoadMore,
  hasMore,
  isLoading,
  onLike,
  onEdit
}) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for infinite scroll
  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading && !loadingMore) {
          setLoadingMore(true);
          onLoadMore();
          setTimeout(() => setLoadingMore(false), 1000); // Prevent rapid triggers
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, isLoading, loadingMore, onLoadMore]);

  const optimizeImageUrl = useCallback((url: string, size: 'thumbnail' | 'medium' | 'large' = 'medium') => {
    // Basic image optimization - in production, you'd use a CDN
    const sizes = {
      thumbnail: '150x150',
      medium: '400x400',
      large: '800x600'
    };
    
    // For Supabase storage, we can add transform parameters
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
          <div key={index} className="relative">
            <LazyImage
              src={optimizeImageUrl(url, 'medium')}
              alt={`Post image ${index + 1}`}
              className="w-full h-48 object-cover rounded-lg"
            />
            {imageUrls.length > 4 && index === 3 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                <span className="text-white font-semibold text-lg">
                  +{imageUrls.length - 4} more
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }, [optimizeImageUrl]);

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

  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <Card 
          key={post.id} 
          className="border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl transition-shadow duration-200"
        >
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
                  <h4 className="font-semibold text-gray-900 truncate">
                    {post.profiles?.full_name || 'Community Member'}
                  </h4>
                  <div className="flex items-center gap-2">
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
                
                <p className="text-gray-800 mt-2 whitespace-pre-wrap break-words">
                  {post.content}
                </p>
                
                {renderPostImages(post.image_urls || [])}
                
                {post.video_url && (
                  <div className="mt-3">
                    <video 
                      controls 
                      className="w-full max-h-96 rounded-lg"
                      preload="metadata"
                    >
                      <source src={post.video_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
              </div>
            </div>
            
            <PostReactions 
              post={post} 
              onLike={() => onLike(post.id)}
              onComment={() => {}}
              onShare={() => {}}
              onBookmark={() => {}}
              onEdit={() => onEdit(post)}
            />
          </CardContent>
        </Card>
      ))}
      
      {/* Loading skeletons */}
      {isLoading && !loadingMore && (
        <>
          <PostSkeleton />
          <PostSkeleton />
          <PostSkeleton />
        </>
      )}
      
      {/* Infinite scroll trigger */}
      <div ref={loadMoreRef} className="py-4">
        {loadingMore && (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
            <span className="ml-2 text-gray-600">Loading more posts...</span>
          </div>
        )}
      </div>
      
      {!hasMore && posts.length > 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">You've reached the end of the feed! 🎉</p>
        </div>
      )}
    </div>
  );
};

export default OptimizedCommunityFeed;