
import { useState } from 'react';

interface MockResponse {
  trigger: string[];
  response: string | string[];
}

export const useMockAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Mock responses database
  const mockResponses: MockResponse[] = [
    {
      trigger: ['hello', 'hi', 'hey', 'howdy'],
      response: [
        "Hello! How can I help you today? 😊",
        "Hi there! I'm Little Sunshine, what can I assist you with?",
        "Hey! What brings you to EmviApp today?",
      ]
    },
    {
      trigger: ['book', 'appointment', 'schedule'],
      response: "I'd be happy to help you book an appointment! What service are you looking for, and when would you like to book it?"
    },
    {
      trigger: ['book nails', 'nail appointment', 'manicure'],
      response: "Looking for nail artists near you... I found 3 available options:\n\n1. Kim at Glam Nails - Friday 2pm\n2. Lisa at Perfect Ten - Friday 4pm\n3. Maya at Nail Art Studio - Friday 5:30pm\n\nWould you like me to confirm any of these appointments?"
    },
    {
      trigger: ['book hair', 'haircut', 'hair appointment'],
      response: "Looking for hair stylists near you... I found 3 available options:\n\n1. James at Cutting Edge - Friday 11am\n2. Sarah at Hair & Now - Friday the 3pm\n3. David at Style Studio - Friday 6pm\n\nShall I book one of these for you?"
    },
    {
      trigger: ['find salon', 'salon near me', 'nearby salon'],
      response: "Here are 3 top-rated salons near you:\n\n1. ✨ Glam Studio - 4.9★ (0.5 miles away)\n2. ✨ Beauty & Beyond - 4.8★ (0.8 miles away)\n3. ✨ Elegance Salon - 4.7★ (1.2 miles away)\n\nWould you like more details about any of these salons?"
    },
    {
      trigger: ['cancel', 'cancel appointment', 'reschedule'],
      response: "I can help you cancel or reschedule your appointment. Could you confirm which appointment you'd like to modify?"
    },
    {
      trigger: ['price', 'cost', 'how much', 'pricing'],
      response: "Prices vary by artist and service, but I can help you find the information you need. What specific service are you interested in?"
    },
    {
      trigger: ['thank', 'thanks', 'thank you'],
      response: [
        "You're welcome! Is there anything else I can help you with?",
        "Happy to help! Anything else you need?",
        "My pleasure! Let me know if you need anything else."
      ]
    },
    {
      trigger: ['help', 'support', 'assistance'],
      response: "I'm here to help! I can assist with booking appointments, finding salons, checking artist availability, or answering questions about services. What would you like help with?"
    }
  ];

  const generateResponse = async (userInput: string): Promise<string> => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const input = userInput.toLowerCase();
      
      // Try to find a matching response from our mock database
      for (const mockData of mockResponses) {
        if (mockData.trigger.some(trigger => input.includes(trigger))) {
          if (Array.isArray(mockData.response)) {
            // If we have multiple possible responses, pick one randomly
            const randomIndex = Math.floor(Math.random() * mockData.response.length);
            return mockData.response[randomIndex];
          } else {
            return mockData.response;
          }
        }
      }
      
      // Fallback responses if no match is found
      const fallbackResponses = [
        "I'm still learning, but I'd love to help with that. Could you provide more details?",
        "Thanks for your message! I'm not sure I fully understand. Could you rephrase that?",
        "I'm here to help with bookings, finding salons, and beauty services. How can I assist you today?",
        "That's an interesting question! I'll do my best to help. Could you tell me more?",
        "I want to make sure I understand correctly. Are you looking to book an appointment or get information about services?"
      ];
      
      const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
      return fallbackResponses[randomIndex];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    generateResponse
  };
};
