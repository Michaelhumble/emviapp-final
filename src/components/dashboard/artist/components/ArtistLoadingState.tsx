
import React from 'react';
import { Loader2 } from 'lucide-react';

const ArtistLoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 h-64">
      <Loader2 className="h-8 w-8 text-primary animate-spin mb-4" />
      <p className="text-muted-foreground">Loading your dashboard...</p>
    </div>
  );
};

export default ArtistLoadingState;
