export interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  typing?: boolean;
}

export interface ChatState {
  isOpen: boolean;
  isMinimized: boolean;
  messages: Message[];
  isProcessing: boolean;
}

export interface ActionSuggestion {
  id: string;
  label: string;
  icon: string;
  href: string;
}