
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Upload, Image as ImageIcon, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface CreateCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    tags: '',
    isPublic: true
  });

  const categories = [
    'Nail Art & Design',
    'Hair Styling & Color',
    'Makeup Artistry',
    'Skincare & Aesthetics',
    'Lash & Brow Services',
    'Business & Marketing',
    'Education & Training',
    'Networking & Events'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Here you would typically save to your backend
    toast.success('Community created successfully! 🎉');
    onClose();
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      category: '',
      tags: '',
      isPublic: true
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold">
            <Sparkles className="h-6 w-6 text-purple-600" />
            Create Your Community
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Community Image Upload */}
          <div className="space-y-2">
            <Label>Community Image</Label>
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-purple-300 transition-colors cursor-pointer">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Upload a cover image for your community</p>
              <Button type="button" variant="outline" size="sm">
                <Upload className="h-4 w-4 mr-2" />
                Choose Image
              </Button>
            </div>
          </div>

          {/* Community Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Community Name *</Label>
            <Input
              id="name"
              placeholder="e.g., Advanced Nail Art Techniques"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="text-lg"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe what your community is about, who should join, and what value you'll provide..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={4}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (optional)</Label>
            <Input
              id="tags"
              placeholder="e.g., beginner-friendly, advanced, certification, trending"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
            />
            <p className="text-sm text-gray-500">Separate tags with commas</p>
          </div>

          {/* Privacy Settings */}
          <div className="space-y-3">
            <Label>Privacy Settings</Label>
            <div className="space-y-2">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="privacy"
                  checked={formData.isPublic}
                  onChange={() => setFormData({...formData, isPublic: true})}
                  className="text-purple-600"
                />
                <div>
                  <div className="font-medium">Public Community</div>
                  <div className="text-sm text-gray-500">Anyone can discover and join</div>
                </div>
              </label>
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="privacy"
                  checked={!formData.isPublic}
                  onChange={() => setFormData({...formData, isPublic: false})}
                  className="text-purple-600"
                />
                <div>
                  <div className="font-medium">Private Community</div>
                  <div className="text-sm text-gray-500">Invite-only membership</div>
                </div>
              </label>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Create Community
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCommunityModal;
