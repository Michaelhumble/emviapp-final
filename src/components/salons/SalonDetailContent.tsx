
import React from 'react';
import { Job } from '@/types/job';
import UnifiedSalonView from './UnifiedSalonView';

interface SalonDetailContentProps {
  salon: Job | null;
}

const SalonDetailContent: React.FC<SalonDetailContentProps> = ({ salon }) => {
  if (!salon) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Salon Not Found</h2>
          <p className="text-gray-600">The salon you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return <UnifiedSalonView salon={salon} />;
};

export default SalonDetailContent;
