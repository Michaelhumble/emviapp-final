import React, { ReactNode } from 'react';
import { useUpgradePrompt, UpgradeFeature } from '@/hooks/useUpgradePrompt';

interface PremiumFeatureGateProps {
  children: ReactNode;
  feature: UpgradeFeature;
  fallback?: ReactNode;
}

// Simple component to gate premium features
const PremiumFeatureGate: React.FC<PremiumFeatureGateProps> = ({ 
  children, 
  feature,
  fallback
}) => {
  const { promptUpgrade, hasAccess } = useUpgradePrompt();
  
  const handleClick = () => {
    if (!hasAccess(feature)) {
      promptUpgrade(feature);
    }
  };
  
  // If the user has access to this feature, render the children
  if (hasAccess(feature)) {
    return <>{children}</>;
  }
  
  // If there's a fallback, render it
  if (fallback) {
    return <div onClick={handleClick}>{fallback}</div>;
  }
  
  // Otherwise just wrap the children in a div that prompts an upgrade when clicked
  return (
    <div onClick={handleClick} className="cursor-pointer">
      {children}
    </div>
  );
};

export default PremiumFeatureGate;
