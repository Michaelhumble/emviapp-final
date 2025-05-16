
import React from 'react';
import { Job } from '@/types/job';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useTranslation } from '@/hooks/useTranslation';
import { jobPostingTranslations } from '@/translations/jobPostingForm';
import { Shield, Phone, Mail, MessageCircle } from 'lucide-react';

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
      
      <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
        <div className="flex items-center gap-2 text-green-800 mb-2">
          <Shield className="h-5 w-5" />
          <span className="font-medium">{t("Your contact information is protected")}</span>
        </div>
        <p className="text-sm text-green-700">
          {t("We protect your privacy and only share contact details with verified job seekers")}
        </p>
      </div>
      
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="owner-name" className="flex items-center gap-2">
            {t(translations.contactName)}
            <span className="text-xs text-rose-500">*</span>
          </Label>
          <Input 
            id="owner-name"
            value={contactInfo?.owner_name || ''}
            onChange={(e) => onChange({ ...contactInfo, owner_name: e.target.value })}
            placeholder={t(translations.contactNamePlaceholder)}
            required
            className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200 transition-shadow"
          />
          <p className="text-xs text-muted-foreground">
            {t("Your name or the name of the person handling inquiries")}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <Label htmlFor="phone" className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              {t(translations.contactPhone)}
            </Label>
            <Input 
              id="phone"
              type="tel"
              value={contactInfo?.phone || ''}
              onChange={handlePhoneChange}
              placeholder={t(translations.contactPhonePlaceholder)}
              className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200 transition-shadow"
            />
            <p className="text-xs text-muted-foreground">
              {t(translations.phoneHelperText)}
            </p>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              {t(translations.email)}
              <span className="text-xs text-rose-500">*</span>
            </Label>
            <Input 
              id="email"
              type="email"
              value={contactInfo?.email || ''}
              onChange={(e) => onChange({ ...contactInfo, email: e.target.value })}
              placeholder={t(translations.emailPlaceholder)}
              required
              className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200 transition-shadow"
            />
          </div>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="zalo" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-gray-500" />
            {t(translations.zalo)}
          </Label>
          <Input 
            id="zalo"
            value={contactInfo?.zalo || ''}
            onChange={(e) => onChange({ ...contactInfo, zalo: e.target.value })}
            placeholder={t(translations.zaloPlaceholder)}
            className="h-12 bg-white border-gray-200 focus:border-purple-300 focus:ring-purple-200 transition-shadow"
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="notes">{t(translations.additionalNotes)}</Label>
          <Textarea
            id="notes"
            value={contactInfo?.notes || ''}
            onChange={(e) => onChange({ ...contactInfo, notes: e.target.value })}
            placeholder={t(translations.additionalNotesPlaceholder)}
            className="min-h-[80px] bg-white resize-y border-gray-200 focus:border-purple-300 focus:ring-purple-200 transition-shadow"
          />
          <p className="text-xs text-muted-foreground">
            {t("Include preferred contact hours or any special instructions for applicants")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInformationSection;
