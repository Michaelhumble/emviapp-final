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

const BoothRenterSetup = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(getLanguagePreference());
  
  const [formData, setFormData] = useState({
    fullName: userProfile?.full_name || '',
    location: userProfile?.location || '',
    bio: userProfile?.bio || '',
    specialty: userProfile?.specialty || '',
    salonName: userProfile?.salon_name || '',
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        description: "Booth renter profile saved. Welcome to your dashboard!",
      });
      
      navigate('/dashboard/renter');
    } catch (error) {
      console.error("Error saving profile:", error);
      toast({
        description: "Failed to save profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const texts = {
    en: {
      title: "Create your booth renter profile",
      subtitle: "Share your information to connect with clients",
      nameLabel: "Full Name",
      salonNameLabel: "Current Salon",
      locationLabel: "Location",
      bioLabel: "Bio",
      bioPlaceholder: "Tell clients about your style, expertise, and what makes you unique...",
      specialtyLabel: "Specialty",
      experienceLabel: "Years of Experience",
      submit: "Save & Continue",
      avatarUpload: "Upload Photo"
    },
    vi: {
      title: "Tạo hồ sơ thuê ghế của bạn",
      subtitle: "Chia sẻ thông tin của bạn để kết nối với khách hàng",
      nameLabel: "Họ và tên",
      salonNameLabel: "Tiệm hiện tại",
      locationLabel: "Địa điểm",
      bioLabel: "Tiểu sử",
      bioPlaceholder: "Nói với khách hàng về phong cách, chuyên môn của bạn và điều gì làm bạn trở nên độc đáo...",
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
                <Label htmlFor="salonName">{t.salonNameLabel}</Label>
                <Input 
                  id="salonName" 
                  name="salonName" 
                  value={formData.salonName} 
                  onChange={handleChange} 
                />
              </div>
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

export default BoothRenterSetup;
