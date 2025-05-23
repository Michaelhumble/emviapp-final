
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { jobTemplates } from './jobTemplates';
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

interface JobTemplateSelectorProps {
  onTemplateSelect: (template: any) => void;
  isSubmitting?: boolean;
}

const getIconForTemplate = (templateId: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'nail-tech': <Fingerprint className="w-5 h-5 text-purple-600" />,
    'hair-stylist': <Scissors className="w-5 h-5 text-purple-600" />,
    'barber': <Scissors className="w-5 h-5 text-purple-600" />,
    'lash-tech': <Sparkles className="w-5 h-5 text-purple-600" />,
    'esthetician': <Heart className="w-5 h-5 text-purple-600" />,
    'spa-tech': <Heart className="w-5 h-5 text-purple-600" />,
    'massage-therapist': <Heart className="w-5 h-5 text-purple-600" />,
    'tattoo-artist': <Zap className="w-5 h-5 text-purple-600" />,
    'receptionist': <Users className="w-5 h-5 text-purple-600" />,
    'salon-manager': <Building className="w-5 h-5 text-purple-600" />,
    'booth-rental': <Home className="w-5 h-5 text-purple-600" />,
    'makeup-artist': <Palette className="w-5 h-5 text-purple-600" />,
    'other-beauty': <Brush className="w-5 h-5 text-purple-600" />,
    'custom': <Brush className="w-5 h-5 text-purple-600" />
  };
  
  return iconMap[templateId] || <Brush className="w-5 h-5 text-purple-600" />;
};

const getDetailedDescription = (templateId: string) => {
  const descriptions: Record<string, string> = {
    'nail-tech': 'For nail salons looking for experienced technicians with skills in manicures, pedicures, and nail art.',
    'hair-stylist': 'For salons seeking professionals skilled in cutting, coloring, and styling services.',
    'barber': 'For barbershops looking for skilled professionals in men\'s grooming and styling.',
    'lash-tech': 'For beauty businesses seeking specialists in eyelash extensions and lash services.',
    'esthetician': 'For spas and salons seeking skincare specialists for facials and treatments.',
    'spa-tech': 'For wellness centers seeking professionals for body treatments, wraps, and therapeutic services.',
    'massage-therapist': 'For spas and wellness centers seeking licensed therapists for massage and bodywork services.',
    'tattoo-artist': 'For studios seeking skilled artists with strong portfolios and tattooing expertise.',
    'receptionist': 'For salons seeking front desk staff to manage scheduling, client check-ins, and salon operations.',
    'salon-manager': 'For businesses seeking experienced professionals to oversee salon operations and team leadership.',
    'booth-rental': 'For salon owners offering booth rental space to independent beauty professionals.',
    'makeup-artist': 'For salons and studios seeking professionals skilled in makeup application for various occasions.',
    'other-beauty': 'For businesses seeking specialized beauty services such as microblading, threading, or waxing.',
    'custom': 'Create a custom job posting for any beauty industry position with your own details.'
  };
  
  return descriptions[templateId] || 'Perfect template for this beauty industry position.';
};

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ 
  onTemplateSelect, 
  isSubmitting = false 
}) => {
  const handleTemplateSelect = (template: any) => {
    console.log('Template selected:', template);
    if (typeof onTemplateSelect === 'function') {
      onTemplateSelect(template);
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {jobTemplates.map((template) => (
          <Card 
            key={template.id} 
            className="cursor-pointer hover:shadow-md transition-all duration-200 border border-gray-100 bg-gradient-to-br from-purple-25 to-white hover:from-purple-50 hover:to-purple-25 rounded-xl"
            onClick={() => handleTemplateSelect(template.data)}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  {getIconForTemplate(template.id)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {template.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {getDetailedDescription(template.id)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500 italic">
          You'll be able to customize all details after selecting a template
        </p>
      </div>
    </div>
  );
};

export default JobTemplateSelector;
