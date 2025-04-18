import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { SalonMessage } from '@/types/SalonMessage';
import { useAuth } from '@/context/auth';

const AI_RESPONSES = {
  help: "Hi there! I'm your EmviApp Assistant. How can I help you today?",
  booking: "I can help you with booking appointments! What type of service are you looking for?",
  price: "Our pricing varies by service and artist. Would you like me to show you some options?",
  default: "I'm here to help! Feel free to ask me about bookings, services, or any other questions you have."
};

export const useMessages = (recipientId: string) => {
  const [messages, setMessages] = useState<SalonMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const addMessage = (message: SalonMessage) => {
    setMessages(prev => [...prev, message]);
  };

  const simulateAIResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    let responseContent = AI_RESPONSES.default;

    if (lowerMessage.includes('help')) {
      responseContent = AI_RESPONSES.help;
    } else if (lowerMessage.includes('book') || lowerMessage.includes('appointment')) {
      responseContent = AI_RESPONSES.booking;
    } else if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      responseContent = AI_RESPONSES.price;
    }

    const aiResponse: SalonMessage = {
      id: crypto.randomUUID(),
      senderId: 'support-agent',
      senderName: 'EmviApp Assistant',
      message: responseContent,
      timestamp: new Date().toISOString()
    };

    setTimeout(() => {
      addMessage(aiResponse);
    }, 1200);
  };

  useEffect(() => {
    if (!user || !recipientId) return;

    const fetchMessages = async () => {
      if (recipientId === 'support-agent') {
        const welcomeMessage: SalonMessage = {
          id: crypto.randomUUID(),
          senderId: 'support-agent',
          senderName: 'EmviApp Assistant',
          message: "👋 Hello! I'm the EmviApp Assistant. How can I help you today?",
          timestamp: new Date().toISOString()
        };
        setMessages([welcomeMessage]);
        setLoading(false);
        return;
      }

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

  useEffect(() => {
    if (recipientId === 'support-agent' && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.senderId !== 'support-agent') {
        simulateAIResponse(lastMessage.message);
      }
    }
  }, [messages, recipientId]);

  return { messages, loading };
};
