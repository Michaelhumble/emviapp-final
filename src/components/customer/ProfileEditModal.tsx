import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload, X, Save, User, Camera, Crop, Filter, Sparkles } from 'lucide-react';
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
  const [showCropModal, setShowCropModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('none');
  const [loading, setLoading] = useState(false);

  const filters = [
    { id: 'none', name: 'Original', style: 'filter: none' },
    { id: 'glamour', name: 'Glamour', style: 'filter: contrast(1.1) saturate(1.2) brightness(1.05)' },
    { id: 'soft', name: 'Soft', style: 'filter: brightness(1.1) contrast(0.9) blur(0.3px)' },
    { id: 'vintage', name: 'Vintage', style: 'filter: sepia(0.3) contrast(1.1) brightness(0.95)' },
    { id: 'beauty', name: 'Beauty', style: 'filter: saturate(1.3) brightness(1.1) contrast(1.05)' }
  ];

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
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('Photo must be less than 10MB');
        return;
      }
      
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewImage(result);
        setShowCropModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyFilter = (imageData: string, filterStyle: string): string => {
    // For demo purposes, we'll return the original image
    // In a real implementation, you'd apply canvas filters
    return imageData;
  };

  const processImageForUpload = async (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        // Set canvas size (optimize to max 1024x1024)
        const maxSize = 1024;
        let { width, height } = img;
        
        if (width > maxSize || height > maxSize) {
          if (width > height) {
            height = (height * maxSize) / width;
            width = maxSize;
          } else {
            width = (width * maxSize) / height;
            height = maxSize;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const optimizedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now()
            });
            resolve(optimizedFile);
          } else {
            resolve(file);
          }
        }, 'image/jpeg', 0.85); // 85% quality
      };
      
      img.src = URL.createObjectURL(file);
    });
  };

  const handleSave = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      let avatarUrl = formData.avatar_url;
      
      // Upload image if a new one was selected
      if (selectedFile) {
        toast.loading('Processing and uploading photo...', { id: 'upload' });
        
        // Process image for optimization
        const processedFile = await processImageForUpload(selectedFile);
        
        const uploadedUrl = await uploadImage(processedFile);
        if (uploadedUrl) {
          avatarUrl = uploadedUrl;
          toast.success('Photo uploaded and optimized successfully! ✨', { id: 'upload' });
        } else {
          toast.error('Failed to upload photo', { id: 'upload' });
          return;
        }
      }

      // Update user profile in Supabase
      const { error } = await supabase
        .from('profiles')
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

      // Calculate profile completion for celebration
      const profileFields = [formData.full_name, avatarUrl, formData.location, formData.bio, formData.phone];
      const completedFields = profileFields.filter(field => field && field.trim() !== '').length;
      const completionPercentage = Math.round((completedFields / profileFields.length) * 100);
      
      // Trigger enhanced celebration based on completion
      const isProfileComplete = completionPercentage === 100;
      confetti({
        particleCount: isProfileComplete ? 200 : 100,
        spread: isProfileComplete ? 100 : 70,
        origin: { y: 0.6 },
        colors: isProfileComplete 
          ? ['#FFD700', '#FFA500', '#FF69B4', '#8A2BE2', '#00FF7F']
          : ['#EC4899', '#8B5CF6', '#F59E0B', '#10B981']
      });
      
      if (isProfileComplete) {
        setTimeout(() => {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#FFD700', '#FFA500']
          });
        }, 300);
        toast.success('🏆 Profile 100% Complete! You\'re absolutely amazing! ✨');
      } else {
        toast.success(`Profile updated successfully! ${completionPercentage}% complete ✨`);
      }
      
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
    setShowCropModal(false);
    setSelectedFilter('none');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 border-purple-500/30 text-white p-0 overflow-hidden">
        <div className="flex flex-col h-full max-h-[85vh]">
          {/* Header - Fixed */}
          <div className="shrink-0 p-6 pb-0">
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
          </div>
          
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 pb-4">
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
                    <div className="w-full h-full rounded-full overflow-hidden bg-white relative">
                      {previewImage || formData.avatar_url ? (
                        <img 
                          src={previewImage || formData.avatar_url} 
                          alt="Profile preview" 
                          className="w-full h-full object-cover"
                          style={selectedFilter !== 'none' ? { 
                            filter: filters.find(f => f.id === selectedFilter)?.style.split(': ')[1] 
                          } : {}}
                        />
                      ) : (
                        <User className="w-full h-full p-4 text-gray-300" />
                      )}
                      {isUploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <div className="animate-spin h-6 w-6 border-t-2 border-white rounded-full" />
                        </div>
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
                
                {/* Photo Enhancement Options */}
                {previewImage && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 space-y-3"
                  >
                    <h4 className="text-sm font-medium text-purple-200 flex items-center">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Photo Enhancements
                    </h4>
                    
                    {/* Filter Selection */}
                    <div className="grid grid-cols-3 gap-2">
                      {filters.map(filter => (
                        <button
                          key={filter.id}
                          onClick={() => setSelectedFilter(filter.id)}
                          className={`p-2 rounded-lg text-xs transition-all ${
                            selectedFilter === filter.id
                              ? 'bg-purple-500 text-white'
                              : 'bg-white/10 text-purple-200 hover:bg-white/20'
                          }`}
                        >
                          {filter.name}
                        </button>
                      ))}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setShowCropModal(true)}
                        className="border-purple-300/30 text-purple-200 hover:bg-purple-500/20"
                      >
                        <Crop className="h-3 w-3 mr-1" />
                        Adjust
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedFilter('none')}
                        className="border-purple-300/30 text-purple-200 hover:bg-purple-500/20"
                      >
                        Reset
                      </Button>
                    </div>
                  </motion.div>
                )}
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

              {/* Add padding at bottom to ensure content isn't hidden behind sticky footer */}
              <div className="h-20" />
            </motion.div>
          </div>

          {/* Sticky Action Footer - Always visible */}
          <div className="shrink-0 bg-gradient-to-r from-purple-900 via-pink-900 to-rose-900 border-t border-purple-500/30 p-4 rounded-b-lg">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClose}
                className="flex-1 border-purple-300/30 text-purple-200 hover:bg-purple-500/20 h-12"
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
                  className="w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 disabled:opacity-50 text-base font-semibold"
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditModal;