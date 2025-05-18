
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCheck, Sparkles } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  HoverCard,
  HoverCardTrigger,
  HoverCardContent
} from '@/components/ui/hover-card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTranslation } from '@/hooks/useTranslation';
import { JobFormValues, IndustryType } from './jobFormSchema';
import { templateCards, jobTemplates } from './jobTemplates';
import confetti from 'canvas-confetti';

interface JobTemplateSelectorProps {
  onTemplateSelect: (template: JobFormValues) => void;
}

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ onTemplateSelect }) => {
  const { t } = useTranslation();
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const scrollAnimation = useScrollAnimation({ animation: 'fade-in' });
  
  const handleTemplateSelect = (templateId: string) => {
    setSelectedCardId(templateId);

    // Trigger confetti effect
    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.classList.add('fixed', 'inset-0', 'z-50', 'pointer-events-none');
    document.body.appendChild(confettiCanvas);
    
    const myConfetti = confetti.create(confettiCanvas, {
      resize: true,
      useWorker: true
    });
    
    myConfetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    }).then(() => {
      setTimeout(() => {
        document.body.removeChild(confettiCanvas);
        
        // Pass the selected template to parent component after animation
        const selectedTemplate = templateId as IndustryType | 'custom';
        onTemplateSelect(jobTemplates[selectedTemplate]);
      }, 1000);
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto" {...scrollAnimation}>
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold font-playfair bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent mb-3">
          Pick your perfect template
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Posting a job here is fun, fast, and made for you. Choose a template below and we'll do the hard work!
        </p>
        
        <HoverCard>
          <HoverCardTrigger asChild>
            <Button variant="link" size="sm" className="mt-2 text-xs text-purple-600 font-medium">
              Why use our templates?
            </Button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 p-4">
            <div className="flex space-x-2">
              <Sparkles className="h-5 w-5 text-purple-500 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-medium mb-1">Handcrafted for Success</h4>
                <p className="text-sm text-muted-foreground">
                  Our templates are designed by beauty industry insiders to attract top talent.
                  They include all the right keywords and requirements to get noticed!
                </p>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <AnimatePresence>
          {templateCards.map((card) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 10px 25px rgba(0,0,0,0.08)" 
              }}
              className="relative"
            >
              <Card 
                className={`cursor-pointer h-full ${card.bgColor} border-0 overflow-hidden relative shadow-md hover:shadow-lg transition-all duration-300`} 
                onClick={() => handleTemplateSelect(card.id)}
              >
                {selectedCardId === card.id && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-3 right-3 bg-white bg-opacity-80 rounded-full p-1"
                  >
                    <CheckCheck className="h-5 w-5 text-green-500" />
                  </motion.div>
                )}
                
                <div className="p-6 flex flex-col h-full">
                  <motion.div 
                    className="text-4xl md:text-5xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {card.emoji}
                  </motion.div>

                  <h3 className="text-xl font-bold text-gray-800 mb-1">{card.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{card.subtitle}</p>
                  
                  <div className="mt-auto">
                    <p className="text-xs text-purple-700 font-medium mb-2">{card.slogan}</p>
                    
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-purple-100 text-purple-800 text-xs px-2.5 py-1 rounded-full inline-flex items-center"
                    >
                      <Sparkles className="h-3 w-3 mr-1 text-purple-600" />
                      1-Click Template
                    </motion.div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      <div className="text-center mt-6 text-sm text-gray-500">
        Inspired by Sunshine ☀️
      </div>
    </div>
  );
};

export default JobTemplateSelector;
