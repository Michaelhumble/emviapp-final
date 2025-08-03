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
  const [userName, setUserName] = useState<string>('');
  const [hasAskedForName, setHasAskedForName] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { generateResponse, isLoading, matches, createBooking } = useAssistant();
  const { user } = useAuth();
  
  useEffect(() => {
    // Detect user's preferred language (you can enhance this with user settings)
    const userLanguage = navigator.language.startsWith('vi') ? 'vi' : 'en';
    setCurrentLanguage(userLanguage);
    
    const welcomeMessages = {
      vi: "Chào anh/chị! Em là Sunshine — trợ lý AI của EmviApp. Anh/chị cho em biết tên để tiện xưng hô và hỗ trợ tốt hơn được không ạ? 😊💛",
      en: "Hi there! I'm Sunshine — EmviApp's AI assistant. Could you tell me your name so I can provide better support? 😊💛"
    };
    
    const initialMessage: MessageType = {
      id: 'welcome-1',
      content: welcomeMessages[userLanguage as keyof typeof welcomeMessages],
      sender: 'assistant',
      timestamp: new Date()
    };
    
    setMessages([initialMessage]);
    setHasAskedForName(true);
  }, []);
  
  const handleLanguageChange = (language: 'en' | 'vi') => {
    setCurrentLanguage(language);
    
    const welcomeMessages = {
      vi: "Chào anh/chị! Em là Sunshine — trợ lý AI của EmviApp. Anh/chị cho em biết tên để tiện xưng hô và hỗ trợ tốt hơn được không ạ? 😊",
      en: "Hi there! I'm Sunshine — EmviApp's AI assistant. Could you tell me your name so I can provide better support? 😊"
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

    // Auto-detect language from user input
    const detectedLanguage = detectLanguage(content);
    if (detectedLanguage !== currentLanguage) {
      setCurrentLanguage(detectedLanguage);
    }

    // Check if this is a name response (first interaction without a name)
    if (!userName && hasAskedForName && messages.length <= 2) {
      const extractedName = extractNameFromMessage(content);
      if (extractedName) {
        setUserName(extractedName);
      }
    }
    
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
      const aiResponse = await generateResponse(content, detectedLanguage, userName);
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
        
        const errorMessages = {
          vi: "Xin lỗi anh/chị, em đang gặp chút trục trặc. Anh/chị thử lại sau nhé! 😅",
          en: "Sorry, I'm having trouble processing your request right now. Please try again later! 😅"
        };
        
        const errorMessage: MessageType = {
          id: Date.now().toString(),
          content: errorMessages[detectedLanguage],
          sender: 'assistant',
          timestamp: new Date()
        };
        
        return [...filteredMessages, errorMessage];
      });
    } finally {
      setIsTyping(false);
    }
  };

  // Helper functions for language detection and name extraction
  const detectLanguage = (text: string): 'en' | 'vi' => {
    const vietnameseChars = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
    const vietnameseWords = /\b(tôi|em|anh|chị|là|tên|xin|chào|cảm|ơn|không|có|được|làm|gì|như|thế|nào|đây|kia|này|ạ)\b/i;
    
    return vietnameseChars.test(text) || vietnameseWords.test(text) ? 'vi' : 'en';
  };

  const extractNameFromMessage = (message: string): string => {
    // Common patterns for name extraction
    const patterns = [
      /(?:tôi là|em là|tên tôi là|tên em là|mình là)\s+([a-zA-ZÀ-ÿ\u0100-\u017F\u1EA0-\u1EF9\s]+)/i,
      /(?:i'm|i am|my name is|call me)\s+([a-zA-ZÀ-ÿ\u0100-\u017F\u1EA0-\u1EF9\s]+)/i,
      /^([a-zA-ZÀ-ÿ\u0100-\u017F\u1EA0-\u1EF9]+)$/i // Single word response (likely a name)
    ];
    
    for (const pattern of patterns) {
      const match = message.trim().match(pattern);
      if (match && match[1]) {
        return match[1].trim().split(' ')[0]; // Take first word as name
      }
    }
    
    // If the entire message is a short response (likely a name)
    const trimmed = message.trim();
    if (trimmed.length <= 20 && trimmed.split(' ').length <= 2 && /^[a-zA-ZÀ-ÿ\u0100-\u017F\u1EA0-\u1EF9\s]+$/.test(trimmed)) {
      return trimmed.split(' ')[0];
    }
    
    return '';
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
    <div className="flex flex-col h-full bg-white border-0 rounded-2xl shadow-xl overflow-hidden chat-window">
      {/* Simple header */}
      <div className="bg-gradient-to-r from-orange-400 to-yellow-400 p-3 flex items-center justify-between rounded-t-2xl">
        <ChatHeader onClose={onClose} />
      </div>
      
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 chat-messages">
        {messages.map((message) => (
          <MessageBubble 
            key={message.id} 
            message={message} 
            onBookingConfirm={handleBookingConfirm} 
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input area with enhanced mobile safety */}
      <div className="border-t p-4 bg-white chat-input safe-area-bottom" 
           style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}>
        <ChatInput onSendMessage={handleSendMessage} isProcessing={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;
