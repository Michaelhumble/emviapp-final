
import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { JobFormValues, IndustryType } from '../job/jobFormSchema';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

// Define the industry options
const INDUSTRY_OPTIONS = [
  { value: 'nails', label: 'Nails' },
  { value: 'hair', label: 'Hair' },
  { value: 'lashes', label: 'Lashes & Brows' },
  { value: 'barber', label: 'Barber' },
  { value: 'skincare', label: 'Skincare & Esthetics' },
  { value: 'microblading', label: 'Microblading & PMU' },
  { value: 'makeup', label: 'Makeup' },
  { value: 'custom', label: 'Other Beauty Specialties' }
];

// Define specialties by industry
const SPECIALTIES_BY_INDUSTRY: Record<string, string[]> = {
  nails: [
    'Manicures',
    'Pedicures',
    'Gel Polish',
    'Acrylic Extensions',
    'Dip Powder',
    'Nail Art',
    'Nail Repairs'
  ],
  hair: [
    'Haircuts',
    'Color',
    'Highlights',
    'Balayage',
    'Extensions',
    'Blowouts',
    'Keratin Treatments',
    'Bridal'
  ],
  lashes: [
    'Classic Lash Extensions',
    'Volume Lash Extensions',
    'Lash Lifts',
    'Brow Lamination',
    'Brow Tinting',
    'Brow Shaping',
    'Brow Henna'
  ],
  barber: [
    'Men\'s Haircuts',
    'Beard Trims',
    'Hot Towel Shaves',
    'Fades',
    'Line-ups',
    'Hair Design'
  ],
  skincare: [
    'Facials',
    'Chemical Peels',
    'Microdermabrasion',
    'Waxing',
    'Microneedling',
    'LED Therapy'
  ],
  microblading: [
    'Microblading',
    'Powder Brows',
    'Combination Brows',
    'Lip Blushing',
    'Eyeliner',
    'Scalp Micropigmentation'
  ],
  makeup: [
    'Bridal Makeup',
    'Special Event Makeup',
    'Airbrush Makeup',
    'Makeup Lessons',
    'Editorial Makeup'
  ],
  custom: [
    'Massage',
    'Body Treatments',
    'Spray Tanning',
    'Teeth Whitening'
  ]
};

interface IndustrySpecialtiesSectionProps {
  control: Control<JobFormValues>;
  industry?: string;
}

const IndustrySpecialtiesSection: React.FC<IndustrySpecialtiesSectionProps> = ({
  control,
  industry: initialIndustry
}) => {
  // Get the specialties based on the selected industry
  const [selectedIndustry, setSelectedIndustry] = useState(initialIndustry || 'nails');
  
  // Get specialties for the selected industry
  const specialties = SPECIALTIES_BY_INDUSTRY[selectedIndustry] || [];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="font-playfair text-2xl font-semibold text-gray-900">Industry & Specialties</h2>
        <p className="text-sm text-muted-foreground mt-1">Select the industry and specialties for this job</p>
      </div>

      <FormField
        control={control}
        name="industryType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Industry</FormLabel>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setSelectedIndustry(value);
              }}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an industry" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {INDUSTRY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <Controller
        control={control}
        name="specialties"
        defaultValue={[]}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Specialties</FormLabel>
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2 mb-3">
                {field.value && field.value.map((specialty, index) => (
                  <Badge key={index} variant="secondary" className="px-2 py-1 h-8">
                    {specialty}
                    <button
                      type="button"
                      onClick={() => {
                        const updatedSpecialties = field.value?.filter(
                          (s) => s !== specialty
                        );
                        field.onChange(updatedSpecialties);
                      }}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {specialties.map((specialty) => (
                  <div
                    key={specialty}
                    className="flex items-center space-x-2 py-1"
                  >
                    <Checkbox
                      id={`specialty-${specialty}`}
                      checked={field.value?.includes(specialty)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          field.onChange([...(field.value || []), specialty]);
                        } else {
                          field.onChange(
                            field.value?.filter((s) => s !== specialty)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={`specialty-${specialty}`} className="text-sm">
                      {specialty}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default IndustrySpecialtiesSection;
