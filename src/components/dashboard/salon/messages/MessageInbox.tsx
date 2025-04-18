
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Message } from '@/hooks/useSalonMessages';
import { formatDistanceToNow } from 'date-fns';

interface MessageInboxProps {
  messages: Message[];
  loading: boolean;
  selectedMessageId: string | null;
  onMessageSelect: (message: Message) => void;
}

const MessageInbox = ({ messages, loading, selectedMessageId, onMessageSelect }: MessageInboxProps) => {
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredMessages = messages.filter(message => 
    message.sender?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.message_body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[400px]">
        <p className="text-muted-foreground">Loading messages...</p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center p-4">
        <User className="h-12 w-12 text-muted-foreground mb-4" />
        <p className="text-lg font-medium">You're all caught up!</p>
        <p className="text-sm text-muted-foreground">No new messages to display.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search messages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <ScrollArea className="h-[600px]">
        <div className="space-y-2">
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              onClick={() => onMessageSelect(message)}
              className={cn(
                "flex items-start p-4 rounded-lg border transition-colors cursor-pointer",
                message.read ? "bg-background" : "bg-blue-50/50",
                selectedMessageId === message.id && "border-primary shadow-sm",
                "hover:bg-accent/5"
              )}
            >
              <Avatar className="h-10 w-10 mr-4">
                <AvatarImage src={message.sender?.avatar_url} />
                <AvatarFallback>
                  {message.sender?.full_name?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={cn("font-medium", !message.read && "text-primary")}>
                      {message.sender?.full_name}
                    </span>
                    <Badge variant="outline" className={cn(
                      "text-xs",
                      message.message_type === 'client' && "bg-blue-50 text-blue-700 border-blue-200",
                      message.message_type === 'artist' && "bg-purple-50 text-purple-700 border-purple-200",
                      message.message_type === 'applicant' && "bg-green-50 text-green-700 border-green-200"
                    )}>
                      {message.message_type}
                    </Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                  </span>
                </div>
                
                <p className={cn(
                  "text-sm mt-1 truncate",
                  message.read ? "text-muted-foreground" : "text-foreground font-medium"
                )}>
                  {message.message_body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

export default MessageInbox;
