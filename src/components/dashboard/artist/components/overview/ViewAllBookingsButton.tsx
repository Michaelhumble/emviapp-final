
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ViewAllBookingsButton = () => {
  const handleClick = () => {
    // Find the Bookings tab button and click it
    const bookingsTab = document.getElementById('Bookings');
    if (bookingsTab) {
      bookingsTab.click();
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="mt-4"
    >
      <Button 
        variant="outline" 
        onClick={handleClick} 
        className="w-full flex items-center justify-center gap-2 h-12 bg-gradient-to-r from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border-primary/20"
      >
        <Calendar className="h-4 w-4" />
        <span>View All Bookings</span>
        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
};

export default ViewAllBookingsButton;
