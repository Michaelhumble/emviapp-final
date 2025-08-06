export interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'error';
}

export interface ActionSuggestion {
  id?: string;
  text?: string;
  action?: string;
  label?: string;
  icon?: string;
  href?: string;
}

export interface ChatSettings {
  isOpen: boolean;
  isMinimized: boolean;
  unreadCount: number;
  theme: 'orange' | 'sunshine';
}