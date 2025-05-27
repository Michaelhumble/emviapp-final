
import React from 'react';
import { Button } from '@/components/ui/button';
import { SalonFormValues } from './salonFormSchema';
import { SalonIdentitySection } from './SalonIdentitySection';
import { SalonLocationSection } from './SalonLocationSection';
import { ArrowRight } from 'lucide-react';

interface SalonDetailsSectionProps {
  formData: Partial<SalonFormValues>;
  onUpdate: (data: Partial<SalonFormValues>) => void;
  onNext: () => void;
}

const SalonDetailsSection: React.FC<SalonDetailsSectionProps> = ({
  formData,
  onUpdate,
  onNext
}) => {
  const handleFieldChange = (field: keyof SalonFormValues, value: any) => {
    onUpdate({
      ...formData,
      [field]: value
    });
  };

  const mockForm = {
    control: {
      _formValues: formData
    },
    watch: (field: string) => formData[field as keyof SalonFormValues],
    setValue: handleFieldChange
  } as any;

  const isValid = formData.salonName && formData.city && formData.state && formData.businessType;

  return (
    <div className="space-y-8">
      <SalonIdentitySection form={mockForm} />
      <SalonLocationSection form={mockForm} />
      
      <div className="flex justify-end">
        <Button 
          onClick={onNext}
          disabled={!isValid}
          className="bg-purple-600 hover:bg-purple-700 text-white px-8 flex items-center gap-2"
        >
          Next: Add Photos
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SalonDetailsSection;
