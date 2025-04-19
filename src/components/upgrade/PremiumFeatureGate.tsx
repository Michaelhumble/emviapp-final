
import React from 'react';
import SmartUpgradePrompt, { UpgradeFeature } from './SmartUpgradePrompt';
import { useUpgradePrompt } from '@/hooks/useUpgradePrompt';

interface PremiumFeatureGateProps {
  feature: UpgradeFeature;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const PremiumFeatureGate: React.FC<PremiumFeatureGateProps> = ({
  feature,
  children,
  fallback
}) => {
  const { isPromptOpen, setIsPromptOpen, checkAndTriggerUpgrade } = useUpgradePrompt(feature);

  const handleAction = (e: React.MouseEvent) => {
    if (!checkAndTriggerUpgrade()) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  // Clone children and add the handler to the onClick
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { 
        onClick: (e: React.MouseEvent) => {
          if (child.props.onClick) child.props.onClick(e);
          handleAction(e);
        }
      });
    }
    return child;
  });

  return (
    <>
      {childrenWithProps}
      <SmartUpgradePrompt 
        feature={feature} 
        open={isPromptOpen} 
        onOpenChange={setIsPromptOpen} 
      />
    </>
  );
};

export default PremiumFeatureGate;
