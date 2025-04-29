
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
          <div className="fixed-image-container absolute inset-0">
            <img 
              src={image.url} 
              alt={image.alt}
              className="w-screen h-screen object-cover"
              style={{ 
                objectPosition: isMobile ? "center center" : "center", // Better positioning for mobile
                width: "100vw",
                height: "100vh", // Use vh units for better mobile support
                maxWidth: "100vw",
                maxHeight: "100vh",
                position: "absolute",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
              }}
            />
            
            {/* Subtle overlay for better text readability */}
            <div 
              className="absolute inset-0 z-10"
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
