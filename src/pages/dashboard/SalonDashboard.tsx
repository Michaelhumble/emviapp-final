
import React from 'react';
import Layout from '@/components/layout/Layout';
import { SalonDashboardContent } from '@/components/dashboard/salon/SalonDashboardContent';

const SalonDashboard = () => {
  console.log("RENDERING SalonDashboard.tsx");
  
  return (
    <Layout>
      <div style={{ backgroundColor: '#007BFF', color: '#FFF', padding: '10px', textAlign: 'center', fontSize: '18px', fontWeight: 'bold', width: '100%' }}>
        RENDERING SalonDashboard.tsx
      </div>
      <div className="container mx-auto px-4 py-8">
        <SalonDashboardContent />
      </div>
    </Layout>
  );
};

export default SalonDashboard;
