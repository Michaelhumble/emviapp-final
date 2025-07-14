import React, { useEffect } from 'react';
import { Heart, MessageCircle, Share2, Clock, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCommunityPosts } from '@/hooks/useCommunityPosts';
import { formatDistanceToNow } from 'date-fns';

interface CommunityFeedProps {
  filter: string;
  searchQuery: string;
}

const CommunityFeed: React.FC<CommunityFeedProps> = ({ filter, searchQuery }) => {
  const { posts, isRefreshing, fetchPosts, toggleLike } = useCommunityPosts();

  useEffect(() => {
    fetchPosts(filter, searchQuery);
  }, [filter, searchQuery]);

  const handleLike = async (postId: string) => {
    await toggleLike(postId);
  };

  const getPostTypeEmoji = (type: string) => {
    switch (type) {
      case 'tip': return '💡';
      case 'showcase': return '🎨';
      case 'question': return '❓';
      case 'tutorial': return '📚';
      default: return '✨';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      nails: 'bg-pink-100 text-pink-700',
      hair: 'bg-purple-100 text-purple-700',
      makeup: 'bg-orange-100 text-orange-700',
      skincare: 'bg-green-100 text-green-700',
      lashes: 'bg-blue-100 text-blue-700',
      general: 'bg-gray-100 text-gray-700'
    };
    return colors[category as keyof typeof colors] || colors.general;
  };

  if (isRefreshing && posts.length === 0) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6 animate-pulse">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
              <div className="flex-1 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-32 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Card key={post.id} className="p-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg hover:shadow-xl transition-all">
          <div className="flex gap-4">
            {/* User Avatar */}
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              {post.user_id.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1 space-y-3">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">
                    {post.profiles?.full_name || 'Beauty Pro'}
                  </span>
                  <Badge className={getCategoryColor(post.category)}>
                    {post.category}
                  </Badge>
                  {post.is_trending && (
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      <Sparkles className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <span>{getPostTypeEmoji(post.post_type)}</span>
                  <Clock className="h-4 w-4" />
                  <span>{formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}</span>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-900 leading-relaxed">{post.content}</p>
              </div>

              {/* Images */}
              {post.image_urls && post.image_urls.length > 0 && (
                <div className={`grid gap-2 ${
                  post.image_urls.length === 1 ? 'grid-cols-1' :
                  post.image_urls.length === 2 ? 'grid-cols-2' :
                  post.image_urls.length === 3 ? 'grid-cols-3' : 'grid-cols-2'
                }`}>
                  {post.image_urls.slice(0, 4).map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Post image ${index + 1}`}
                        className="w-full h-48 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                      />
                      {index === 3 && post.image_urls.length > 4 && (
                        <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center text-white font-semibold">
                          +{post.image_urls.length - 3} more
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-6 pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={`${
                    post.user_has_liked 
                      ? 'text-red-500 hover:text-red-600' 
                      : 'text-gray-500 hover:text-red-500'
                  } transition-colors`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${post.user_has_liked ? 'fill-current' : ''}`} />
                  {post.likes_count}
                </Button>

                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  {post.comments_count}
                </Button>

                <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
                  <Share2 className="h-5 w-5 mr-2" />
                  {post.shares_count}
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}

      {posts.length === 0 && !isRefreshing && (
        <Card className="p-12 text-center bg-white/80 backdrop-blur-sm border-purple-100">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h3>
          <p className="text-gray-600">
            Be the first to share something beautiful with the community!
          </p>
        </Card>
      )}

      {posts.length > 0 && (
        <div className="text-center py-6">
          <Button 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-full"
            onClick={() => fetchPosts(filter, searchQuery)}
            disabled={isRefreshing}
          >
            {isRefreshing ? 'Loading...' : 'Load More Stories'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default CommunityFeed;