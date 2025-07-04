
import React from 'react';
import Layout from '@/components/layout/Layout';
import { SalonDashboardContent } from '@/components/dashboard/salon/SalonDashboardContent';

const SalonDashboard = () => {
  // DEBUG: Log which file is rendering
  console.log("🔍 DEBUG: Rendering from src/pages/dashboard/SalonDashboard.tsx");
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* DEBUG BANNER - Remove after confirmation */}
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          <strong>🔍 DEBUG:</strong> This is rendering from <code>src/pages/dashboard/SalonDashboard.tsx</code>
        </div>
        <SalonDashboardContent />
      </div>
    </Layout>
  );
};

export default SalonDashboard;
