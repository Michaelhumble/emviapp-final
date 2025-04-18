
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SalonMessage } from '@/types/SalonMessage';
import { useAuth } from '@/context/auth';

export const useMessages = (recipientId: string) => {
  const [messages, setMessages] = useState<SalonMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !recipientId) return;

    // Fetch existing messages
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .or(`sender_id.eq.${recipientId},recipient_id.eq.${recipientId}`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      // Transform the data to match SalonMessage type
      const transformedMessages: SalonMessage[] = (data || []).map(msg => ({
        id: msg.id,
        senderId: msg.sender_id,
        senderName: '', // This would need to be fetched separately
        message: msg.message_body,
        timestamp: msg.created_at
      }));

      setMessages(transformedMessages);
      setLoading(false);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `sender_id=eq.${user.id},recipient_id=eq.${recipientId}`
        },
        (payload) => {
          const newMsg = payload.new as any;
          const salonMessage: SalonMessage = {
            id: newMsg.id,
            senderId: newMsg.sender_id,
            senderName: '', // Would need to be populated in a real app
            message: newMsg.message_body,
            timestamp: newMsg.created_at
          };
          setMessages(prev => [...prev, salonMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, recipientId]);

  return { messages, loading };
};
