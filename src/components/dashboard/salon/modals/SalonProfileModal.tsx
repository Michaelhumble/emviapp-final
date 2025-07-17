import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, Upload, Crop, Filter, Save, Sparkles, 
  MapPin, Clock, Phone, Mail, Globe, Award,
  X, Check, Star, Crown
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface SalonProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SalonProfileModal: React.FC<SalonProfileModalProps> = ({ isOpen, onClose }) => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    salon_name: '',
    location: '',
    bio: '',
    phone: '',
    email: '',
    website: '',
    avatar_url: '',
    cover_image_url: '',
    business_hours: '',
    established: '',
    specialties: [] as string[],
  });

  useEffect(() => {
    if (userProfile) {
      setFormData({
        salon_name: userProfile.salon_name || userProfile.company_name || '',
        location: userProfile.location || '',
        bio: userProfile.bio || '',
        phone: userProfile.phone || '',
        email: userProfile.email || '',
        website: userProfile.website || '',
        avatar_url: userProfile.avatar_url || '',
        cover_image_url: userProfile.cover_image_url || '',
        business_hours: userProfile.business_hours || '',
        established: userProfile.established || '',
        specialties: userProfile.specialties || [],
      });
      calculateCompletion();
    }
  }, [userProfile]);

  const calculateCompletion = () => {
    const fields = ['salon_name', 'location', 'bio', 'phone', 'avatar_url'];
    const filledFields = fields.filter(field => formData[field as keyof typeof formData]);
    const percentage = Math.round((filledFields.length / fields.length) * 100);
    setCompletionPercentage(percentage);
  };

  useEffect(() => {
    calculateCompletion();
  }, [formData]);

  const handleImageUpload = async (file: File, type: 'avatar' | 'cover') => {
    if (!userProfile?.id) return;

    setImageUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userProfile.id}_${type}_${Date.now()}.${fileExt}`;
      const filePath = `salon-${type}s/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('salon-photos')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('salon-photos')
        .getPublicUrl(filePath);

      const fieldName = type === 'avatar' ? 'avatar_url' : 'cover_image_url';
      setFormData(prev => ({ ...prev, [fieldName]: data.publicUrl }));
      
      toast.success(`${type === 'avatar' ? 'Profile' : 'Cover'} photo uploaded successfully!`);
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const handleSave = async () => {
    if (!userProfile?.id) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          salon_name: formData.salon_name,
          company_name: formData.salon_name,
          location: formData.location,
          bio: formData.bio,
          phone: formData.phone,
          website: formData.website,
          avatar_url: formData.avatar_url,
          cover_image_url: formData.cover_image_url,
          business_hours: formData.business_hours,
          established: formData.established,
          specialties: formData.specialties,
        })
        .eq('id', userProfile.id);

      if (error) throw error;

      // Profile updated successfully
      toast.success('Profile updated successfully!');
      
      // Celebration for profile completion
      if (completionPercentage === 100) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
        toast.success('🎉 Profile completed! You unlocked premium features!');
      }
      
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const addSpecialty = (specialty: string) => {
    if (specialty && !formData.specialties.includes(specialty)) {
      setFormData(prev => ({
        ...prev,
        specialties: [...prev.specialties, specialty]
      }));
    }
  };

  const removeSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.filter(s => s !== specialty)
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-2xl">
            <Crown className="h-6 w-6 text-purple-600" />
            Salon Profile Settings
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              {completionPercentage}% Complete
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Ring */}
          <motion.div 
            className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="relative">
              <Progress 
                value={completionPercentage} 
                className="w-20 h-20 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-purple-600">
                  {completionPercentage}%
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-purple-900">Profile Completion</h3>
              <p className="text-sm text-purple-700">
                Complete your profile to unlock premium features and boost visibility
              </p>
            </div>
          </motion.div>

          {/* Cover Photo Section */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold">Cover Photo</Label>
            <div 
              className="relative h-48 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg overflow-hidden cursor-pointer group"
              onClick={() => coverInputRef.current?.click()}
            >
              {formData.cover_image_url ? (
                <img 
                  src={formData.cover_image_url} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  <Camera className="h-12 w-12 mb-2" />
                </div>
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Upload className="h-8 w-8 text-white" />
              </div>
            </div>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file, 'cover');
              }}
            />
          </div>

          {/* Avatar Photo Section */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold">Profile Photo</Label>
            <div className="flex items-center gap-4">
              <div 
                className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer group border-4 border-purple-200"
                onClick={() => fileInputRef.current?.click()}
              >
                {formData.avatar_url ? (
                  <img 
                    src={formData.avatar_url} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-400 to-pink-400 text-white">
                    <Camera className="h-8 w-8" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <Button 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  disabled={imageUploading}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  {imageUploading ? 'Uploading...' : 'Change Photo'}
                </Button>
                <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 5MB</p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file, 'avatar');
              }}
            />
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salon_name">Salon Name *</Label>
              <Input
                id="salon_name"
                value={formData.salon_name}
                onChange={(e) => setFormData({...formData, salon_name: e.target.value})}
                placeholder="Enter your salon name"
              />
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="City, State"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => setFormData({...formData, website: e.target.value})}
                placeholder="www.yoursalon.com"
              />
            </div>
            <div>
              <Label htmlFor="established">Established Year</Label>
              <Input
                id="established"
                value={formData.established}
                onChange={(e) => setFormData({...formData, established: e.target.value})}
                placeholder="2020"
              />
            </div>
            <div>
              <Label htmlFor="business_hours">Business Hours</Label>
              <Input
                id="business_hours"
                value={formData.business_hours}
                onChange={(e) => setFormData({...formData, business_hours: e.target.value})}
                placeholder="Mon-Fri 9AM-6PM"
              />
            </div>
          </div>

          {/* About/Bio */}
          <div>
            <Label htmlFor="bio">About Your Salon *</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData({...formData, bio: e.target.value})}
              placeholder="Tell customers about your salon, services, and what makes you special..."
              rows={4}
            />
          </div>

          {/* Specialties */}
          <div>
            <Label>Specialties</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {formData.specialties.map((specialty) => (
                <Badge 
                  key={specialty} 
                  className="bg-purple-100 text-purple-800 border-purple-300"
                >
                  {specialty}
                  <button
                    onClick={() => removeSpecialty(specialty)}
                    className="ml-2 hover:text-purple-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              {['Manicure', 'Pedicure', 'Nail Art', 'Gel Polish', 'Acrylic', 'Dip Powder'].map((specialty) => (
                <Button
                  key={specialty}
                  variant="outline"
                  size="sm"
                  onClick={() => addSpecialty(specialty)}
                  disabled={formData.specialties.includes(specialty)}
                >
                  {specialty}
                </Button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t">
            <Button 
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {loading ? 'Saving...' : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </>
              )}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SalonProfileModal;