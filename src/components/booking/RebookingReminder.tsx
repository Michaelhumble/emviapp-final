
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Clock, X, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface RebookingReminderProps {
  lastBookingDate: Date;
  artistName: string;
  artistId: string;
  onDismiss: () => void;
}

export const RebookingReminder = ({
  lastBookingDate,
  artistName,
  artistId,
  onDismiss
}: RebookingReminderProps) => {
  const navigate = useNavigate();
  
  const handleRebook = () => {
    // Navigate to booking page with pre-selected artist
    navigate(`/booking?artist=${artistId}`);
  };
  
  const formatDate = (date: Date) => {
    return format(date, 'MMMM d, yyyy');
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="border-blue-100 bg-blue-50/50">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-blue-700 mr-2" />
              <h3 className="text-sm font-medium text-blue-800">
                Time for a booking?
              </h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onDismiss}
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Dismiss</span>
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">
            Your last appointment was on <span className="font-medium">{formatDate(lastBookingDate)}</span> with <span className="font-medium">{artistName}</span>. 
            Would you like to book another appointment?
          </p>
          
          <div className="flex justify-end">
            <Button 
              size="sm" 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleRebook}
            >
              <User className="h-4 w-4 mr-1" />
              Book with {artistName}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
