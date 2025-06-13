
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Camera, Send, AlertTriangle } from 'lucide-react';
import { useCommunityStories } from '@/hooks/useCommunityStories';
import { useAuth } from '@/context/auth';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CommunityStoryForm = () => {
  const { addStory, isLoading } = useCommunityStories();
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleContentChange = (value: string) => {
    setContent(value);
    
    // Check for business-related keywords and show warning
    const businessKeywords = ['hiring', 'job opening', 'salon for sale', 'apply now', 'position available', 'now hiring'];
    const hasBusinessContent = businessKeywords.some(keyword => 
      value.toLowerCase().includes(keyword)
    );
    
    setShowWarning(hasBusinessContent);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      return;
    }

    const success = await addStory(content, imageUrl || undefined);
    if (success) {
      setContent('');
      setImageUrl('');
      setShowWarning(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-6">
        <p className="text-center text-gray-600">Please sign in to share your beauty story</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100 mb-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-medium">
            {user?.user_metadata?.full_name?.charAt(0) || '?'}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Share Your Beauty Story</h3>
            <p className="text-sm text-gray-500">Inspire others with your transformation or experience</p>
          </div>
        </div>

        {showWarning && (
          <Alert className="border-amber-200 bg-amber-50">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Note:</strong> This community is for inspiring stories only. For job postings or salon listings, please use the dedicated sections.
            </AlertDescription>
          </Alert>
        )}

        <Textarea
          placeholder="Share your beauty journey, transformation story, or inspiring moment..."
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          className="min-h-[120px] resize-none border-gray-200 focus:border-purple-300"
          maxLength={1000}
        />

        <Input
          type="url"
          placeholder="Add an image URL (optional)"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="border-gray-200 focus:border-purple-300"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Camera className="h-4 w-4" />
            <span>Share your transformation photos</span>
          </div>
          
          <Button 
            type="submit" 
            disabled={isLoading || !content.trim() || showWarning}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            {isLoading ? (
              'Sharing...'
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Share Story
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommunityStoryForm;
