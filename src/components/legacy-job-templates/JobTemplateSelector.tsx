
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { jobTemplates } from './jobTemplates';
import { 
  Fingerprint, 
  Scissors, 
  Brush
} from 'lucide-react';

interface JobTemplateSelectorProps {
  onTemplateSelect: (template: any) => void;
  isSubmitting?: boolean;
}

const getIconForTemplate = (templateId: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    'nail-tech': <Fingerprint className="w-8 h-8 text-purple-600" />,
    'hair-stylist': <Scissors className="w-8 h-8 text-purple-600" />,
    'barber': <Scissors className="w-8 h-8 text-purple-600" />,
    'lash-tech': <Brush className="w-8 h-8 text-purple-600" />,
    'esthetician': <Brush className="w-8 h-8 text-purple-600" />,
    'spa-tech': <Brush className="w-8 h-8 text-purple-600" />,
    'massage-therapist': <Brush className="w-8 h-8 text-purple-600" />,
    'tattoo-artist': <Brush className="w-8 h-8 text-purple-600" />,
    'receptionist': <Brush className="w-8 h-8 text-purple-600" />,
    'salon-manager': <Brush className="w-8 h-8 text-purple-600" />,
    'booth-rental': <Brush className="w-8 h-8 text-purple-600" />,
    'makeup-artist': <Brush className="w-8 h-8 text-purple-600" />,
    'other-beauty': <Brush className="w-8 h-8 text-purple-600" />,
    'custom': <Brush className="w-8 h-8 text-purple-600" />
  };
  
  return iconMap[templateId] || <Brush className="w-8 h-8 text-purple-600" />;
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {jobTemplates.map((template) => (
          <Card 
            key={template.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 border-0 bg-gradient-to-br from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 p-6 min-h-[180px]"
            onClick={() => handleTemplateSelect(template.data)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-white/80 shadow-sm">
                  {getIconForTemplate(template.id)}
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">
                  {template.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-gray-700 text-base leading-relaxed mb-6">
                {getDetailedDescription(template.id)}
              </p>
              <Button 
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
              >
                {isSubmitting ? 'Publishing...' : 'Use Template & Publish'}
              </Button>
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
