import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Camera, Video, BarChart3, Sparkles, Send, Bot } from 'lucide-react';
import AiAssistantModal from './AiAssistantModal';

interface CommunityPostComposerProps {
  content: string;
  onContentChange: (content: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  className?: string;
  showActions?: boolean;
}

const CommunityPostComposer = ({
  content,
  onContentChange,
  onSubmit,
  placeholder = "What's inspiring you today?",
  className = '',
  showActions = true
}: CommunityPostComposerProps) => {
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [hasAiMention, setHasAiMention] = useState(false);

  // Detect @AI mentions
  useEffect(() => {
    const aiMentionPattern = /@ai\b/i;
    setHasAiMention(aiMentionPattern.test(content));
  }, [content]);

  const extractContext = () => {
    const hashtags = content.match(/#[\w]+/g)?.map(tag => tag.substring(1)) || [];
    return {
      postText: content,
      hashtags,
      category: 'general' // Could be dynamic based on hashtags
    };
  };

  const handleAiResponse = (aiAnswer: string) => {
    // Replace @AI mention with the AI answer or append it
    const aiMentionPattern = /@ai\b/gi;
    if (aiMentionPattern.test(content)) {
      const updatedContent = content.replace(aiMentionPattern, aiAnswer);
      onContentChange(updatedContent);
    } else {
      // If no @AI mention, append the answer
      const separator = content.trim() ? '\n\n' : '';
      onContentChange(content + separator + aiAnswer);
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="relative">
        <Textarea
          placeholder={placeholder}
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          className="min-h-24 resize-none pr-12"
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

      {/* Action Buttons */}
      {showActions && (
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-purple-600">
              <Camera className="h-4 w-4 mr-1" />
              Photo
            </Button>
            <Button variant="ghost" size="sm" className="text-pink-600">
              <Video className="h-4 w-4 mr-1" />
              Video
            </Button>
            <Button variant="ghost" size="sm" className="text-orange-600">
              <BarChart3 className="h-4 w-4 mr-1" />
              Poll
            </Button>
            <Button variant="ghost" size="sm" className="text-blue-600">
              <Sparkles className="h-4 w-4 mr-1" />
              AI Polish
            </Button>
          </div>

          <Button
            onClick={onSubmit}
            disabled={!content.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Send className="h-4 w-4 mr-1" />
            Post
          </Button>
        </div>
      )}

      {/* Helpful Tips */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>💡 <strong>Pro tip:</strong> Type <code className="bg-gray-100 px-1 rounded text-purple-600">@AI</code> to get instant beauty advice from our AI expert!</p>
        <p>Use #hashtags to categorize your post and @mentions to tag friends</p>
      </div>

      {/* AI Assistant Modal */}
      <AiAssistantModal
        open={showAiAssistant}
        onOpenChange={setShowAiAssistant}
        context={extractContext()}
        onUseAnswer={handleAiResponse}
      />
    </div>
  );
};

export default CommunityPostComposer;