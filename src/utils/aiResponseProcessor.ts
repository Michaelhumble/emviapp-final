
import { ActionSuggestion } from "@/components/chat/types";

type ProcessedResponse = {
  message: string;
  suggestedActions: ActionSuggestion[];
};

/**
 * Process the AI response to extract context and add appropriate action suggestions
 */
export function processAiResponse(response: string): ProcessedResponse {
  // Default suggestions that are generally helpful
  const defaultSuggestions: ActionSuggestion[] = [
    { id: "book", label: "Book an Artist", icon: "calendar", href: "/artists" },
    { id: "explore", label: "Explore Artists", icon: "users", href: "/artists" }
  ];
  
  // Initialize suggestions with empty array
  let suggestedActions: ActionSuggestion[] = [];
  
  // Check for specific keywords to add contextual action suggestions
  const lowerResponse = response.toLowerCase();
  
  // Job-related suggestions
  if (lowerResponse.includes("job") || 
      lowerResponse.includes("hiring") || 
      lowerResponse.includes("position") ||
      lowerResponse.includes("opportunity") ||
      lowerResponse.includes("employment")) {
    suggestedActions.push(
      { id: "post-job", label: "Post a Job", icon: "briefcase", href: "/jobs" },
      { id: "find-jobs", label: "Find Jobs", icon: "briefcase", href: "/jobs" }
    );
  }
  
  // Salon-related suggestions
  if (lowerResponse.includes("salon") || 
      lowerResponse.includes("shop") || 
      lowerResponse.includes("store") ||
      lowerResponse.includes("business")) {
    suggestedActions.push(
      { id: "sell-salon", label: "Sell My Salon", icon: "store", href: "/salon-sales" },
      { id: "find-salon", label: "Find Salons", icon: "store", href: "/salons" }
    );
  }
  
  // Booking-related suggestions
  if (lowerResponse.includes("book") || 
      lowerResponse.includes("appointment") || 
      lowerResponse.includes("schedule") ||
      lowerResponse.includes("reservation")) {
    suggestedActions.push(
      { id: "book-now", label: "Book Now", icon: "calendar", href: "/artists" }
    );
  }
  
  // Artist-related suggestions
  if (lowerResponse.includes("artist") || 
      lowerResponse.includes("stylist") || 
      lowerResponse.includes("professional") ||
      lowerResponse.includes("specialist")) {
    suggestedActions.push(
      { id: "find-artists", label: "Find Artists", icon: "users", href: "/artists" }
    );
  }
  
  // If we have no specific suggestions, use the defaults
  if (suggestedActions.length === 0) {
    suggestedActions = defaultSuggestions;
  }
  
  // Limit to 3 suggestions to avoid cluttering the interface
  suggestedActions = suggestedActions.slice(0, 3);
  
  return {
    message: response,
    suggestedActions
  };
}
