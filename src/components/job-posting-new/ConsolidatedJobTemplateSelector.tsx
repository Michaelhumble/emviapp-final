
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
    id: 'nails',
    title: 'Nail Technician',
    category: 'nails',
    description: 'For nail salons looking for experienced technicians with skills in manicures, pedicures, and nail art.',
    icon: Fingerprint
  },
  {
    id: 'hair',
    title: 'Hair Stylist',
    category: 'hair',
    description: 'For salons seeking professionals skilled in cutting, coloring, and styling services.',
    icon: Scissors
  },
  {
    id: 'barber',
    title: 'Barber',
    category: 'barber',
    description: 'For barbershops looking for skilled professionals in men\'s grooming and styling.',
    icon: Scissors
  },
  {
    id: 'brows-lashes',
    title: 'Lash Technician',
    category: 'brows-lashes',
    description: 'For beauty businesses seeking specialists in eyelash extensions and lash services.',
    icon: Sparkles
  },
  {
    id: 'skincare',
    title: 'Esthetician',
    category: 'skincare',
    description: 'For spas and salons seeking skincare specialists for facials and treatments.',
    icon: Heart
  },
  {
    id: 'massage',
    title: 'Spa Technician',
    category: 'massage',
    description: 'For wellness centers seeking professionals for body treatments, wraps, and therapeutic services.',
    icon: Heart
  },
  {
    id: 'massage',
    title: 'Massage Therapist',
    category: 'massage',
    description: 'For spas and wellness centers seeking licensed therapists for massage and bodywork services.',
    icon: Heart
  },
  {
    id: 'tattoo',
    title: 'Tattoo Artist',
    category: 'tattoo',
    description: 'For studios seeking skilled artists with strong portfolios and tattooing expertise.',
    icon: Zap
  },
  {
    id: 'general',
    title: 'Receptionist',
    category: 'general',
    description: 'For salons seeking front desk staff to manage scheduling, client check-ins, and salon operations.',
    icon: Users
  },
  {
    id: 'general',
    title: 'Salon Manager',
    category: 'general',
    description: 'For businesses seeking experienced professionals to oversee salon operations and team leadership.',
    icon: Building
  },
  {
    id: 'general',
    title: 'Booth Rental',
    category: 'general',
    description: 'For salon owners offering booth rental space to independent beauty professionals.',
    icon: Home
  },
  {
    id: 'makeup',
    title: 'Makeup Artist',
    category: 'makeup',
    description: 'For salons and studios seeking professionals skilled in makeup application for various occasions.',
    icon: Palette
  }
]

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
    <div className="space-y-6 md:space-y-8 px-5 md:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-[680px] md:max-w-7xl mx-auto">
        {jobTemplates.map((template) => {
          const IconComponent = template.icon;
          return (
            <Card 
              key={template.id} 
              className="group cursor-pointer transition-all duration-300 border border-gray-200/50 bg-white/70 backdrop-blur-sm rounded-xl md:rounded-2xl hover:shadow-xl hover:shadow-purple-500/20 hover:-translate-y-1 touch-manipulation"
              onClick={() => handleTemplateSelect(template.id)}
            >
              <CardContent className="p-5 md:p-6">
                <div className="flex items-start space-x-4 md:space-x-5">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    <IconComponent className="w-6 h-6 md:w-7 md:h-7 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-playfair text-base md:text-lg font-medium text-purple-600 mb-2 md:mb-3 group-hover:text-purple-700 transition-colors leading-snug">
                      {template.title}
                    </h3>
                    <p className="font-inter text-gray-600 text-xs md:text-sm leading-relaxed opacity-90">
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
        <p className="font-inter text-sm text-gray-500 italic">
          You'll be able to customize all details after selecting a template
        </p>
      </div>
    </div>
  );
};

export default ConsolidatedJobTemplateSelector;
