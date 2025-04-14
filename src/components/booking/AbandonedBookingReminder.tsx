
import React from 'react';
import { toast } from 'sonner';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

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
  
  const handleResume = () => {
    navigate(`/booking?resume=${bookingId}`);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed bottom-20 right-4 z-40 max-w-xs bg-white rounded-lg shadow-lg border border-orange-100 p-4"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 bg-orange-100 rounded-full p-2 mr-3">
          <AlertCircle className="h-5 w-5 text-orange-500" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-sm">Still interested?</h3>
          <p className="text-xs text-gray-500 mt-1">
            Your appointment for {serviceName} is almost gone.
          </p>
          <div className="flex items-center justify-between mt-3">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-500 hover:text-gray-700"
              onClick={onDismiss}
            >
              Dismiss
            </Button>
            <Button 
              size="sm" 
              onClick={handleResume}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Resume booking
              <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
