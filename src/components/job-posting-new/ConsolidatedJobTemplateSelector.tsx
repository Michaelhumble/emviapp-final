
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Fingerprint, 
  Scissors, 
  Brush,
  Palette,
  Sparkles,
  Heart,
  Users,
  Building,
  Home,
  Zap
} from 'lucide-react';

interface ConsolidatedJobTemplateSelectorProps {
  onTemplateSelect: (profession: string) => void;
  isSubmitting?: boolean;
}

const jobTemplates = [
  {
    id: 'nail-tech',
    title: 'Nail Technician',
    description: 'For nail salons looking for experienced technicians with skills in manicures, pedicures, and nail art.',
    icon: Fingerprint
  },
  {
    id: 'hair-stylist',
    title: 'Hair Stylist',
    description: 'For salons seeking professionals skilled in cutting, coloring, and styling services.',
    icon: Scissors
  },
  {
    id: 'barber',
    title: 'Barber',
    description: 'For barbershops looking for skilled professionals in men\'s grooming and styling.',
    icon: Scissors
  },
  {
    id: 'lash-tech',
    title: 'Lash Technician',
    description: 'For beauty businesses seeking specialists in eyelash extensions and lash services.',
    icon: Sparkles
  },
  {
    id: 'esthetician',
    title: 'Esthetician',
    description: 'For spas and salons seeking skincare specialists for facials and treatments.',
    icon: Heart
  },
  {
    id: 'spa-tech',
    title: 'Spa Technician',
    description: 'For wellness centers seeking professionals for body treatments, wraps, and therapeutic services.',
    icon: Heart
  },
  {
    id: 'massage-therapist',
    title: 'Massage Therapist',
    description: 'For spas and wellness centers seeking licensed therapists for massage and bodywork services.',
    icon: Heart
  },
  {
    id: 'tattoo-artist',
    title: 'Tattoo Artist',
    description: 'For studios seeking skilled artists with strong portfolios and tattooing expertise.',
    icon: Zap
  },
  {
    id: 'receptionist',
    title: 'Receptionist',
    description: 'For salons seeking front desk staff to manage scheduling, client check-ins, and salon operations.',
    icon: Users
  },
  {
    id: 'salon-manager',
    title: 'Salon Manager',
    description: 'For businesses seeking experienced professionals to oversee salon operations and team leadership.',
    icon: Building
  },
  {
    id: 'booth-rental',
    title: 'Booth Rental',
    description: 'For salon owners offering booth rental space to independent beauty professionals.',
    icon: Home
  },
  {
    id: 'makeup-artist',
    title: 'Makeup Artist',
    description: 'For salons and studios seeking professionals skilled in makeup application for various occasions.',
    icon: Palette
  },
  {
    id: 'other-beauty',
    title: 'Other Beauty Services',
    description: 'For businesses seeking specialized beauty services such as microblading, threading, or waxing.',
    icon: Brush
  }
];

const ConsolidatedJobTemplateSelector: React.FC<ConsolidatedJobTemplateSelectorProps> = ({ 
  onTemplateSelect, 
  isSubmitting = false 
}) => {
  const handleTemplateSelect = (professionId: string) => {
    console.log('Template selected:', professionId);
    if (typeof onTemplateSelect === 'function') {
      onTemplateSelect(professionId);
    } else {
      console.warn('onTemplateSelect is not a function');
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-gray-900">Choose a Job Template</h2>
        <p className="text-lg text-gray-600">Select a template to start with pre-filled industry-specific details</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {jobTemplates.map((template) => {
          const IconComponent = template.icon;
          return (
            <Card 
              key={template.id} 
              className="cursor-pointer hover:shadow-lg transition-all duration-200 border border-gray-100 bg-gradient-to-br from-purple-25 to-white hover:from-purple-50 hover:to-purple-25 rounded-xl"
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {template.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {template.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500 italic">
          You'll be able to customize all details after selecting a template
        </p>
      </div>
    </div>
  );
};

export default ConsolidatedJobTemplateSelector;
