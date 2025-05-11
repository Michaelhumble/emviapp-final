
import React from 'react';
import { Job } from '@/types/job';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from '@/hooks/useTranslation';
import SectionHeader from '../SectionHeader';
import { User, Phone, Mail, MessageSquare } from 'lucide-react';

interface ContactInformationSectionProps {
  contactInfo: Job['contact_info'];
  onChange: (contactInfo: Job['contact_info']) => void;
}

const ContactInformationSection = ({ contactInfo = {}, onChange }: ContactInformationSectionProps) => {
  const { t, isVietnamese } = useTranslation();

  return (
    <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border mt-8">
      <SectionHeader 
        emoji="📍" 
        title={t('Contact Information', 'Thông tin liên lạc')}
        description={t('Provide contact details for interested candidates', 'Cung cấp thông tin liên lạc cho ứng viên quan tâm')}
      />
      
      <div className="grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="owner-name" className="text-base font-medium">{t('Contact Name', 'Tên liên lạc')}</Label>
          <div className="relative">
            <Input 
              id="owner-name"
              value={contactInfo.owner_name || ''}
              onChange={(e) => onChange({ ...contactInfo, owner_name: e.target.value })}
              placeholder={t('Your name or business name', 'Tên của bạn hoặc tên doanh nghiệp')}
              className="pl-9 h-12"
              required
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="phone" className="text-base font-medium">{t('Phone Number', 'Số điện thoại')}</Label>
          <div className="relative">
            <Input 
              id="phone"
              type="tel"
              value={contactInfo.phone || ''}
              onChange={(e) => onChange({ ...contactInfo, phone: e.target.value })}
              placeholder={t('e.g. (555) 123-4567', 'VD: (555) 123-4567')}
              className="pl-9 h-12"
              required
            />
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email" className="text-base font-medium">{t('Email Address', 'Địa chỉ email')}</Label>
          <div className="relative">
            <Input 
              id="email"
              type="email"
              value={contactInfo.email || ''}
              onChange={(e) => onChange({ ...contactInfo, email: e.target.value })}
              placeholder={t('e.g. youremail@example.com', 'VD: email@example.com')}
              className="pl-9 h-12"
              required
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="zalo" className="text-base font-medium">{t('Zalo (Optional)', 'Zalo (Không bắt buộc)')}</Label>
          <Input 
            id="zalo"
            value={contactInfo.zalo || ''}
            onChange={(e) => onChange({ ...contactInfo, zalo: e.target.value })}
            placeholder={t('Your Zalo contact', 'Liên hệ Zalo của bạn')}
            className="h-12"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="notes" className="text-base font-medium">{t('Additional Contact Notes', 'Ghi chú liên lạc bổ sung')}</Label>
          <div className="relative">
            <Textarea
              id="notes"
              value={contactInfo.notes || ''}
              onChange={(e) => onChange({ ...contactInfo, notes: e.target.value })}
              placeholder={t('Best time to contact, preferred method, etc.', 'Thời gian liên hệ tốt nhất, phương thức ưa thích, v.v.')}
              className="min-h-[80px] pl-9"
            />
            <MessageSquare className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInformationSection;
