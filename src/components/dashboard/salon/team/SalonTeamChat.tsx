
import React, { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useSalonTeamMessages } from '@/hooks/useSalonTeamMessages';
import { useAuth } from '@/context/auth';
import { useSalon } from '@/context/salon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Pin } from 'lucide-react';

export const SalonTeamChat = () => {
  const { messages, loading, sendMessage } = useSalonTeamMessages();
  const { user, userProfile } = useAuth();
  const { currentSalon } = useSalon();
  const [messageContent, setMessageContent] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!messageContent.trim()) return;

    const isAnnouncement = userProfile?.role === 'owner';
    await sendMessage(messageContent, isAnnouncement);
    setMessageContent('');
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (loading) {
    return <div className="text-center py-4 text-gray-500">Loading messages...</div>;
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg border">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>No team messages yet.</p>
            <p>Be the first to welcome your team!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex items-start gap-3 ${
                message.sender_id === user?.id ? 'flex-row-reverse' : ''
              }`}
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.sender_avatar} />
                <AvatarFallback>{message.sender_name?.[0]}</AvatarFallback>
              </Avatar>
              <div 
                className={`p-3 rounded-lg max-w-[70%] ${
                  message.is_announcement 
                    ? 'bg-yellow-50 border-yellow-200 border' 
                    : message.sender_id === user?.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-gray-100'
                }`}
              >
                {message.is_announcement && (
                  <div className="flex items-center text-yellow-600 mb-1">
                    <Pin className="h-4 w-4 mr-1" />
                    <span className="text-xs font-semibold">Team Announcement</span>
                  </div>
                )}
                <p>{message.content}</p>
                <div className="text-xs text-muted-foreground mt-1 opacity-70 text-right">
                  {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4 flex items-end gap-2">
        <Textarea
          ref={textareaRef}
          value={messageContent}
          onChange={(e) => setMessageContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message to your team"
          className="min-h-[50px] max-h-[150px]"
        />
        <Button 
          onClick={handleSendMessage} 
          disabled={!messageContent.trim()}
          className="h-10"
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default SalonTeamChat;
