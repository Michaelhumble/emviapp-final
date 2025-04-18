
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { Check, CircleDot, User } from "lucide-react";

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

interface MessagesListProps {
  messages: Message[];
  selectedMessageId: string | null;
  onMessageSelect: (message: Message) => void;
  filter: "all" | "unread" | "clients" | "artists";
}

const MessagesList = ({ messages, selectedMessageId, onMessageSelect, filter }: MessagesListProps) => {
  const filteredMessages = messages.filter(message => {
    switch (filter) {
      case "unread":
        return !message.isRead;
      case "clients":
        return message.sender.type === "customer";
      case "artists":
        return message.sender.type === "artist";
      default:
        return true;
    }
  });

  if (filteredMessages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[400px] text-center p-4">
        <div className="text-gray-400 mb-2">
          <CircleDot size={40} />
        </div>
        <p className="text-lg font-medium text-gray-700">You're all caught up!</p>
        <p className="text-sm text-gray-500">No new messages to display.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px]">
      <div className="space-y-2 p-2">
        {filteredMessages.map((message) => (
          <div
            key={message.id}
            onClick={() => onMessageSelect(message)}
            className={`flex items-start p-3 rounded-lg border transition-all cursor-pointer
              ${message.isRead ? 'bg-white' : 'bg-blue-50'} 
              ${selectedMessageId === message.id ? 'border-blue-300 shadow-sm' : 'border-gray-100'}
              hover:bg-gray-50`}
          >
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage src={message.sender.avatar || ''} alt={message.sender.name} />
              <AvatarFallback className={
                message.sender.type === 'artist' ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'
              }>
                {message.sender.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <p className={`font-medium ${!message.isRead ? 'text-blue-700' : ''}`}>
                    {message.sender.name}
                  </p>
                  {message.sender.type === 'artist' && (
                    <Badge variant="outline" className="ml-2 bg-purple-50 text-purple-700 border-purple-200">
                      Artist
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                </span>
              </div>

              <p className={`text-sm mt-1 truncate ${!message.isRead ? 'font-medium' : 'text-gray-600'}`}>
                {message.content}
              </p>

              <div className="flex justify-end mt-2">
                {message.isReplied && (
                  <Badge variant="outline" className="text-xs text-green-600 bg-green-50 border-green-200">
                    <Check className="w-3 h-3 mr-1" />
                    Replied
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessagesList;
