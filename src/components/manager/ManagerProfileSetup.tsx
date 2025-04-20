
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSalonManagerProfile } from '@/hooks/useSalonManagerProfile';
import { Upload, Loader2, User } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

export const ManagerProfileSetup = () => {
  const { user } = useAuth();
  const { saveProfile, isLoading } = useSalonManagerProfile();
  const [profilePhotoUrl, setProfilePhotoUrl] = useState<string>('');
  const [formData, setFormData] = useState({
    full_name: '',
    job_title: '',
    phone: '',
  });
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && user) {
      try {
        const fileExt = file.name.split('.').pop();
        const filePath = `${user.id}-${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('avatars')
          .upload(filePath, file);
          
        if (uploadError) throw uploadError;
        
        if (data) {
          const { data: { publicUrl } } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);
            
          setProfilePhotoUrl(publicUrl);
        }
      } catch (error) {
        console.error('Error uploading photo:', error);
      }
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await saveProfile({
      ...formData,
      profile_photo_url: profilePhotoUrl
    });
  };
  
  // Calculate completion percentage
  const requiredFields = ['full_name', 'job_title', 'phone'];
  const filledFields = requiredFields.filter(field => 
    formData[field as keyof typeof formData]?.trim().length > 0
  );
  const completionPercentage = Math.floor((filledFields.length / requiredFields.length) * 100);
  
  // Hide progress if complete
  const showProgress = completionPercentage < 100;
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Manager Profile Setup</span>
          {showProgress && (
            <span className="text-sm font-normal">
              {completionPercentage}% Complete
            </span>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center gap-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profilePhotoUrl} />
              <AvatarFallback>
                <User className="h-12 w-12 text-muted-foreground" />
              </AvatarFallback>
            </Avatar>
            
            <input
              id="photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            <Label
              htmlFor="photo"
              className="cursor-pointer inline-flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-secondary-foreground px-4 py-2 rounded-md"
            >
              <Upload className="h-4 w-4" />
              {profilePhotoUrl ? "Change Photo" : "Upload Photo"}
            </Label>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="full_name">Full Name*</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={e => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="job_title">Job Title*</Label>
              <Input
                id="job_title"
                value={formData.job_title}
                onChange={e => setFormData(prev => ({ ...prev, job_title: e.target.value }))}
                placeholder="e.g. Shift Manager, Operations Lead"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Contact Phone*</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="Enter phone number"
                required
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : "Save Profile"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
