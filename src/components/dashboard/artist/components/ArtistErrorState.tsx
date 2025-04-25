
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ArtistErrorStateProps {
  error: Error | string;
}

const ArtistErrorState = ({ error }: ArtistErrorStateProps) => {
  const errorMessage = typeof error === 'string' ? error : error.message;

  return (
    <Card className="shadow-sm border-red-200">
      <CardContent className="p-8 flex flex-col items-center text-center">
        <div className="bg-red-100 p-3 rounded-full mb-4">
          <AlertTriangle className="h-8 w-8 text-red-600" />
        </div>
        <h3 className="text-xl font-medium mb-2">Error Loading Dashboard</h3>
        <p className="text-muted-foreground mb-6 max-w-md">
          We encountered an error while loading your dashboard.
        </p>
        {errorMessage && (
          <p className="text-sm text-red-600 mb-4 p-2 bg-red-50 rounded-md max-w-md">
            {errorMessage}
          </p>
        )}
        <Button 
          onClick={() => window.location.reload()} 
          className="px-6"
        >
          Try Again
        </Button>
      </CardContent>
    </Card>
  );
};

export default ArtistErrorState;
