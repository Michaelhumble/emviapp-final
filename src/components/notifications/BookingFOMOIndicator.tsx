import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Eye, Users, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingFOMOIndicatorProps {
  artistId: string;
  className?: string;
}

export const BookingFOMOIndicator: React.FC<BookingFOMOIndicatorProps> = ({ 
  artistId, 
  className = "" 
}) => {
  const [viewCount, setViewCount] = useState(0);
  const [recentBookings, setRecentBookings] = useState(0);
  const [showPulse, setShowPulse] = useState(false);

  useEffect(() => {
    // Simulate real-time view tracking
    const interval = setInterval(() => {
      // Generate realistic view count fluctuations
      const baseViews = Math.floor(Math.random() * 12) + 3; // 3-15 views
      setViewCount(baseViews);
      
      // Random recent bookings (last 24h)
      const bookings = Math.floor(Math.random() * 4) + 1; // 1-4 bookings
      setRecentBookings(bookings);
      
      // Trigger pulse animation occasionally
      if (Math.random() > 0.7) {
        setShowPulse(true);
        setTimeout(() => setShowPulse(false), 2000);
      }
    }, 8000 + Math.random() * 4000); // Random interval 8-12 seconds

    // Initial load
    setViewCount(Math.floor(Math.random() * 12) + 3);
    setRecentBookings(Math.floor(Math.random() * 4) + 1);

    return () => clearInterval(interval);
  }, [artistId]);

  return (
    <div className={`space-y-2 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={viewCount}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2"
        >
          <Badge 
            variant="secondary" 
            className={`
              bg-orange-100 text-orange-700 border-orange-200 flex items-center gap-1
              ${showPulse ? 'animate-pulse' : ''}
            `}
          >
            <Eye className="h-3 w-3" />
            {viewCount} viewing now
          </Badge>
          
          <Badge 
            variant="secondary" 
            className="bg-green-100 text-green-700 border-green-200 flex items-center gap-1"
          >
            <TrendingUp className="h-3 w-3" />
            {recentBookings} booked today
          </Badge>
        </motion.div>
      </AnimatePresence>

      {/* Booking urgency indicator */}
      {showPulse && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-xs text-orange-600 font-medium"
        >
          🔥 High demand - book now to secure your spot!
        </motion.div>
      )}
    </div>
  );
};