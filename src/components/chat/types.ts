
import { BookingMatch } from '@/services/assistantService';

export interface ActionSuggestion {
  id: string;
  label: string;
  icon?: string;
  href: string;
}

export interface MessageType {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  isTyping?: boolean;
  actionSuggestions?: ActionSuggestion[];
  bookingMatches?: BookingMatch[];
}
