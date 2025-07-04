
import React from 'react';
import SalonDashboard from './SalonDashboard';

const OwnerDashboard = () => {
  // DEBUG: Log which file is rendering
  console.log("🔍 DEBUG: Rendering from src/pages/dashboard/owner.tsx");
  
  return (
    <>
      {/* DEBUG BANNER */}
      <div className="bg-red-400 text-red-900 px-4 py-2 text-center font-bold w-full">
        🔴 RENDERING owner.tsx
      </div>
      <SalonDashboard />
    </>
  );
};

export default OwnerDashboard;
