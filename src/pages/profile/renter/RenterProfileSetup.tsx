
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth';
import Layout from '@/components/layout/Layout';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';

const RenterProfileSetup = () => {
  const { user, userProfile, refreshUserProfile } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: userProfile?.full_name || '',
    specialty: userProfile?.specialty || '',
    yearsExperience: userProfile?.years_experience || '',
    location: userProfile?.location || '',
    phoneNumber: userProfile?.phone || '',
    instagram: userProfile?.instagram || '',
    website: userProfile?.website || '',
    bio: userProfile?.bio || '',
  });

  const [loading, setLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(userProfile?.avatar_url || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleYearsChange = (value: string) => {
    setFormData(prev => ({ ...prev, yearsExperience: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('users')
        .update({
          full_name: formData.fullName,
          specialty: formData.specialty,
          years_experience: parseInt(formData.yearsExperience as string) || 0,
          location: formData.location,
          phone: formData.phoneNumber,
          instagram: formData.instagram,
          website: formData.website,
          bio: formData.bio,
          role: 'renter',
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      await refreshUserProfile();
      toast.success("Profile saved successfully");
      navigate('/dashboard');
    } catch (error: any) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/dashboard');
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${user?.id}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `avatars/${fileName}`;
    
    try {
      setLoading(true);
      
      // Upload image to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('profiles')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data } = supabase.storage
        .from('profiles')
        .getPublicUrl(filePath);
        
      if (data) {
        // Update avatar URL in users table
        const { error: updateError } = await supabase
          .from('users')
          .update({ avatar_url: data.publicUrl })
          .eq('id', user?.id);
          
        if (updateError) throw updateError;
        
        setAvatarUrl(data.publicUrl);
        await refreshUserProfile();
        toast.success("Profile photo updated");
      }
    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload profile photo");
    } finally {
      setLoading(false);
    }
  };

  const experienceOptions = [
    { value: '0', label: 'Less than 1 year' },
    { value: '1', label: '1 year' },
    { value: '2', label: '2 years' },
    { value: '3', label: '3 years' },
    { value: '4', label: '4 years' },
    { value: '5', label: '5 years' },
    { value: '6', label: '6 years' },
    { value: '7', label: '7 years' },
    { value: '8', label: '8 years' },
    { value: '9', label: '9 years' },
    { value: '10', label: '10+ years' },
  ];

  return (
    <Layout>
      <div className="container max-w-3xl py-10 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Complete Your Booth Renter Profile</h1>
          <p className="text-muted-foreground">Set up your profile and showcase your skills to potential clients</p>
        </div>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center mb-8">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="text-xl">
                  {formData.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <input
                  type="file"
                  id="avatar"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <Label htmlFor="avatar" className="cursor-pointer">
                  <Button type="button" variant="outline" size="sm" className="cursor-pointer">
                    Upload Photo
                  </Button>
                </Label>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Input 
                  id="specialty" 
                  name="specialty" 
                  value={formData.specialty} 
                  onChange={handleChange} 
                  placeholder="e.g., Nails, Hair, Lashes, etc." 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yearsExperience">Years of Experience</Label>
                <Select 
                  onValueChange={handleYearsChange} 
                  defaultValue={formData.yearsExperience?.toString() || '0'}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange} 
                  placeholder="City, State" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input 
                  id="phoneNumber" 
                  name="phoneNumber" 
                  value={formData.phoneNumber} 
                  onChange={handleChange} 
                  placeholder="(123) 456-7890" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input 
                    id="instagram" 
                    name="instagram" 
                    value={formData.instagram} 
                    onChange={handleChange} 
                    placeholder="@yourhandle" 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website">Website or Booking Link</Label>
                  <Input 
                    id="website" 
                    name="website" 
                    value={formData.website} 
                    onChange={handleChange} 
                    placeholder="https://your-website.com" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio" 
                  name="bio" 
                  value={formData.bio} 
                  onChange={handleChange} 
                  placeholder="Tell clients about yourself, your skills, and your services..." 
                  rows={4} 
                />
              </div>
            </div>
            
            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleSkip}
                disabled={loading}
              >
                Skip for now
              </Button>
              
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </span>
                ) : (
                  'Save & Continue'
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default RenterProfileSetup;
