import React, { Suspense, lazy, useState } from 'react';
import { UltimateSunshineButton } from './UltimateSunshineButton';

const UltimateSunshineWindow = lazy(() => 
  import('./UltimateSunshineWindow').then(module => ({ default: module.UltimateSunshineWindow }))
);

export const UltimateSunshineSystem = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <UltimateSunshineButton 
        onClick={() => setIsOpen(true)} 
        hasUnreadMessages={false}
      />
      
      <Suspense fallback={<div />}>
        <UltimateSunshineWindow 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        />
      </Suspense>
    </>
  );
};