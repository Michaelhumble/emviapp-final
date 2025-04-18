
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useSalon } from '@/context/salon';
import { SalonMessage } from '@/types/SalonMessage';
import { MessageSender } from '@/types/MessageSender';

interface UseSalonMessagesProps {
  recipientId?: string;
}

interface DbMessage {
  id: string;
  sender_id: string;
  message_body: string;
  created_at: string;
  sender?: {
    id: string;
    full_name?: string;
    avatar_url?: string;
  } | null;
}

export const useSalonMessages = ({ recipientId }: UseSalonMessagesProps = {}) => {
  const [messages, setMessages] = useState<SalonMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { currentSalon } = useSalon();

  const fetchMessages = async () => {
    try {
      if (!currentSalon?.id) return;
      setLoading(true);

      const { data, error } = await supabase
        .from('messages')
        .select(`
          id,
          sender_id,
          message_body,
          created_at,
          sender:sender_id(id, full_name, avatar_url)
        `)
        .eq('salon_id', currentSalon.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        const transformedMessages: SalonMessage[] = data.map((msg: DbMessage) => ({
          id: msg.id,
          senderId: msg.sender_id,
          senderName: msg.sender?.full_name || 'Unknown',
          message: msg.message_body,
          timestamp: msg.created_at
        }));
        setMessages(transformedMessages);
      }
    } catch (e: any) {
      console.error("Error fetching messages:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        (payload) => {
          if (payload.new) {
            fetchMessages();
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentSalon?.id, recipientId]);

  const sendMessage = async (content: string, sender: MessageSender) => {
    if (!currentSalon?.id) return;

    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          salon_id: currentSalon.id,
          sender_id: sender.id,
          message_body: content,
          recipient_id: recipientId || null,
          message_type: 'text' // Add this required field
        });

      if (error) {
        throw error;
      } else {
        setNewMessage('');
        fetchMessages();
      }
    } catch (e: any) {
      console.error("Error sending message:", e);
      setError(e.message);
    }
  };

  return {
    messages,
    newMessage,
    setNewMessage,
    loading,
    error,
    sendMessage,
  };
};
