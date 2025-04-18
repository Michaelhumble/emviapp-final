
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Send, Check, MailOpen } from "lucide-react";

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string | null;
    type: "customer" | "artist" | "staff"
  };
  content: string;
  timestamp: Date;
  isRead: boolean;
  isReplied: boolean;
}

interface MessageViewProps {
  message: Message | null;
  onMarkAsRead: (messageId: string) => void;
  onSendReply: (messageId: string, content: string) => void;
}

const MessageView = ({ message, onMarkAsRead, onSendReply }: MessageViewProps) => {
  const [replyText, setReplyText] = React.useState("");

  if (!message) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 text-gray-500">
        <MailOpen className="h-12 w-12 mb-4" />
        <p>Select a message to view its contents</p>
      </div>
    );
  }

  const handleSendReply = () => {
    if (replyText.trim()) {
      onSendReply(message.id, replyText);
      setReplyText("");
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={message.sender.avatar || ''} />
            <AvatarFallback className={
              message.sender.type === 'artist' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
            }>
              {message.sender.name.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center">
              <h3 className="font-semibold">{message.sender.name}</h3>
              {message.sender.type === 'artist' && (
                <Badge variant="outline" className="ml-2 bg-purple-50 text-purple-700 border-purple-200">
                  Artist
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-500">
              {format(message.timestamp, "MMM d, h:mm a")}
            </p>
          </div>
        </div>
        {!message.isRead && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onMarkAsRead(message.id)}
            className="text-blue-600"
          >
            <Check className="w-4 h-4 mr-1" />
            Mark as Read
          </Button>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="min-h-[200px] p-4 rounded-lg bg-gray-50">
          <p className="text-gray-700 whitespace-pre-wrap">{message.content}</p>
        </div>

        <div className="space-y-2">
          <Textarea
            placeholder="Type your reply here..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button onClick={handleSendReply} disabled={!replyText.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Send Reply
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageView;
