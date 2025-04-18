
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

      setMessages(data || []);
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
          setMessages(prev => [...prev, payload.new as SalonMessage]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, recipientId]);

  return { messages, loading };
};
