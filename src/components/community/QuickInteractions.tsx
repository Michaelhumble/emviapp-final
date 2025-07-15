import React, { useState, useRef } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface QuickInteractionsProps {
  post: any;
  onLike: () => void;
  onComment: () => void;
  onShare: () => void;
  onBookmark: () => void;
  onDoubleTabLike?: () => void;
}

const QuickInteractions: React.FC<QuickInteractionsProps> = ({
  post,
  onLike,
  onComment,
  onShare,
  onBookmark,
  onDoubleTabLike
}) => {
  const [showReactions, setShowReactions] = useState(false);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [touchCount, setTouchCount] = useState(0);
  const touchTimeout = useRef<NodeJS.Timeout>();

  const reactions = [
    { emoji: '❤️', name: 'love', color: 'text-red-500' },
    { emoji: '😍', name: 'wow', color: 'text-yellow-500' },
    { emoji: '😂', name: 'laugh', color: 'text-blue-500' },
    { emoji: '😮', name: 'surprised', color: 'text-purple-500' },
    { emoji: '👏', name: 'clap', color: 'text-green-500' },
    { emoji: '💯', name: 'perfect', color: 'text-orange-500' },
  ];

  const handleDoubleTouch = () => {
    if (touchTimeout.current) {
      clearTimeout(touchTimeout.current);
    }

    setTouchCount(prev => prev + 1);

    if (touchCount === 0) {
      touchTimeout.current = setTimeout(() => {
        setTouchCount(0);
      }, 300);
    } else {
      // Double tap detected
      setTouchCount(0);
      handleQuickLike();
    }
  };

  const handleQuickLike = () => {
    setLikeAnimation(true);
    onLike();
    if (onDoubleTabLike) {
      onDoubleTabLike();
    }
    setTimeout(() => setLikeAnimation(false), 1000);
  };

  const handleReactionSelect = (reaction: any) => {
    setShowReactions(false);
    onLike(); // For now, all reactions count as likes
  };

  return (
    <div className="relative">
      {/* Floating Reaction Bar */}
      <AnimatePresence>
        {showReactions && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="absolute bottom-full left-0 mb-2 z-50"
          >
            <div className="bg-white/95 backdrop-blur-lg rounded-full px-3 py-2 shadow-2xl border border-gray-100">
              <div className="flex items-center gap-2">
                {reactions.map((reaction, index) => (
                  <motion.button
                    key={reaction.name}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleReactionSelect(reaction)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                  >
                    <span className="text-lg">{reaction.emoji}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Interaction Bar */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4">
          {/* Like Button with Animation */}
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="relative"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onLike}
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
              onTouchStart={handleDoubleTouch}
              className={`gap-2 ${post.user_has_liked ? 'text-red-500' : 'text-gray-600'} hover:text-red-500 transition-colors`}
            >
              <motion.div
                animate={likeAnimation ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
              >
                <Heart
                  className={`h-5 w-5 ${post.user_has_liked ? 'fill-current' : ''}`}
                />
              </motion.div>
              <span className="text-sm font-medium">
                {post.likes_count || 0}
              </span>
            </Button>

            {/* Double Tap Like Animation */}
            <AnimatePresence>
              {likeAnimation && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1.5 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <Heart className="h-5 w-5 text-red-500 fill-current" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Comment Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onComment}
            className="gap-2 text-gray-600 hover:text-blue-500 transition-colors"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-sm font-medium">
              {post.comments_count || 0}
            </span>
          </Button>

          {/* Share Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            className="gap-2 text-gray-600 hover:text-green-500 transition-colors"
          >
            <Share2 className="h-5 w-5" />
            <span className="text-sm font-medium">
              {post.shares_count || 0}
            </span>
          </Button>
        </div>

        {/* Bookmark & More */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBookmark}
            className="text-gray-600 hover:text-purple-500 transition-colors"
          >
            <Bookmark className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-800 transition-colors"
          >
            <MoreHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickInteractions;