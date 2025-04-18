
import React, { useState } from 'react';
import { useMessages } from '@/hooks/chat/useMessages';
import { useSendMessage } from '@/hooks/chat/useSendMessage';
import { useAuth } from '@/context/auth';
import { Button } from '@/components/ui/button';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatInput } from '@/components/chat/ChatInput';

interface MessageCenterProps {
  recipientId: string;
}

export const MessageCenter = ({ recipientId }: MessageCenterProps) => {
  const { messages, loading } = useMessages(recipientId);
  const { sendMessage, sending } = useSendMessage();
  const { isSignedIn } = useAuth();
  
  const handleSendMessage = async (content: string) => {
    await sendMessage(recipientId, content);
  };

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500">Please sign in to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg border border-gray-200 shadow-sm">
      <ChatHeader onClose={() => {}} />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="flex justify-center py-4">
            <p className="text-gray-500">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center py-4">
            <p className="text-gray-500">No messages yet</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.senderId === recipientId ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-[70%] break-words ${
                  msg.senderId === recipientId
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-primary text-primary-foreground'
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-4 border-t">
        <ChatInput onSendMessage={handleSendMessage} isProcessing={sending} />
      </div>
    </div>
  );
};

export default MessageCenter;
