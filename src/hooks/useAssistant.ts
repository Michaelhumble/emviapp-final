
import { useState } from 'react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { 
  processUserInput, 
  createBooking, 
  BookingMatch, 
  AssistantResponse 
} from '@/services/assistantService';

export const useAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState<BookingMatch[]>([]);
  const { user } = useAuth();

  const generateResponse = async (userInput: string): Promise<string> => {
    setIsLoading(true);
    
    try {
      // Simulate network delay for a more natural feel
      const minDelay = 600; // minimum delay in ms
      const startTime = Date.now();
      
      // Process the user input
      const response = await processUserInput(userInput, user?.id);
      
      // If we got booking matches, update the state
      if (response.bookingMatches && response.bookingMatches.length > 0) {
        setMatches(response.bookingMatches);
      }
      
      // Ensure a minimum delay for typing indication
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < minDelay && response.showTypingIndicator) {
        await new Promise(resolve => setTimeout(resolve, minDelay - elapsedTime));
      }
      
      return response.message;
    } catch (error) {
      console.error('Error generating response:', error);
      toast.error('Sorry, I had trouble processing your request.');
      return "I'm sorry, I encountered an error while processing your request. Please try again.";
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    generateResponse,
    matches,
    createBooking
  };
};
