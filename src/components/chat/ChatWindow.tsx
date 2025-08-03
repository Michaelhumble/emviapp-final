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
      vi: "Chào anh/chị! Em là Sunshine—trợ lý AI của EmviApp. Em nói tiếng Việt. Em có thể giúp gì cho anh/chị hôm nay? ✨",
      en: "Hi there! I'm Sunshine—EmviApp's AI assistant. I speak English and Vietnamese. How can I help you today? ✨"
    };
    
    const actionSuggestions = {
      vi: [
        { id: "post-jobs", label: "Đăng việc làm", icon: "briefcase", href: "/jobs" },
        { id: "list-salons", label: "Rao bán salon", icon: "store", href: "/salon-sales" },
        { id: "book-appointments", label: "Đặt lịch hẹn", icon: "calendar", href: "/artists" }
      ],
      en: [
        { id: "post-jobs", label: "Post Jobs", icon: "briefcase", href: "/jobs" },
        { id: "list-salons", label: "List Salon for Sale", icon: "store", href: "/salon-sales" },
        { id: "book-appointments", label: "Book Appointments", icon: "calendar", href: "/artists" }
      ]
    };
    
    const initialMessage: MessageType = {
      id: 'welcome-1',
      content: welcomeMessages[userLanguage as keyof typeof welcomeMessages],
      sender: 'assistant',
      timestamp: new Date(),
      actionSuggestions: actionSuggestions[userLanguage as keyof typeof actionSuggestions]
    };
    
    setMessages([initialMessage]);
  }, []);
  
  const handleLanguageChange = (language: 'en' | 'vi') => {
    setCurrentLanguage(language);
    
    const welcomeMessages = {
      vi: "Chào anh/chị! Em là Sunshine—trợ lý AI của EmviApp. Em nói tiếng Việt. Em có thể giúp gì cho anh/chị hôm nay? ✨",
      en: "Hi there! I'm Sunshine—EmviApp's AI assistant. I speak English and Vietnamese. How can I help you today? ✨"
    };
    
    const actionSuggestions = {
      vi: [
        { id: "post-jobs", label: "Đăng việc làm", icon: "briefcase", href: "/jobs" },
        { id: "list-salons", label: "Rao bán salon", icon: "store", href: "/salon-sales" },
        { id: "book-appointments", label: "Đặt lịch hẹn", icon: "calendar", href: "/artists" }
      ],
      en: [
        { id: "post-jobs", label: "Post Jobs", icon: "briefcase", href: "/jobs" },
        { id: "list-salons", label: "List Salon for Sale", icon: "store", href: "/salon-sales" },
        { id: "book-appointments", label: "Book Appointments", icon: "calendar", href: "/artists" }
      ]
    };
    
    // Update welcome message with new language
    const newWelcomeMessage: MessageType = {
      id: 'welcome-' + Date.now(),
      content: welcomeMessages[language],
      sender: 'assistant',
      timestamp: new Date(),
      actionSuggestions: actionSuggestions[language]
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
          actionSuggestions: processedResponse.suggestedActions,
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
    <div className="flex flex-col h-full bg-gradient-to-br from-orange-50 via-yellow-50 to-white border-0 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
      {/* Header with gradient and language toggle */}
      <div className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 p-4 flex items-center justify-between rounded-t-xl">
        <ChatHeader onClose={onClose} />
      </div>
      
      {/* Language Toggle */}
      <div className="px-4 py-3 bg-gradient-to-r from-orange-100 to-yellow-100 border-b border-orange-200">
        <LanguageToggle 
          currentLanguage={currentLanguage} 
          onLanguageChange={handleLanguageChange} 
        />
      </div>
      
      {/* Messages Container with beautiful gradient background */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-orange-50/30 via-yellow-50/20 to-white/80">
        {/* Floating decoration elements */}
        <div className="absolute top-20 left-4 text-xl opacity-20 animate-bounce">✨</div>
        <div className="absolute top-32 right-6 text-lg opacity-30 animate-pulse">🌟</div>
        <div className="absolute top-48 left-8 text-lg opacity-25 animate-bounce delay-300">💫</div>
        
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
            onBookingConfirm={handleBookingConfirm} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input Area with warm gradient */}
      <div className="border-t border-orange-200 p-4 bg-gradient-to-r from-orange-50 to-yellow-50">
        <ChatInput onSendMessage={handleSendMessage} isProcessing={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;
