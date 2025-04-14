
import { supabase } from '@/integrations/supabase/client';
import { detectIntent, formatDate, formatTime } from '@/utils/assistantIntents';
import { toast } from 'sonner';

export interface BookingMatch {
  id: string;
  name: string;
  service: string;
  time: string;
  date: string;
  avatar?: string;
}

export interface AssistantResponse {
  message: string;
  bookingMatches?: BookingMatch[];
  actionType?: 'BOOKING' | 'INFO' | 'SUPPORT' | null;
  showTypingIndicator?: boolean;
}

// Add rate limiting
const MESSAGE_LIMIT = 10;
const TIME_WINDOW = 60000; // 1 minute
const messageTimestamps: number[] = [];

// Check if user is sending too many messages
const isRateLimited = (): boolean => {
  const now = Date.now();
  
  // Remove timestamps older than the time window
  while (messageTimestamps.length > 0 && messageTimestamps[0] < now - TIME_WINDOW) {
    messageTimestamps.shift();
  }
  
  // Check if we've hit the limit
  if (messageTimestamps.length >= MESSAGE_LIMIT) {
    return true;
  }
  
  // Add the current timestamp
  messageTimestamps.push(now);
  return false;
};

/**
 * Find available providers based on detected intent
 */
export const findAvailableProviders = async (intent: any): Promise<BookingMatch[]> => {
  try {
    let availableUserIds: string[] = [];
    
    if (intent.entities.dayOfWeek !== undefined) {
      let query = supabase
        .from('availability')
        .select('artist_id')
        .eq('day_of_week', intent.entities.dayOfWeek.toString());
        
      if (intent.entities.time) {
        query = query
          .lte('start_time', intent.entities.time)
          .gte('end_time', intent.entities.time);
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
    
    if (intent.entities.service) {
      query = query.contains('services.title', intent.entities.service);
    }
    
    if (intent.entities.location) {
      query = query.ilike('location', `%${intent.entities.location}%`);
    }
    
    if (intent.entities.artistName) {
      query = query.ilike('full_name', `%${intent.entities.artistName}%`);
    }
    
    if (availableUserIds.length > 0) {
      query = query.in('id', availableUserIds);
    }
    
    query = query.limit(3);
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    const matches: BookingMatch[] = (data || []).map(provider => {
      const service = provider.services?.find(s => 
        intent.entities.service ? s.title.toLowerCase().includes(intent.entities.service.toLowerCase()) : true
      );
      
      return {
        id: provider.id,
        name: provider.full_name,
        service: service?.title || 'Service',
        time: intent.entities.time || '14:00',
        date: intent.entities.date || new Date().toISOString().split('T')[0],
        avatar: provider.avatar_url
      };
    });
    
    return matches;
  } catch (error) {
    console.error('Error finding providers:', error);
    return [];
  }
};

/**
 * Create a booking in the database
 */
export const createBooking = async (match: BookingMatch, userId: string | undefined): Promise<boolean> => {
  if (!userId) {
    toast.error('You need to be logged in to book an appointment');
    return false;
  }
  
  try {
    const { error } = await supabase
      .from('bookings')
      .insert({
        sender_id: userId,
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

/**
 * Main function to process user input and generate assistant response
 */
export const processUserInput = async (
  userInput: string, 
  userId?: string
): Promise<AssistantResponse> => {
  // Check rate limiting
  if (isRateLimited()) {
    return {
      message: "I'm receiving a lot of messages right now. Please wait a moment before sending another message.",
      showTypingIndicator: false
    };
  }

  try {
    // Detect intent from user input
    const intent = detectIntent(userInput);
    console.log('Detected intent:', intent);
    
    // Process based on intent type
    switch (intent.type) {
      case 'GREETING':
        return {
          message: getRandomResponse([
            "Hi there! I'm Little Sunshine, your AI assistant. How can I help you today? 😊",
            "Hello! I'm here to help with bookings, finding salons, or answering any questions about EmviApp.",
            "Hey there! I'm Little Sunshine. Looking for a salon, want to book an appointment, or have questions?",
            "Welcome to EmviApp! I'm Little Sunshine, and I'm here to make your beauty service experience seamless."
          ]),
          showTypingIndicator: true
        };
        
      case 'BOOKING':
        // If we have enough booking info, show matches
        if (intent.entities.service || intent.entities.artistName || intent.entities.dayOfWeek !== undefined) {
          const providers = await findAvailableProviders(intent);
          
          if (providers.length > 0) {
            const formattedDate = intent.entities.date ? formatDate(intent.entities.date) : 'requested date';
            const formattedTime = intent.entities.time ? formatTime(intent.entities.time) : 'requested time';
            
            return {
              message: `I found ${providers.length} available option${providers.length === 1 ? '' : 's'} for you${
                intent.entities.service ? ` for ${intent.entities.service}` : ''
              }${
                intent.entities.date ? ` on ${formattedDate}` : ''
              }${
                intent.entities.time ? ` at ${formattedTime}` : ''
              }. Take a look and let me know if you'd like to book with any of them:`,
              bookingMatches: providers,
              actionType: 'BOOKING',
              showTypingIndicator: true
            };
          } else {
            // No matches found
            return {
              message: `I couldn't find available providers matching your criteria. Would you like to try a different ${
                !intent.entities.service ? 'service, ' : ''
              }${
                !intent.entities.date ? 'date, ' : ''
              }${
                !intent.entities.time ? 'time, ' : ''
              }or location?`,
              showTypingIndicator: true
            };
          }
        } else {
          // Not enough booking info
          return {
            message: "I'd be happy to help you book an appointment! Could you please tell me what service you're looking for and when you'd like to book it?",
            showTypingIndicator: true
          };
        }
        
      case 'SUPPORT':
        return {
          message: "I'm here to help! What specifically can I assist you with? Whether it's booking issues, finding the right salon, or questions about how our platform works, I'm happy to guide you.",
          actionType: 'SUPPORT',
          showTypingIndicator: true
        };
        
      case 'INFO':
        if (intent.entities.topic === 'pricing') {
          return {
            message: "EmviApp offers various pricing options depending on your needs. For salon owners, we offer premium plans that increase your visibility and booking capabilities. For artists, the basic listing is free, with options to boost your profile. And for clients, using EmviApp to find and book services is always free! Would you like to know more about a specific plan?",
            actionType: 'INFO',
            showTypingIndicator: true
          };
        } else if (intent.entities.topic === 'features') {
          return {
            message: "EmviApp connects beauty professionals with clients seamlessly. Our platform lets salon owners list their businesses, artists showcase their work, and clients find and book services easily. We offer smart scheduling, portfolio management, secure payments, and client management tools. Is there a specific feature you'd like to know more about?",
            actionType: 'INFO',
            showTypingIndicator: true
          };
        } else if (intent.entities.topic === 'referrals') {
          return {
            message: "Our referral program rewards you for sharing EmviApp! When you invite friends or colleagues to join, you both receive credits that can be used for profile boosts, featured listings, or premium features. You can find your unique referral code in your account settings. Would you like me to show you how to access your referral code?",
            actionType: 'INFO',
            showTypingIndicator: true
          };
        } else {
          return {
            message: "EmviApp is the all-in-one platform for the beauty industry. We connect clients with salons and independent artists, making it easy to discover, book, and manage beauty services. Our platform helps salon owners manage their business, artists showcase their work, and clients find the perfect service provider. What specific aspect would you like to know more about?",
            actionType: 'INFO',
            showTypingIndicator: true
          };
        }
        
      case 'REFERRAL':
        return {
          message: "You can earn rewards by referring friends and colleagues to EmviApp! Each successful referral earns you credits that can be used for profile boosts, featured listings, or other premium features. Would you like me to explain how to find your referral code and start sharing?",
          actionType: 'INFO',
          showTypingIndicator: true
        };
        
      default:
        // Handle unknown intent
        return {
          message: getRandomResponse([
            "I'm not quite sure what you're asking. Could you provide more details or rephrase that?",
            "I want to help, but I'm not sure I understood your request. Could you try explaining it differently?",
            "I'm still learning! Could you rephrase your question or tell me more specifically what you're looking for?",
            "I'd be happy to assist, but I need a little more information. Are you looking to book an appointment, find a salon, or learn about EmviApp?"
          ]),
          showTypingIndicator: true
        };
    }
  } catch (error) {
    console.error('Error processing message:', error);
    return {
      message: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
      showTypingIndicator: false
    };
  }
};

// Helper function to get a random response from an array
function getRandomResponse(responses: string[]): string {
  const index = Math.floor(Math.random() * responses.length);
  return responses[index];
}
