
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
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <motion.div 
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: activeIndex === index ? 1 : 0,
          }}
          transition={{ 
            opacity: { duration: 1.5, ease: "easeInOut" },
          }}
          aria-hidden={activeIndex !== index}
        >
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img 
              src={image.url} 
              alt={image.alt}
              className="w-full h-full object-cover pointer-events-none"
              style={{ 
                objectPosition: "center",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                userSelect: "none",
                touchAction: "none"
              }}
              draggable="false"
            />
            
            {/* Subtle overlay for better text readability */}
            <div 
              className="absolute inset-0 z-10 pointer-events-none"
              style={{ 
                background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.1) 100%)'
              }}
              aria-hidden="true"
            ></div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default HeroCarousel;
