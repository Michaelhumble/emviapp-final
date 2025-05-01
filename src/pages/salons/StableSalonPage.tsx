
import React from 'react';
import SalonsFinal from './SalonsFinal';
import StablePageWrapper from '@/components/common/StablePageWrapper';

/**
 * Stable wrapper for the salon pages using the reusable StablePageWrapper
 */
const StableSalonPage: React.FC = () => {
  return (
    <StablePageWrapper
      title="Salons"
      description="Browse our comprehensive directory of nail salons."
      fallbackLinks={[
        { href: "/jobs", label: "Jobs" },
        { href: "/", label: "Homepage" },
        { href: "/dashboard", label: "Dashboard" }
      ]}
      version="1.0.3"
    >
      <SalonsFinal />
    </StablePageWrapper>
  );
};

export default StableSalonPage;
