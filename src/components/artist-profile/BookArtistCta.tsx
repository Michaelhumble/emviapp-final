
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Calendar, Star } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface BookArtistCtaProps {
  artistName: string;
  rating?: number;
  onBookNow: () => void;
}

const BookArtistCta: React.FC<BookArtistCtaProps> = ({ 
  artistName, 
  rating = 4.9, 
  onBookNow 
}) => {
  const isMobile = useIsMobile();
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  if (!isMobile) {
    // Desktop: Static button in the top right
    return (
      <div className="hidden md:block">
        <Button 
          onClick={onBookNow}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md"
        >
          <Calendar className="mr-2 h-4 w-4" />
          Book with {artistName}
        </Button>
      </div>
    );
  }
  
  // Mobile: Sticky button at the bottom
  return (
    <AnimatePresence>
      {isScrolled && (
        <motion.div 
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm font-medium">{artistName}</div>
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400 mr-1" />
              <span className="text-sm">{rating}</span>
            </div>
          </div>
          
          <Button 
            onClick={onBookNow}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Book Now
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookArtistCta;
