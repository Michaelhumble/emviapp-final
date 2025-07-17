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
  Camera, Upload, Save, Sparkles, MapPin, Globe, 
  Instagram, Star, Crown, Award, Plus, X
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

interface ArtistProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArtistProfileModal: React.FC<ArtistProfileModalProps> = ({ isOpen, onClose }) => {
  const { userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [completionPercentage, setCompletionPercentage] = useState(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    specialty: '',
    location: '',
    instagram: '',
    website: '',
    phone: '',
    avatar_url: '',
    cover_image_url: '',
    hourly_rate: '',
    experience_years: '',
    languages: [] as string[],
    specialties_list: [] as string[],
  });

  const [newLanguage, setNewLanguage] = useState('');
  const [newSpecialty, setNewSpecialty] = useState('');

  useEffect(() => {
    if (userProfile) {
      setFormData({
        full_name: userProfile.full_name || '',
        bio: userProfile.bio || '',
        specialty: userProfile.specialty || '',
        location: userProfile.location || '',
        instagram: userProfile.instagram || '',
        website: userProfile.website || '',
        phone: userProfile.phone || '',
        avatar_url: userProfile.avatar_url || '',
        cover_image_url: userProfile.cover_image_url || '',
        hourly_rate: userProfile.hourly_rate?.toString() || '',
        experience_years: userProfile.experience_years?.toString() || '',
        languages: userProfile.languages || [],
        specialties_list: userProfile.specialties_list || [],
      });
      calculateCompletion();
    }
  }, [userProfile]);

  const calculateCompletion = () => {
    const fields = [
      'full_name', 'bio', 'specialty', 'location', 'phone', 
      'avatar_url', 'hourly_rate', 'experience_years'
    ];
    const filled = fields.filter(field => formData[field as keyof typeof formData]).length;
    const hasLanguages = formData.languages.length > 0;
    const hasSpecialties = formData.specialties_list.length > 0;
    
    const total = fields.length + 2; // +2 for languages and specialties
    const completedFields = filled + (hasLanguages ? 1 : 0) + (hasSpecialties ? 1 : 0);
    
    const percentage = Math.round((completedFields / total) * 100);
    setCompletionPercentage(percentage);
    
    return percentage;
  };

  useEffect(() => {
    calculateCompletion();
  }, [formData]);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userProfile?.id}/avatar.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('profiles')
        .upload(fileName, file, { upsert: true });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, avatar_url: publicUrl }));
      toast.success('Profile photo updated!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${userProfile?.id}/cover.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('profiles')
        .upload(fileName, file, { upsert: true });

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('profiles')
        .getPublicUrl(fileName);

      setFormData(prev => ({ ...prev, cover_image_url: publicUrl }));
      toast.success('Cover photo updated!');
    } catch (error) {
      console.error('Error uploading cover:', error);
      toast.error('Failed to upload cover photo');
    } finally {
      setImageUploading(false);
    }
  };

  const addLanguage = () => {
    if (newLanguage.trim() && !formData.languages.includes(newLanguage.trim())) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()]
      }));
      setNewLanguage('');
    }
  };

  const removeLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(l => l !== language)
    }));
  };

  const addSpecialty = () => {
    if (newSpecialty.trim() && !formData.specialties_list.includes(newSpecialty.trim())) {
      setFormData(prev => ({
        ...prev,
        specialties_list: [...prev.specialties_list, newSpecialty.trim()]
      }));
      setNewSpecialty('');
    }
  };

  const removeSpecialty = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      specialties_list: prev.specialties_list.filter(s => s !== specialty)
    }));
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7']
    });
  };

  const handleSave = async () => {
    if (!userProfile?.id) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          bio: formData.bio,
          specialty: formData.specialty,
          location: formData.location,
          instagram: formData.instagram,
          website: formData.website,
          phone: formData.phone,
          avatar_url: formData.avatar_url,
          cover_image_url: formData.cover_image_url,
          hourly_rate: formData.hourly_rate ? parseFloat(formData.hourly_rate) : null,
          experience_years: formData.experience_years ? parseInt(formData.experience_years) : null,
          languages: formData.languages,
          specialties_list: formData.specialties_list,
        })
        .eq('id', userProfile.id);

      if (error) throw error;

      const newCompletion = calculateCompletion();
      
      if (newCompletion === 100) {
        triggerConfetti();
        toast.success('🎉 Profile Complete! You\'re ready to attract premium clients!');
      } else {
        toast.success('Profile updated successfully!');
      }

      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        role="dialog"
        aria-labelledby="profile-modal-title"
      >
        <DialogHeader>
          <DialogTitle id="profile-modal-title" className="flex items-center gap-3 text-2xl">
            <Crown className="h-6 w-6 text-purple-600" />
            Artist Profile
            <Badge className="bg-purple-100 text-purple-800 border-purple-300">
              {completionPercentage}% Complete
            </Badge>
          </DialogTitle>
          <div className="mt-2">
            <Progress value={completionPercentage} className="h-2" />
            {completionPercentage < 100 && (
              <p className="text-sm text-gray-600 mt-1">
                Complete your profile to attract more premium clients!
              </p>
            )}
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* Cover Photo Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Camera className="h-5 w-5" />
              Cover Photo
            </h3>
            <div className="relative h-48 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-lg overflow-hidden">
              {formData.cover_image_url && (
                <img 
                  src={formData.cover_image_url} 
                  alt="Cover" 
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <Button
                  onClick={() => coverInputRef.current?.click()}
                  disabled={imageUploading}
                  className="bg-white/90 text-gray-800 hover:bg-white"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {imageUploading ? 'Uploading...' : 'Change Cover'}
                </Button>
              </div>
            </div>
            <input
              ref={coverInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleCoverUpload}
              aria-label="Upload cover photo"
            />
          </div>

          {/* Profile Photo Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Profile Photo</h3>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                  {formData.avatar_url ? (
                    <img 
                      src={formData.avatar_url} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    formData.full_name?.charAt(0) || 'A'
                  )}
                </div>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={imageUploading}
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  Upload a professional photo to make a great first impression
                </p>
                <p className="text-xs text-gray-500">
                  Recommended: 400x400px, JPG or PNG
                </p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarUpload}
              aria-label="Upload profile photo"
            />
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                placeholder="Your professional name"
                required
              />
            </div>
            <div>
              <Label htmlFor="specialty">Main Specialty *</Label>
              <Input
                id="specialty"
                value={formData.specialty}
                onChange={(e) => setFormData(prev => ({ ...prev, specialty: e.target.value }))}
                placeholder="e.g., Nail Art Specialist"
                required
              />
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, State"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(555) 123-4567"
                required
              />
            </div>
            <div>
              <Label htmlFor="hourly_rate">Hourly Rate ($) *</Label>
              <Input
                id="hourly_rate"
                type="number"
                value={formData.hourly_rate}
                onChange={(e) => setFormData(prev => ({ ...prev, hourly_rate: e.target.value }))}
                placeholder="50"
                required
              />
            </div>
            <div>
              <Label htmlFor="experience_years">Years of Experience *</Label>
              <Input
                id="experience_years"
                type="number"
                value={formData.experience_years}
                onChange={(e) => setFormData(prev => ({ ...prev, experience_years: e.target.value }))}
                placeholder="5"
                required
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <Label htmlFor="bio">Professional Bio *</Label>
            <Textarea
              id="bio"
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell clients about your experience, style, and what makes you unique..."
              rows={4}
              required
            />
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="instagram">Instagram Handle</Label>
              <div className="relative">
                <Instagram className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="instagram"
                  value={formData.instagram}
                  onChange={(e) => setFormData(prev => ({ ...prev, instagram: e.target.value }))}
                  placeholder="your_handle"
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                  placeholder="yourwebsite.com"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Languages */}
          <div>
            <Label>Languages Spoken</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                placeholder="Add a language"
                onKeyPress={(e) => e.key === 'Enter' && addLanguage()}
              />
              <Button onClick={addLanguage} disabled={!newLanguage.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.languages.map((language) => (
                <Badge 
                  key={language} 
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {language}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeLanguage(language)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Specialties */}
          <div>
            <Label>Additional Specialties</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={newSpecialty}
                onChange={(e) => setNewSpecialty(e.target.value)}
                placeholder="Add a specialty"
                onKeyPress={(e) => e.key === 'Enter' && addSpecialty()}
              />
              <Button onClick={addSpecialty} disabled={!newSpecialty.trim()}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.specialties_list.map((specialty) => (
                <Badge 
                  key={specialty} 
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {specialty}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeSpecialty(specialty)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={loading}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {loading ? 'Saving...' : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ArtistProfileModal;