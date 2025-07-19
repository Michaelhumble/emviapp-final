
import { useState } from 'react';
import { supabaseBypass } from '@/types/supabase-bypass';
import { useAuth } from '@/context/auth';

export const useSendMessage = () => {
  const [sending, setSending] = useState(false);
  const { user } = useAuth();

  const sendMessage = async (recipientId: string, message: string) => {
    if (!user || !message.trim()) return;
    
    setSending(true);
    
    try {
      const { error } = await supabaseBypass.from('messages').insert({
        sender_id: user.id,
        recipient_id: recipientId,
        message_body: message,
        message_type: 'chat',
        salon_id: user.id // Using user.id as a temporary placeholder for salon_id
      } as any);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error sending message:', error);
      return false;
    } finally {
      setSending(false);
    }
  };

  return { sendMessage, sending };
};
