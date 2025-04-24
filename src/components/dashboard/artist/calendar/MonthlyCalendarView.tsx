
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { useArtistCalendar } from '@/hooks/useArtistCalendar';

const MonthlyCalendarView: React.FC = () => {
  const { currentDate } = useArtistCalendar();
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-6 px-4"
    >
      <Card className="border border-gray-100">
        <CardContent className="p-4">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={currentDate}
              className="rounded-md border"
            />
          </div>
          <div className="text-center mt-6 text-gray-500">
            Monthly view is currently in development. More features coming soon!
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MonthlyCalendarView;
