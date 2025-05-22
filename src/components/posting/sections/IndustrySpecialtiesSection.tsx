
import React from 'react';
import { Control } from 'react-hook-form';
import { 
  FormField, 
  FormItem, 
  FormControl, 
  FormMessage 
} from '@/components/ui/form';
import { JobFormValues } from '../job/jobFormSchema';
import IndustryCard from '../job/IndustryCard';
import { Grid } from '@/components/ui/grid';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Scissors,
  Brush, 
  Star, 
  Palmtree, 
  Hammer, 
  SunMedium, 
  Dumbbell, 
  Users, 
  Heart, 
  Radiation, 
  CircleDashed 
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface IndustrySpecialtiesSectionProps {
  control: Control<JobFormValues>;
  industry: string;
}

interface IndustryOption {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon; // LucideIcon type for direct component reference
}

const IndustrySpecialtiesSection: React.FC<IndustrySpecialtiesSectionProps> = ({ control, industry }) => {
  const industryOptions: IndustryOption[] = [
    { 
      id: 'nails', 
      title: 'Nail Technician', 
      description: 'For salons seeking skilled nail technicians with experience in manicures, pedicures, and nail art.',
      icon: Palmtree // Direct component reference
    },
    { 
      id: 'hair', 
      title: 'Hair Stylist', 
      description: 'For salons seeking skilled professionals in cutting, coloring, and styling hair.',
      icon: Scissors
    },
    { 
      id: 'lashes', 
      title: 'Lash Technician', 
      description: 'For salons seeking technicians specialized in lash extensions, lifts, and tinting.',
      icon: Star
    },
    { 
      id: 'barber', 
      title: 'Barber', 
      description: 'For barber shops seeking professionals skilled in men\'s haircuts, beard trims, and grooming.',
      icon: Scissors
    },
    { 
      id: 'skincare', 
      title: 'Esthetician', 
      description: 'For spas and salons seeking professionals specialized in facials, skin treatments, and skin care.',
      icon: SunMedium
    },
    { 
      id: 'massage', 
      title: 'Massage Therapist', 
      description: 'For spas seeking licensed massage therapists for various massage modalities.',
      icon: Dumbbell
    },
    { 
      id: 'makeup', 
      title: 'Makeup Artist', 
      description: 'For salons and studios seeking professionals skilled in makeup application for various occasions.',
      icon: Brush
    },
    { 
      id: 'microblading', 
      title: 'Microblading Artist', 
      description: 'For salons seeking technicians specialized in microblading and permanent makeup.',
      icon: Hammer
    },
    { 
      id: 'tattoo', 
      title: 'Tattoo Artist', 
      description: 'For studios seeking skilled tattoo artists with a strong portfolio.',
      icon: Radiation
    },
    { 
      id: 'receptionist', 
      title: 'Receptionist', 
      description: 'For salons seeking front desk staff to manage appointments, greet clients, and handle administrative tasks.',
      icon: Users
    },
    { 
      id: 'manager', 
      title: 'Salon Manager', 
      description: 'For salons seeking professionals to oversee operations, staff, and customer service.',
      icon: Users
    },
    { 
      id: 'custom', 
      title: 'Other', 
      description: 'For other beauty industry positions not listed above.',
      icon: CircleDashed
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Choose Job Category</h2>
        <p className="text-gray-600">
          Select the category that best matches the position you're hiring for
        </p>
      </div>
      
      <FormField
        control={control}
        name="industryType"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <ScrollArea className="h-[60vh] pr-4">
                <Grid cols={2} gap={4} className="pb-4">
                  {industryOptions.map((option) => (
                    <IndustryCard
                      key={option.id}
                      id={option.id}
                      title={option.title}
                      description={option.description}
                      icon={option.icon}
                      selected={field.value === option.id}
                      onClick={(id) => field.onChange(id)}
                    />
                  ))}
                </Grid>
              </ScrollArea>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default IndustrySpecialtiesSection;
