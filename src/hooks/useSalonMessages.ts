
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';

interface MessageSender {
  id: string;
  name: string;
  avatar?: string;
  type: 'customer' | 'artist' | 'staff';
}

export interface SalonMessage {
  id: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  isReplied: boolean;
  sender: MessageSender | null;
}

export const useSalonMessages = () => {
  const [messages, setMessages] = useState<SalonMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentSalon } = useSalon();

  useEffect(() => {
    if (!currentSalon?.id) return;

    const fetchMessages = async () => {
      setLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from('messages')
          .select(`
            *,
            sender:sender_id (
              id,
              full_name,
              avatar_url,
              role
            )
          `)
          .eq('salon_id', currentSalon.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const mappedMessages: SalonMessage[] = data.map(msg => {
          // Safely handle potentially null sender
          const sender = msg.sender ? {
            id: msg.sender.id,
            name: msg.sender.full_name || 'Unknown',
            avatar: msg.sender.avatar_url,
            type: (msg.sender.role === 'artist' ? 'artist' : 
                  msg.sender.role === 'customer' ? 'customer' : 'staff') as 'customer' | 'artist' | 'staff'
          } : null;

          return {
            id: msg.id,
            content: msg.message_body,
            timestamp: new Date(msg.created_at),
            isRead: msg.read || false,
            isReplied: false, // This would need to be fetched separately
            sender
          };
        });

        setMessages(mappedMessages);
      } catch (err) {
        console.error('Error fetching salon messages:', err);
        setError(err instanceof Error ? err.message : 'Failed to load messages');
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [currentSalon?.id]);

  const markMessageAsRead = async (messageId: string) => {
    if (!currentSalon?.id) return false;

    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId)
        .eq('salon_id', currentSalon.id);

      if (error) throw error;

      // Update local state
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === messageId ? { ...msg, isRead: true } : msg
        )
      );

      return true;
    } catch (err) {
      console.error('Error marking message as read:', err);
      return false;
    }
  };

  const sendReply = async (messageId: string, content: string) => {
    if (!currentSalon?.id) return false;

    try {
      // First, get the original message details
      const originalMessage = messages.find(msg => msg.id === messageId);
      if (!originalMessage) throw new Error('Message not found');
      
      const recipientId = originalMessage.sender?.id;
      if (!recipientId) throw new Error('Message sender not found');

      // Insert the reply
      const { error } = await supabase
        .from('messages')
        .insert({
          salon_id: currentSalon.id,
          sender_id: currentSalon.owner_id, // Assuming salon owner is replying
          recipient_id: recipientId,
          message_body: content,
          message_type: 'reply',
          read: false
        });

      if (error) throw error;

      // Mark the original message as read
      await markMessageAsRead(messageId);

      // Update local state to show the message was replied to
      setMessages(prevMessages =>
        prevMessages.map(msg =>
          msg.id === messageId ? { ...msg, isReplied: true } : msg
        )
      );

      return true;
    } catch (err) {
      console.error('Error sending reply:', err);
      return false;
    }
  };

  return {
    messages,
    loading,
    error,
    markMessageAsRead,
    sendReply
  };
};
