
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Control, ControllerRenderProps } from 'react-hook-form';
import { Checkbox } from '@/components/ui/checkbox';
import { JobFormValues } from '@/components/posting/job/jobFormSchema';
import { JobTemplateType } from '@/utils/jobs/jobTemplates';

interface IndustrySpecialtiesSectionProps {
  control: Control<JobFormValues>;
  industry: JobTemplateType;
}

const IndustrySpecialtiesSection: React.FC<IndustrySpecialtiesSectionProps> = ({
  control,
  industry = 'nail',
}) => {
  // Define industry-specific specialties
  const industrySpecialties = {
    nail: [
      { id: 'manicure', label: 'Manicure' },
      { id: 'pedicure', label: 'Pedicure' },
      { id: 'gel', label: 'Gel Polish' },
      { id: 'acrylic', label: 'Acrylic' },
      { id: 'dip', label: 'Dip Powder' },
      { id: 'nail-art', label: 'Nail Art' },
      { id: 'extensions', label: 'Extensions' },
      { id: 'paraffin', label: 'Paraffin Treatment' },
      { id: 'polish-change', label: 'Polish Change' },
      { id: 'silk-wrap', label: 'Silk Wrap' },
    ],
    hair: [
      { id: 'haircuts', label: 'Haircuts' },
      { id: 'coloring', label: 'Hair Coloring' },
      { id: 'highlights', label: 'Highlights' },
      { id: 'balayage', label: 'Balayage' },
      { id: 'blowouts', label: 'Blowouts' },
      { id: 'styling', label: 'Styling' },
      { id: 'extensions', label: 'Extensions' },
      { id: 'perms', label: 'Perms' },
      { id: 'treatments', label: 'Treatments' },
      { id: 'updos', label: 'Updos' },
    ],
    spa: [
      { id: 'facials', label: 'Facials' },
      { id: 'body-treatments', label: 'Body Treatments' },
      { id: 'waxing', label: 'Waxing' },
      { id: 'threading', label: 'Threading' },
      { id: 'chemical-peels', label: 'Chemical Peels' },
      { id: 'microdermabrasion', label: 'Microdermabrasion' },
      { id: 'led-therapy', label: 'LED Therapy' },
      { id: 'anti-aging', label: 'Anti-Aging' },
    ],
    barber: [
      { id: 'haircuts', label: 'Haircuts' },
      { id: 'fades', label: 'Fades' },
      { id: 'beard-trims', label: 'Beard Trims' },
      { id: 'shaves', label: 'Shaves' },
      { id: 'lineups', label: 'Line Ups' },
      { id: 'hair-design', label: 'Hair Design' },
      { id: 'scalp-treatments', label: 'Scalp Treatments' },
    ],
    massage: [
      { id: 'swedish', label: 'Swedish Massage' },
      { id: 'deep-tissue', label: 'Deep Tissue' },
      { id: 'sports', label: 'Sports Massage' },
      { id: 'hot-stone', label: 'Hot Stone' },
      { id: 'prenatal', label: 'Prenatal' },
      { id: 'reflexology', label: 'Reflexology' },
      { id: 'thai', label: 'Thai Massage' },
      { id: 'shiatsu', label: 'Shiatsu' },
    ],
    tattoo: [
      { id: 'traditional', label: 'Traditional' },
      { id: 'neo-traditional', label: 'Neo-Traditional' },
      { id: 'realism', label: 'Realism' },
      { id: 'blackwork', label: 'Blackwork' },
      { id: 'japanese', label: 'Japanese' },
      { id: 'watercolor', label: 'Watercolor' },
      { id: 'tribal', label: 'Tribal' },
      { id: 'dotwork', label: 'Dotwork' },
    ],
    makeup: [
      { id: 'bridal', label: 'Bridal' },
      { id: 'special-occasion', label: 'Special Occasion' },
      { id: 'natural', label: 'Natural Looks' },
      { id: 'dramatic', label: 'Dramatic Looks' },
      { id: 'airbrush', label: 'Airbrush' },
      { id: 'editorial', label: 'Editorial' },
      { id: 'fx-makeup', label: 'FX Makeup' },
    ],
    booth: [
      { id: 'hair-station', label: 'Hair Station' },
      { id: 'nail-table', label: 'Nail Table' },
      { id: 'spa-room', label: 'Spa Room' },
      { id: 'esthetician-room', label: 'Esthetician Room' },
      { id: 'massage-room', label: 'Massage Room' },
      { id: 'barber-chair', label: 'Barber Chair' },
      { id: 'private-suite', label: 'Private Suite' },
    ],
    custom: [], // For custom selection
  };

  // Define common job requirements
  const commonRequirements = [
    { id: 'license', label: 'Professional License Required' },
    { id: 'experience', label: 'Experience Required' },
    { id: 'client-base', label: 'Existing Client Base Preferred' },
    { id: 'english', label: 'English Communication Skills' },
    { id: 'vietnamese', label: 'Vietnamese/Other Language Skills' },
    { id: 'weekends', label: 'Weekend Availability' },
    { id: 'equipment', label: 'Must Provide Own Equipment' },
    { id: 'tools', label: 'Must Provide Own Tools' },
    { id: 'certification', label: 'Certifications Required' },
  ];

  // Get specialties for the selected industry
  const specialties = industrySpecialties[industry] || industrySpecialties.custom;

  const renderCheckboxes = (field: ControllerRenderProps<JobFormValues, "specialties" | "requirements">, items: Array<{id: string, label: string}>, name: string) => {
    return items.map((item) => (
      <div key={`${name}-${item.id}`} className="flex items-start space-x-2">
        <Checkbox
          id={`${name}-${item.id}`}
          checked={Array.isArray(field.value) && field.value.includes(item.label)}
          onCheckedChange={(checked) => {
            const newValue = Array.isArray(field.value) ? [...field.value] : [];
            
            if (checked) {
              if (!newValue.includes(item.label)) {
                newValue.push(item.label);
              }
            } else {
              const index = newValue.indexOf(item.label);
              if (index !== -1) {
                newValue.splice(index, 1);
              }
            }
            
            field.onChange(newValue);
          }}
        />
        <label
          htmlFor={`${name}-${item.id}`}
          className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
        >
          {item.label}
        </label>
      </div>
    ));
  };

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Job Specialties & Requirements</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Select the specialties and requirements for this position
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="pt-6">
            <FormField
              control={control}
              name="specialties"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium mb-4 block">
                    Job Specialties
                  </FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-1 gap-3">
                      {renderCheckboxes(field, specialties, "specialties")}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <FormField
              control={control}
              name="requirements"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-medium mb-4 block">
                    Job Requirements
                  </FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-1 gap-3">
                      {renderCheckboxes(field, commonRequirements, "requirements")}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IndustrySpecialtiesSection;
