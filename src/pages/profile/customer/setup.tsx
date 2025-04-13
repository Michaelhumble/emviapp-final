
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth';
import Layout from '@/components/layout/Layout';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { getLanguagePreference } from '@/utils/languagePreference';

const CustomerSetup = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [language, setLanguage] = useState(getLanguagePreference());
  
  const [formData, setFormData] = useState({
    fullName: userProfile?.full_name || '',
    location: userProfile?.location || '',
    preferences: userProfile?.preferences?.join(', ') || '',
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
      
      toast("Customer profile saved. Welcome to your dashboard!");
      
      navigate('/dashboard/customer');
    } catch (error) {
      console.error("Error saving profile:", error);
      toast("Failed to save profile. Please try again.", {
        style: { backgroundColor: 'rgb(220, 38, 38)', color: 'white' }
      });
    } finally {
      setLoading(false);
    }
  };

  const texts = {
    en: {
      title: "Complete your customer profile",
      subtitle: "Help us personalize your experience",
      nameLabel: "Full Name",
      locationLabel: "Location",
      preferencesLabel: "Beauty Preferences",
      preferencesPlaceholder: "e.g., nail art, gel manicures, acrylic nails, natural looks...",
      submit: "Save & Continue",
      avatarUpload: "Upload Photo"
    },
    vi: {
      title: "Hoàn thành hồ sơ khách hàng của bạn",
      subtitle: "Giúp chúng tôi cá nhân hóa trải nghiệm của bạn",
      nameLabel: "Họ và tên",
      locationLabel: "Địa điểm",
      preferencesLabel: "Sở thích làm đẹp",
      preferencesPlaceholder: "Ví dụ: nail art, gel manicures, móng acrylic, phong cách tự nhiên...",
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
            
            <div className="space-y-2">
              <Label htmlFor="preferences">{t.preferencesLabel}</Label>
              <Textarea 
                id="preferences" 
                name="preferences" 
                value={formData.preferences} 
                onChange={handleChange} 
                placeholder={t.preferencesPlaceholder}
                rows={3} 
              />
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

export default CustomerSetup;
