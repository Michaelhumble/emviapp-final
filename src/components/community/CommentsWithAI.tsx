import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Send, Bot, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import AiAssistantModal from './AiAssistantModal';
import CommentsSection from './CommentsSection';

interface CommentsWithAIProps {
  storyId: string;
  className?: string;
}

const CommentsWithAI = ({ storyId, className = '' }: CommentsWithAIProps) => {
  const [commentContent, setCommentContent] = useState('');
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const { user } = useAuth();

  // Detect @AI mentions in comments
  const hasAiMention = /@ai\b/i.test(commentContent);

  const handleAiResponse = (aiAnswer: string) => {
    // Replace @AI mention with the AI answer or append it
    const aiMentionPattern = /@ai\b/gi;
    if (aiMentionPattern.test(commentContent)) {
      const updatedContent = commentContent.replace(aiMentionPattern, aiAnswer);
      setCommentContent(updatedContent);
    } else {
      // If no @AI mention, append the answer
      const separator = commentContent.trim() ? ' ' : '';
      setCommentContent(commentContent + separator + aiAnswer);
    }
  };

  const handleSubmitComment = async () => {
    if (!commentContent.trim()) {
      toast.error('Please enter a comment');
      return;
    }

    // Here you would integrate with your comment submission logic
    console.log('Submitting comment:', commentContent);
    setCommentContent('');
    toast.success('Comment posted!');
  };

  return (
    <div className={className}>
      {/* Existing Comments */}
      <CommentsSection storyId={storyId} />

      {/* New Comment Input with AI */}
      {user && (
        <div className="mt-4 space-y-3">
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs">
                {user.user_metadata?.full_name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="relative">
                <Textarea
                  placeholder="Add a comment... Type @AI for expert beauty advice!"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  className="min-h-16 resize-none pr-12"
                />
                
                {/* AI Assistant Trigger Button */}
                {hasAiMention && (
                  <Button
                    size="sm"
                    onClick={() => setShowAiAssistant(true)}
                    className="absolute top-2 right-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg animate-pulse"
                  >
                    <Bot className="h-3 w-3 mr-1" />
                    Ask AI
                  </Button>
                )}

                {/* @AI Detection Badge */}
                {hasAiMention && (
                  <div className="absolute bottom-2 left-2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs animate-bounce">
                      <Sparkles className="h-3 w-3 mr-1" />
                      AI Detected
                    </Badge>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  💡 <strong>Tip:</strong> Type <code className="bg-gray-100 px-1 rounded text-purple-600">@AI</code> to get instant beauty advice!
                </div>
                <Button
                  size="sm"
                  onClick={handleSubmitComment}
                  disabled={!commentContent.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Send className="h-3 w-3 mr-1" />
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Assistant Modal */}
      <AiAssistantModal
        open={showAiAssistant}
        onOpenChange={setShowAiAssistant}
        context={{
          postText: commentContent,
          hashtags: [],
          category: 'comment'
        }}
        onUseAnswer={handleAiResponse}
      />
    </div>
  );
};

export default CommentsWithAI;
