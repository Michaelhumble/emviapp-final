
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
          <div className="w-full h-full">
            <img 
              src={image.url} 
              alt={image.alt}
              className="absolute inset-0 w-screen h-screen object-cover"
              style={{ 
                objectPosition: "center",
                width: "100vw",
                height: "100vh",
                maxWidth: "100vw",
                maxHeight: "100vh"
              }}
            />
          </div>
          
          {/* Subtle overlay for better text readability */}
          <div 
            className="absolute inset-0 z-10"
            style={{ 
              background: 'linear-gradient(to top, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.1) 100%)'
            }}
            aria-hidden="true"
          ></div>
        </motion.div>
      ))}
    </>
  );
};

export default HeroCarousel;
