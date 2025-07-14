import React, { useState } from 'react';
import { Camera, Video, Sparkles, Send, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/auth';
import { useCommunityPosts } from '@/hooks/useCommunityPosts';
import { useImageUpload } from '@/hooks/useImageUpload';
import { toast } from 'sonner';

const categories = [
  { id: 'story', label: 'Story', emoji: '✨' },
  { id: 'tip', label: 'Pro Tip', emoji: '💡' },
  { id: 'showcase', label: 'Showcase', emoji: '🎨' },
  { id: 'question', label: 'Question', emoji: '❓' },
];

const PostComposer = () => {
  const { user } = useAuth();
  const { createPost, isLoading } = useCommunityPosts();
  const { uploadImage, isUploading } = useImageUpload();
  
  const [content, setContent] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('story');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + selectedImages.length > 4) {
      toast.error('Maximum 4 images allowed');
      return;
    }

    setSelectedImages(prev => [...prev, ...files]);
    
    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!content.trim()) {
      toast.error('Please write something to share!');
      return;
    }

    try {
      let imageUrls: string[] = [];
      
      // Upload images if any
      if (selectedImages.length > 0) {
        const uploadPromises = selectedImages.map(file => 
          uploadImage(file)
        );
        imageUrls = await Promise.all(uploadPromises);
      }

      await createPost({
        content: content.trim(),
        post_type: selectedCategory,
        image_urls: imageUrls,
        category: 'general' // You can add category selection later
      });

      // Reset form
      setContent('');
      setSelectedCategory('story');
      setSelectedImages([]);
      setImagePreview([]);
      
      toast.success('Your post has been shared with the community! ✨');
    } catch (error) {
      toast.error('Failed to share post. Please try again.');
    }
  };

  const handleAIPolish = async () => {
    // TODO: Implement AI polish feature
    toast.info('AI Polish feature coming soon! ✨');
  };

  const userInitial = user?.email?.charAt(0).toUpperCase() || 'U';

  return (
    <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
      <div className="flex gap-4">
        {/* User Avatar */}
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
          {userInitial}
        </div>

        <div className="flex-1 space-y-4">
          {/* Category Selection */}
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.emoji} {category.label}
              </button>
            ))}
          </div>

          {/* Content Input */}
          <Textarea
            placeholder="Share something beautiful with the community... ✨"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border-purple-200 focus:border-purple-400 focus:ring-purple-400 min-h-[100px] resize-none"
          />

          {/* Image Previews */}
          {imagePreview.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {imagePreview.map((src, index) => (
                <div key={index} className="relative">
                  <img 
                    src={src} 
                    alt={`Preview ${index + 1}`} 
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <input
                type="file"
                id="image-upload"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => document.getElementById('image-upload')?.click()}
                className="border-purple-200 hover:bg-purple-50"
              >
                <Camera className="h-4 w-4 mr-2" />
                Photo
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={handleAIPolish}
                className="border-purple-200 hover:bg-purple-50"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Polish with AI
              </Button>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isLoading || isUploading || !content.trim()}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              {isLoading || isUploading ? (
                <>
                  <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                  Sharing...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Share
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PostComposer;