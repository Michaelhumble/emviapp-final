
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

// Process user input and return a response
export const processUserInput = async (
  userInput: string,
  userId?: string
): Promise<AssistantResponse> => {
  // Check if this is a booking request
  const bookingKeywords = ['book', 'appointment', 'schedule', 'reserve'];
  const isBookingRequest = bookingKeywords.some(keyword => 
    userInput.toLowerCase().includes(keyword)
  );
  
  // If this is a booking request, try to find matching artists
  if (isBookingRequest) {
    try {
      // This would normally call an AI service to extract booking intent
      // For now, we'll use mock data for demonstration
      const mockMatches: BookingMatch[] = [
        {
          id: '1',
          name: 'Sarah Johnson',
          service: 'Gel Manicure',
          date: '2025-04-18',
          time: '14:00',
          avatar: '/lovable-uploads/aa25a147-5384-4b72-86f0-e3cc8caba2cc.png',
          artistId: '123456'
        },
        {
          id: '2',
          name: 'Michael Chen',
          service: 'Nail Art Design',
          date: '2025-04-19',
          time: '10:30',
          artistId: '789012'
        }
      ];
      
      return {
        message: "I've found some available artists that match your request. Would you like to book with any of them?",
        bookingMatches: mockMatches
      };
    } catch (error) {
      console.error('Error processing booking request:', error);
      return {
        message: "I'm having trouble finding booking options right now. Could you try again or specify more details about what type of appointment you're looking for?"
      };
    }
  }
  
  // For non-booking requests, return a default response
  return {
    message: "I'm here to help with bookings, finding salons, or answering any questions about EmviApp. What would you like to know?"
  };
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
