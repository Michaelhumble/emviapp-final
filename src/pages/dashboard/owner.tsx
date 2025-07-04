
import React from 'react';
import SalonDashboard from './SalonDashboard';

const OwnerDashboard = () => {
  console.log("RENDERING owner.tsx");
  
  return (
    <>
      <div style={{ backgroundColor: '#FF0000', color: '#FFF', padding: '10px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', width: '100%' }}>
        RENDERING owner.tsx
      </div>
      <SalonDashboard />
    </>
  );
};

export default OwnerDashboard;
