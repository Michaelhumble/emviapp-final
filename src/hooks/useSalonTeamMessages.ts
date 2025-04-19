
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export interface SalonTeamMessage {
  id: string;
  salon_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  is_announcement: boolean;
  sender_name?: string;
  sender_avatar?: string;
}

export const useSalonTeamMessages = () => {
  const [messages, setMessages] = useState<SalonTeamMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentSalon } = useSalon();
  const { user, userProfile } = useAuth();

  const fetchMessages = async () => {
    if (!currentSalon?.id || !user) return;

    setLoading(true);
    try {
      // First, fetch the messages
      const { data, error } = await supabase
        .from('salon_team_messages')
        .select('*')
        .eq('salon_id', currentSalon.id)
        .order('created_at', { ascending: true });

      if (error) throw error;

      // Then, for each message, fetch the sender details
      const messagesWithSenders = await Promise.all(
        data.map(async (message) => {
          // Get sender info
          const { data: senderData } = await supabase
            .from('users')
            .select('full_name, avatar_url')
            .eq('id', message.sender_id)
            .single();

          return {
            ...message,
            sender_name: senderData?.full_name,
            sender_avatar: senderData?.avatar_url
          } as SalonTeamMessage;
        })
      );

      setMessages(messagesWithSenders);
    } catch (error) {
      console.error('Error fetching team messages:', error);
      toast.error('Failed to load team messages');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content: string, isAnnouncement: boolean = false) => {
    if (!currentSalon?.id || !user || !content.trim()) return;

    try {
      const { error } = await supabase
        .from('salon_team_messages')
        .insert({
          salon_id: currentSalon.id,
          sender_id: user.id,
          content: content.trim(),
          is_announcement: isAnnouncement
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error sending team message:', error);
      toast.error('Failed to send message');
    }
  };

  useEffect(() => {
    fetchMessages();

    const channel = supabase
      .channel('salon_team_messages')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'salon_team_messages', 
          filter: `salon_id=eq.${currentSalon?.id}` 
        },
        (payload) => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentSalon?.id]);

  return {
    messages,
    loading,
    sendMessage,
    fetchMessages
  };
};
