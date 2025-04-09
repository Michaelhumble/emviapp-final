
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
          
          {/* Very light overlay (15% opacity) to maintain text readability while showing more of the image */}
          <div 
            className="absolute inset-0 z-10"
            style={{ 
              background: isMobile 
                ? 'linear-gradient(to top, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.05) 100%)' 
                : 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.1) 100%)',
              backdropFilter: isMobile ? 'blur(1px)' : 'blur(2px)'
            }}
            aria-hidden="true"
          ></div>
        </motion.div>
      ))}
    </>
  );
};

export default HeroCarousel;
