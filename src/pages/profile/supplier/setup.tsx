
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/context/auth';
import Layout from '@/components/layout/Layout';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { getLanguagePreference } from '@/utils/languagePreference';

const SupplierSetup = () => {
  const { user, userProfile, updateProfile } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState(getLanguagePreference());
  
  const [formData, setFormData] = useState({
    companyName: userProfile?.company_name || '',
    contactName: userProfile?.full_name || '',
    location: userProfile?.location || '',
    bio: userProfile?.bio || '',
    website: userProfile?.website || '',
    products: userProfile?.services?.join(', ') || '',
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
        title: "Supplier profile saved",
        description: "Welcome to your dashboard!",
      });
      
      navigate('/dashboard/supplier');
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
      title: "Create your supplier profile",
      subtitle: "Connect with salons and beauty professionals",
      companyNameLabel: "Company Name",
      contactNameLabel: "Contact Person",
      locationLabel: "Location",
      websiteLabel: "Website",
      bioLabel: "About Your Business",
      bioPlaceholder: "Describe your business, products offered, and what makes your company unique...",
      productsLabel: "Products Offered",
      productsPlaceholder: "e.g., nail polish, acrylic supplies, salon equipment, treatment products...",
      submit: "Save & Continue",
      logoUpload: "Upload Company Logo"
    },
    vi: {
      title: "Tạo hồ sơ nhà cung cấp của bạn",
      subtitle: "Kết nối với các tiệm và chuyên gia làm đẹp",
      companyNameLabel: "Tên công ty",
      contactNameLabel: "Người liên hệ",
      locationLabel: "Địa điểm",
      websiteLabel: "Website",
      bioLabel: "Giới thiệu về doanh nghiệp",
      bioPlaceholder: "Mô tả doanh nghiệp, sản phẩm cung cấp và điều gì làm công ty của bạn trở nên độc đáo...",
      productsLabel: "Sản phẩm cung cấp",
      productsPlaceholder: "Ví dụ: sơn móng tay, vật liệu acrylic, thiết bị làm đẹp, sản phẩm điều trị...",
      submit: "Lưu & Tiếp tục",
      logoUpload: "Tải lên logo công ty"
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
                  {formData.companyName.split(' ').map(n => n[0]).join('').toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button type="button" variant="outline" size="sm">
                {t.logoUpload}
              </Button>
            </div>
            
            <Separator className="my-6" />
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">{t.companyNameLabel}</Label>
                <Input 
                  id="companyName" 
                  name="companyName" 
                  value={formData.companyName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactName">{t.contactNameLabel}</Label>
                <Input 
                  id="contactName" 
                  name="contactName" 
                  value={formData.contactName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
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
                <Label htmlFor="website">{t.websiteLabel}</Label>
                <Input 
                  id="website" 
                  name="website" 
                  type="url"
                  value={formData.website} 
                  onChange={handleChange} 
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
            
            <div className="space-y-2">
              <Label htmlFor="products">{t.productsLabel}</Label>
              <Textarea 
                id="products" 
                name="products" 
                value={formData.products} 
                onChange={handleChange} 
                placeholder={t.productsPlaceholder}
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

export default SupplierSetup;
