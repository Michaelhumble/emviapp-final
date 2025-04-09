
import { motion } from "framer-motion";

interface HeroImage {
  url: string;
  alt: string;
}

interface HeroCarouselProps {
  images: HeroImage[];
  activeIndex: number;
  isMobile?: boolean;
}

const HeroCarousel = ({ images, activeIndex, isMobile = false }: HeroCarouselProps) => {
  return (
    <>
      {images.map((image, index) => (
        <motion.div 
          key={index}
          className="absolute inset-0 w-full h-full overflow-hidden transition-opacity duration-1000 ease-in-out"
          initial={{ opacity: 0, scale: 1 }}
          animate={{ 
            opacity: activeIndex === index ? 1 : 0,
            scale: activeIndex === index ? 1.05 : 1, // Slow zoom effect
            y: activeIndex === index ? 0 : 10 // Subtle parallax effect
          }}
          transition={{ 
            opacity: { duration: 1.5, ease: "easeInOut" },
            scale: { duration: 8, ease: "easeInOut" },
            y: { duration: 1.2, ease: "easeOut" }
          }}
          aria-hidden={activeIndex !== index}
        >
          <img 
            src={image.url} 
            alt={image.alt}
            className="w-full h-full object-cover rounded-lg"
          />
          
          {/* Enhanced gradient overlay for text readability */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10 rounded-lg"
            style={{ 
              background: isMobile 
                ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0.3) 100%)' 
                : 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.3) 100%)'
            }}
            aria-hidden="true"
          ></div>
        </motion.div>
      ))}
    </>
  );
};

export default HeroCarousel;
