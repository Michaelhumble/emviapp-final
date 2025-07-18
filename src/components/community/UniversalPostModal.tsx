import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Image as ImageIcon, 
  Video, 
  Smile, 
  MapPin, 
  AtSign, 
  Upload,
  Plus,
  ChevronDown,
  Loader2,
  Sparkles,
  Palette,
  Scissors,
  Droplet,
  Eye,
  Star
} from 'lucide-react';
import { supabaseBypass } from '@/types/supabase-bypass';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { uploadImage } from '@/utils/uploadImage';
import confetti from 'canvas-confetti';

interface UniversalPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPostType?: string;
}

const categories = [
  { value: 'nails', label: 'Nail Art', icon: Sparkles, color: 'from-pink-500 to-rose-500' },
  { value: 'hair', label: 'Hair Styling', icon: Scissors, color: 'from-purple-500 to-indigo-500' },
  { value: 'makeup', label: 'Makeup', icon: Palette, color: 'from-red-500 to-pink-500' },
  { value: 'skincare', label: 'Skincare', icon: Droplet, color: 'from-green-500 to-teal-500' },
  { value: 'lashes', label: 'Lashes & Brows', icon: Eye, color: 'from-blue-500 to-cyan-500' },
  { value: 'general', label: 'General Beauty', icon: Star, color: 'from-yellow-500 to-orange-500' },
];

export const UniversalPostModal: React.FC<UniversalPostModalProps> = ({ 
  isOpen, 
  onClose, 
  initialPostType = 'story' 
}) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [showCategories, setShowCategories] = useState(false);
  const [mentions, setMentions] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleClose = useCallback(() => {
    setContent('');
    setSelectedImages([]);
    setUploadProgress([]);
    setMentions([]);
    setSelectedCategory(categories[0]);
    onClose();
  }, [onClose]);

  const handleSubmit = async () => {
    if (!user || (!content.trim() && selectedImages.length === 0)) {
      toast.error('Please add some content or images to your post');
      return;
    }

    setIsSubmitting(true);
    try {
      let imageUrls: string[] = [];

      // Upload images with progress tracking
      if (selectedImages.length > 0) {
        for (let i = 0; i < selectedImages.length; i++) {
          const file = selectedImages[i];
          try {
            const imageUrl = await uploadImage(file, (progress) => {
              setUploadProgress(prev => {
                const newProgress = [...prev];
                newProgress[i] = progress;
                return newProgress;
              });
            });
            imageUrls.push(imageUrl);
          } catch (error) {
            console.error('Error uploading image:', error);
            toast.error(`Failed to upload image ${i + 1}`);
          }
        }
      }

      // Extract hashtags and mentions from content
      const hashtags = content.match(/#[\w]+/g) || [];
      const contentMentions = content.match(/@[\w]+/g) || [];

      // Create post
      const { error } = await supabaseBypass
        .from('community_posts')
        .insert({
          content: content.trim(),
          user_id: user.id,
          image_urls: imageUrls,
          post_type: initialPostType,
          category: selectedCategory.value,
          hashtags: hashtags.map(tag => tag.slice(1)), // Remove # symbol
          mentions: [...mentions, ...contentMentions.map(mention => mention.slice(1))], // Remove @ symbol
        } as any);

      if (error) throw error;

      // Success celebration
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#8A53F8', '#FF6B8A', '#4ECDC4', '#FFE66D']
      });

      toast.success('Your post is live! 🌟', {
        description: 'Your art is now inspiring the community!'
      });

      handleClose();
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length + selectedImages.length > 4) {
      toast.error('You can upload up to 4 images');
      return;
    }
    setSelectedImages(prev => [...prev, ...files]);
    setUploadProgress(prev => [...prev, ...files.map(() => 0)]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    setUploadProgress(prev => prev.filter((_, i) => i !== index));
  };

  // Drag and drop handlers
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length + selectedImages.length > 4) {
      toast.error('You can upload up to 4 images');
      return;
    }
    
    setSelectedImages(prev => [...prev, ...imageFiles]);
    setUploadProgress(prev => [...prev, ...imageFiles.map(() => 0)]);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-2xl max-h-[90vh] overflow-hidden p-0 gap-0"
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Header */}
        <DialogHeader className="px-6 py-4 border-b border-border/50 bg-background/95 backdrop-blur-lg">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Create New Post
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="rounded-full hover:bg-accent"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto max-h-[70vh]">
          {/* User Info */}
          <div className="px-6 py-4 border-b border-border/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-white font-semibold text-lg">
                  {user?.email?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">
                  {user?.email?.split('@')[0] || 'Anonymous'}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sharing with</span>
                  <span className="text-sm font-medium text-primary">Everyone</span>
                </div>
              </div>
              
              {/* Category Selector */}
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setShowCategories(!showCategories)}
                  className="flex items-center gap-3 min-w-[180px] justify-between px-4 py-2"
                >
                  <div className="flex items-center gap-2">
                    <selectedCategory.icon size={16} className="text-muted-foreground" />
                    <span className="text-sm font-inter font-medium">{selectedCategory.label}</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                
                <AnimatePresence>
                  {showCategories && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-12 right-0 z-10 bg-background border border-border rounded-lg shadow-xl min-w-[200px] overflow-hidden"
                    >
                      {categories.map((category) => (
                        <button
                          key={category.value}
                          onClick={() => {
                            setSelectedCategory(category);
                            setShowCategories(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-accent transition-colors flex items-center gap-3 rounded-lg"
                        >
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${category.color}`}>
                            <category.icon size={14} className="text-white" />
                          </div>
                          <span className="text-sm font-inter font-medium">{category.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Text Input */}
          <div className="px-6 py-4">
            <Textarea
              placeholder="What's inspiring you today? Share your creativity, ask questions, or showcase your beautiful work..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[140px] border-0 resize-none text-lg font-inter placeholder:text-muted-foreground/60 focus-visible:ring-0 focus-visible:ring-offset-0 leading-relaxed"
              autoFocus
            />
          </div>

          {/* Image Upload Area */}
          <div className="px-6">
            <div
              className={`border-2 border-dashed rounded-lg p-6 transition-all duration-300 ${
                isDragging 
                  ? 'border-primary bg-primary/5 scale-[1.02]' 
                  : 'border-border hover:border-primary/50 hover:bg-accent/20'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <motion.div
                  animate={{ y: isDragging ? -4 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm font-inter text-muted-foreground mb-2">
                    {isDragging ? 'Drop your beautiful images here!' : 'Drag & drop images or click to upload'}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="mb-2"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Files
                  </Button>
                  <p className="text-xs font-inter text-muted-foreground">
                    Up to 4 images • JPG, PNG, WebP • Your art deserves to be seen
                  </p>
                </motion.div>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>
          </div>

          {/* Image Preview */}
          {selectedImages.length > 0 && (
            <div className="px-6 py-4">
              <div className="grid grid-cols-2 gap-3">
                {selectedImages.map((file, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative group aspect-square rounded-lg overflow-hidden bg-accent"
                  >
                    <img
                      src={URL.createObjectURL(file)}
                      alt="Upload preview"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Progress overlay */}
                    {uploadProgress[index] > 0 && uploadProgress[index] < 100 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-white text-center">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
                          <span className="text-sm">{uploadProgress[index]}%</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Remove button */}
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 w-8 h-8 bg-black/70 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Action Bar */}
          <div className="px-6 py-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Video className="h-5 w-5" />
                  <span className="text-sm">Video</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <Smile className="h-5 w-5" />
                  <span className="text-sm">Mood</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <MapPin className="h-5 w-5" />
                  <span className="text-sm">Location</span>
                </button>
                <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <AtSign className="h-5 w-5" />
                  <span className="text-sm">Mention</span>
                </button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                {content.length}/2000
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border/50 bg-background/95 backdrop-blur-lg">
          <div className="flex items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              {selectedImages.length > 0 && (
                <span>{selectedImages.length} image{selectedImages.length > 1 ? 's' : ''} selected</span>
              )}
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={(!content.trim() && selectedImages.length === 0) || isSubmitting}
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white min-w-[100px]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Posting...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Share Post
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};