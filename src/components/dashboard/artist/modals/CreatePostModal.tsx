
import React, { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PenTool, Upload, X, MapPin, DollarSign, Tag, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';

interface CreatePostModalProps {
  open: boolean;
  onClose: () => void;
}

const CreatePostModal = ({ open, onClose }: CreatePostModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: '',
    location: '',
    rate: '',
  });
  const [images, setImages] = useState<File[]>([]);
  const [posting, setPosting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter(file => {
      const isValidType = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB limit
      
      if (!isValidType) {
        toast.error(`${file.name} is not a valid image file`);
        return false;
      }
      if (!isValidSize) {
        toast.error(`${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      return true;
    });
    
    setImages(prev => [...prev, ...validFiles].slice(0, 5)); // Max 5 images
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      toast.error('Please add a title for your post');
      return;
    }
    
    if (!formData.description.trim()) {
      toast.error('Please add a description for your post');
      return;
    }

    setPosting(true);
    
    try {
      // Simulate post creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Your post has been created successfully!');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        tags: '',
        location: '',
        rate: '',
      });
      setImages([]);
      onClose();
    } catch (error) {
      toast.error('Failed to create post. Please try again.');
    } finally {
      setPosting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair font-bold flex items-center gap-2">
            <PenTool className="h-6 w-6 text-emerald-600" />
            Create a New Post
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="text-base font-medium">
              Post Title *
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Share what you're working on or offering..."
              className="mt-2"
              required
              maxLength={100}
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-base font-medium">
              Description *
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Tell your followers more about this post..."
              className="mt-2"
              rows={4}
              required
              maxLength={500}
            />
          </div>

          {/* Tags and Location Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tags" className="text-base font-medium flex items-center gap-1">
                <Tag className="h-4 w-4" />
                Tags
              </Label>
              <Input
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="nails, art, manicure..."
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="location" className="text-base font-medium flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Location
              </Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="City, State"
                className="mt-2"
              />
            </div>
          </div>

          {/* Rate */}
          <div>
            <Label htmlFor="rate" className="text-base font-medium flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              Rate (Optional)
            </Label>
            <Input
              id="rate"
              name="rate"
              value={formData.rate}
              onChange={handleInputChange}
              placeholder="Starting at $50"
              className="mt-2"
            />
          </div>

          {/* Image Upload */}
          <div>
            <Label className="text-base font-medium flex items-center gap-1 mb-3">
              <ImageIcon className="h-4 w-4" />
              Add Images (Optional)
            </Label>
            
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 transition-colors cursor-pointer bg-gray-50"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">
                Click to upload images or drag and drop
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Up to 5 images, 5MB each
              </p>
              
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>

            {/* Image Previews */}
            {images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
              disabled={posting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={posting || !formData.title.trim() || !formData.description.trim()}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              {posting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Post...
                </>
              ) : (
                <>
                  <PenTool className="h-4 w-4 mr-2" />
                  Create Post
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
