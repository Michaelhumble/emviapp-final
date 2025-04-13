
import { ActionSuggestion } from "@/components/chat/ChatSystem";

/**
 * Helper function to generate default action suggestions
 */
export const getDefaultActions = (): ActionSuggestion[] => {
  return [
    { id: "book", label: "Book an Artist", icon: "calendar", href: "/artists" },
    { id: "jobs", label: "Post a Job", icon: "briefcase", href: "/jobs" },
    { id: "salon", label: "Sell My Salon", icon: "store", href: "/salon-sales" },
    { id: "explore", label: "Explore Artists", icon: "users", href: "/artists" }
  ];
};

/**
 * Format a date string to a friendly format (e.g., "Mon, Jan 1")
 */
export const formatDateString = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch (e) {
    return dateString;
  }
};

/**
 * Format a time string (e.g., "14:30") to 12-hour format (e.g., "2:30 PM")
 */
export const formatTimeString = (timeString: string): string => {
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
