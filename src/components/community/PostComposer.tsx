import React, { useState, useRef, useCallback } from 'react';
import { Camera, Video, Sparkles, Send, Image as ImageIcon, Eye, Hash, AtSign, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/context/auth';
import { useCommunityPosts } from '@/hooks/useCommunityPosts';
import { useImageUpload } from '@/hooks/useImageUpload';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const postTypes = [
  { id: 'story', label: 'Story', emoji: '✨', description: 'Share your experience' },
  { id: 'tip', label: 'Pro Tip', emoji: '💡', description: 'Professional advice' },
  { id: 'showcase', label: 'Showcase', emoji: '🎨', description: 'Show your work' },
  { id: 'question', label: 'Question', emoji: '❓', description: 'Ask the community' },
];

const categories = [
  { id: 'nails', label: 'Nails', emoji: '💅' },
  { id: 'hair', label: 'Hair', emoji: '💇‍♀️' },
  { id: 'makeup', label: 'Makeup', emoji: '💄' },
  { id: 'skincare', label: 'Skincare', emoji: '✨' },
  { id: 'barber', label: 'Barber', emoji: '✂️' },
  { id: 'brows', label: 'Brows & Lashes', emoji: '👁️' },
  { id: 'massage', label: 'Massage', emoji: '💆‍♀️' },
  { id: 'general', label: 'General', emoji: '🌟' },
];

const polishStyles = [
  { id: 'casual', label: 'Casual & Friendly', description: 'Conversational tone' },
  { id: 'professional', label: 'Professional', description: 'Polished and formal' },
  { id: 'inspiring', label: 'Inspiring', description: 'Motivational and uplifting' },
  { id: 'fun', label: 'Fun & Playful', description: 'Energetic and engaging' },
  { id: 'elegant', label: 'Elegant', description: 'Sophisticated and refined' },
];

const languages = [
  { id: 'english', label: 'English' },
  { id: 'vietnamese', label: 'Tiếng Việt' },
];

const PostComposer = () => {
  const { user } = useAuth();
  const { createPost, isLoading } = useCommunityPosts();
  const { uploadImage, isUploading } = useImageUpload();
  
  const [content, setContent] = useState('');
  const [selectedPostType, setSelectedPostType] = useState('story');
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [mentions, setMentions] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [isPolishing, setIsPolishing] = useState(false);
  const [polishDialogOpen, setPolishDialogOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleImageSelect = useCallback((files: File[]) => {
    if (files.length + selectedImages.length > 4) {
      toast.error('Maximum 4 images allowed');
      return;
    }

    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) {
        toast.error(`${file.name} is not a valid image or video file`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error(`${file.name} is too large. Maximum size is 10MB`);
        return false;
      }
      return true;
    });

    setSelectedImages(prev => [...prev, ...validFiles]);
    
    // Create previews
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(prev => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }, [selectedImages.length]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleImageSelect(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleImageSelect(files);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setImagePreview(prev => prev.filter((_, i) => i !== index));
  };

  const extractHashtagsAndMentions = (text: string) => {
    const hashtagRegex = /#[\w\u00c0-\u024f\u1e00-\u1eff]+/g;
    const mentionRegex = /@[\w\u00c0-\u024f\u1e00-\u1eff]+/g;
    
    const foundHashtags = text.match(hashtagRegex) || [];
    const foundMentions = text.match(mentionRegex) || [];
    
    setHashtags(foundHashtags.map(tag => tag.slice(1))); // Remove #
    setMentions(foundMentions.map(mention => mention.slice(1))); // Remove @
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    extractHashtagsAndMentions(newContent);
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
        post_type: selectedPostType,
        image_urls: imageUrls,
        category: selectedCategory,
        tags: hashtags
      });

      // Reset form
      setContent('');
      setSelectedPostType('story');
      setSelectedCategory('general');
      setSelectedImages([]);
      setImagePreview([]);
      setHashtags([]);
      setMentions([]);
      setShowPreview(false);
      
      toast.success('Your post has been shared with the community! ✨');
    } catch (error) {
      toast.error('Failed to share post. Please try again.');
    }
  };

  const handleAIPolish = async (style: string, language: string) => {
    if (!content.trim()) {
      toast.error('Please write something first!');
      return;
    }

    setIsPolishing(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-polish-post', {
        body: {
          content: content.trim(),
          style,
          language,
          postType: selectedPostType
        }
      });

      if (error) throw error;

      setContent(data.polishedContent);
      extractHashtagsAndMentions(data.polishedContent);
      setPolishDialogOpen(false);
      toast.success('Your post has been polished! ✨');
    } catch (error) {
      console.error('Error polishing post:', error);
      toast.error('Failed to polish post. Please try again.');
    } finally {
      setIsPolishing(false);
    }
  };

  const userInitial = user?.email?.charAt(0).toUpperCase() || 'U';

  if (!user) {
    return (
      <Card className="p-6 mb-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg">
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Please sign in to share with the community</p>
          <Button className="bg-gradient-to-r from-purple-500 to-pink-500">
            Sign In
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card 
        className={`p-6 mb-6 bg-white/80 backdrop-blur-sm border-purple-100 shadow-lg transition-all ${
          isDragging ? 'border-purple-400 bg-purple-50/50' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex gap-4">
          {/* User Avatar */}
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
            {userInitial}
          </div>

          <div className="flex-1 space-y-4">
            {/* Post Type Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Post Type</label>
              <div className="flex gap-2 flex-wrap">
                {postTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedPostType(type.id)}
                    className={`px-3 py-2 rounded-lg text-sm transition-all border ${
                      selectedPostType === type.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-transparent'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-purple-300'
                    }`}
                    title={type.description}
                  >
                    {type.emoji} {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Selection */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-2 py-1 rounded-full text-xs transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.emoji} {category.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Input */}
            <div className="space-y-2">
              <Textarea
                ref={textareaRef}
                placeholder="Share something beautiful with the community... ✨ Use #hashtags and @mentions"
                value={content}
                onChange={handleContentChange}
                className="border-purple-200 focus:border-purple-400 focus:ring-purple-400 min-h-[120px] resize-none"
              />
              
              {/* Hashtags and Mentions Preview */}
              {(hashtags.length > 0 || mentions.length > 0) && (
                <div className="flex gap-2 flex-wrap">
                  {hashtags.map((tag, index) => (
                    <Badge key={`hashtag-${index}`} variant="secondary" className="text-xs">
                      <Hash className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                  {mentions.map((mention, index) => (
                    <Badge key={`mention-${index}`} variant="outline" className="text-xs">
                      <AtSign className="h-3 w-3 mr-1" />
                      {mention}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Drag and Drop Zone */}
            {isDragging && (
              <div className="border-2 border-dashed border-purple-400 rounded-lg p-8 text-center bg-purple-50/50">
                <ImageIcon className="h-12 w-12 mx-auto text-purple-400 mb-2" />
                <p className="text-purple-600">Drop your images here!</p>
              </div>
            )}

            {/* Image Previews */}
            {imagePreview.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {imagePreview.map((src, index) => (
                  <div key={index} className="relative group">
                    <img 
                      src={src} 
                      alt={`Preview ${index + 1}`} 
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  id="image-upload"
                  multiple
                  accept="image/*,video/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="border-purple-200 hover:bg-purple-50"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Media
                </Button>
                
                <Dialog open={polishDialogOpen} onOpenChange={setPolishDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-purple-200 hover:bg-purple-50"
                      disabled={!content.trim()}
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Polish with AI
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Polish Your Post with AI ✨</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Style</label>
                        <div className="grid grid-cols-1 gap-2">
                          {polishStyles.map((style) => (
                            <Button
                              key={style.id}
                              variant="outline"
                              className="justify-start h-auto p-3"
                              onClick={() => handleAIPolish(style.id, 'english')}
                              disabled={isPolishing}
                            >
                              <div className="text-left">
                                <div className="font-medium">{style.label}</div>
                                <div className="text-xs text-gray-500">{style.description}</div>
                              </div>
                            </Button>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-sm font-medium mb-2 block">Language</label>
                        <div className="grid grid-cols-2 gap-2">
                          {languages.map((lang) => (
                            <Button
                              key={lang.id}
                              variant="outline"
                              onClick={() => handleAIPolish('casual', lang.id)}
                              disabled={isPolishing}
                            >
                              {isPolishing ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                lang.label
                              )}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPreview(!showPreview)}
                  className="border-purple-200 hover:bg-purple-50"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isLoading || isUploading || !content.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                {isLoading || isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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

      {/* Preview Mode */}
      {showPreview && content.trim() && (
        <Card className="mb-6 bg-white/90 backdrop-blur-sm border-orange-200 shadow-lg">
          <div className="p-4 border-b border-orange-100">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-orange-700">Preview</span>
            </div>
          </div>
          <div className="p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {userInitial}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium text-gray-900">You</span>
                  <Badge variant="secondary" className="text-xs">
                    {postTypes.find(t => t.id === selectedPostType)?.emoji} {postTypes.find(t => t.id === selectedPostType)?.label}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {categories.find(c => c.id === selectedCategory)?.emoji} {categories.find(c => c.id === selectedCategory)?.label}
                  </Badge>
                </div>
                <div className="text-gray-800 whitespace-pre-wrap">{content}</div>
                {imagePreview.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    {imagePreview.map((src, index) => (
                      <img 
                        key={index}
                        src={src} 
                        alt={`Preview ${index + 1}`} 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default PostComposer;