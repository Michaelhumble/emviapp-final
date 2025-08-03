
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
  userLanguage?: string,
  userName?: string
): Promise<AssistantResponse> => {
  try {
    // Call our Sunshine chat edge function for real AI responses
    const response = await supabase.functions.invoke('sunshine-chat', {
      body: {
        message: userInput,
        userId: userId,
        userLanguage: userLanguage,
        userName: userName
      }
    });

    if (response.error) {
      throw new Error(response.error.message || 'Failed to get AI response');
    }

    const aiResponse = response.data?.response || response.data?.message;
    
    if (!aiResponse) {
      throw new Error('No response received from AI');
    }

    // Check if this might be a booking request and should show booking options
    const bookingKeywords = ['book', 'appointment', 'schedule', 'reserve', 'availability'];
    const isBookingRequest = bookingKeywords.some(keyword => 
      userInput.toLowerCase().includes(keyword)
    );
    
    let bookingMatches: BookingMatch[] = [];
    
    // If this seems like a booking request, provide some example artists
    if (isBookingRequest) {
      bookingMatches = [
        {
          id: '1',
          name: 'Sarah Johnson',
          service: 'Gel Manicure',
          date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
          time: '14:00',
          avatar: '/lovable-uploads/aa25a147-5384-4b72-86f0-e3cc8caba2cc.png',
          artistId: '123456'
        },
        {
          id: '2',
          name: 'Michael Chen',
          service: 'Nail Art Design',
          date: new Date(Date.now() + 172800000).toISOString().split('T')[0], // Day after tomorrow
          time: '10:30',
          artistId: '789012'
        }
      ];
    }

    return {
      message: aiResponse,
      bookingMatches: bookingMatches.length > 0 ? bookingMatches : undefined
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
