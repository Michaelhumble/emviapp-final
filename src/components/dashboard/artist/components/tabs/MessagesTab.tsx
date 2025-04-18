
import { useTestRecipient } from "@/hooks/chat/useTestRecipient";
import ArtistMessageCenter from "../ArtistMessageCenter";

const MessagesTab = () => {
  const { testRecipient, loading } = useTestRecipient();

  if (loading) {
    return <div>Loading chat...</div>;
  }

  return <ArtistMessageCenter recipientId={testRecipient?.id} />;
};

export default MessagesTab;
