
import React from 'react';
import { Job } from '@/types/job';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from '@/hooks/useTranslation';

interface ContactInformationSectionProps {
  contactInfo: Job['contact_info'];
  onChange: (contactInfo: Job['contact_info']) => void;
}

const ContactInformationSection = ({ contactInfo = {}, onChange }: ContactInformationSectionProps) => {
  const { t, isVietnamese } = useTranslation();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t({
        english: 'Contact Information',
        vietnamese: 'Thông tin liên lạc'
      })}</h2>
      <p className="text-muted-foreground">{t({
        english: 'Provide contact details for interested candidates',
        vietnamese: 'Cung cấp thông tin liên lạc cho ứng viên quan tâm'
      })}</p>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="owner-name">{t({
            english: 'Contact Name',
            vietnamese: 'Tên liên lạc'
          })}</Label>
          <Input 
            id="owner-name"
            value={contactInfo.owner_name || ''}
            onChange={(e) => onChange({ ...contactInfo, owner_name: e.target.value })}
            placeholder={t({
              english: 'Your name or business name',
              vietnamese: 'Tên của bạn hoặc tên doanh nghiệp'
            })}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="phone">{t({
            english: 'Phone Number',
            vietnamese: 'Số điện thoại'
          })}</Label>
          <Input 
            id="phone"
            type="tel"
            value={contactInfo.phone || ''}
            onChange={(e) => onChange({ ...contactInfo, phone: e.target.value })}
            placeholder={t({
              english: 'e.g. (555) 123-4567',
              vietnamese: 'VD: (555) 123-4567'
            })}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">{t({
            english: 'Email Address',
            vietnamese: 'Địa chỉ email'
          })}</Label>
          <Input 
            id="email"
            type="email"
            value={contactInfo.email || ''}
            onChange={(e) => onChange({ ...contactInfo, email: e.target.value })}
            placeholder={t({
              english: 'e.g. youremail@example.com',
              vietnamese: 'VD: email@example.com'
            })}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="zalo">{t({
            english: 'Zalo (Optional)',
            vietnamese: 'Zalo (Không bắt buộc)'
          })}</Label>
          <Input 
            id="zalo"
            value={contactInfo.zalo || ''}
            onChange={(e) => onChange({ ...contactInfo, zalo: e.target.value })}
            placeholder={t({
              english: 'Your Zalo contact',
              vietnamese: 'Liên hệ Zalo của bạn'
            })}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="notes">{t({
            english: 'Additional Contact Notes',
            vietnamese: 'Ghi chú liên lạc bổ sung'
          })}</Label>
          <Textarea
            id="notes"
            value={contactInfo.notes || ''}
            onChange={(e) => onChange({ ...contactInfo, notes: e.target.value })}
            placeholder={t({
              english: 'Best time to contact, preferred method, etc.',
              vietnamese: 'Thời gian liên hệ tốt nhất, phương thức ưa thích, v.v.'
            })}
            className="min-h-[80px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInformationSection;
