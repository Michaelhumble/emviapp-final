
import React from 'react';
import { Button } from '@/components/ui/button';
import { User, Mail } from 'lucide-react';
import { useSubscription } from '@/context/subscription';
import PremiumFeatureGate from '@/components/upgrade/PremiumFeatureGate';

interface ArtistContactTriggerProps {
  artistName: string;
}

const ArtistContactTrigger: React.FC<ArtistContactTriggerProps> = ({ artistName }) => {
  const { hasActiveSubscription } = useSubscription();
  
  const handleShowContact = () => {
    // This will only be called if the user has a subscription
    console.log("Show contact info for", artistName);
  };
  
  return (
    <div className="mt-4">
      <PremiumFeatureGate feature="artist-contact">
        <Button 
          onClick={handleShowContact}
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
      </PremiumFeatureGate>
    </div>
  );
};

export default ArtistContactTrigger;
