
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send, User } from 'lucide-react';
import { useComments } from '@/hooks/useComments';
import { useAuth } from '@/context/auth';
import { motion } from 'framer-motion';

interface CommentsSectionProps {
  storyId: string;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ storyId }) => {
  const { comments, isLoading, newComment, setNewComment, addComment } = useComments(storyId);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await addComment(newComment);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="mt-6 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-border/20">
        <MessageCircle className="h-5 w-5 text-primary" />
        <span className="text-base font-inter font-medium text-foreground">
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </span>
      </div>

      {/* Comments List */}
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {comments.map((comment, index) => (
          <motion.div 
            key={comment.id} 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
            className="flex gap-4 p-4 bg-background border border-border/30 rounded-xl hover:border-primary/20 transition-all duration-500"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-medium shadow-md">
              {comment.profiles?.full_name?.charAt(0) || <User className="h-5 w-5" />}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-3">
                <span className="font-inter font-medium text-foreground">
                  {comment.profiles?.full_name || 'Community Member'}
                </span>
                <span className="text-sm text-muted-foreground">
                  {formatTimeAgo(comment.created_at)}
                </span>
              </div>
              <p className="text-foreground font-inter leading-relaxed">{comment.content}</p>
            </div>
          </motion.div>
        ))}
        {comments.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center py-12"
          >
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
            <p className="text-muted-foreground font-inter text-lg">
              No comments yet. Be the first to share your thoughts!
            </p>
          </motion.div>
        )}
      </div>

      {/* Add Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-3 pt-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center text-white font-medium shadow-md flex-shrink-0">
            {user.email?.charAt(0).toUpperCase() || <User className="h-5 w-5" />}
          </div>
          <div className="flex-1 flex gap-3">
            <Input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="flex-1 border-border/50 focus:border-primary/50 rounded-xl font-inter"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon"
              disabled={isLoading || !newComment.trim()}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 rounded-xl shadow-lg"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      ) : (
        <div className="text-center py-8 border-t border-border/20 mt-6">
          <p className="text-muted-foreground font-inter">
            Please sign in to join the conversation
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
