
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Salon } from '@/types/salon';
import { Star, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface SalonProfileHeaderProps {
  salon: Salon;
}

const SalonProfileHeader: React.FC<SalonProfileHeaderProps> = ({ salon }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const isMobile = useIsMobile();
  
  // If salon has a gallery, use it, otherwise just use the main image
  const images = salon.beforeAfterGallery && salon.beforeAfterGallery.length > 0 
    ? [salon.image, ...salon.beforeAfterGallery]
    : [salon.image];
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  return (
    <div className="relative w-full">
      {/* Hero Image / Carousel */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: index === currentImageIndex ? 1 : 0,
              transition: { duration: 0.5 }
            }}
          >
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"></div>
          </motion.div>
        ))}
        
        {/* Carousel Controls */}
        {images.length > 1 && (
          <>
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 p-2 rounded-full text-white"
              onClick={prevImage}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/40 p-2 rounded-full text-white"
              onClick={nextImage}
            >
              <ChevronRight size={24} />
            </button>
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>
      
      {/* Salon Info Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white z-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2 text-shadow">
            {salon.name}
          </h1>
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(salon.rating) 
                    ? 'text-yellow-400 fill-yellow-400' 
                    : i < salon.rating 
                      ? 'text-yellow-400 fill-yellow-400 opacity-60' 
                      : 'text-gray-300'}`}
                />
              ))}
              <span className="ml-2 text-sm">{salon.rating.toFixed(1)} ({salon.reviewCount})</span>
            </div>
            <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-xs">
              {salon.specialty}
            </span>
            <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded text-xs">
              {salon.neighborhood || salon.city}
            </span>
          </div>
        </div>
      </div>
      
      {/* Mobile Booking Button */}
      {isMobile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <Button size="lg" className="rounded-full shadow-xl flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Book Now
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default SalonProfileHeader;
