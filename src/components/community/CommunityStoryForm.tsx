
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
  const { user } = useAuth();
  const [imageFiles, setImageFiles] = useState<File[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is logged in
    if (!user) {
      toast.error('Please sign in to share your story');
      return;
    }

    // Check if story has content
    if (!newStory.trim()) {
      toast.error('Please write your story before sharing');
      return;
    }

    console.log('Attempting to submit story:', newStory);
    console.log('Image files:', imageFiles);
    console.log('User:', user?.id);

    try {
      const imageFile = imageFiles.length > 0 ? imageFiles[0] : undefined;
      const success = await addStory(newStory, imageFile);
      
      if (success) {
        console.log('Story posted successfully');
        setImageFiles([]);
        toast.success('Your story has been shared!');
      } else {
        console.error('Failed to post story');
        toast.error('Failed to share your story. Please try again.');
      }
    } catch (error) {
      console.error('Error posting story:', error);
      toast.error('An error occurred while sharing your story');
    }
  };

  const handleImageChange = (files: File[]) => {
    setImageFiles(files);
  };

  return (
    <Card className="mb-6">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Share your beauty journey, transformation story, or inspiring moment..."
            value={newStory}
            onChange={(e) => setNewStory(e.target.value)}
            className="min-h-[100px] resize-none border-gray-300 focus:border-purple-500"
            disabled={isLoading}
          />
          
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
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
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
