
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCheck, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [isScrollable, setIsScrollable] = useState(false);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(true);
  
  // Reference for the cards container
  const cardsContainerRef = React.useRef<HTMLDivElement>(null);
  
  // Check if the cards container is scrollable
  useEffect(() => {
    const checkScrollable = () => {
      if (cardsContainerRef.current) {
        const { scrollWidth, clientWidth } = cardsContainerRef.current;
        setIsScrollable(scrollWidth > clientWidth);
        setShowRightScroll(scrollWidth > clientWidth);
      }
    };
    
    checkScrollable();
    window.addEventListener('resize', checkScrollable);
    
    return () => window.removeEventListener('resize', checkScrollable);
  }, []);
  
  // Handle scroll buttons
  const handleScroll = (direction: 'left' | 'right') => {
    if (!cardsContainerRef.current) return;
    
    const scrollAmount = 350; // Adjust based on card width + gap
    const currentScroll = cardsContainerRef.current.scrollLeft;
    
    if (direction === 'left') {
      cardsContainerRef.current.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: 'smooth'
      });
    } else {
      cardsContainerRef.current.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  
  // Update scroll button visibility based on scroll position
  const handleScrollUpdate = () => {
    if (!cardsContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = cardsContainerRef.current;
    setShowLeftScroll(scrollLeft > 20);
    setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 20);
  };
  
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
      particleCount: 60,
      spread: 45,
      origin: { y: 0.6 },
      colors: ['#9b87f5', '#D6BCFA', '#8B5CF6', '#C4B5FD'],
      scalar: 0.7
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
      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold font-playfair bg-gradient-to-r from-purple-700 to-indigo-600 bg-clip-text text-transparent mb-3">
          ✨ Make Your Job Post Stand Out — 1 Click! ✨
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Posting a job here is fun, fast, and made for you. Choose a template below and we'll do the hard work!
        </p>
      </motion.div>

      {/* Card Container with horizontal scroll */}
      <div className="relative">
        {/* Left scroll button */}
        <AnimatePresence>
          {isScrollable && showLeftScroll && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md border border-gray-100"
              onClick={() => handleScroll('left')}
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </motion.button>
          )}
        </AnimatePresence>
        
        {/* Cards container with horizontal scroll */}
        <div 
          ref={cardsContainerRef}
          className="flex gap-4 pb-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory"
          onScroll={handleScrollUpdate}
        >
          <AnimatePresence>
            {templateCards.map((card) => (
              <motion.div
                key={card.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative shrink-0 snap-start"
              >
                <Card 
                  className={`cursor-pointer border overflow-hidden relative rounded-xl shadow-sm transition-all duration-300 h-[220px] w-[280px]
                    ${selectedCardId === card.id ? 'ring-2 ring-purple-400 ring-offset-2' : ''}`}
                  onClick={() => handleTemplateSelect(card.id)}
                >
                  <motion.div 
                    className={`h-full ${card.background}`}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                      y: -3
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {selectedCardId === card.id && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full p-1 z-10 shadow-sm"
                      >
                        <CheckCheck className="h-5 w-5 text-green-500" />
                      </motion.div>
                    )}
                    
                    <div className="p-6 flex flex-col h-full relative z-0">
                      <div className="flex items-start gap-3">
                        <motion.div 
                          className="text-4xl h-12 w-12 rounded-full flex items-center justify-center bg-white bg-opacity-50 shadow-sm backdrop-blur-sm"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          {card.emoji}
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
                          <p className="text-sm text-gray-500">{card.subtitle}</p>
                        </div>
                      </div>

                      <div className="mt-auto pt-4">
                        <p className="text-sm text-purple-700 font-medium">{card.slogan}</p>
                      </div>
                    </div>
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {/* Right scroll button */}
        <AnimatePresence>
          {isScrollable && showRightScroll && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md border border-gray-100"
              onClick={() => handleScroll('right')}
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile scroll indicators */}
      <div className="sm:hidden flex justify-center mt-4 mb-2 space-x-1">
        {Array(Math.ceil(templateCards.length / 2.5)).fill(0).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
        ))}
      </div>
      
      <div className="text-center mt-6 text-sm text-gray-500">
        Inspired by Sunshine ☀️
      </div>
    </div>
  );
};

export default JobTemplateSelector;
