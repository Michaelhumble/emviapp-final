import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Camera, Video, BarChart3, Sparkles, Send, Bot, Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import AiAssistantModal from './AiAssistantModal';

interface CommunityPostComposerProps {
  content: string;
  onContentChange: (content: string) => void;
  onSubmit: () => void;
  placeholder?: string;
  className?: string;
  showActions?: boolean;
  videoFile?: File | null;
  onVideoChange?: (file: File | null) => void;
  videoCaptions?: string;
  onVideoCaptionsChange?: (captions: string) => void;
}

const CommunityPostComposer = ({
  content,
  onContentChange,
  onSubmit,
  placeholder = "What's inspiring you today?",
  className = '',
  showActions = true,
  videoFile,
  onVideoChange,
  videoCaptions,
  onVideoCaptionsChange
}: CommunityPostComposerProps) => {
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [hasAiMention, setHasAiMention] = useState(false);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

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

  const validateVideo = (file: File): boolean => {
    // Check file size (50MB limit)
    const maxSize = 50 * 1024 * 1024; // 50MB
    if (file.size > maxSize) {
      toast.error('Video file must be smaller than 50MB');
      return false;
    }

    // Check file type
    if (!file.type.startsWith('video/')) {
      toast.error('Please select a video file');
      return false;
    }

    return true;
  };

  const validateVideoDuration = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src);
        const duration = video.duration;
        
        // Check duration (60 seconds limit)
        if (duration > 60) {
          toast.error('Video must be 60 seconds or shorter');
          resolve(false);
        } else {
          resolve(true);
        }
      };
      
      video.onerror = () => {
        URL.revokeObjectURL(video.src);
        toast.error('Invalid video file');
        resolve(false);
      };
      
      video.src = URL.createObjectURL(file);
    });
  };

  const handleVideoSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!validateVideo(file)) {
      event.target.value = '';
      return;
    }

    const isDurationValid = await validateVideoDuration(file);
    if (!isDurationValid) {
      event.target.value = '';
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setVideoPreview(previewUrl);
    
    // Update parent component
    onVideoChange?.(file);
    
    toast.success('Video uploaded successfully!');
  };

  const handleVideoRemove = () => {
    if (videoPreview) {
      URL.revokeObjectURL(videoPreview);
      setVideoPreview(null);
    }
    onVideoChange?.(null);
    if (videoInputRef.current) {
      videoInputRef.current.value = '';
    }
  };

  const handleVideoUploadClick = () => {
    videoInputRef.current?.click();
  };

  // Debug logging
  useEffect(() => {
    console.log('CommunityPostComposer - showActions:', showActions);
  }, [showActions]);

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

      {/* Video Preview */}
      {(videoPreview || videoFile) && (
        <div className="relative">
          <div className="relative aspect-[9/16] max-w-xs mx-auto bg-black rounded-lg overflow-hidden">
            <video
              src={videoPreview || (videoFile ? URL.createObjectURL(videoFile) : '')}
              className="w-full h-full object-cover"
              controls
              muted
              preload="metadata"
            />
            <Button
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2 w-6 h-6"
              onClick={handleVideoRemove}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
          
          {/* Video Captions Input */}
          {onVideoCaptionsChange && (
            <div className="mt-2">
              <Input
                placeholder="Add captions/subtitles (optional)"
                value={videoCaptions || ''}
                onChange={(e) => onVideoCaptionsChange(e.target.value)}
                className="text-sm"
              />
            </div>
          )}
        </div>
      )}

      {/* Hidden video input */}
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        onChange={handleVideoSelect}
        className="hidden"
      />

      {/* Action Buttons */}
      {showActions && (
        <div className="sticky bottom-0 bg-white border-t pt-3 mt-4">
          <div className="flex justify-between items-center flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border-2 border-gray-200">
            <div className="flex gap-2 flex-wrap">
              <Button variant="ghost" size="sm" className="text-purple-600 flex-shrink-0 bg-purple-50 border border-purple-200">
                <Camera className="h-4 w-4 mr-1" />
                Photo
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-pink-600 flex-shrink-0 bg-pink-50 border border-pink-200 font-medium"
                onClick={handleVideoUploadClick}
              >
                <Video className="h-4 w-4 mr-1" />
                Video
              </Button>
              <Button variant="ghost" size="sm" className="text-orange-600 flex-shrink-0 bg-orange-50 border border-orange-200">
                <BarChart3 className="h-4 w-4 mr-1" />
                Poll
              </Button>
              <Button variant="ghost" size="sm" className="text-blue-600 flex-shrink-0 bg-blue-50 border border-blue-200">
                <Sparkles className="h-4 w-4 mr-1" />
                AI Polish
              </Button>
            </div>

            <Button
              onClick={onSubmit}
              disabled={!content.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 flex-shrink-0"
              size="sm"
            >
              <Send className="h-4 w-4 mr-1" />
              Post
            </Button>
          </div>
        </div>
      )}

      {/* Helpful Tips */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>💡 <strong>Pro tip:</strong> Type <code className="bg-gray-100 px-1 rounded text-purple-600">@AI</code> to get instant beauty advice from our AI expert!</p>
        <p>📹 <strong>Video tips:</strong> Max 60 seconds, 50MB. Videos autoplay muted - tap for sound!</p>
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