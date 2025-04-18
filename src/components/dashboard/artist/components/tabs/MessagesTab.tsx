
import ArtistMessageCenter from "../ArtistMessageCenter";
import { useTestRecipient } from "@/hooks/chat/useTestRecipient";

const MessagesTab = () => {
  const { testRecipient, loading } = useTestRecipient();

  if (loading) {
    return <div>Loading chat...</div>;
  }

  return <ArtistMessageCenter recipientId={testRecipient?.id} />;
};

export default MessagesTab;
