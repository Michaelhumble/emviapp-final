
import { ActionSuggestion } from "@/components/chat/ChatSystem";

export interface ProcessedResponse {
  message: string;
  suggestedActions: ActionSuggestion[];
}

export const processAiResponse = (response: string): ProcessedResponse => {
  const result: ProcessedResponse = {
    message: response,
    suggestedActions: []
  };
  
  // Add booking-related actions if the response mentions bookings
  if (response.toLowerCase().includes('booking') || 
      response.toLowerCase().includes('appointment') ||
      response.toLowerCase().includes('schedule')) {
    result.suggestedActions.push(
      { id: "book", label: "Book Now", icon: "calendar", href: "/booking" }
    );
  }
  
  // Add artist exploration actions if the response mentions artists or services
  if (response.toLowerCase().includes('artist') || 
      response.toLowerCase().includes('salon') ||
      response.toLowerCase().includes('service')) {
    result.suggestedActions.push(
      { id: "explore", label: "Explore Artists", icon: "users", href: "/artists" }
    );
  }
  
  // Add support actions if the response mentions issues or help
  if (response.toLowerCase().includes('issue') || 
      response.toLowerCase().includes('problem') ||
      response.toLowerCase().includes('help')) {
    result.suggestedActions.push(
      { id: "support", label: "Get Support", icon: "help-circle", href: "/support" }
    );
  }
  
  return result;
};
