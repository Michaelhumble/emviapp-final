
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Control } from 'react-hook-form';
import { JobFormValues } from '../job/jobFormSchema';
import { Checkbox } from '@/components/ui/checkbox';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { JobTemplateType } from '@/utils/jobs/jobTemplates';
import { useTranslation } from '@/hooks/useTranslation';

// Define specialties and requirements for different industries
const industryOptions = {
  nails: {
    specialties: [
      'Manicure', 'Pedicure', 'Gel', 'Acrylic', 'Dipping Powder', 
      'Nail Art', 'Pink & White', 'Shellac', 'Polish Change'
    ],
    requirements: [
      'Nail License', '1+ Year Experience', '2+ Years Experience', 'Speaks English',
      'Bilingual Vietnamese', 'Customer Service Skills', 'Nail Art Skills', 'Full-time Available'
    ]
  },
  hair: {
    specialties: [
      'Cutting', 'Coloring', 'Highlights', 'Balayage', 'Extensions', 
      'Blowouts', 'Styling', 'Men\'s Cuts', 'Women\'s Cuts', 'Children\'s Cuts'
    ],
    requirements: [
      'Cosmetology License', '1+ Year Experience', '2+ Years Experience', 'Speaks English',
      'Portfolio Required', 'Customer Service Skills', 'Color Certification', 'Full-time Available'
    ]
  },
  lashes: {
    specialties: [
      'Classic Lashes', 'Volume Lashes', 'Hybrid Lashes', 'Mega Volume', 'Lash Lifts',
      'Lash Tinting', 'Brow Lamination', 'Brow Tinting'
    ],
    requirements: [
      'Esthetician License', 'Lash Certification', '1+ Year Experience', 'Speaks English',
      'Portfolio Required', 'Customer Service Skills', 'Attention to Detail', 'Full-time Available'
    ]
  },
  barber: {
    specialties: [
      'Fades', 'Tapers', 'Hot Towel Shaves', 'Beard Trims', 'Line-ups',
      'Hair Design', 'Hair Tattoos', 'Straight Razor'
    ],
    requirements: [
      'Barber License', '1+ Year Experience', '2+ Years Experience', 'Speaks English',
      'Portfolio Required', 'Customer Service Skills', 'Own Tools Required', 'Full-time Available'
    ]
  },
  skincare: {
    specialties: [
      'Facials', 'Chemical Peels', 'Microdermabrasion', 'Waxing', 'Microblading',
      'LED Therapy', 'Dermaplaning', 'Skin Analysis'
    ],
    requirements: [
      'Esthetician License', '1+ Year Experience', '2+ Years Experience', 'Speaks English',
      'Product Knowledge', 'Customer Service Skills', 'Skincare Certification', 'Full-time Available'
    ]
  },
  spa: {
    specialties: [
      'Body Treatments', 'Body Scrubs', 'Body Wraps', 'Hot Stone Therapy', 'Aromatherapy',
      'Hydrotherapy', 'Wellness Counseling', 'Foot Treatments'
    ],
    requirements: [
      'Massage License', 'Spa Certification', '1+ Year Experience', 'Speaks English',
      'Treatment Knowledge', 'Customer Service Skills', 'Wellness Knowledge', 'Full-time Available'
    ]
  },
  massage: {
    specialties: [
      'Swedish', 'Deep Tissue', 'Sports Massage', 'Hot Stone', 'Prenatal',
      'Reflexology', 'Thai Massage', 'Shiatsu'
    ],
    requirements: [
      'Massage License', '1+ Year Experience', '2+ Years Experience', 'Speaks English',
      'Multiple Modalities', 'Customer Service Skills', 'Physical Stamina', 'Full-time Available'
    ]
  },
  makeup: {
    specialties: [
      'Bridal', 'Special Event', 'Editorial', 'Airbrush', 'HD Makeup',
      'Natural Makeup', 'Halloween/SFX', 'Contouring'
    ],
    requirements: [
      'Cosmetology License', 'Makeup Certification', '1+ Year Experience', 'Speaks English',
      'Portfolio Required', 'Customer Service Skills', 'Own Kit Required', 'Weekend Availability'
    ]
  },
  custom: {
    specialties: [
      'Hair Services', 'Nail Services', 'Skincare', 'Massage', 'Makeup',
      'Waxing', 'Lash & Brow', 'Spa Treatments', 'Barbering', 'Administrative'
    ],
    requirements: [
      'Professional License', '1+ Year Experience', '2+ Years Experience', 'Speaks English',
      'Bilingual Vietnamese', 'Customer Service Skills', 'Technical Skills', 'Full-time Available'
    ]
  }
};

// For any industry not specifically defined, use the custom options
const getIndustryOptions = (industry: string) => {
  return industryOptions[industry as keyof typeof industryOptions] || industryOptions.custom;
};

interface IndustrySpecialtiesSectionProps {
  control: Control<JobFormValues>;
  industry: JobTemplateType | 'custom';
}

const IndustrySpecialtiesSection: React.FC<IndustrySpecialtiesSectionProps> = ({ 
  control,
  industry
}) => {
  const { t } = useTranslation();
  const options = getIndustryOptions(industry);
  
  // Default to the current industry tab
  const [activeTab, setActiveTab] = React.useState('specialties');

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">
          {t({
            english: 'Job Specialties & Requirements',
            vietnamese: 'Chuyên Môn & Yêu Cầu Công Việc'
          })}
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          {t({
            english: 'Select the skills and requirements for this position',
            vietnamese: 'Chọn kỹ năng và yêu cầu cho vị trí này'
          })}
        </p>
      </div>

      <Tabs defaultValue="specialties" className="w-full">
        <TabsList className="w-full mb-6">
          <TabsTrigger 
            value="specialties" 
            className="flex-1"
            onClick={() => setActiveTab('specialties')}
          >
            {t({
              english: 'Specialties',
              vietnamese: 'Chuyên Môn'
            })}
          </TabsTrigger>
          <TabsTrigger 
            value="requirements" 
            className="flex-1"
            onClick={() => setActiveTab('requirements')}
          >
            {t({
              english: 'Requirements',
              vietnamese: 'Yêu Cầu'
            })}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="specialties" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            <FormField
              control={control}
              name="specialties"
              render={({ field }) => {
                return options.specialties.map((specialty, index) => (
                  <FormItem
                    key={`specialty-${index}`}
                    className="flex flex-row items-start space-x-3 space-y-0 py-1"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(specialty)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...(field.value || []), specialty]
                            : (field.value || []).filter((val) => val !== specialty);
                          field.onChange(updatedValue);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">{specialty}</FormLabel>
                  </FormItem>
                ));
              }}
            />
          </div>
        </TabsContent>

        <TabsContent value="requirements" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            <FormField
              control={control}
              name="requirements"
              render={({ field }) => {
                return options.requirements.map((requirement, index) => (
                  <FormItem
                    key={`requirement-${index}`}
                    className="flex flex-row items-start space-x-3 space-y-0 py-1"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(requirement)}
                        onCheckedChange={(checked) => {
                          const updatedValue = checked
                            ? [...(field.value || []), requirement]
                            : (field.value || []).filter((val) => val !== requirement);
                          field.onChange(updatedValue);
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">{requirement}</FormLabel>
                  </FormItem>
                ));
              }}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default IndustrySpecialtiesSection;
