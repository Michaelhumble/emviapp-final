import React from 'react';
import PerformanceAuditDashboard from '@/components/performance/PerformanceAuditDashboard';

const PerformanceAudit: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">
        <PerformanceAuditDashboard />
      </div>
    </div>
  );
};

export default PerformanceAudit;