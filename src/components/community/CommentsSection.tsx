
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Send } from 'lucide-react';
import { useComments } from '@/hooks/useComments';
import { useAuth } from '@/context/auth';

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
    <div className="mt-4 space-y-4">
      <div className="flex items-center gap-2 text-gray-600">
        <MessageCircle className="h-4 w-4" />
        <span className="text-sm font-medium">{comments.length} Comments</span>
      </div>

      {/* Comments List */}
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {comment.user?.full_name?.charAt(0) || '?'}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm text-gray-900">
                  {comment.user?.full_name || 'Anonymous'}
                </span>
                <span className="text-xs text-gray-500">
                  {formatTimeAgo(comment.created_at)}
                </span>
              </div>
              <p className="text-sm text-gray-800">{comment.content}</p>
            </div>
          </div>
        ))}
        {comments.length === 0 && (
          <p className="text-center text-gray-500 text-sm py-4">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>

      {/* Add Comment Form */}
      {user ? (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={isLoading || !newComment.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      ) : (
        <p className="text-center text-gray-500 text-sm py-2">
          Please sign in to comment
        </p>
      )}
    </div>
  );
};

export default CommentsSection;
