
import React from 'react';
import { Control } from 'react-hook-form';
import { Grid } from '@/components/ui/grid';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { beautySpecialties } from '@/data/specialties';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTranslation } from '@/hooks/useTranslation';
import IndustryCard from '../job/IndustryCard';
import { Scissors, Fingerprint, Fan, UserRound, Heart } from 'lucide-react';

// Industry data with icons and descriptions
const industries = [
  {
    id: 'nails',
    title: 'Nail Technician',
    description: 'For nail salons looking for experienced technicians with skills in manicures, pedicures, and nail art.',
    icon: 'Fingerprint'
  },
  {
    id: 'hair',
    title: 'Hair Stylist',
    description: 'For salons seeking professionals skilled in cutting, coloring, and styling services.',
    icon: 'Scissors'
  },
  {
    id: 'lashes',
    title: 'Lash Technician',
    description: 'For beauty businesses seeking specialists in eyelash extensions and lash services.',
    icon: 'Fan'
  },
  {
    id: 'barber',
    title: 'Barber',
    description: 'For barbershops looking for skilled professionals in men\'s grooming and styling.',
    icon: 'Scissors'
  },
  {
    id: 'skincare',
    title: 'Esthetician',
    description: 'For spas and salons seeking skincare specialists for facials and treatments.',
    icon: 'UserRound'
  },
  {
    id: 'massage',
    title: 'Massage Therapist',
    description: 'For spas and wellness centers seeking licensed therapists for massage and bodywork services.',
    icon: 'Heart'
  },
  {
    id: 'microblading',
    title: 'PMU Artist',
    description: 'For businesses seeking specialists in permanent makeup and microblading services.',
    icon: 'Fingerprint'
  },
  {
    id: 'makeup',
    title: 'Makeup Artist',
    description: 'For salons and studios seeking professionals skilled in makeup application for various occasions.',
    icon: 'Fan'
  },
  {
    id: 'custom',
    title: 'Other / Custom',
    description: 'Create a custom job posting for any beauty industry position with your own details.',
    icon: 'UserRound'
  }
];

interface IndustrySpecialtiesSectionProps {
  control: Control<any>;
  industry?: string;
}

const IndustrySpecialtiesSection: React.FC<IndustrySpecialtiesSectionProps> = ({ 
  control,
  industry
}) => {
  const { t } = useTranslation();
  const [selectedIndustry, setSelectedIndustry] = React.useState<string>(industry || '');
  
  // Get specialties for the selected industry
  const specialties = selectedIndustry && beautySpecialties[selectedIndustry as keyof typeof beautySpecialties] 
    ? beautySpecialties[selectedIndustry as keyof typeof beautySpecialties] 
    : [];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center">
          {t({
            english: "Choose a Job Template",
            vietnamese: "Chọn Mẫu Công Việc"
          })}
        </h2>
        <p className="text-center text-gray-600">
          {t({
            english: "Select a template to start with pre-filled industry-specific details",
            vietnamese: "Chọn một mẫu để bắt đầu với các chi tiết đặc thù cho ngành"
          })}
        </p>

        <FormField
          control={control}
          name="industryType"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormControl>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {industries.map((ind) => (
                    <IndustryCard
                      key={ind.id}
                      id={ind.id}
                      title={ind.title}
                      description={ind.description}
                      icon={ind.icon as keyof typeof import('lucide-react')}
                      selected={field.value === ind.id}
                      onClick={(id) => {
                        field.onChange(id);
                        setSelectedIndustry(id);
                      }}
                    />
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {selectedIndustry && specialties.length > 0 && (
        <FormField
          control={control}
          name="specialties"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <div>
                <FormLabel>
                  {t({
                    english: "Specialties",
                    vietnamese: "Chuyên môn"
                  })}
                </FormLabel>
                <p className="text-sm text-gray-500">
                  {t({
                    english: "Select all specialties that apply to this job",
                    vietnamese: "Chọn tất cả các chuyên môn áp dụng cho công việc này"
                  })}
                </p>
              </div>
              
              <ScrollArea className="h-60">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {specialties.map((specialty) => (
                    <FormItem
                      key={specialty}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(specialty)}
                          onCheckedChange={(checked) => {
                            const updatedValue = checked
                              ? [...(field.value || []), specialty]
                              : (field.value || []).filter((val: string) => val !== specialty);
                            field.onChange(updatedValue);
                          }}
                        />
                      </FormControl>
                      <FormLabel className="cursor-pointer font-normal">
                        {specialty}
                      </FormLabel>
                    </FormItem>
                  ))}
                </div>
              </ScrollArea>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default IndustrySpecialtiesSection;
