
import React from 'react';

const JobLoadingState = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B5CF6] mx-auto mb-4"></div>
        <p className="text-gray-600">Loading jobs...</p>
      </div>
    </div>
  );
};

export default JobLoadingState;
