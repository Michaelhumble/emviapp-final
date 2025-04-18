
import React from 'react';
import { Message } from '@/hooks/useSalonMessages';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface MessageThreadProps {
  messages: Message[];
  selectedMessage: Message | null;
  onSendReply: (messageBody: string) => Promise<void>;
}

const MessageThread = ({ messages, selectedMessage, onSendReply }: MessageThreadProps) => {
  const [replyText, setReplyText] = React.useState('');
  const scrollRef = React.useRef<HTMLDivElement>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    
    await onSendReply(replyText);
    setReplyText('');
  };

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!selectedMessage) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <Send className="h-12 w-12 mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">Select a message to view the conversation</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <Avatar className="h-10 w-10 mr-3">
          <AvatarImage src={selectedMessage.sender?.avatar_url} />
          <AvatarFallback>
            {selectedMessage.sender?.full_name?.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{selectedMessage.sender?.full_name}</h3>
          <p className="text-sm text-muted-foreground">
            {format(new Date(selectedMessage.created_at), 'PPp')}
          </p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4" ref={scrollRef}>
          {messages
            .filter(m => 
              m.sender_id === selectedMessage.sender_id || 
              m.sender_id === selectedMessage.recipient_id
            )
            .map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex",
                  message.sender_id === selectedMessage.sender_id ? "justify-start" : "justify-end"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] p-3 rounded-lg",
                    message.sender_id === selectedMessage.sender_id 
                      ? "bg-accent/10 rounded-tl-none" 
                      : "bg-primary text-primary-foreground rounded-tr-none"
                  )}
                >
                  <p className="text-sm">{message.message_body}</p>
                  <p className="text-xs mt-1 opacity-70">
                    {format(new Date(message.created_at), 'p')}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Type your reply..."
            className="min-h-[80px]"
          />
          <Button type="submit" disabled={!replyText.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageThread;
