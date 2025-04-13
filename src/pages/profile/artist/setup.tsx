
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth';
import Layout from '@/components/layout/Layout';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { getLanguagePreference } from '@/utils/languagePreference';

const ArtistSetup = () => {
  const { user, userProfile } = useAuth();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(getLanguagePreference());
  
  const [formData, setFormData] = useState({
    fullName: userProfile?.full_name || '',
    location: userProfile?.location || '',
    bio: userProfile?.bio || '',
    specialty: userProfile?.specialty || '',
    yearsExperience: userProfile?.years_experience || 0,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // This is just a placeholder - in the real implementation, 
      // we would save to Supabase and handle profile image upload
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Profile saved",
        description: "Welcome to your dashboard!",
      });
      
      navigate('/dashboard/artist');
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const texts = {
    en: {
      title: "Let's make your artist profile shine",
      subtitle: "Tell potential clients about your skills and experience",
      nameLabel: "Full Name",
      locationLabel: "Location",
      bioLabel: "Bio",
      bioPlaceholder: "Share your story, style, and what makes you unique...",
      specialtyLabel: "Specialty",
      experienceLabel: "Years of Experience",
      submit: "Save & Continue",
      avatarUpload: "Upload Photo"
    },
    vi: {
      title: "Hãy làm cho hồ sơ nghệ sĩ của bạn tỏa sáng",
      subtitle: "Kể cho khách hàng tiềm năng về kỹ năng và kinh nghiệm của bạn",
      nameLabel: "Họ và tên",
      locationLabel: "Địa điểm",
      bioLabel: "Tiểu sử",
      bioPlaceholder: "Chia sẻ câu chuyện, phong cách của bạn và điều gì làm bạn trở nên độc đáo...",
      specialtyLabel: "Chuyên môn",
      experienceLabel: "Số năm kinh nghiệm",
      submit: "Lưu & Tiếp tục",
      avatarUpload: "Tải ảnh lên"
    }
  };

  const t = language === 'vi' ? texts.vi : texts.en;

  return (
    <Layout>
      <div className="container max-w-3xl py-10 px-4">
        <div className="flex justify-end mb-4">
          <LanguageToggle />
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold mb-2">{t.title}</h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>
        
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center mb-8">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={userProfile?.avatar_url || undefined} />
                <AvatarFallback className="text-xl">
                  {formData.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button type="button" variant="outline" size="sm">
                {t.avatarUpload}
              </Button>
            </div>
            
            <Separator className="my-6" />
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="fullName">{t.nameLabel}</Label>
                <Input 
                  id="fullName" 
                  name="fullName" 
                  value={formData.fullName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">{t.locationLabel}</Label>
                <Input 
                  id="location" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">{t.bioLabel}</Label>
              <Textarea 
                id="bio" 
                name="bio" 
                value={formData.bio} 
                onChange={handleChange} 
                placeholder={t.bioPlaceholder}
                rows={4} 
              />
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="specialty">{t.specialtyLabel}</Label>
                <Input 
                  id="specialty" 
                  name="specialty" 
                  value={formData.specialty} 
                  onChange={handleChange} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="yearsExperience">{t.experienceLabel}</Label>
                <Input 
                  id="yearsExperience" 
                  name="yearsExperience" 
                  type="number" 
                  min="0" 
                  max="70"
                  value={formData.yearsExperience} 
                  onChange={handleChange} 
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  t.submit
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default ArtistSetup;
