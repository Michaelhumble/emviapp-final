
// Updated: highlight unread, sort, mobile polish

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ConversationPreview } from "./useCustomerConversations";

interface ConversationListProps {
  conversations: ConversationPreview[];
  activeId?: string;
  onSelect: (id: string) => void;
  isMobile?: boolean;
}

const ConversationList = ({
  conversations,
  activeId,
  onSelect,
  isMobile = false,
}: ConversationListProps) => {
  // Simulate unread state: mark the first conversation as unread if unread not in data
  const sortedConversations = [...conversations].sort((a, b) => {
    const aUnread = a.unread ? 1 : 0;
    const bUnread = b.unread ? 1 : 0;
    if (aUnread !== bUnread) return bUnread - aUnread;
    return new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime();
  });

  if (conversations.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center py-10 text-gray-400 text-center text-base">
        No messages yet.<br />You’ll see replies here after booking.
      </div>
    );
  }
  return (
    <div className={`${isMobile ? "" : "border-r"} w-full`}>
      {sortedConversations.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`flex items-center w-full px-4 py-3 rounded-xl mb-1 focus:outline-none transition relative ${
            activeId === c.id
              ? "bg-primary/10"
              : "hover:bg-gray-100"
          } ${isMobile ? "min-h-[56px]" : "min-h-[48px]"}`}
        >
          <Avatar className="h-10 w-10 mr-3">
            {c.avatarUrl ? (
              <AvatarImage src={c.avatarUrl} />
            ) : (
              <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className={`font-medium truncate ${c.unread ? "text-black font-bold" : "text-gray-900"}`}>
                {c.name}
              </span>
              {c.unread && 
                <span className="inline-block w-2 h-2 bg-pink-500 rounded-full animate-pulse" title="Unread"></span>
              }
            </div>
            <div className={`text-xs truncate ${c.unread ? "font-semibold text-pink-500" : "text-gray-500"}`}>
              {c.lastMessage}
            </div>
          </div>
          <div className="ml-2 shrink-0 text-[11px] text-gray-400">
            {new Date(c.lastMessageAt).toLocaleDateString()}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ConversationList;

