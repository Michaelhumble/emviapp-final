
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/auth';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { User, Image, MapPin, Link, Loader2 } from 'lucide-react';
import { FreelancerProfileTracker } from '@/components/progress/FreelancerProfileTracker';
import { useFreelancerProfileValidation } from '@/hooks/useFreelancerProfileValidation';

const SPECIALTIES = [
  "Makeup Artist",
  "Photographer",
  "Lash Artist",
  "Hair Stylist",
  "Nail Artist",
  "Esthetician",
  "Massage Therapist",
  "Tattoo Artist",
  "Beauty Consultant",
  "Other"
];

const FreelancerSetup = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const { validateAndSave } = useFreelancerProfileValidation();
  
  const [formData, setFormData] = useState({
    fullName: userProfile?.full_name || '',
    specialty: userProfile?.specialty || '',
    location: userProfile?.location || '',
    website: userProfile?.website || '',
    bio: userProfile?.bio || '',
  });
  
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(userProfile?.avatar_url || null);
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    if (!user) {
      navigate('/auth/signin');
    }
  }, [user, navigate]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      let finalAvatarUrl = avatarUrl;
      
      if (avatarFile) {
        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('avatars')
          .upload(fileName, avatarFile);
        
        if (uploadError) throw uploadError;
        
        if (data) {
          const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(fileName);
          
          finalAvatarUrl = publicUrl;
        }
      }
      
      const success = await validateAndSave({
        full_name: formData.fullName,
        specialty: formData.specialty,
        location: formData.location,
        website: formData.website,
        bio: formData.bio,
        avatar_url: finalAvatarUrl || undefined
      });
      
      if (success) {
        navigate('/dashboard/freelancer');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Layout>
      <div className="container max-w-3xl py-10 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">Complete Your Freelancer Profile</h1>
          <p className="text-muted-foreground">Help clients discover your services and expertise</p>
        </div>
        
        <FreelancerProfileTracker userProfile={userProfile} />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Profile Information</CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center mb-8">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={avatarUrl || undefined} />
                  <AvatarFallback>
                    <User className="h-12 w-12 text-muted-foreground" />
                  </AvatarFallback>
                </Avatar>
                
                <div>
                  <input
                    id="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Label
                    htmlFor="avatar"
                    className="cursor-pointer bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md"
                  >
                    <Image className="h-4 w-4 inline mr-2" />
                    {avatarUrl ? "Change Photo" : "Upload Photo"}
                  </Label>
                </div>
              </div>
              
              <div className="grid gap-6">
                <div>
                  <Label htmlFor="fullName">Full Name <span className="text-red-500">*</span></Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                    placeholder="Your professional name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="specialty">Specialty <span className="text-red-500">*</span></Label>
                  <Select 
                    value={formData.specialty}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, specialty: value }))}
                    required
                  >
                    <SelectTrigger>
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
                
                <div>
                  <Label htmlFor="location" className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> Location <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="City, State"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="website" className="flex items-center gap-1">
                    <Link className="h-4 w-4" /> Website or Portfolio Link
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://your-portfolio.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio <span className="text-red-500">*</span></Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell potential clients about your experience and expertise..."
                    rows={4}
                    required
                  />
                  <span className="text-xs text-muted-foreground mt-1">
                    Minimum 10 characters
                  </span>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isLoading} className="min-w-[120px]">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Saving...
                    </>
                  ) : "Save Profile"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default FreelancerSetup;
