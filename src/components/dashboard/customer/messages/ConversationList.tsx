
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
  if (conversations.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center py-10 text-gray-400 text-center text-base">
        No messages yet.<br />You’ll see replies here after booking.
      </div>
    );
  }
  return (
    <div className={`${isMobile ? "" : "border-r"} w-full`}>
      {conversations.map((c) => (
        <button
          key={c.id}
          onClick={() => onSelect(c.id)}
          className={`flex items-center w-full px-4 py-3 hover:bg-gray-100 transition rounded-xl mb-1 focus:outline-none ${
            activeId === c.id
              ? "bg-primary/10"
              : ""
          }`}
        >
          <Avatar className="h-10 w-10 mr-3">
            {c.avatarUrl ? (
              <AvatarImage src={c.avatarUrl} />
            ) : (
              <AvatarFallback>{c.name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="font-medium text-gray-900 truncate">{c.name}</div>
            <div className="text-xs text-gray-500 truncate">{c.lastMessage}</div>
          </div>
          <div className="ml-2 shrink-0 text-[11px] text-gray-400">{new Date(c.lastMessageAt).toLocaleDateString()}</div>
        </button>
      ))}
    </div>
  );
};

export default ConversationList;
