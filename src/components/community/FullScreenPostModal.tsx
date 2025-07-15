import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, MessageCircle, Share, Bookmark, Send, Smile, Camera, Mic } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatTimeAgo } from '@/utils/timeUtils';

interface Comment {
  id: string;
  user_id: string;
  content: string;
  created_at: string;
  likes_count: number;
  profiles?: {
    full_name?: string;
    avatar_url?: string;
  };
}

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

interface FullScreenPostModalProps {
  post: Post;
  isOpen: boolean;
  onClose: () => void;
  onLike: (postId: string) => void;
  onShare: (post: Post) => void;
  onSave: (postId: string) => void;
  onCommentSubmit: (postId: string, content: string) => void;
}

const FullScreenPostModal: React.FC<FullScreenPostModalProps> = ({
  post,
  isOpen,
  onClose,
  onLike,
  onShare,
  onSave,
  onCommentSubmit
}) => {
  const [comment, setComment] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);

  // Mock comments data
  const [comments] = useState<Comment[]>([
    {
      id: '1',
      user_id: 'user1',
      content: 'This is absolutely stunning! 💅✨',
      created_at: new Date(Date.now() - 300000).toISOString(),
      likes_count: 12,
      profiles: {
        full_name: 'Sarah Chen',
        avatar_url: '/placeholder.svg'
      }
    },
    {
      id: '2',
      user_id: 'user2',
      content: 'I need this technique! Tutorial please? 🙏',
      created_at: new Date(Date.now() - 600000).toISOString(),
      likes_count: 8,
      profiles: {
        full_name: 'Maya Rodriguez',
        avatar_url: '/placeholder.svg'
      }
    },
    {
      id: '3',
      user_id: 'user3',
      content: 'The color combination is perfect! What brand did you use?',
      created_at: new Date(Date.now() - 900000).toISOString(),
      likes_count: 5,
      profiles: {
        full_name: 'Jessica Kim',
        avatar_url: '/placeholder.svg'
      }
    }
  ]);

  const emojis = ['❤️', '🔥', '💯', '👏', '😍', '🙌', '💅', '✨', '🎨', '💄'];

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      onCommentSubmit(post.id, comment);
      setComment('');
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setComment(prev => prev + emoji);
    setShowEmojiPicker(false);
    commentInputRef.current?.focus();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <motion.div
          className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full"
          >
            <X className="w-6 h-6" />
          </Button>
          
          <div className="flex items-center space-x-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={post.profiles?.avatar_url} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm">
                {post.profiles?.full_name?.[0] || 'U'}
              </AvatarFallback>
            </Avatar>
            <span className="text-white font-semibold">
              {post.profiles?.full_name || 'Anonymous'}
            </span>
          </div>

          <Button
            size="sm"
            className="bg-white/20 hover:bg-white/30 border border-white/30 text-white"
          >
            Follow
          </Button>
        </motion.div>

        {/* Main Content */}
        <div className="flex h-full">
          {/* Media Section */}
          <motion.div
            className="flex-1 flex items-center justify-center relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {post.video_url ? (
              <video
                className="max-w-full max-h-full object-contain"
                controls
                autoPlay
                loop
                muted
              >
                <source src={post.video_url} type="video/mp4" />
              </video>
            ) : post.image_urls.length > 0 ? (
              <img
                src={post.image_urls[0]}
                alt="Post content"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <div className="max-w-lg p-8 text-center">
                <p className="text-white text-3xl leading-relaxed">
                  {post.content}
                </p>
              </div>
            )}
          </motion.div>

          {/* Comments Section - Desktop Only */}
          <motion.div
            className="hidden lg:flex lg:w-96 bg-black/80 backdrop-blur-lg border-l border-white/10 flex-col"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Post Info */}
            <div className="p-4 border-b border-white/10">
              <div className="flex items-center space-x-3 mb-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.profiles?.avatar_url} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    {post.profiles?.full_name?.[0] || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-semibold">
                    {post.profiles?.full_name || 'Anonymous'}
                  </p>
                  <p className="text-white/60 text-sm">
                    {formatTimeAgo(post.created_at)}
                  </p>
                </div>
              </div>

              {post.content && (
                <p className="text-white text-sm mb-3 leading-relaxed">
                  {post.content}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => onLike(post.id)}
                    className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                  >
                    <Heart 
                      className={`w-5 h-5 ${post.user_has_liked ? 'text-red-500 fill-red-500' : ''}`} 
                    />
                    <span className="text-sm">{post.likes_count}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm">{post.comments_count}</span>
                  </button>
                  
                  <button
                    onClick={() => onShare(post)}
                    className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                  >
                    <Share className="w-5 h-5" />
                  </button>
                </div>
                
                <button
                  onClick={() => onSave(post.id)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <Bookmark className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  className="flex space-x-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={comment.profiles?.avatar_url} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                      {comment.profiles?.full_name?.[0] || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-white/10 rounded-lg p-3">
                      <p className="text-white font-medium text-sm mb-1">
                        {comment.profiles?.full_name || 'Anonymous'}
                      </p>
                      <p className="text-white/90 text-sm leading-relaxed">
                        {comment.content}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-white/60 text-xs">
                      <span>{formatTimeAgo(comment.created_at)}</span>
                      <button className="hover:text-white transition-colors">
                        Like
                      </button>
                      <button className="hover:text-white transition-colors">
                        Reply
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Comment Input */}
            <div className="p-4 border-t border-white/10">
              {showEmojiPicker && (
                <motion.div
                  className="mb-3 flex flex-wrap gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {emojis.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => handleEmojiSelect(emoji)}
                      className="text-2xl hover:scale-125 transition-transform"
                    >
                      {emoji}
                    </button>
                  ))}
                </motion.div>
              )}
              
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Input
                    ref={commentInputRef}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-20"
                    onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                    <button
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                      className="text-white/60 hover:text-white transition-colors"
                    >
                      <Smile className="w-4 h-4" />
                    </button>
                    <button className="text-white/60 hover:text-white transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setIsRecording(!isRecording)}
                      className={`transition-colors ${isRecording ? 'text-red-500' : 'text-white/60 hover:text-white'}`}
                    >
                      <Mic className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <Button
                  onClick={handleCommentSubmit}
                  size="icon"
                  disabled={!comment.trim()}
                  className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Comments Overlay */}
        <motion.div
          className="lg:hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/90 to-transparent p-4"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {/* Quick Actions */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-6">
              <button
                onClick={() => onLike(post.id)}
                className="flex items-center space-x-2"
              >
                <Heart 
                  className={`w-6 h-6 ${post.user_has_liked ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                />
                <span className="text-white text-sm">{post.likes_count}</span>
              </button>
              
              <button className="flex items-center space-x-2">
                <MessageCircle className="w-6 h-6 text-white" />
                <span className="text-white text-sm">{post.comments_count}</span>
              </button>
              
              <button onClick={() => onShare(post)}>
                <Share className="w-6 h-6 text-white" />
              </button>
            </div>
            
            <button onClick={() => onSave(post.id)}>
              <Bookmark className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Comment Input */}
          <div className="flex items-center space-x-2">
            <div className="flex-1 relative">
              <Input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="bg-white/20 border-white/30 text-white placeholder:text-white/60 pr-16"
                onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <button
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <Smile className="w-4 h-4" />
                </button>
              </div>
            </div>
            <Button
              onClick={handleCommentSubmit}
              size="icon"
              disabled={!comment.trim()}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default FullScreenPostModal;