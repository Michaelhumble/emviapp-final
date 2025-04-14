
// Types for booking matches
export interface BookingMatch {
  id: string;
  name: string;
  avatar?: string;
  service: string;
  date: string;
  time: string;
  price?: number;
}

// Assistant response type
export interface AssistantResponse {
  message: string;
  bookingMatches?: BookingMatch[];
}

// Function to process user input and generate a response
export const processUserInput = async (
  userInput: string, 
  userId?: string
): Promise<AssistantResponse> => {
  // Log input for future improvements
  console.log('Processing user input:', userInput);
  
  // Mock booking matching logic
  let bookingMatches: BookingMatch[] = [];
  
  // Check for booking-related keywords
  const bookingKeywords = ['book', 'appointment', 'haircut', 'style', 'color', 'treatment'];
  const isBookingRequest = bookingKeywords.some(keyword => 
    userInput.toLowerCase().includes(keyword)
  );
  
  if (isBookingRequest) {
    // Generate mock booking matches
    bookingMatches = generateMockBookingMatches();
  }
  
  // Detect user intent and generate appropriate contextual responses
  let message = "";
  
  const input = userInput.toLowerCase();
  
  // Hiring/jobs intent
  if (input.includes('hire') || input.includes('job') || input.includes('looking for work')) {
    message = "I can help you post a job or find employment! Would you like to post a job listing or browse available positions in your area? Here are some options:";
  }
  // Booking intent
  else if (input.includes('book') || input.includes('appointment')) {
    message = "I'd be happy to help you book an appointment! Here are some talented artists available for booking. Would any of these stylists work for you?";
  }
  // Salon selling intent
  else if (input.includes('sell') && input.includes('salon')) {
    message = "Looking to sell your salon? I can help you list it on our marketplace where interested buyers are actively searching. Here are some similar salon listings that have done well:";
  }
  // Booth rental intent
  else if (input.includes('booth') || (input.includes('rent') && input.includes('space'))) {
    message = "I found some great booth rental options that might be perfect for you! Here are some available booths near you:";
  }
  // General greeting or other query
  else {
    message = generateBaseResponse(userInput);
  }
  
  return {
    message,
    bookingMatches: bookingMatches.length > 0 ? bookingMatches : undefined
  };
};

// Function to generate mock booking matches
const generateMockBookingMatches = (): BookingMatch[] => {
  // Get current date and add a few days
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfterTomorrow = new Date(today);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  
  return [
    {
      id: '1',
      name: 'Sarah Johnson',
      service: 'Haircut & Style',
      date: tomorrow.toISOString().split('T')[0],
      time: '14:00',
      price: 85
    },
    {
      id: '2',
      name: 'Carlos Rodriguez',
      service: 'Color & Blowout',
      date: dayAfterTomorrow.toISOString().split('T')[0],
      time: '10:30',
      price: 120
    },
    {
      id: '3',
      name: 'Emma Taylor',
      service: 'Balayage & Cut',
      date: tomorrow.toISOString().split('T')[0],
      time: '16:00',
      price: 150
    }
  ];
};

// Simple response generation function
const generateBaseResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();
  
  if (input.includes('book') || input.includes('appointment')) {
    return "I'd be happy to help you book an appointment! Here are some stylists available for booking. Would any of these times work for you? 📅";
  }
  
  if (input.includes('job') || input.includes('hire')) {
    return "Looking to post a job or hire talent? You can create a listing right here on EmviApp. Your job will be visible to all qualified beauty professionals in your area! 💼";
  }
  
  if (input.includes('salon') || input.includes('business')) {
    return "EmviApp helps salon owners manage their business, attract clients, and grow their team! Would you like to list your salon or learn more about our salon management tools? 🏪";
  }
  
  if (input.includes('price') || input.includes('cost')) {
    return "EmviApp offers flexible pricing plans for all users. Basic features are free, with premium options starting at affordable monthly rates. Would you like to see our detailed pricing page? 💰";
  }
  
  if (input.includes('how') || input.includes('work')) {
    return "EmviApp connects beauty professionals with clients and salon owners in one seamless platform. You can book services, find talent, or grow your business — all in one place! What specifically would you like to know more about? ✨";
  }
  
  // Default response
  return "I'm here to help with bookings, finding salons, or answering any questions about EmviApp. What would you like to know more about? 😊";
};

// Mock function for booking creation
export const createBooking = async (
  bookingMatch: BookingMatch, 
  userId: string
): Promise<boolean> => {
  // Log the booking request
  console.log('Creating booking:', {
    userId,
    serviceId: bookingMatch.id,
    serviceName: bookingMatch.service,
    date: bookingMatch.date,
    time: bookingMatch.time
  });
  
  // In a real implementation, this would create a booking record in the database
  // For now, just simulate a successful booking with a 90% success rate
  const isSuccessful = Math.random() < 0.9;
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return isSuccessful;
};
