
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone } from 'lucide-react';
import SmartUpgradePrompt from '@/components/upgrade/SmartUpgradePrompt';
import { useUpgradePrompt } from '@/hooks/useUpgradePrompt';
import { useSubscription } from '@/context/subscription';

interface ArtistContactTriggerProps {
  artistName: string;
}

const ArtistContactTrigger: React.FC<ArtistContactTriggerProps> = ({ artistName }) => {
  const { hasActiveSubscription } = useSubscription();
  const { isPromptOpen, setIsPromptOpen, checkAndTriggerUpgrade } = useUpgradePrompt("artist-contact");
  
  const handleContactClick = () => {
    if (checkAndTriggerUpgrade()) {
      // Show contact info or initiate contact flow
      console.log("Show contact info for", artistName);
    }
  };
  
  return (
    <div className="mt-4">
      <Button 
        onClick={handleContactClick}
        className="w-full"
        variant={hasActiveSubscription ? "default" : "outline"}
      >
        {hasActiveSubscription ? (
          <>
            <Mail className="mr-2 h-4 w-4" />
            Contact {artistName}
          </>
        ) : (
          <>
            <User className="mr-2 h-4 w-4" />
            View Contact Info
          </>
        )}
      </Button>
      
      <SmartUpgradePrompt 
        feature="artist-contact" 
        open={isPromptOpen} 
        onOpenChange={setIsPromptOpen}
      />
    </div>
  );
};

export default ArtistContactTrigger;
