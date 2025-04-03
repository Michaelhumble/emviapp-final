
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface HeroImage {
  url: string;
  alt: string;
}

interface HeroCarouselProps {
  images: HeroImage[];
  activeIndex: number;
}

const HeroCarousel = ({ images, activeIndex }: HeroCarouselProps) => {
  return (
    <>
      {images.map((image, index) => (
        <motion.div 
          key={index}
          className="absolute inset-0 w-full h-full rounded-md overflow-hidden"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: activeIndex === index ? 1 : 0,
            scale: activeIndex === index ? 1.05 : 1 // Slow zoom effect
          }}
          transition={{ 
            opacity: { duration: 1.5, ease: "easeInOut" },
            scale: { duration: 8, ease: "easeInOut" }
          }}
          aria-hidden={activeIndex !== index}
        >
          <img 
            src={image.url} 
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          
          {/* Semi-transparent overlay for text readability */}
          <div className="absolute inset-0 bg-black/20 z-10"></div>
        </motion.div>
      ))}
      
      {/* Glass effect as a frame rather than a cover */}
      <div className="absolute inset-0 backdrop-blur-sm bg-white/10 z-10 md:backdrop-blur-md border border-white/30 rounded-lg md:m-4 shadow-xl"></div>
    </>
  );
};

export default HeroCarousel;
