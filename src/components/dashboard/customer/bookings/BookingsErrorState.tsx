
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

const BookingsErrorState = () => {
  return (
    <Card className="w-full">
      <CardContent className="flex flex-col items-center justify-center p-12">
        <XCircle className="h-12 w-12 text-red-500 mb-4" />
        <p className="text-gray-600 mb-6 text-center">
          Unable to load your bookings
        </p>
        <Button 
          onClick={() => window.location.reload()}
          className="h-11"
        >
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingsErrorState;
