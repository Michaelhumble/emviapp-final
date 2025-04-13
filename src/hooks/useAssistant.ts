
import { useState } from 'react';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { 
  processUserInput, 
  createBooking, 
  BookingMatch, 
  AssistantResponse 
} from '@/services/assistantService';
import { mockAssistantResponses } from '@/utils/mockAssistantResponses';

export const useAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState<BookingMatch[]>([]);
  const { user } = useAuth();

  const generateResponse = async (userInput: string): Promise<string> => {
    setIsLoading(true);
    
    try {
      // Simulate network delay for a more natural feel (300-1200ms)
      const minDelay = 300;
      const maxDelay = 1200;
      const randomDelay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
      const startTime = Date.now();
      
      // Log the user message for future improvements
      console.log('Chat log - User:', userInput);
      
      // Process the user input
      const response = await processUserInput(userInput, user?.id);
      
      // If we got booking matches, update the state
      if (response.bookingMatches && response.bookingMatches.length > 0) {
        setMatches(response.bookingMatches);
      }
      
      // Ensure a minimum delay for typing indication
      const elapsedTime = Date.now() - startTime;
      const remainingDelay = randomDelay - elapsedTime;
      
      if (remainingDelay > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingDelay));
      }
      
      // Log the AI response
      console.log('Chat log - AI:', response.message);
      
      return response.message;
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Fall back to the mock response system if the regular system fails
      const mockResponse = getMockResponse(userInput);
      console.log('Chat log - AI (fallback):', mockResponse);
      return mockResponse;
    } finally {
      setIsLoading(false);
    }
  };

  // Get a mock response based on user input when the regular system fails
  const getMockResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Try to find a matching mock response
    const matchedResponse = mockAssistantResponses.find(item => 
      item.keywords.some(keyword => input.includes(keyword))
    );
    
    if (matchedResponse) {
      // Get a random response from the matching category
      const responseIndex = Math.floor(Math.random() * matchedResponse.responses.length);
      return matchedResponse.responses[responseIndex];
    }
    
    // Default response if no match is found
    return "I'm here to help with bookings, finding salons, or answering any questions about EmviApp. What would you like to know?";
  };

  return {
    isLoading,
    generateResponse,
    matches,
    createBooking
  };
};
