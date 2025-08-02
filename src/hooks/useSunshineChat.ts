import { useState } from 'react';
import { supabaseBypass } from '@/types/supabase-bypass';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const useSunshineChat = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string, conversationHistory: any[] = []) => {
    setIsLoading(true);
    
    try {
      // Convert conversation history to the format expected by the API
      const history = conversationHistory
        .filter(msg => msg.role !== 'system')
        .map(msg => ({
          role: msg.role,
          content: msg.content
        }));

      const { data, error } = await supabaseBypass.functions.invoke('sunshine-chat', {
        body: {
          message,
          conversationHistory: history,
          userId: null // We can add user ID later for personalization
        }
      });

      if (error) {
        console.error('Sunshine chat error:', error);
        throw new Error('Failed to get response from Sunshine');
      }

      return data.response;
      
    } catch (error) {
      console.error('Error in useSunshineChat:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendMessage,
    isLoading
  };
};