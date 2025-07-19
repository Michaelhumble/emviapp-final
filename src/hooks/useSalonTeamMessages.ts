

import { useState, useEffect } from 'react';
import { supabaseBypass } from '@/types/supabase-bypass';
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
      const { data, error } = await supabaseBypass
        .from('salon_team_messages')
        .select('*')
        .eq('salon_id' as any, currentSalon.id)
        .order('created_at' as any, { ascending: true });

      if (error) throw error;

      // Then, for each message, fetch the sender details separately
      const messagesWithSenders = await Promise.all(
        data.map(async (message) => {
          // Get sender info
          const { data: senderData, error: senderError } = await supabaseBypass
            .from('profiles')
            .select('full_name, avatar_url')
            .eq('id' as any, (message as any).sender_id);

          return {
            ...(message as any),
            sender_name: senderError ? undefined : (senderData as any)?.full_name,
            sender_avatar: senderError ? undefined : (senderData as any)?.avatar_url
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
      const { error } = await supabaseBypass
        .from('salon_team_messages')
        .insert({
          salon_id: currentSalon.id,
          sender_id: user.id,
          content: content.trim(),
          is_announcement: isAnnouncement
        } as any);

      if (error) throw error;
    } catch (error) {
      console.error('Error sending team message:', error);
      toast.error('Failed to send message');
    }
  };

  useEffect(() => {
    fetchMessages();

    const channel = (supabaseBypass as any)
      .channel('salon_team_messages')
      .on(
        'postgres_changes',
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'salon_team_messages', 
          filter: `salon_id=eq.${currentSalon?.id}` 
        },
        (payload: any) => {
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      (supabaseBypass as any).removeChannel(channel);
    };
  }, [currentSalon?.id]);

  return {
    messages,
    loading,
    sendMessage,
    fetchMessages
  };
};

