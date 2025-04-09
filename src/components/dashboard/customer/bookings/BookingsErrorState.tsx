
import React from 'react';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BookingsErrorState = () => {
  return (
    <div>
      <p className="text-red-500">Unable to load your bookings. Please try again later.</p>
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-2"
        onClick={() => window.location.reload()}
      >
        Retry
      </Button>
    </div>
  );
};

export default BookingsErrorState;
