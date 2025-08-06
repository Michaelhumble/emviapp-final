
import { supabase } from "@/integrations/supabase/client";

export interface BookingMatch {
  id: string;
  name: string;
  service: string;
  date: string;
  time: string;
  avatar?: string;
  artistId: string;
}

export interface AssistantResponse {
  message: string;
  bookingMatches?: BookingMatch[];
}

// Process user input using real AI
export const processUserInput = async (
  userInput: string,
  userId?: string,
  userLanguage?: string
): Promise<AssistantResponse> => {
  try {
    // Sunshine chat removed - using fallback
    const fallbackMessage = "AI service temporarily unavailable";

    return {
      message: fallbackMessage,
      bookingMatches: undefined
    };
    
  } catch (error) {
    console.error('Error calling Sunshine AI:', error);
    
    // Return a fallback response that still feels like Sunshine
    return {
      message: "I'm having a little trouble with my AI connection right now, but I'm still here to help! ☀️ Could you try asking your question again? I love chatting about all things beauty and helping you find the perfect nail artist or service! 💅✨"
    };
  }
};

// Create a booking from a match
export const createBooking = async (match: BookingMatch) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('User not authenticated');
    }
    
    // Create the booking in the database
    const { data, error } = await supabase
      .from('bookings')
      .insert({
        sender_id: user.id,
        recipient_id: match.artistId,
        date_requested: match.date,
        time_requested: match.time,
        note: `Automated booking for ${match.service}`,
        status: 'pending'
      });
      
    if (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
    
    return data;
  } catch (error) {
    console.error('Error in createBooking:', error);
    throw error;
  }
};
