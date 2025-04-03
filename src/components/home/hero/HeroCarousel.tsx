
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
            className="w-full h-full object-cover rounded-lg"
          />
          
          {/* Semi-transparent overlay for text readability */}
          <div className="absolute inset-0 bg-black/20 z-10 rounded-lg"></div>
        </motion.div>
      ))}
    </>
  );
};

export default HeroCarousel;
