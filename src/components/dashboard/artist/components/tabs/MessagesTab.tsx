
import { useTestRecipient } from "@/hooks/chat/useTestRecipient";
import ArtistMessageCenter from "../ArtistMessageCenter";
import PremiumFeatureGate from "@/components/upgrade/PremiumFeatureGate";
import { UpgradeFeature } from "@/components/upgrade/SmartUpgradePrompt";
import { useSubscription } from "@/context/subscription";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const MessagesTab = () => {
  const { testRecipient, loading } = useTestRecipient();
  const { hasActiveSubscription } = useSubscription();

  if (loading) {
    return <div>Loading chat...</div>;
  }

  // Show premium feature gate for free users
  if (!hasActiveSubscription) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-lg shadow-sm">
        <MessageSquare className="h-12 w-12 text-primary/40 mb-4" />
        <h3 className="text-xl font-semibold mb-2">Unlock Messaging</h3>
        <p className="text-center text-muted-foreground mb-6 max-w-md">
          Connect directly with clients and other beauty professionals with our premium messaging feature.
        </p>
        <PremiumFeatureGate feature="messaging">
          <Button size="lg">
            Unlock Messaging
          </Button>
        </PremiumFeatureGate>
      </div>
    );
  }

  return <ArtistMessageCenter recipientId={testRecipient?.id} />;
};

export default MessagesTab;
