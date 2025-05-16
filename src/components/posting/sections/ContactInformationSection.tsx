
import React from 'react';
import { Job } from '@/types/job';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from '@/hooks/useTranslation';
import { jobPostingTranslations } from '@/translations/jobPostingForm';

interface ContactInformationSectionProps {
  contactInfo: Partial<Job['contact_info']>;
  onChange: (contactInfo: Partial<Job['contact_info']>) => void;
}

const ContactInformationSection = ({ contactInfo = {}, onChange }: ContactInformationSectionProps) => {
  const { t } = useTranslation();
  const translations = jobPostingTranslations.contactInfo;
  const validationMessages = jobPostingTranslations.validation;

  // Basic phone number validation
  const validatePhoneNumber = (phone: string) => {
    // Allow empty for optional field
    if (!phone) return true;
    
    // Basic validation for digits, spaces, parentheses, dashes, and plus sign
    const validPhonePattern = /^[0-9\s()\-+]+$/;
    return validPhonePattern.test(phone);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    
    // Only update if valid or empty
    if (validatePhoneNumber(phoneValue)) {
      onChange({ ...contactInfo, phone: phoneValue });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t(translations.sectionTitle)}</h2>
      <p className="text-muted-foreground">{t(translations.sectionDescription)}</p>
      
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="owner-name">{t(translations.contactName)}</Label>
          <Input 
            id="owner-name"
            value={contactInfo?.owner_name || ''}
            onChange={(e) => onChange({ ...contactInfo, owner_name: e.target.value })}
            placeholder={t(translations.contactNamePlaceholder)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="phone">{t(translations.contactPhone)}</Label>
          <Input 
            id="phone"
            type="tel"
            value={contactInfo?.phone || ''}
            onChange={handlePhoneChange}
            placeholder={t(translations.contactPhonePlaceholder)}
          />
          <p className="text-xs text-muted-foreground">
            {t(translations.phoneHelperText)}
          </p>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="email">{t(translations.email)}</Label>
          <Input 
            id="email"
            type="email"
            value={contactInfo?.email || ''}
            onChange={(e) => onChange({ ...contactInfo, email: e.target.value })}
            placeholder={t(translations.emailPlaceholder)}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="zalo">{t(translations.zalo)}</Label>
          <Input 
            id="zalo"
            value={contactInfo?.zalo || ''}
            onChange={(e) => onChange({ ...contactInfo, zalo: e.target.value })}
            placeholder={t(translations.zaloPlaceholder)}
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="notes">{t(translations.additionalNotes)}</Label>
          <Textarea
            id="notes"
            value={contactInfo?.notes || ''}
            onChange={(e) => onChange({ ...contactInfo, notes: e.target.value })}
            placeholder={t(translations.additionalNotesPlaceholder)}
            className="min-h-[80px]"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInformationSection;
