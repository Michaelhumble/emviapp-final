import React from 'react';
import { motion } from 'framer-motion';
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

const HeroCarousel = ({ images, activeIndex, isMobile = false }: HeroCarouselProps) => {
  const getIndustryBadgeColor = (industry?: string) => {
    switch (industry) {
      case 'Nail Tech':
      case 'Nail Artist':
      case 'Nail Salon':
        return 'bg-gradient-to-r from-pink-500 to-rose-500 text-white border-0 shadow-lg backdrop-blur-sm';
      case 'Barber':
        return 'bg-gradient-to-r from-slate-700 to-gray-800 text-white border-0 shadow-lg backdrop-blur-sm';
      case 'Hair Stylist':
      case 'Hair Salon':
        return 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 shadow-lg backdrop-blur-sm';
      case 'Makeup Artist':
        return 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 shadow-lg backdrop-blur-sm';
      case 'Esthetician':
        return 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-lg backdrop-blur-sm';
      case 'Massage Therapist':
        return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 shadow-lg backdrop-blur-sm';
      case 'Beauty Platform':
        return 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-lg backdrop-blur-sm';
      default:
        return 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0 shadow-lg backdrop-blur-sm';
    }
  };

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden max-w-full">
      {images.map((image, index) => (
        <motion.div 
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0, scale: 1.02 }}
          animate={{ 
            opacity: index === activeIndex ? 1 : 0,
            scale: index === activeIndex ? 1 : 1.02
          }}
          transition={{ 
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          style={{ zIndex: index === activeIndex ? 2 : 1 }}
        >
          {/* Performance-optimized image with WebP support */}
          <div className="fixed-image-container absolute inset-0">
            <picture>
              <source 
                srcSet={`${image.url}?format=webp&quality=85${isMobile ? '&w=768' : '&w=1920'}`}
                type="image/webp"
              />
              <source 
                srcSet={`${image.url}?format=avif&quality=80${isMobile ? '&w=768' : '&w=1920'}`}
                type="image/avif"
              />
              <img
                src={`${image.url}?quality=85${isMobile ? '&w=768' : '&w=1920'}`}
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
                  filter: 'brightness(0.85) contrast(1.1) saturate(1.2)',
                  imageRendering: 'crisp-edges',
                  transform: 'translate3d(0,0,0)',
                  backfaceVisibility: 'hidden',
                  willChange: index === activeIndex ? 'opacity' : 'auto'
                }}
              />
            </picture>
            
            {/* Premium gradient overlays for perfect text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            
            {/* Industry badge - positioned beautifully with animation */}
            {image.industry && index === activeIndex && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                className="absolute top-8 left-8 z-10"
              >
                <Badge 
                  className={`${getIndustryBadgeColor(image.industry)} px-5 py-2.5 text-sm font-bold`}
                >
                  ✨ {image.industry}
                </Badge>
              </motion.div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HeroCarousel;