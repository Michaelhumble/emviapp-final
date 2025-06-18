
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Camera, Send } from 'lucide-react';
import { useCommunityStories } from '@/hooks/useCommunityStories';
import { useAuth } from '@/context/auth';
import PhotoUploader from '@/components/posting/PhotoUploader';
import { toast } from 'sonner';

const CommunityStoryForm = () => {
  const { newStory, setNewStory, addStory, isLoading } = useCommunityStories();
  const { user, isSignedIn } = useAuth();
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('Share Story button clicked', { 
      user: user?.id, 
      isSignedIn, 
      storyLength: newStory.length,
      imageCount: imageFiles.length 
    });
    
    // Check if user is logged in
    if (!isSignedIn || !user) {
      console.error('User not signed in');
      toast.error('Please sign in to share your story');
      return;
    }

    // Check if story has content
    if (!newStory.trim()) {
      console.error('Empty story content');
      toast.error('Please write your story before sharing');
      return;
    }

    console.log('Attempting to submit story:', {
      content: newStory.substring(0, 50) + '...',
      imageFiles: imageFiles.length,
      userId: user.id
    });

    try {
      const imageFile = imageFiles.length > 0 ? imageFiles[0] : undefined;
      console.log('Calling addStory with:', { story: newStory.length, imageFile: !!imageFile });
      
      const success = await addStory(newStory, imageFile);
      
      console.log('addStory result:', success);
      
      if (success) {
        console.log('Story posted successfully');
        setImageFiles([]);
        // Note: newStory is cleared in the addStory function
      } else {
        console.error('Failed to post story - addStory returned false');
      }
    } catch (error) {
      console.error('Error posting story:', error);
      toast.error('An error occurred while sharing your story');
    }
  };

  const handleImageChange = (files: File[]) => {
    console.log('Image files changed:', files.length);
    setImageFiles(files);
  };

  // Don't render anything if user is not signed in
  if (!isSignedIn) {
    return null;
  }

  return (
    <Card className="mb-6 border-2 border-purple-100">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
              {user?.user_metadata?.full_name ? user.user_metadata.full_name.charAt(0).toUpperCase() : '?'}
            </div>
            <div className="flex-1">
              <Textarea
                placeholder="Share your beauty journey, transformation story, or inspiring moment..."
                value={newStory}
                onChange={(e) => setNewStory(e.target.value)}
                className="min-h-[100px] resize-none border-gray-300 focus:border-purple-500 text-base"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Camera className="h-4 w-4" />
              <span>Add photos to your story (optional)</span>
            </div>
            
            <PhotoUploader
              files={imageFiles}
              onChange={handleImageChange}
              maxFiles={1}
              accept="image/*"
              className="border-dashed border-2 border-gray-300 rounded-lg p-4"
            />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Share inspiring stories only. For jobs or salon listings, use the appropriate sections.
            </p>
            <Button 
              type="submit" 
              disabled={isLoading || !newStory.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-2"
            >
              {isLoading ? (
                <>Processing...</>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Share Story
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommunityStoryForm;
