import { useState, useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';
import { LanguageToggle } from './LanguageToggle';
import { useAssistant } from '@/hooks/useAssistant';
import { BookingMatch } from '@/services/assistantService';
import { processAiResponse } from '@/utils/aiResponseProcessor';
import { useAuth } from '@/context/auth';
import { MessageType } from './types';

interface ChatWindowProps {
  onClose: () => void;
}

const ChatWindow = ({ onClose }: ChatWindowProps) => {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'vi'>('en');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { generateResponse, isLoading, matches, createBooking } = useAssistant();
  const { user } = useAuth();
  
  useEffect(() => {
    // Detect user's preferred language (you can enhance this with user settings)
    const userLanguage = navigator.language.startsWith('vi') ? 'vi' : 'en';
    setCurrentLanguage(userLanguage);
    
    const welcomeMessages = {
      vi: "Em là Sunshine, em có thể giúp anh/chị gì được không ạ? Xin đừng ngại nhé! ✨",
      en: "Hi, I'm Sunshine. How can I help you today? Please don't hesitate to ask! ✨"
    };
    
    const initialMessage: MessageType = {
      id: 'welcome-1',
      content: welcomeMessages[userLanguage as keyof typeof welcomeMessages],
      sender: 'assistant',
      timestamp: new Date()
      // Removed actionSuggestions - no more automatic sales buttons!
    };
    
    setMessages([initialMessage]);
  }, []);
  
  const handleLanguageChange = (language: 'en' | 'vi') => {
    setCurrentLanguage(language);
    
    const welcomeMessages = {
      vi: "Em là Sunshine, em có thể giúp anh/chị gì được không ạ? Xin đừng ngại nhé! ✨",
      en: "Hi, I'm Sunshine. How can I help you today? Please don't hesitate to ask! ✨"
    };
    
    // Update welcome message with new language - NO automatic sales buttons
    const newWelcomeMessage: MessageType = {
      id: 'welcome-' + Date.now(),
      content: welcomeMessages[language],
      sender: 'assistant',
      timestamp: new Date()
      // Removed actionSuggestions completely
    };
    
    setMessages([newWelcomeMessage]);
  };
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    setIsTyping(true);
    const typingMessage: MessageType = {
      id: 'typing',
      content: '',
      sender: 'assistant',
      timestamp: new Date(),
      isTyping: true
    };
    
    setMessages(prevMessages => [...prevMessages, typingMessage]);
    
    try {
      const aiResponse = await generateResponse(content);
      const processedResponse = processAiResponse(aiResponse);
      
      setMessages(prevMessages => {
        const filteredMessages = prevMessages.filter(msg => msg.id !== 'typing');
        
        const assistantMessage: MessageType = {
          id: Date.now().toString(),
          content: processedResponse.message,
          sender: 'assistant',
          timestamp: new Date(),
          // Only show action suggestions if the AI specifically decides to include them
          // based on the user's request, not automatically
          bookingMatches: matches
        };
        
        return [...filteredMessages, assistantMessage];
      });
    } catch (error) {
      console.error('Error generating response:', error);
      
      setMessages(prevMessages => {
        const filteredMessages = prevMessages.filter(msg => msg.id !== 'typing');
        
        const errorMessage: MessageType = {
          id: Date.now().toString(),
          content: "Sorry, I'm having trouble processing your request right now. Please try again later.",
          sender: 'assistant',
          timestamp: new Date()
        };
        
        return [...filteredMessages, errorMessage];
      });
    } finally {
      setIsTyping(false);
    }
  };
  
  const handleBookingConfirm = (match: BookingMatch) => {
    createBooking(match);
    
    const confirmationMessage: MessageType = {
      id: Date.now().toString(),
      content: `Booking request sent to ${match.name} for ${match.service} on ${match.date} at ${match.time}. You'll receive a notification when they confirm.`,
      sender: 'assistant',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, confirmationMessage]);
  };
  
  return (
    <div className="flex flex-col h-full bg-white border-0 rounded-2xl shadow-xl overflow-hidden">
      {/* Simple header */}
      <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-3 flex items-center justify-between rounded-t-2xl">
        <ChatHeader onClose={onClose} />
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
            onBookingConfirm={handleBookingConfirm} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Simple input area */}
      <div className="border-t p-4 bg-white">
        <ChatInput onSendMessage={handleSendMessage} isProcessing={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;
