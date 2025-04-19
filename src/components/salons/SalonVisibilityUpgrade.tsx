
import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import SmartUpgradePrompt from '@/components/upgrade/SmartUpgradePrompt';
import { useUpgradePrompt } from '@/hooks/useUpgradePrompt';
import { useSubscription } from '@/context/subscription';

const SalonVisibilityUpgrade = () => {
  const { hasActiveSubscription } = useSubscription();
  const { isPromptOpen, setIsPromptOpen, checkAndTriggerUpgrade } = useUpgradePrompt("salon-visibility");
  
  const handleUpgradeClick = () => {
    checkAndTriggerUpgrade();
  };
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-100">
      <h3 className="font-semibold text-lg mb-2">Boost Your Salon's Visibility</h3>
      <p className="text-sm text-gray-600 mb-4">
        {hasActiveSubscription 
          ? "Your salon is featured with premium visibility! More clients are discovering you every day."
          : "Stand out in search results and get discovered by more potential clients in your area."}
      </p>
      
      {!hasActiveSubscription && (
        <Button 
          onClick={handleUpgradeClick}
          variant="outline" 
          className="bg-white border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          <Globe className="mr-2 h-4 w-4" />
          Enhance Visibility
        </Button>
      )}
      
      <SmartUpgradePrompt 
        feature="salon-visibility" 
        open={isPromptOpen} 
        onOpenChange={setIsPromptOpen}
      />
    </div>
  );
};

export default SalonVisibilityUpgrade;
