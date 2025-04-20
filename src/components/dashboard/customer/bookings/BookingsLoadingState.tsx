
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const BookingsLoadingState = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {[1, 2].map((i) => (
        <Card key={i} className="w-full">
          <CardContent className="p-6">
            <div className="space-y-4 animate-pulse">
              <div className="flex justify-between">
                <div className="h-6 w-32 bg-gray-200 rounded"></div>
                <div className="h-6 w-20 bg-gray-200 rounded"></div>
              </div>
              <div className="h-4 w-48 bg-gray-200 rounded"></div>
              <div className="flex gap-4">
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                <div className="h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BookingsLoadingState;
