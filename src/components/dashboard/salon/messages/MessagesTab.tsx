
import React from 'react';
import { Card } from '@/components/ui/card';
import MessageInbox from './MessageInbox';
import MessageThread from './MessageThread';
import { useSalonMessages, type Message } from '@/hooks/useSalonMessages';
import { useToast } from '@/hooks/use-toast';

const MessagesTab = () => {
  const { messages, loading, fetchMessages, sendMessage, markAsRead } = useSalonMessages();
  const [selectedMessage, setSelectedMessage] = React.useState<Message | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const handleMessageSelect = async (message: Message) => {
    setSelectedMessage(message);
    if (!message.read) {
      await markAsRead(message.id);
    }
  };

  const handleSendReply = async (messageBody: string) => {
    if (!selectedMessage) return;

    const success = await sendMessage(
      selectedMessage.sender_id,
      messageBody,
      selectedMessage.message_type
    );

    if (success) {
      toast({
        title: "Message sent successfully",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1 p-4">
        <MessageInbox
          messages={messages}
          loading={loading}
          selectedMessageId={selectedMessage?.id || null}
          onMessageSelect={handleMessageSelect}
        />
      </Card>

      <Card className="md:col-span-2 h-[750px]">
        <MessageThread
          messages={messages}
          selectedMessage={selectedMessage}
          onSendReply={handleSendReply}
        />
      </Card>
    </div>
  );
};

export default MessagesTab;
