
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface PostRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { value: 'salon-services', label: 'Salon Services' },
  { value: 'nail-services', label: 'Nail Services' },
  { value: 'hair-services', label: 'Hair Services' },
  { value: 'beauty-services', label: 'Beauty Services' },
  { value: 'job-opportunity', label: 'Job Opportunity' },
  { value: 'artist-booking', label: 'Artist Booking' },
  { value: 'other', label: 'Other' },
];

const PostRequestModal = ({ isOpen, onClose }: PostRequestModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    location: '',
    contact: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert({
          title: formData.title,
          content: formData.description,
          post_type: 'wanted',
          location: formData.location || 'Not specified',
          contact_info: { contact: formData.contact },
          metadata: { category: formData.category },
        })
        .select()
        .single();

      if (error) throw error;

      // Generate shareable link
      const shareableLink = `${window.location.origin}/wanted/${data.id}`;
      
      // Copy to clipboard
      await navigator.clipboard.writeText(shareableLink);
      
      toast.success('Request posted successfully! Link copied to clipboard.');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        category: '',
        location: '',
        contact: '',
      });
      
      onClose();
    } catch (error) {
      console.error('Error posting request:', error);
      toast.error('Failed to post request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Post What You're Looking For</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Title *</label>
            <Input
              placeholder="e.g., Looking for nail artist in downtown"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Category *</label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Description *</label>
            <Textarea
              placeholder="Describe what you're looking for in detail..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium">Location</label>
            <Input
              placeholder="City, State"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Contact Info</label>
            <Input
              placeholder="Phone or email (optional)"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? 'Posting...' : 'Post Request'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PostRequestModal;
