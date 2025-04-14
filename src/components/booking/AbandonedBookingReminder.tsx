
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface AbandonedBookingReminderProps {
  bookingId: string;
  serviceName: string;
  onDismiss: () => void;
}

export const AbandonedBookingReminder = ({
  bookingId,
  serviceName,
  onDismiss
}: AbandonedBookingReminderProps) => {
  const navigate = useNavigate();
  
  const handleContinueBooking = () => {
    navigate(`/booking?draft=${bookingId}`);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-50 max-w-md"
    >
      <Card className="border-amber-100 bg-amber-50/70 backdrop-blur shadow-lg">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-amber-600 mr-2" />
              <h3 className="text-sm font-medium text-amber-800">
                Unfinished Booking
              </h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDismiss}
              className="h-7 w-7 p-0 rounded-full"
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">
            You have an unfinished booking for <span className="font-medium">{serviceName}</span>. 
            Would you like to continue where you left off?
          </p>
          
          <div className="flex justify-end space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={onDismiss}
            >
              Dismiss
            </Button>
            <Button 
              size="sm"
              className="bg-amber-600 hover:bg-amber-700 border-none"
              onClick={handleContinueBooking}
            >
              Continue Booking
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
