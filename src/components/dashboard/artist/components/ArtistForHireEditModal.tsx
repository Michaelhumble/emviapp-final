import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import {
  DollarSign,
  MapPin,
  Briefcase,
  Star,
  Camera,
  Sparkles,
  Clock,
  Users,
  Save,
  X,
  Upload
} from 'lucide-react';
import { useAuth } from '@/context/auth';
import { useArtistForHire, ArtistForHireProfile } from '@/hooks/artist/useArtistForHire';
import { cn } from '@/lib/utils';

interface ArtistForHireEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ArtistForHireEditModal = ({ isOpen, onClose }: ArtistForHireEditModalProps) => {
  const { userProfile } = useAuth();
  const { profile, isSaving, saveProfile } = useArtistForHire();
  
  const [formData, setFormData] = useState<Partial<ArtistForHireProfile>>({
    hourly_rate: '',
    location: '',
    years_experience: '',
    specialties: '',
    headline: '',
    bio: '',
    avatar_url: '',
    available_for_work: true,
    shifts_available: '',
  });

  const [localAvatar, setLocalAvatar] = useState<string | null>(null);
  const [previewSpecialties, setPreviewSpecialties] = useState<string[]>([]);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
      setLocalAvatar(profile.avatar_url || null);
      setPreviewSpecialties(profile.specialties ? profile.specialties.split(',').map(s => s.trim()) : []);
    } else if (userProfile) {
      // Initialize with main profile data
      setFormData({
        hourly_rate: '$75-100',
        location: userProfile.location || '',
        years_experience: userProfile.years_experience?.toString() || '3+ years',
        specialties: userProfile.specialty || 'Gel Manicures, Nail Art',
        headline: `Professional ${userProfile.specialty || 'Nail Artist'} For Hire`,
        bio: userProfile.bio || `Professional ${userProfile.specialty || 'nail artist'} available for salon partnerships, special events, and on-demand services. Bringing creativity, expertise, and reliability to every appointment.`,
        avatar_url: userProfile.avatar_url || '',
        available_for_work: true,
        shifts_available: 'Flexible',
      });
      setLocalAvatar(userProfile.avatar_url || null);
      setPreviewSpecialties(userProfile.specialty ? [userProfile.specialty] : ['Gel Manicures', 'Nail Art']);
    }
  }, [profile, userProfile]);

  const handleInputChange = (field: keyof ArtistForHireProfile, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'specialties' && typeof value === 'string') {
      setPreviewSpecialties(value.split(',').map(s => s.trim()).filter(s => s));
    }
  };

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLocalAvatar(result);
        handleInputChange('avatar_url', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    const dataToSave = {
      ...formData,
      avatar_url: localAvatar || formData.avatar_url,
    };
    
    const success = await saveProfile(dataToSave);
    if (success) {
      onClose();
    }
  };

  const handleClose = () => {
    setFormData({});
    setLocalAvatar(null);
    setPreviewSpecialties([]);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleClose}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <DialogHeader className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-t-lg opacity-10" />
                <DialogTitle className="relative text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Edit Artist For Hire Profile
                </DialogTitle>
                <p className="relative text-gray-600 mt-2">
                  Customize your for-hire profile to attract potential clients and salon partnerships
                </p>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                {/* Left Column - Form */}
                <div className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex flex-col items-center space-y-4">
                    <div className="relative">
                      <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-75 blur-lg" />
                      <Avatar className="relative h-24 w-24 border-4 border-white shadow-xl">
                        <AvatarImage 
                          src={localAvatar || userProfile?.avatar_url} 
                          alt="Profile photo"
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-2xl font-bold">
                          {(userProfile?.full_name || 'A').charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <motion.label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer shadow-lg hover:bg-purple-700 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Camera className="h-4 w-4" />
                      </motion.label>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleAvatarUpload}
                      />
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="headline" className="text-sm font-semibold text-gray-700">
                        Professional Headline
                      </Label>
                      <Input
                        id="headline"
                        value={formData.headline || ''}
                        onChange={(e) => handleInputChange('headline', e.target.value)}
                        placeholder="e.g., Professional Nail Artist For Hire"
                        className="mt-1"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="hourly_rate" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-purple-600" />
                          Hourly Rate
                        </Label>
                        <Input
                          id="hourly_rate"
                          value={formData.hourly_rate || ''}
                          onChange={(e) => handleInputChange('hourly_rate', e.target.value)}
                          placeholder="$75-100"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="years_experience" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Star className="h-4 w-4 text-purple-600" />
                          Experience
                        </Label>
                        <Input
                          id="years_experience"
                          value={formData.years_experience || ''}
                          onChange={(e) => handleInputChange('years_experience', e.target.value)}
                          placeholder="3+ years"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-purple-600" />
                          Location
                        </Label>
                        <Input
                          id="location"
                          value={formData.location || ''}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          placeholder="City, State"
                          className="mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor="shifts_available" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-purple-600" />
                          Availability
                        </Label>
                        <Input
                          id="shifts_available"
                          value={formData.shifts_available || ''}
                          onChange={(e) => handleInputChange('shifts_available', e.target.value)}
                          placeholder="Flexible, Weekends, etc."
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="specialties" className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-purple-600" />
                        Specialties & Services
                      </Label>
                      <Input
                        id="specialties"
                        value={formData.specialties || ''}
                        onChange={(e) => handleInputChange('specialties', e.target.value)}
                        placeholder="Gel Manicures, Nail Art, Acrylics, Pedicures"
                        className="mt-1"
                      />
                      <p className="text-xs text-gray-500 mt-1">Separate multiple specialties with commas</p>
                    </div>

                    <div>
                      <Label htmlFor="bio" className="text-sm font-semibold text-gray-700">
                        Professional Bio
                      </Label>
                      <Textarea
                        id="bio"
                        value={formData.bio || ''}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        placeholder="Tell potential clients about your experience, style, and what makes you unique..."
                        className="mt-1 min-h-[120px]"
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                      <div>
                        <Label className="text-sm font-semibold text-gray-700">Available for On-Demand Work</Label>
                        <p className="text-xs text-gray-500">Show your profile to potential clients</p>
                      </div>
                      <Switch
                        checked={formData.available_for_work || false}
                        onCheckedChange={(checked) => handleInputChange('available_for_work', checked)}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column - Preview */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      Live Preview
                    </h3>
                    
                    {/* Preview Card */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-purple-200 shadow-lg">
                      {/* Profile Header */}
                      <div className="flex items-center gap-4 mb-6">
                        <div className="relative">
                          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-75 blur-lg" />
                          <Avatar className="relative h-16 w-16 border-3 border-white">
                            <AvatarImage 
                              src={localAvatar || userProfile?.avatar_url} 
                              alt="Profile photo"
                              className="object-cover"
                            />
                            <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white text-lg font-bold">
                              {(userProfile?.full_name || 'A').charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute bottom-0 right-0 h-4 w-4 bg-green-500 rounded-full border-2 border-white" />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-800">
                            {userProfile?.full_name || 'Your Name'}
                          </h4>
                          <p className="text-purple-600 font-semibold">
                            {formData.headline || 'Professional Nail Artist For Hire'}
                          </p>
                          <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              4.9 (127 reviews)
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-purple-500" />
                              {formData.location || 'Your Location'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50">
                          <DollarSign className="h-4 w-4 text-purple-600" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Rate</p>
                            <p className="font-semibold text-gray-800">{formData.hourly_rate || '$75-100'}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100/50">
                          <Clock className="h-4 w-4 text-purple-600" />
                          <div>
                            <p className="text-xs text-gray-500 font-medium">Availability</p>
                            <p className="font-semibold text-gray-800">{formData.shifts_available || 'Flexible'}</p>
                          </div>
                        </div>
                      </div>

                      {/* Specialties */}
                      <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="h-4 w-4 text-purple-600" />
                          <h5 className="font-semibold text-gray-700">Specialties</h5>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {previewSpecialties.length > 0 ? (
                            previewSpecialties.map((specialty, index) => (
                              <Badge 
                                key={index}
                                variant="outline" 
                                className="border-purple-300 text-purple-700 hover:bg-purple-50"
                              >
                                {specialty}
                              </Badge>
                            ))
                          ) : (
                            <>
                              <Badge variant="outline" className="border-purple-300 text-purple-700">Gel Manicures</Badge>
                              <Badge variant="outline" className="border-purple-300 text-purple-700">Nail Art</Badge>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Bio */}
                      <div className="pt-4 border-t border-gray-200/60">
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {formData.bio?.substring(0, 150) || 
                            `Professional ${userProfile?.specialty || 'nail artist'} available for salon partnerships, special events, and on-demand services...`
                          }
                          {(formData.bio?.length || 0) > 150 && '...'}
                        </p>
                      </div>

                      {/* Status Badge */}
                      <div className="flex justify-center mt-6">
                        <Badge className={cn(
                          "px-4 py-2 text-sm font-semibold",
                          formData.available_for_work 
                            ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                            : "bg-gray-300 text-gray-600"
                        )}>
                          {formData.available_for_work ? '✨ Available for Work' : '⏸️ Not Available'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-8 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1"
                  disabled={isSaving}
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  {isSaving ? (
                    <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  {isSaving ? 'Saving...' : 'Save Profile'}
                </Button>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default ArtistForHireEditModal;