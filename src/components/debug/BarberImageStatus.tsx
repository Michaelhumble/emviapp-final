
import React from 'react';

/**
 * Development component to verify barber image loading
 * This component is now deprecated but kept for compatibility
 */
const BarberImageStatus: React.FC = () => {
  // Only show in development
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div className="mb-4 p-4 border border-amber-200 rounded-md bg-amber-50 text-xs">
      <h3 className="font-bold mb-2">🚫 Barber Section Removed</h3>
      <p>The barber section has been removed from the application.</p>
      <p>This component will be fully deprecated in a future release.</p>
    </div>
  );
};

export default BarberImageStatus;
