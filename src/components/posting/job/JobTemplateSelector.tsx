
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCheck } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/useTranslation';
import { JobFormValues } from './jobFormSchema';
import { templateCards, jobTemplates } from './jobTemplates';
import confetti from 'canvas-confetti';

interface JobTemplateSelectorProps {
  onTemplateSelect: (template: JobFormValues) => void;
}

const JobTemplateSelector: React.FC<JobTemplateSelectorProps> = ({ onTemplateSelect }) => {
  const { t } = useTranslation();
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  
  const handleTemplateSelect = (templateId: string) => {
    setSelectedCardId(templateId);

    // Trigger elegant confetti effect
    const confettiCanvas = document.createElement('canvas');
    confettiCanvas.classList.add('fixed', 'inset-0', 'z-50', 'pointer-events-none');
    document.body.appendChild(confettiCanvas);
    
    const myConfetti = confetti.create(confettiCanvas, {
      resize: true,
      useWorker: true
    });
    
    myConfetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#9b87f5', '#D6BCFA', '#8B5CF6', '#C4B5FD'],
      scalar: 0.9
    }).then(() => {
      setTimeout(() => {
        document.body.removeChild(confettiCanvas);
        
        // Pass the selected template to parent component after animation
        const templateType = templateId as keyof typeof jobTemplates;
        onTemplateSelect(jobTemplates[templateType]);
      }, 800);
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold font-playfair bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent mb-3">
          ✨ Make Your Job Post Stand Out — 1 Click! ✨
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Posting a job here is fun, fast, and made for you. Choose a template below and we'll do the hard work!
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4 sm:overflow-visible overflow-x-auto">
        <AnimatePresence>
          {templateCards.map((card) => (
            <motion.div
              key={card.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              whileHover={{ 
                scale: 1.03,
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                y: -3
              }}
              className="relative"
            >
              <Card 
                className={`cursor-pointer h-full border overflow-hidden relative rounded-xl shadow-sm transition-all duration-300
                  ${selectedCardId === card.id ? 'ring-2 ring-purple-400 ring-offset-2' : 'hover:shadow-md'}`}
                onClick={() => handleTemplateSelect(card.id)}
              >
                <div className="bg-gradient-to-br from-white to-gray-50 h-full">
                  {selectedCardId === card.id && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute top-3 right-3 bg-white bg-opacity-80 rounded-full p-1 z-10"
                    >
                      <CheckCheck className="h-5 w-5 text-green-500" />
                    </motion.div>
                  )}
                  
                  <div className="p-6 flex flex-col h-full relative z-0">
                    <motion.div 
                      className="text-4xl mb-4"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      {card.emoji}
                    </motion.div>

                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{card.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{card.subtitle}</p>
                    
                    <div className="mt-auto">
                      <p className="text-xs text-purple-700 font-medium">{card.slogan}</p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      
      {/* Mobile horizontal scroll indicator */}
      <div className="sm:hidden flex justify-center mt-2 mb-4 space-x-1">
        {Array(Math.ceil(templateCards.length / 2)).fill(0).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
        ))}
      </div>
      
      <div className="text-center mt-3 text-sm text-gray-500">
        Inspired by Sunshine ☀️
      </div>
    </div>
  );
};

export default JobTemplateSelector;
