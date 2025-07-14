import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, Bookmark, ThumbsUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CommunityPost } from '@/hooks/useCommunityPosts';
import ReportButton from './ReportButton';

interface PostReactionsProps {
  post: CommunityPost;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onBookmark: () => void;
}

const PostReactions = ({ post, onLike, onComment, onShare, onBookmark }: PostReactionsProps) => {
  const [showReactions, setShowReactions] = useState(false);
  
  const emojiReactions = [
    { emoji: '❤️', label: 'Love', count: 24 },
    { emoji: '🔥', label: 'Fire', count: 18 },
    { emoji: '👏', label: 'Clap', count: 12 },
    { emoji: '😮', label: 'Wow', count: 8 },
    { emoji: '💯', label: 'Perfect', count: 5 },
  ];

  return (
    <div className="space-y-3">
      {/* Emoji Reactions Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {emojiReactions.slice(0, 3).map((reaction) => (
            <Badge
              key={reaction.emoji}
              variant="outline"
              className="text-xs px-2 py-1 hover:bg-gray-50 cursor-pointer"
            >
              {reaction.emoji} {reaction.count}
            </Badge>
          ))}
          {emojiReactions.length > 3 && (
            <span className="text-xs text-gray-500 ml-1">
              +{emojiReactions.slice(3).reduce((sum, r) => sum + r.count, 0)} more
            </span>
          )}
        </div>
        <span className="text-xs text-gray-500">
          {post.comments_count} comments • {post.shares_count} shares
        </span>
      </div>

      {/* Main Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={onLike}
            className={`${
              post.user_has_liked 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-gray-500 hover:text-red-500'
            }`}
          >
            <Heart 
              className={`h-4 w-4 mr-1 ${post.user_has_liked ? 'fill-current' : ''}`} 
            />
            {post.likes_count}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onComment}
            className="text-gray-500 hover:text-blue-500"
          >
            <MessageCircle className="h-4 w-4 mr-1" />
            Comment
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            className="text-gray-500 hover:text-green-500"
          >
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBookmark}
            className="text-gray-500 hover:text-yellow-500"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
          
          <ReportButton 
            contentType="post" 
            contentId={post.id} 
            compact={true}
          />
        </div>
      </div>

      {/* Quick Emoji Reactions */}
      {showReactions && (
        <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
          {emojiReactions.map((reaction) => (
            <Button
              key={reaction.emoji}
              variant="ghost"
              size="sm"
              className="text-xl hover:scale-110 transition-transform"
            >
              {reaction.emoji}
            </Button>
          ))}
        </div>
      )}

      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowReactions(!showReactions)}
        className="text-xs text-gray-400 w-full"
      >
        {showReactions ? 'Hide reactions' : 'Quick react'}
      </Button>
    </div>
  );
};

export default PostReactions;