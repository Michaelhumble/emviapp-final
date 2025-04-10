
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
    <div 
      className="fixed inset-0 w-full h-full overflow-hidden"
      style={{
        userSelect: "none",
        touchAction: "none",
        pointerEvents: "none"
      }}
    >
      {images.map((image, index) => (
        <motion.div 
          key={index}
          className="fixed inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: activeIndex === index ? 1 : 0,
          }}
          transition={{ 
            opacity: { duration: 1.5, ease: "easeInOut" },
          }}
          aria-hidden={activeIndex !== index}
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
          }}
        >
          <div className="fixed inset-0">
            <img 
              src={image.url} 
              alt={image.alt}
              className="w-screen h-screen object-cover"
              style={{ 
                objectPosition: "center",
                width: "100vw",
                height: "100vh",
                position: "fixed",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                userSelect: "none",
                pointerEvents: "none"
              }}
              draggable="false"
            />
            
            {/* Subtle overlay for better text readability */}
            <div 
              className="fixed inset-0 z-10"
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
