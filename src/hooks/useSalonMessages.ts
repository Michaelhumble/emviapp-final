import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useSalon } from '@/context/salon';
import { SalonMessage } from '@/types/SalonMessage';
import { MessageSender } from '@/types/MessageSender';

interface UseSalonMessagesProps {
  recipientId?: string;
}

export const useSalonMessages = ({ recipientId }: UseSalonMessagesProps = {}) => {
  const [messages, setMessages] = useState<SalonMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { currentSalon } = useSalon();

  useEffect(() => {
    const fetchMessages = async () => {
      if (!currentSalon?.id) return;

      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id(id, full_name, avatar_url)
        `)
        .eq('salon_id', currentSalon.id)
        .order('created_at', { ascending: true });

      if (!error && data) {
        const transformedMessages: SalonMessage[] = data.map(msg => ({
          id: msg.id,
          senderId: msg.sender_id,
          senderName: msg.sender?.full_name || 'Unknown',
          message: msg.message_body,
          timestamp: msg.created_at
        }));
        setMessages(transformedMessages);
      }
    };

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

    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          salon_id: currentSalon.id,
          sender_id: sender.id,
          message_body: content,
          recipient_id: recipientId,
        },
      ]);

    if (error) {
      setError(error.message);
    } else {
      setNewMessage('');
      fetchMessages();
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
