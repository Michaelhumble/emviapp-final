
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface MockResponse {
  trigger: string[];
  response: string | string[];
}

interface BookingMatch {
  id: string;
  name: string;
  service: string;
  time: string;
  date: string;
  avatar?: string;
}

interface ExtractedBookingIntent {
  serviceType: string | null;
  date: string | null; 
  time: string | null;
  location: string | null;
  artistName: string | null;
}

export const useMockAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState<BookingMatch[]>([]);
  const [bookingIntent, setBookingIntent] = useState<ExtractedBookingIntent | null>(null);
  const { user } = useAuth();

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
      trigger: ['thanks', 'thank you', 'thx'],
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

  // Extract booking intent from user message
  const extractBookingIntent = (input: string): ExtractedBookingIntent => {
    const lowerInput = input.toLowerCase();
    
    // Simple pattern matching for service types
    const serviceTypes = ['nails', 'manicure', 'pedicure', 'haircut', 'hair', 'lashes', 'sns', 'facial', 'massage', 'eyelash', 'waxing', 'braids'];
    const serviceType = serviceTypes.find(service => lowerInput.includes(service)) || null;
    
    // Extract day/date
    let date = null;
    if (lowerInput.includes('today')) {
      date = new Date().toISOString().split('T')[0];
    } else if (lowerInput.includes('tomorrow')) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      date = tomorrow.toISOString().split('T')[0];
    } else if (lowerInput.includes('friday')) {
      // Find next Friday
      const today = new Date();
      const dayOfWeek = today.getDay();
      const daysToAdd = (5 - dayOfWeek + 7) % 7;
      const nextFriday = new Date();
      nextFriday.setDate(today.getDate() + daysToAdd);
      date = nextFriday.toISOString().split('T')[0];
    }
    // Add more day patterns as needed
    
    // Extract time
    const timePattern = /(\d{1,2})(:\d{2})?\s*(am|pm)/i;
    const timeMatch = lowerInput.match(timePattern);
    let time = null;
    if (timeMatch) {
      const hour = parseInt(timeMatch[1]);
      const minutes = timeMatch[2] ? timeMatch[2].substring(1) : '00';
      const period = timeMatch[3].toLowerCase();
      
      // Convert to 24-hour format for database
      let hour24 = hour;
      if (period === 'pm' && hour < 12) hour24 += 12;
      if (period === 'am' && hour === 12) hour24 = 0;
      
      time = `${hour24.toString().padStart(2, '0')}:${minutes}`;
    }
    
    // Extract location
    const locationPattern = /\bin\s+([a-z\s]+)/i;
    const locationMatch = lowerInput.match(locationPattern);
    const location = locationMatch ? locationMatch[1].trim() : null;
    
    // Extract artist name (simplified)
    const artistPattern = /\b(with|from|by)\s+([a-z]+)/i;
    const artistMatch = lowerInput.match(artistPattern);
    const artistName = artistMatch ? artistMatch[2].trim() : null;
    
    return {
      serviceType,
      date,
      time,
      location,
      artistName
    };
  };

  // Find available providers based on booking intent
  const findAvailableProviders = async (intent: ExtractedBookingIntent): Promise<BookingMatch[]> => {
    try {
      // Query Supabase for providers that match the intent
      let query = supabase
        .from('users')
        .select(`
          id, 
          full_name,
          avatar_url,
          services (*)
        `)
        .eq('accepts_bookings', true);
      
      // Add filters based on the intent
      if (intent.serviceType) {
        query = query.contains('services.title', intent.serviceType);
      }
      
      if (intent.location) {
        query = query.ilike('location', `%${intent.location}%`);
      }
      
      if (intent.artistName) {
        query = query.ilike('full_name', `%${intent.artistName}%`);
      }
      
      // Limit to 3 results
      query = query.limit(3);
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Format the results
      const matches: BookingMatch[] = (data || []).map(provider => {
        const service = provider.services?.find(s => 
          intent.serviceType ? s.title.toLowerCase().includes(intent.serviceType.toLowerCase()) : true
        );
        
        return {
          id: provider.id,
          name: provider.full_name,
          service: service?.title || 'Service',
          time: intent.time || '14:00', // Default to 2 PM if no time specified
          date: intent.date || new Date().toISOString().split('T')[0], // Default to today
          avatar: provider.avatar_url
        };
      });
      
      return matches;
    } catch (error) {
      console.error('Error finding providers:', error);
      return [];
    }
  };

  // Create a booking in Supabase
  const createBooking = async (match: BookingMatch): Promise<boolean> => {
    if (!user) {
      toast.error('You need to be logged in to book an appointment');
      return false;
    }
    
    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          sender_id: user.id,
          recipient_id: match.id,
          service_id: null, // We don't have the service ID yet
          service_type: match.service,
          date_requested: match.date,
          time_requested: match.time,
          status: 'pending',
          note: `Booking requested via Little Sunshine assistant`
        });
      
      if (error) throw error;
      
      toast.success('Booking request sent');
      return true;
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Unable to create booking. Please try again.');
      return false;
    }
  };

  const generateResponse = async (userInput: string): Promise<string> => {
    setIsLoading(true);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const input = userInput.toLowerCase();
      
      // Check if this is a booking intent
      if (input.includes('book') || 
          input.includes('appointment') || 
          input.includes('available') || 
          input.includes('find someone') ||
          input.includes('schedule')) {
        
        // Extract booking intent
        const intent = extractBookingIntent(input);
        setBookingIntent(intent);
        
        // If we have enough details to search for providers
        if (intent.serviceType || intent.artistName) {
          const providers = await findAvailableProviders(intent);
          setMatches(providers);
          
          if (providers.length > 0) {
            // Format the booking suggestions
            const bookingOptions = providers.map((provider, index) => (
              `${index + 1}. ${provider.name} - ${provider.service} on ${formatDate(provider.date)} at ${formatTime(provider.time)}`
            )).join('\n');
            
            return `I found ${providers.length} available options for you:\n\n${bookingOptions}\n\nWhich one would you like to book? (Reply with the number or 'none')`;
          } else {
            return `I couldn't find any available providers matching your criteria. Would you like to try a different service or time?`;
          }
        } else {
          // Not enough details, ask for more information
          return `I'd be happy to help you book an appointment! Could you please specify what service you're looking for and when you'd like to book it?`;
        }
      }
      
      // Check if this is a booking confirmation
      if (matches.length > 0 && /^[1-3]$/.test(input.trim())) {
        const selectedIndex = parseInt(input.trim()) - 1;
        if (selectedIndex >= 0 && selectedIndex < matches.length) {
          const selected = matches[selectedIndex];
          
          // Create the booking
          const success = await createBooking(selected);
          
          if (success) {
            // Clear the matches after successful booking
            setMatches([]);
            setBookingIntent(null);
            return `🎉 Great! I've sent a booking request to ${selected.name} for ${selected.service} on ${formatDate(selected.date)} at ${formatTime(selected.time)}. They'll confirm shortly. You can check the status in your bookings page.`;
          } else {
            return `I'm sorry, there was an issue creating your booking. Please try again or contact support if the problem persists.`;
          }
        }
      }
      
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

  // Helper function to format date
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  // Helper function to format time
  const formatTime = (timeString: string): string => {
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours);
      const period = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${period}`;
    } catch (e) {
      return timeString;
    }
  };

  return {
    isLoading,
    generateResponse,
    matches,
    createBooking
  };
};
