
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { getLanguagePreference } from '@/utils/languagePreference';

const Contact = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const language = getLanguagePreference();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Insert data into Supabase
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          user_id: user?.id || null
        });
      
      if (error) throw error;
      
      toast.success(language === 'en' ? 'Message sent successfully!' : 'Tin nhắn đã được gửi thành công!');
      setFormData({ name: '', email: '', message: '' });
    } catch (error: any) {
      console.error('Error sending message:', error);
      toast.error(language === 'en' ? 'Failed to send message' : 'Không thể gửi tin nhắn');
    } finally {
      setLoading(false);
    }
  };

  const translations = {
    en: {
      title: 'Contact Us',
      subtitle: 'Have questions or feedback? We\'d love to hear from you.',
      namePlaceholder: 'Your name',
      emailPlaceholder: 'Your email address',
      messagePlaceholder: 'Your message',
      submitButton: 'Send Message',
      sending: 'Sending...',
      nameLabel: 'Name',
      emailLabel: 'Email',
      messageLabel: 'Message'
    },
    vi: {
      title: 'Liên Hệ Với Chúng Tôi',
      subtitle: 'Bạn có câu hỏi hoặc phản hồi? Chúng tôi rất muốn nghe từ bạn.',
      namePlaceholder: 'Tên của bạn',
      emailPlaceholder: 'Địa chỉ email của bạn',
      messagePlaceholder: 'Tin nhắn của bạn',
      submitButton: 'Gửi Tin Nhắn',
      sending: 'Đang gửi...',
      nameLabel: 'Tên',
      emailLabel: 'Email',
      messageLabel: 'Tin nhắn'
    }
  };

  const t = translations[language === 'vi' ? 'vi' : 'en'];
  
  return (
    <Layout>
      <div className="container max-w-4xl py-12 px-4 md:py-16">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">{t.title}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        
        <div className="bg-card rounded-lg shadow-sm p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">{t.nameLabel}</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder={t.namePlaceholder} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">{t.emailLabel}</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder={t.emailPlaceholder} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">{t.messageLabel}</Label>
              <Textarea 
                id="message" 
                name="message" 
                value={formData.message} 
                onChange={handleChange} 
                placeholder={t.messagePlaceholder} 
                rows={6} 
                required 
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t.sending}
                </span>
              ) : t.submitButton}
            </Button>
          </form>
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">
            {language === 'en' ? 'Our Office' : 'Văn Phòng Của Chúng Tôi'}
          </h2>
          <p className="text-muted-foreground">
            {language === 'en' ? '123 Beauty Street, Suite 100' : '123 Đường Làm Đẹp, Phòng 100'}<br />
            {language === 'en' ? 'Los Angeles, CA 90210' : 'Los Angeles, CA 90210'}<br />
            {language === 'en' ? 'Email: hello@emviapp.com' : 'Email: hello@emviapp.com'}<br />
            {language === 'en' ? 'Phone: (123) 456-7890' : 'Điện thoại: (123) 456-7890'}
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
