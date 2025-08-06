import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/auth';
import { BookingFOMOIndicator } from '@/components/notifications/BookingFOMOIndicator';

interface MobileBookingButtonProps {
  artistId: string;
  artistName: string;
  onBookingClick: () => void;
  className?: string;
}

export const MobileBookingButton: React.FC<MobileBookingButtonProps> = ({
  artistId,
  artistName,
  onBookingClick,
  className = ""
}) => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  // Show sticky button only on mobile screens
  if (typeof window !== 'undefined' && window.innerWidth >= 768) {
    return null;
  }

  return (
    <>
      {/* Sticky Mobile Booking Button */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`
          fixed bottom-0 left-0 right-0 z-50 md:hidden
          bg-white border-t border-gray-200 shadow-lg p-4
          ${className}
        `}
      >
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4 overflow-hidden"
            >
              <BookingFOMOIndicator 
                artistId={artistId} 
                className="mb-3" 
              />
              <div className="text-sm text-gray-600 text-center">
                Book with {artistName} now to secure your preferred time slot
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3">
          {/* Expand/Collapse Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 h-auto"
          >
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronUp className="h-4 w-4" />
            </motion.div>
          </Button>

          {/* Main Booking Button */}
          <Button
            onClick={onBookingClick}
            size="lg"
            className="
              flex-1 bg-gradient-to-r from-purple-600 to-pink-600 
              hover:from-purple-700 hover:to-pink-700
              text-white font-semibold
              shadow-lg hover:shadow-xl
              transition-all duration-300
              min-h-[48px] rounded-xl
            "
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book {artistName}
          </Button>
        </div>

        {/* Haptic feedback for iOS */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('vibrate' in navigator) {
                document.querySelector('[data-booking-button]')?.addEventListener('click', () => {
                  navigator.vibrate(50);
                });
              }
            `
          }}
        />
      </motion.div>

      {/* Bottom padding to prevent content overlap */}
      <div className="h-20 md:hidden" />
    </>
  );
};