
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { useToast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  sender_id: string;
  recipient_id: string;
  message_body: string;
  read: boolean;
  created_at: string;
  message_type: 'client' | 'artist' | 'applicant';
  sender?: {
    full_name: string;
    avatar_url?: string;
  };
}

export function useSalonMessages() {
  const { currentSalon } = useSalon();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchMessages = useCallback(async () => {
    if (!currentSalon?.id) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id(full_name, avatar_url)
        `)
        .eq('salon_id', currentSalon.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: "Error loading messages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [currentSalon?.id]);

  const sendMessage = async (recipientId: string, messageBody: string, messageType: Message['message_type']) => {
    if (!currentSalon?.id) return false;
    
    try {
      const { error } = await supabase
        .from('messages')
        .insert({
          sender_id: supabase.auth.getUser()?.data?.user?.id,
          recipient_id: recipientId,
          message_body: messageBody,
          message_type: messageType,
          salon_id: currentSalon.id
        });

      if (error) throw error;
      
      await fetchMessages();
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error sending message",
        variant: "destructive"
      });
      return false;
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('messages')
        .update({ read: true })
        .eq('id', messageId);

      if (error) throw error;
      
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === messageId ? { ...msg, read: true } : msg
        )
      );
    } catch (error) {
      console.error('Error marking message as read:', error);
    }
  };

  return {
    messages,
    loading,
    fetchMessages,
    sendMessage,
    markAsRead
  };
}
