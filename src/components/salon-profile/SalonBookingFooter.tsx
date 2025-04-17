
import React from 'react';
import { Salon } from '@/types/salon';
import { useIsMobile } from '@/hooks/use-mobile';
import { Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface SalonBookingFooterProps {
  salon: Salon;
}

const SalonBookingFooter: React.FC<SalonBookingFooterProps> = ({ salon }) => {
  const isMobile = useIsMobile();
  
  if (!isMobile) {
    return null;
  }
  
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg z-40"
    >
      <div className="container grid grid-cols-2 gap-3">
        {salon.phone ? (
          <Button 
            variant="outline"
            className="w-full"
            onClick={() => {
              window.location.href = `tel:${salon.phone}`;
            }}
          >
            <Phone className="h-4 w-4 mr-2" />
            Call Now
          </Button>
        ) : (
          <Button 
            variant="outline"
            className="w-full" 
            onClick={() => {
              // Email as fallback if no phone
              window.location.href = salon.email ? `mailto:${salon.email}` : '#';
            }}
          >
            Contact
          </Button>
        )}
        
        <Button 
          className="w-full"
          onClick={() => {
            // Booking functionality would go here
            if (salon.bookingLink) {
              window.open(salon.bookingLink, '_blank');
            } else {
              console.log('Book at salon:', salon.name);
              // Here you could show a booking modal or redirect to booking page
            }
          }}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Book Now
        </Button>
      </div>
    </motion.div>
  );
};

export default SalonBookingFooter;
