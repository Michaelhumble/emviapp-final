
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useSalon } from '@/context/salon';
import { SalonMessage, MessageSender } from "@/components/dashboard/salon/types";

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
      if (!user?.id || !currentSalon?.id) return;

      setLoading(true);
      setError(null);

      try {
        // Use 'messages' table instead of 'salon_messages'
        let query = supabase
          .from('messages')
          .select('*')
          .eq('salon_id', currentSalon.id)
          .order('created_at', { ascending: true });

        // Fetch messages for a specific recipient if recipientId is provided
        if (recipientId) {
          query = query.or(`sender_id.eq.${user.id},sender_id.eq.${recipientId}`);
        }

        const { data, error } = await query;

        if (error) {
          setError(error.message);
        } else {
          setMessages(data || []);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Set up a real-time subscription to listen for new messages
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'messages' },
        (payload) => {
          if (payload.new) {
            // Optimistically update the messages array with the new message
            setMessages((prevMessages) => [...prevMessages, payload.new as SalonMessage]);
          }
        }
      )
      .subscribe();

    // Unsubscribe from the channel when the component unmounts
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, currentSalon?.id, recipientId]);

  const sendMessage = async (content: string, sender: MessageSender) => {
    if (!user?.id || !currentSalon?.id) {
      setError('User or salon not available');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Use 'messages' table instead of 'salon_messages'
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            sender_id: user.id,
            sender_name: user.user_metadata.full_name,
            recipient_id: recipientId,
            content: content,
            salon_id: currentSalon.id,
            read: false,
          },
        ])
        .select('*');

      if (error) {
        setError(error.message);
      } else {
        // Optimistically update the messages array with the sent message
        setMessages((prevMessages) => [...prevMessages, data[0]]);
        setNewMessage(''); // Clear the input field after successful send
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
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
