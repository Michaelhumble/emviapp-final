
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
  Phone, 
  ClipboardList, 
  User,
  Radiation, 
  CircleDashed,
  Heart,
  Shirt
} from 'lucide-react';

interface IndustrySpecialtiesSectionProps {
  control: Control<JobFormValues>;
  industry: string;
}

const IndustrySpecialtiesSection: React.FC<IndustrySpecialtiesSectionProps> = ({ control, industry }) => {
  const industryOptions = [
    { 
      id: 'nails', 
      title: 'Nail Technician', 
      description: 'For salons looking for experienced technicians with skills in manicures, pedicures, and nail art.',
      icon: Palmtree
    },
    { 
      id: 'hair', 
      title: 'Hair Stylist', 
      description: 'For salons seeking professionals skilled in cutting, coloring, and styling hair.',
      icon: Scissors
    },
    { 
      id: 'lashes', 
      title: 'Lash Technician', 
      description: 'For beauty businesses seeking specialists in eyelash extensions and lash services.',
      icon: Star
    },
    { 
      id: 'barber', 
      title: 'Barber', 
      description: 'For barbershops looking for skilled professionals in men\'s grooming and styling.',
      icon: Scissors
    },
    { 
      id: 'skincare', 
      title: 'Esthetician', 
      description: 'For spas and salons seeking professionals specialized in facials, skin treatments, and skin care.',
      icon: SunMedium
    },
    { 
      id: 'spa', 
      title: 'Spa Technician', 
      description: 'For wellness centers seeking professionals for body treatments, wraps, and therapeutic services.',
      icon: Heart
    },
    { 
      id: 'massage', 
      title: 'Massage Therapist', 
      description: 'For spas and wellness centers seeking licensed therapists for massage and bodywork services.',
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
      description: 'For studios seeking skilled artists with strong portfolios and tattooing expertise.',
      icon: Radiation
    },
    { 
      id: 'receptionist', 
      title: 'Salon Receptionist', 
      description: 'For salons seeking front desk staff to manage scheduling, client check-ins, and salon operations.',
      icon: Phone
    },
    { 
      id: 'manager', 
      title: 'Salon Manager', 
      description: 'For businesses seeking experienced professionals to oversee salon operations and team leadership.',
      icon: ClipboardList
    },
    { 
      id: 'booth', 
      title: 'Booth Rental Available', 
      description: 'For salon owners offering booth rental space to independent beauty professionals.',
      icon: Shirt
    },
    { 
      id: 'other_beauty', 
      title: 'Other Beauty Professional', 
      description: 'For businesses seeking specialized beauty services such as microblading, threading, or waxing.',
      icon: User
    },
    { 
      id: 'custom', 
      title: 'Other / Custom', 
      description: 'Create a custom job posting for any beauty industry position with your own details.',
      icon: CircleDashed
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-semibold mb-2">Choose Job Template</h2>
        <p className="text-gray-600">
          Select a template to start with pre-filled industry-specific details
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
