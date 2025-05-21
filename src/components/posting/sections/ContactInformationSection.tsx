
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from '@/hooks/useTranslation';
import { jobPostingTranslations } from '@/translations/jobPostingForm';

interface ContactInfo {
  salon_name?: string;
  owner_name?: string;
  phone?: string;
  email?: string;
  notes?: string;
  zalo?: string;
}

interface ContactInformationSectionProps {
  contactInfo: ContactInfo;
  onChange: (info: ContactInfo) => void;
}

const ContactInformationSection: React.FC<ContactInformationSectionProps> = ({ 
  contactInfo, 
  onChange 
}) => {
  const { t } = useTranslation();
  const contactInfoTranslations = jobPostingTranslations.contactInfo;
  const validationTranslations = jobPostingTranslations.validation;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    onChange({
      ...contactInfo,
      [name]: value
    });
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t(contactInfoTranslations.title)}</h2>
      
      {/* Salon Name */}
      <div>
        <Label htmlFor="salon_name" className="text-base">
          {t(contactInfoTranslations.salonName)} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="salon_name"
          name="salon_name"
          placeholder={t(contactInfoTranslations.salonNamePlaceholder)}
          value={contactInfo.salon_name || ''}
          onChange={handleInputChange}
          className="mt-1.5"
          required
        />
      </div>
      
      {/* Owner/Manager Name */}
      <div>
        <Label htmlFor="owner_name" className="text-base">
          {t(contactInfoTranslations.ownerName)}
        </Label>
        <Input
          id="owner_name"
          name="owner_name"
          placeholder={t(contactInfoTranslations.ownerNamePlaceholder)}
          value={contactInfo.owner_name || ''}
          onChange={handleInputChange}
          className="mt-1.5"
        />
      </div>
      
      {/* Phone Number */}
      <div>
        <Label htmlFor="phone" className="text-base">
          {t(contactInfoTranslations.phone)}
        </Label>
        <Input
          id="phone"
          name="phone"
          placeholder={t(contactInfoTranslations.phonePlaceholder)}
          value={contactInfo.phone || ''}
          onChange={handleInputChange}
          className="mt-1.5"
          type="tel"
        />
      </div>
      
      {/* Email Address */}
      <div>
        <Label htmlFor="email" className="text-base">
          {t(contactInfoTranslations.email)} <span className="text-red-500">*</span>
        </Label>
        <Input
          id="email"
          name="email"
          placeholder={t(contactInfoTranslations.emailPlaceholder)}
          value={contactInfo.email || ''}
          onChange={handleInputChange}
          className="mt-1.5"
          type="email"
          required
        />
      </div>
      
      {/* Zalo ID */}
      <div>
        <Label htmlFor="zalo" className="text-base">
          {t(contactInfoTranslations.zalo)}
        </Label>
        <Input
          id="zalo"
          name="zalo"
          placeholder={t(contactInfoTranslations.zaloPlaceholder)}
          value={contactInfo.zalo || ''}
          onChange={handleInputChange}
          className="mt-1.5"
        />
      </div>
      
      {/* Additional Notes */}
      <div>
        <Label htmlFor="notes" className="text-base">
          {t(contactInfoTranslations.notes)}
        </Label>
        <Textarea
          id="notes"
          name="notes"
          placeholder={t(contactInfoTranslations.notesPlaceholder)}
          value={contactInfo.notes || ''}
          onChange={handleInputChange}
          className="mt-1.5"
        />
      </div>
    </div>
  );
};

export default ContactInformationSection;
