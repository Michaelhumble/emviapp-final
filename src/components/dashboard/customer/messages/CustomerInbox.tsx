
import React, { useState } from "react";
import { useCustomerConversations } from "./useCustomerConversations";
import ConversationList from "./ConversationList";
import ConversationThread from "./ConversationThread";
import { useAuth } from "@/context/auth";

const CustomerInbox = () => {
  const { user } = useAuth();
  const { conversations, loading } = useCustomerConversations();
  const [activeId, setActiveId] = useState<string | null>(null);

  // Find the selected conversation info
  const activeConv = conversations.find((c) => c.id === activeId);

  // Mobile breakpoint
  const isMobile = typeof window !== "undefined" && window.innerWidth < 700;

  // If on mobile and a convo is open, show only the thread
  if (isMobile && activeId && activeConv) {
    return (
      <div className="h-[75vh] bg-white p-2 rounded-lg shadow border max-w-xl mx-auto flex flex-col">
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

  // Desktop: two-column layout, Mobile: stacked
  return (
    <div className="flex flex-col md:flex-row h-[65vh] bg-white rounded-lg shadow border max-w-3xl mx-auto overflow-hidden">
      <div className="w-full md:w-1/3 bg-gray-50 pb-2">
        <div className="font-semibold text-lg px-4 pt-4 pb-2">Messages</div>
        <ConversationList
          conversations={conversations}
          activeId={activeId!}
          onSelect={setActiveId}
          isMobile={isMobile}
        />
      </div>
      <div className="flex-1 bg-white border-l p-0">
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
          <div className="flex flex-1 items-center justify-center text-gray-400 text-lg">
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
