
import React from 'react';
import SalonsFinal from './SalonsFinal';
import { StableRouteGuard } from '@/utils/stability/RouteStabilityGuard';

const StableSalonPage = () => {
  return (
    <StableRouteGuard isStable={true}>
      <SalonsFinal />
    </StableRouteGuard>
  );
};

export default StableSalonPage;
