import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface HeroImage {
  url: string;
  alt: string;
  industry?: string;
  subtitle?: string;
  cta?: {
    text: string;
    link: string;
  };
}

interface HeroCarouselProps {
  images: HeroImage[];
  activeIndex: number;
  isMobile?: boolean;
}

const PremiumImageOverlay = ({ isActive }: { isActive: boolean }) => (
  <AnimatePresence>
    {isActive && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-10"
      >
        {/* Dynamic gradient that shifts based on scroll */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-transparent to-pink-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Animated light rays */}
        <motion.div
          className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/20 to-transparent transform -skew-x-12"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: [0, 0.3, 0], x: [0, 100, 200] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1 }}
        />
        
        {/* Floating geometric elements */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-4 h-4 border-2 border-white/30 transform rotate-45"
          animate={{ 
            rotate: [45, 225, 405],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute bottom-1/3 left-1/3 w-6 h-6 border border-purple-400/50 rounded-full"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
      </motion.div>
    )}
  </AnimatePresence>
);

const ImageParallaxLayer = ({ 
  image, 
  index, 
  activeIndex, 
  isMobile 
}: { 
  image: HeroImage, 
  index: number, 
  activeIndex: number, 
  isMobile: boolean 
}) => {
  const isActive = index === activeIndex;
  
  return (
    <motion.div 
      key={index}
      className="absolute inset-0 w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 1.02
      }}
      transition={{ 
        duration: 0.8,
        ease: "easeInOut"
      }}
      style={{ zIndex: isActive ? 2 : 1 }}
    >
      {/* Simplified high-performance image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={image.url}
          alt={image.alt}
          className="w-full h-full object-cover"
          loading={index === 0 ? "eager" : "lazy"}
          style={{ 
            width: "100%",
            height: "100%",
            objectPosition: "center",
            filter: 'brightness(0.65) contrast(1.1)',
            position: "absolute",
            top: 0,
            left: 0
          }}
        />
        
        {/* Premium gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
};

const HeroCarousel = ({ images, activeIndex, isMobile = false }: HeroCarouselProps) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Ensure images render properly */}
      {images.map((image, index) => (
        <ImageParallaxLayer
          key={`image-${index}`}
          image={image}
          index={index}
          activeIndex={activeIndex}
          isMobile={isMobile}
        />
      ))}
      
      {/* Industry badge overlay */}
      <AnimatePresence mode="wait">
        {images[activeIndex]?.industry && (
          <motion.div
            key={`badge-${activeIndex}`}
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="absolute top-8 left-8 z-30"
          >
            <div className="flex items-center space-x-3 bg-black/40 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/20">
              <span className="text-2xl">
                {images[activeIndex].industry === 'Makeup Artist' ? '💄' :
                 images[activeIndex].industry === 'Nail Tech' ? '💅' :
                 images[activeIndex].industry === 'Barber' ? '✂️' :
                 images[activeIndex].industry === 'Hair Stylist' ? '💇‍♀️' :
                 images[activeIndex].industry === 'Esthetician' ? '🧴' :
                 images[activeIndex].industry === 'Massage Therapist' ? '💆‍♀️' :
                 '✨'}
              </span>
              <span className="text-white font-bold text-lg">{images[activeIndex].industry}</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeroCarousel;