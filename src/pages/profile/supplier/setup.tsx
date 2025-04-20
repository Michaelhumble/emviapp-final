
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
import { Building, Globe, MapPin, Upload } from 'lucide-react';
import { SupplierProfileTracker } from '@/components/progress/SupplierProfileTracker';
import { useSupplierProfileValidation } from '@/hooks/useSupplierProfileValidation';

const SUPPLIER_CATEGORIES = [
  "Beauty Products",
  "Salon Equipment",
  "Professional Tools",
  "Styling Products",
  "Hair Care",
  "Skincare",
  "Nail Care",
  "Apparel",
  "Accessories",
  "Other"
];

const SupplierSetup = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useAuth();
  const { validateAndSave } = useSupplierProfileValidation();
  
  const [formData, setFormData] = useState({
    companyName: userProfile?.company_name || '',
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
        full_name: formData.companyName,
        company_name: formData.companyName,
        specialty: formData.specialty,
        location: formData.location,
        website: formData.website,
        bio: formData.bio,
        avatar_url: finalAvatarUrl || undefined
      });
      
      if (success) {
        navigate('/dashboard/supplier');
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
          <h1 className="text-3xl font-serif font-bold mb-2">Complete Your Supplier Profile</h1>
          <p className="text-muted-foreground">Tell potential customers about your business and products</p>
        </div>
        
        <SupplierProfileTracker userProfile={userProfile} />
        
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Business Information</CardTitle>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col items-center mb-8">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={avatarUrl || undefined} />
                  <AvatarFallback>
                    <Building className="h-12 w-12 text-muted-foreground" />
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
                    <Upload className="h-4 w-4 inline mr-2" />
                    {avatarUrl ? "Change Logo" : "Upload Logo"}
                  </Label>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Business Name</Label>
                  <Input 
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    placeholder="Your business name"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="specialty">Business Category</Label>
                  <Select 
                    value={formData.specialty}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, specialty: value }))}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your business category" />
                    </SelectTrigger>
                    <SelectContent>
                      {SUPPLIER_CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> Location
                  </Label>
                  <Input 
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="City, State"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="website" className="flex items-center gap-1">
                    <Globe className="h-4 w-4" /> Website
                  </Label>
                  <Input 
                    id="website"
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    placeholder="https://your-website.com"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Business Description</Label>
                  <Textarea 
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about your business and the products you offer..."
                    rows={4}
                    required
                  />
                  <span className="text-xs text-muted-foreground">
                    Minimum 10 characters
                  </span>
                </div>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isLoading} className="min-w-[120px]">
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
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

export default SupplierSetup;
