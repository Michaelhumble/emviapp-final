export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

export interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
}

export interface ActionSuggestion {
  id: string;
  label: string;
  icon: string;
  href: string;
}