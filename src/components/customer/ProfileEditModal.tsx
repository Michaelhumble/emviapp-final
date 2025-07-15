import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X, Save, User, Camera } from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useImageUpload } from '@/hooks/useImageUpload';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ isOpen, onClose }) => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const { uploadImage, isUploading } = useImageUpload();
  const [formData, setFormData] = useState({
    full_name: userProfile?.full_name || '',
    bio: userProfile?.bio || '',
    location: userProfile?.location || '',
    phone: userProfile?.phone || '',
    avatar_url: userProfile?.avatar_url || ''
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Reset form when modal opens/closes or userProfile changes
  React.useEffect(() => {
    if (isOpen && userProfile) {
      setFormData({
        full_name: userProfile.full_name || '',
        bio: userProfile.bio || '',
        location: userProfile.location || '',
        phone: userProfile.phone || '',
        avatar_url: userProfile.avatar_url || ''
      });
      setPreviewImage(null);
      setSelectedFile(null);
    }
  }, [isOpen, userProfile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      let avatarUrl = formData.avatar_url;
      
      // Upload image if a new one was selected
      if (selectedFile) {
        toast.loading('Uploading photo...', { id: 'upload' });
        const uploadedUrl = await uploadImage(selectedFile);
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
          toast.success('Photo uploaded successfully!', { id: 'upload' });
        } else {
          toast.error('Failed to upload photo', { id: 'upload' });
          return;
        }
      }

      // Update user profile in Supabase
      const { error } = await supabase
        .from('users')
        .update({
          full_name: formData.full_name,
          bio: formData.bio,
          location: formData.location,
          phone: formData.phone,
          avatar_url: avatarUrl
        })
        .eq('id', user.id);

      if (error) throw error;

      // Refresh the user profile in auth context
      if (refreshUserProfile) {
        await refreshUserProfile();
      }

      // Trigger celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#EC4899', '#8B5CF6', '#F59E0B', '#10B981']
      });
      
      toast.success('Profile updated successfully! ✨');
      
      // Reset form and close
      setPreviewImage(null);
      setSelectedFile(null);
      onClose();
      
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPreviewImage(null);
    setSelectedFile(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 border-purple-500/30 text-white">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">
              Edit Your Beautiful Profile ✨
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="text-purple-200 hover:text-white hover:bg-purple-500/20 font-medium"
              >
                ← Back to Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClose}
                className="text-purple-200 hover:text-white hover:bg-purple-500/20 w-8 h-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Profile Photo Section */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <motion.div 
                className="w-24 h-24 rounded-full overflow-hidden mx-auto bg-gradient-to-br from-purple-400 to-pink-400 p-1"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-full h-full rounded-full overflow-hidden bg-white">
                  {previewImage || formData.avatar_url ? (
                    <img 
                      src={previewImage || formData.avatar_url} 
                      alt="Profile preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-full h-full p-4 text-gray-300" />
                  )}
                </div>
              </motion.div>
              
              <motion.label
                htmlFor="photo-upload"
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Camera className="h-4 w-4 text-white" />
              </motion.label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
            <p className="text-sm text-purple-200">Click to change your beautiful photo</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="text-purple-200">Full Name</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => handleInputChange('full_name', e.target.value)}
                className="bg-white/10 border-purple-300/30 text-white placeholder-purple-300/50"
                placeholder="Your beautiful name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio" className="text-purple-200">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="bg-white/10 border-purple-300/30 text-white placeholder-purple-300/50 min-h-[80px]"
                placeholder="Tell us about your beauty journey..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location" className="text-purple-200">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="bg-white/10 border-purple-300/30 text-white placeholder-purple-300/50"
                  placeholder="City, State"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-purple-200">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="bg-white/10 border-purple-300/30 text-white placeholder-purple-300/50"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-purple-200">Email</Label>
              <Input
                value={user?.email || ''}
                disabled
                className="bg-white/5 border-purple-300/20 text-purple-300 cursor-not-allowed"
              />
              <p className="text-xs text-purple-300">Email can be changed in account settings</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              variant="outline"
              onClick={handleClose}
              className="flex-1 border-purple-300/30 text-purple-200 hover:bg-purple-500/20"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            
            <motion.div 
              className="flex-1"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
               <Button
                onClick={handleSave}
                disabled={loading || isUploading}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 disabled:opacity-50"
              >
                {loading || isUploading ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-4 w-4 border-t-2 border-white rounded-full mr-2" />
                    {isUploading ? 'Uploading...' : 'Saving...'}
                  </div>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;