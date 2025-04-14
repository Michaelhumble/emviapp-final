
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

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
  const timeAgo = formatDistanceToNow(lastBookingDate, { addSuffix: true });
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-purple-100 bg-purple-50/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-purple-800 flex items-center">
                <Calendar className="h-4 w-4 mr-2 text-purple-600" />
                Booking Reminder
              </h3>
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
              Your last booking with {artistName} was {timeAgo}. Would you like to schedule another appointment?
            </p>
            
            <Button 
              size="sm" 
              className="w-full bg-purple-600 hover:bg-purple-700"
              asChild
            >
              <Link to={`/booking?artist=${artistId}`}>
                Book with {artistName} again
              </Link>
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};
