import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useSalon } from '@/context/salon';

interface UseSalonMessagesProps {
  recipientId?: string;
}

interface SalonMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
}

interface DbMessage {
  id: string;
  sender_id: string;
  message_body: string;
  created_at: string;
}

type MessageSender = {
  id: string;
  // Other properties as needed
};

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
          created_at
        `)
        .eq('salon_id', currentSalon.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      if (data) {
        const transformedMessages: SalonMessage[] = await Promise.all(
          data.map(async (msg: DbMessage) => {
            const { data: userData } = await supabase
              .from('users')
              .select('full_name')
              .eq('id', msg.sender_id)
              .single();
            
            return {
              id: msg.id,
              senderId: msg.sender_id,
              senderName: userData?.full_name || 'Unknown',
              message: msg.message_body,
              timestamp: msg.created_at
            };
          })
        );
        
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
