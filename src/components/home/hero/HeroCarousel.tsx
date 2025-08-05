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
      initial={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      animate={{ 
        opacity: isActive ? 1 : 0,
        scale: isActive ? 1 : 1.1,
        filter: isActive ? "blur(0px)" : "blur(20px)"
      }}
      transition={{ 
        duration: 1.2,
        ease: [0.4, 0, 0.2, 1]
      }}
      style={{ zIndex: isActive ? 2 : 1 }}
    >
      {/* High-performance image with advanced styling */}
      <div className="fixed-image-container absolute inset-0 overflow-hidden">
        <motion.img
          src={image.url}
          alt={image.alt}
          className="w-screen h-screen object-cover"
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={index === 0 ? "high" : "low"}
          style={{ 
            objectPosition: isMobile ? "center center" : "center", 
            width: "100vw",
            height: "100dvh",
            minHeight: "100svh",
            maxWidth: "100vw",
            maxHeight: "100dvh",
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            filter: 'brightness(0.7) contrast(1.1) saturate(1.2)',
            imageRendering: 'crisp-edges'
          }}
          animate={isActive ? { 
            scale: [1, 1.05, 1],
          } : {}}
          transition={isActive ? { 
            duration: 20, 
            repeat: Infinity,
            ease: "easeInOut"
          } : {}}
        />
        
        {/* Premium overlay effects */}
        <PremiumImageOverlay isActive={isActive} />
        
        {/* Vignette effect */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/40" />
      </div>
    </motion.div>
  );
};

const HeroCarousel = ({ images, activeIndex, isMobile = false }: HeroCarouselProps) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {/* Background mesh gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-orange-900/20" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(147,51,234,0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(219,39,119,0.1) 0%, transparent 50%)
            `
          }}
        />
      </div>
      
      {/* Image layers with advanced effects */}
      <AnimatePresence mode="wait">
        {images.map((image, index) => (
          <ImageParallaxLayer
            key={`${image.url}-${index}`}
            image={image}
            index={index}
            activeIndex={activeIndex}
            isMobile={isMobile}
          />
        ))}
      </AnimatePresence>
      
      {/* Animated border frame */}
      <motion.div
        className="absolute inset-4 border-2 border-white/10 rounded-3xl pointer-events-none z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        {/* Corner accents */}
        <div className="absolute -top-1 -left-1 w-8 h-8 border-l-2 border-t-2 border-purple-400/60 rounded-tl-lg" />
        <div className="absolute -top-1 -right-1 w-8 h-8 border-r-2 border-t-2 border-pink-400/60 rounded-tr-lg" />
        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-l-2 border-b-2 border-blue-400/60 rounded-bl-lg" />
        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-r-2 border-b-2 border-orange-400/60 rounded-br-lg" />
      </motion.div>
    </div>
  );
};

export default HeroCarousel;