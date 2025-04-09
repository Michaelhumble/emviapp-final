
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
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: activeIndex === index ? 1 : 0,
          }}
          transition={{ 
            opacity: { duration: 1.5, ease: "easeInOut" },
          }}
          aria-hidden={activeIndex !== index}
        >
          <div className={`w-full h-full ${isMobile ? 'flex items-center justify-center' : ''}`}>
            <img 
              src={image.url} 
              alt={image.alt}
              className={`w-full h-full ${isMobile ? 'object-contain' : 'object-cover'}`}
              style={{ 
                objectPosition: "center",
              }}
            />
          </div>
          
          {/* Enhanced glass effect overlay for mobile with stronger blur and transparency */}
          <div 
            className="absolute inset-0 z-10"
            style={{ 
              background: isMobile 
                ? 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)' 
                : 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.3) 100%)',
              backdropFilter: isMobile ? 'blur(8px)' : 'blur(2px)'
            }}
            aria-hidden="true"
          ></div>
        </motion.div>
      ))}
    </>
  );
};

export default HeroCarousel;
