
import { motion } from "framer-motion";

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
          className="absolute inset-0 w-full h-full overflow-hidden"
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
          
          {/* Enhanced gradient overlay for text readability - darker at bottom */}
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10 rounded-lg"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.5) 30%, rgba(0,0,0,0.2) 100%)' }}
            aria-hidden="true"
          ></div>
        </motion.div>
      ))}
    </>
  );
};

export default HeroCarousel;
