
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserProfile } from '@/types/profile';

const SPECIALTIES = [
  "Nail Technician",
  "Hair Stylist",
  "Makeup Artist",
  "Esthetician",
  "Tattoo Artist",
  "Microblading",
  "Barber",
  "Lash Tech",
  "Other"
];

interface ProfileFormProps {
  onProfileUpdate?: (updatedProfile: UserProfile) => void;
}

const ProfileForm = ({ onProfileUpdate }: ProfileFormProps) => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const [updating, setUpdating] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    specialty: '',
    location: '',
    instagram: '',
    website: '',
  });

  // Load initial data
  useEffect(() => {
    if (userProfile) {
      setFormData({
        full_name: userProfile.full_name || '',
        bio: userProfile.bio || '',
        specialty: userProfile.specialty || '',
        location: userProfile.location || '',
        instagram: userProfile.instagram || '',
        website: userProfile.website || '',
      });
    }
  }, [userProfile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSpecialtyChange = (value: string) => {
    setFormData(prev => ({ ...prev, specialty: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setUpdating(true);
    
    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: formData.full_name,
          bio: formData.bio,
          specialty: formData.specialty,
          location: formData.location,
          instagram: formData.instagram,
          website: formData.website,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      await refreshUserProfile();
      toast.success("Profile updated successfully");
      
      if (onProfileUpdate && userProfile) {
        // Call the callback with updated profile
        onProfileUpdate({
          ...userProfile,
          ...formData
        });
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
        <CardDescription>
          Update your profile to help clients find and connect with you
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Display Name */}
            <div className="space-y-2">
              <Label htmlFor="full_name">Display Name</Label>
              <Input
                id="full_name"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Your professional name"
                required
              />
            </div>
            
            {/* Specialty */}
            <div className="space-y-2">
              <Label htmlFor="specialty">Specialty</Label>
              <Select
                value={formData.specialty}
                onValueChange={handleSpecialtyChange}
              >
                <SelectTrigger id="specialty">
                  <SelectValue placeholder="Select your specialty" />
                </SelectTrigger>
                <SelectContent>
                  {SPECIALTIES.map(specialty => (
                    <SelectItem key={specialty} value={specialty}>
                      {specialty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="City, State"
              />
            </div>
            
            {/* Instagram URL */}
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                placeholder="@yourusername"
              />
            </div>
            
            {/* Website URL */}
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://yourwebsite.com"
              />
            </div>
            
            {/* Bio - Full width */}
            <div className="space-y-2 col-span-1 md:col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                placeholder="Tell clients about yourself and your work..."
                className="min-h-[120px] resize-none"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={updating}>
            {updating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileForm;
