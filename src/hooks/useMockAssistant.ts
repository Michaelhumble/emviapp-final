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
  dayOfWeek: number | null;
}

export const useMockAssistant = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [matches, setMatches] = useState<BookingMatch[]>([]);
  const [bookingIntent, setBookingIntent] = useState<ExtractedBookingIntent | null>(null);
  const { user } = useAuth();

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

  const extractBookingIntent = (input: string): ExtractedBookingIntent => {
    const lowerInput = input.toLowerCase();
    
    const serviceTypes = ['nails', 'manicure', 'pedicure', 'haircut', 'hair', 'lashes', 'sns', 'facial', 'massage', 'eyelash', 'waxing', 'braids'];
    const serviceType = serviceTypes.find(service => lowerInput.includes(service)) || null;
    
    let date = null;
    let dayOfWeek = null;
    
    if (lowerInput.includes('today')) {
      date = new Date().toISOString().split('T')[0];
      dayOfWeek = new Date().getDay();
    } else if (lowerInput.includes('tomorrow')) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      date = tomorrow.toISOString().split('T')[0];
      dayOfWeek = tomorrow.getDay();
    } else if (lowerInput.includes('monday')) {
      dayOfWeek = 1;
      const nextDate = findNextDayOfWeek(1);
      date = nextDate.toISOString().split('T')[0];
    } else if (lowerInput.includes('tuesday')) {
      dayOfWeek = 2;
      const nextDate = findNextDayOfWeek(2);
      date = nextDate.toISOString().split('T')[0];
    } else if (lowerInput.includes('wednesday')) {
      dayOfWeek = 3;
      const nextDate = findNextDayOfWeek(3);
      date = nextDate.toISOString().split('T')[0];
    } else if (lowerInput.includes('thursday')) {
      dayOfWeek = 4;
      const nextDate = findNextDayOfWeek(4);
      date = nextDate.toISOString().split('T')[0];
    } else if (lowerInput.includes('friday')) {
      dayOfWeek = 5;
      const nextDate = findNextDayOfWeek(5);
      date = nextDate.toISOString().split('T')[0];
    } else if (lowerInput.includes('saturday')) {
      dayOfWeek = 6;
      const nextDate = findNextDayOfWeek(6);
      date = nextDate.toISOString().split('T')[0];
    } else if (lowerInput.includes('sunday')) {
      dayOfWeek = 0;
      const nextDate = findNextDayOfWeek(0);
      date = nextDate.toISOString().split('T')[0];
    }
    
    function findNextDayOfWeek(targetDay: number): Date {
      const today = new Date();
      const dayOfWeek = today.getDay();
      const daysToAdd = (targetDay - dayOfWeek + 7) % 7;
      const nextDate = new Date();
      nextDate.setDate(today.getDate() + (daysToAdd === 0 ? 7 : daysToAdd));
      return nextDate;
    }
    
    const timePattern = /(\d{1,2})(:\d{2})?\s*(am|pm)/i;
    const timeMatch = lowerInput.match(timePattern);
    let time = null;
    if (timeMatch) {
      const hour = parseInt(timeMatch[1]);
      const minutes = timeMatch[2] ? timeMatch[2].substring(1) : '00';
      const period = timeMatch[3].toLowerCase();
      
      let hour24 = hour;
      if (period === 'pm' && hour < 12) hour24 += 12;
      if (period === 'am' && hour === 12) hour24 = 0;
      
      time = `${hour24.toString().padStart(2, '0')}:${minutes}`;
    }
    
    const locationPattern = /\bin\s+([a-z\s]+)/i;
    const locationMatch = lowerInput.match(locationPattern);
    const location = locationMatch ? locationMatch[1].trim() : null;
    
    const artistPattern = /\b(with|from|by)\s+([a-z]+)/i;
    const artistMatch = lowerInput.match(artistPattern);
    const artistName = artistMatch ? artistMatch[2].trim() : null;
    
    return {
      serviceType,
      date,
      time,
      location,
      artistName,
      dayOfWeek
    };
  };

  const findAvailableProviders = async (intent: ExtractedBookingIntent): Promise<BookingMatch[]> => {
    try {
      let availableUserIds: string[] = [];
      
      if (intent.dayOfWeek !== null) {
        let query = supabase
          .from('availability')
          .select('artist_id')
          .eq('day_of_week', intent.dayOfWeek.toString());
          
        if (intent.time) {
          query = query
            .lte('start_time', intent.time)
            .gte('end_time', intent.time);
        }
        
        const { data: availableUsers, error } = await query;
        
        if (error) throw error;
        if (availableUsers && availableUsers.length > 0) {
          availableUserIds = availableUsers.map(user => user.artist_id);
        }
      }
      
      let query = supabase
        .from('users')
        .select(`
          id, 
          full_name,
          avatar_url,
          services (*)
        `)
        .eq('accepts_bookings', true);
      
      if (intent.serviceType) {
        query = query.contains('services.title', intent.serviceType);
      }
      
      if (intent.location) {
        query = query.ilike('location', `%${intent.location}%`);
      }
      
      if (intent.artistName) {
        query = query.ilike('full_name', `%${intent.artistName}%`);
      }
      
      if (availableUserIds.length > 0) {
        query = query.in('id', availableUserIds);
      }
      
      query = query.limit(3);
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      const matches: BookingMatch[] = (data || []).map(provider => {
        const service = provider.services?.find(s => 
          intent.serviceType ? s.title.toLowerCase().includes(intent.serviceType.toLowerCase()) : true
        );
        
        return {
          id: provider.id,
          name: provider.full_name,
          service: service?.title || 'Service',
          time: intent.time || '14:00',
          date: intent.date || new Date().toISOString().split('T')[0],
          avatar: provider.avatar_url
        };
      });
      
      return matches;
    } catch (error) {
      console.error('Error finding providers:', error);
      return [];
    }
  };

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
          service_id: null,
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
    
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      const input = userInput.toLowerCase();
      
      if (input.includes('book') || 
          input.includes('appointment') || 
          input.includes('available') || 
          input.includes('find someone') ||
          input.includes('schedule')) {
        
        const intent = extractBookingIntent(input);
        setBookingIntent(intent);
        
        if (intent.serviceType || intent.artistName) {
          const providers = await findAvailableProviders(intent);
          setMatches(providers);
          
          if (providers.length > 0) {
            const bookingOptions = providers.map((provider, index) => (
              `${index + 1}. ${provider.name} - ${provider.service} on ${formatDate(provider.date)} at ${formatTime(provider.time)}`
            )).join('\n');
            
            return `I found ${providers.length} available options for you:\n\n${bookingOptions}\n\nWhich one would you like to book? (Reply with the number or 'none')`;
          } else {
            return `I couldn't find any available providers matching your criteria. Would you like to try a different service or time?`;
          }
        } else {
          return `I'd be happy to help you book an appointment! Could you please specify what service you're looking for and when you'd like to book it?`;
        }
      }
      
      if (matches.length > 0 && /^[1-3]$/.test(input.trim())) {
        const selectedIndex = parseInt(input.trim()) - 1;
        if (selectedIndex >= 0 && selectedIndex < matches.length) {
          const selected = matches[selectedIndex];
          
          const success = await createBooking(selected);
          
          if (success) {
            setMatches([]);
            setBookingIntent(null);
            return `🎉 Great! I've sent a booking request to ${selected.name} for ${selected.service} on ${formatDate(selected.date)} at ${formatTime(selected.time)}. They'll confirm shortly. You can check the status in your bookings page.`;
          } else {
            return `I'm sorry, there was an issue creating your booking. Please try again or contact support if the problem persists.`;
          }
        }
      }
      
      for (const mockData of mockResponses) {
        if (mockData.trigger.some(trigger => input.includes(trigger))) {
          if (Array.isArray(mockData.response)) {
            const randomIndex = Math.floor(Math.random() * mockData.response.length);
            return mockData.response[randomIndex];
          } else {
            return mockData.response;
          }
        }
      }
      
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

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

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
    createBooking,
    extractBookingIntent
  };
};
