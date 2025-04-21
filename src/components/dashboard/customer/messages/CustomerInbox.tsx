
import React, { useState } from "react";
import { useCustomerConversations } from "./useCustomerConversations";
import ConversationList from "./ConversationList";
import ConversationThread from "./ConversationThread";
import { useAuth } from "@/context/auth";

const CustomerInbox = () => {
  const { user } = useAuth();
  const { conversations, loading } = useCustomerConversations();
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeConv = conversations.find((c) => c.id === activeId);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 700;

  // Full mobile polish: panel fills width, removes scroll bugs
  if (isMobile && activeId && activeConv) {
    return (
      <div className="h-[72vh] w-full bg-white p-2 rounded-lg shadow border flex flex-col">
        <ConversationThread
          currentUserId={user?.id!}
          otherUserId={activeConv.userId}
          otherName={activeConv.name}
          otherAvatarUrl={activeConv.avatarUrl}
          isMobile={true}
          onBack={() => setActiveId(null)}
        />
      </div>
    );
  }

  // Stack messages on mobile, and ensure width/height
  return (
    <div className="
      flex flex-col md:flex-row
      h-[60vh] md:h-[65vh]
      bg-white rounded-lg shadow border
      max-w-full md:max-w-3xl mx-auto
      overflow-hidden
      min-w-0
    ">
      <div className="w-full md:w-1/3 bg-gray-50 pb-2 min-w-0">
        <div className="font-semibold text-lg px-4 pt-4 pb-2" style={{ fontSize: '1.1rem' }}>Messages</div>
        <ConversationList
          conversations={conversations}
          activeId={activeId!}
          onSelect={setActiveId}
          isMobile={isMobile}
        />
      </div>
      <div className="flex-1 bg-white border-l p-0 min-w-0">
        {activeId && activeConv ? (
          <ConversationThread
            currentUserId={user?.id!}
            otherUserId={activeConv.userId}
            otherName={activeConv.name}
            otherAvatarUrl={activeConv.avatarUrl}
            isMobile={isMobile}
            onBack={() => setActiveId(null)}
          />
        ) : (
          <div className="flex flex-1 items-center justify-center text-gray-400 text-lg" style={{ fontSize: '1rem' }}>
            {loading
              ? "Loading messages..."
              : "Select a conversation to view messages"}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerInbox;
