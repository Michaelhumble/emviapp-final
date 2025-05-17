
import { useState } from 'react';

export type UpgradeFeature = 
  | 'ai_polish'
  | 'unlimited_jobs'
  | 'featured_listing'
  | 'enhanced_visibility'
  | 'premium_placement'
  | 'priority_support'
  | 'applicant_management'
  | 'messaging'
  | 'analytics_dashboard';

export const useUpgradePrompt = () => {
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const [targetFeature, setTargetFeature] = useState<UpgradeFeature | null>(null);
  
  // This would normally check subscription status from API
  // For now, just returning a stub implementation
  const hasAccess = (feature: UpgradeFeature): boolean => {
    // For demo, let's say we have access to some features
    const freeFeatures = ['ai_polish'];
    return freeFeatures.includes(feature);
  };
  
  const promptUpgrade = (feature: UpgradeFeature) => {
    setTargetFeature(feature);
    setIsPromptVisible(true);
    console.log(`Upgrade prompt shown for feature: ${feature}`);
  };
  
  const closePrompt = () => {
    setIsPromptVisible(false);
  };
  
  return {
    isPromptVisible,
    targetFeature,
    promptUpgrade,
    closePrompt,
    hasAccess,
  };
};
