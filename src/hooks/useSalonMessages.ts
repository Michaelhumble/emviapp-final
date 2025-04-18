
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
          // Transform the data to match our SalonMessage interface
          const transformedMessages: SalonMessage[] = (data || []).map(msg => ({
            id: msg.id,
            sender_id: msg.sender_id,
            sender_name: msg.sender_name || "Unknown",
            recipient_id: msg.recipient_id,
            content: msg.message_body,  // Map message_body to content
            created_at: msg.created_at,
            read: msg.read || false,
            salon_id: msg.salon_id
          }));
          
          setMessages(transformedMessages);
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
            // Transform the new message to match our SalonMessage interface
            const newMsg = payload.new as any;
            const transformedMessage: SalonMessage = {
              id: newMsg.id,
              sender_id: newMsg.sender_id,
              sender_name: newMsg.sender_name || "Unknown",
              recipient_id: newMsg.recipient_id,
              content: newMsg.message_body,
              created_at: newMsg.created_at,
              read: newMsg.read || false,
              salon_id: newMsg.salon_id
            };
            
            // Optimistically update the messages array with the new message
            setMessages((prevMessages) => [...prevMessages, transformedMessage]);
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
      // Use 'messages' table and match the column names in the database
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            sender_id: user.id,
            message_body: content,
            message_type: sender,
            recipient_id: recipientId,
            salon_id: currentSalon.id,
            read: false,
          },
        ])
        .select('*');

      if (error) {
        setError(error.message);
      } else if (data && data.length > 0) {
        // Transform the returned message to match our SalonMessage interface
        const transformedMessage: SalonMessage = {
          id: data[0].id,
          sender_id: data[0].sender_id,
          sender_name: data[0].sender_name || user.id,
          recipient_id: data[0].recipient_id,
          content: data[0].message_body,
          created_at: data[0].created_at,
          read: data[0].read || false,
          salon_id: data[0].salon_id
        };
        
        // Optimistically update the messages array with the sent message
        setMessages((prevMessages) => [...prevMessages, transformedMessage]);
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
